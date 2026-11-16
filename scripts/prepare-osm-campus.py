"""OpenStreetMap 추출본(.osm.pbf)에서 캠퍼스 하나의 지도 JSON(data/campuses/<id>.json)을 만듭니다.

서울과기대(data/seoultech.json, prepare-campus.py)와 같은 형식·좌표계를 씁니다.
- 원점: 캠퍼스 경계 중심(meta.lat/lon). +x 동쪽, +z 남쪽, 단위 미터(src/campus/geo.mjs와 같은 식)
- 건물·도로·녹지·물·나무·횡단보도를 캠퍼스 경계로 자르고, 걸을 수 있는 길로 보행 그래프를 만듭니다.
- 이름 있는 건물마다 가장 가까운 길로 입구 연결선(<건물ID>Door)을 추정합니다. 현장 검증 전 값입니다.
- --vworld 파일(브이월드 건물통합정보 GeoJSON, scripts/fetch-vworld.py로 받음)이 있으면
  건물 높이·층수를 보탭니다. 없으면 OSM height/building:levels, 그것도 없으면 면적으로 추정합니다.

사용 예:
  PYTHONPATH=<shapely·osmium 설치 폴더> python scripts/prepare-osm-campus.py \
      --pbf south-korea-latest.osm.pbf --campus pusan --name "^부산대학교$" --near 129.082,35.233

지형 고도는 이어서 scripts/add-terrain.py로 넣습니다(이 스크립트는 JSON을 새로 쓰므로 매번 다시 실행).
추출본: https://download.geofabrik.de/asia/south-korea.html (© OpenStreetMap contributors, ODbL 1.0)
웹사이트는 저장된 JSON만 씁니다. 이 스크립트는 데이터를 다시 만들 때만 필요합니다.
"""
import argparse
import json
import math
import random
import re
import sys
from pathlib import Path

import osmium
from shapely import wkb
from shapely.geometry import LineString, MultiPolygon, Point, Polygon
from shapely.ops import nearest_points, unary_union
from shapely.strtree import STRtree

ROOT = Path(__file__).resolve().parent.parent
WKB = osmium.geom.WKBFactory()

# 렌더러(src/map/landscape/roads.mjs)가 아는 도로 종류로 맞춥니다.
ROAD_KIND = {
    "footway": "footway", "path": "path", "steps": "steps", "pedestrian": "footway",
    "cycleway": "footway", "track": "path", "bridleway": "path",
    "service": "service", "living_street": "living_street",
    "residential": "residential", "unclassified": "residential", "road": "residential",
    "tertiary": "tertiary", "tertiary_link": "tertiary",
    "secondary": "secondary", "secondary_link": "secondary",
    "primary": "secondary", "primary_link": "secondary",
}
# 보행 그래프에 넣는 길. 교내 차도도 사람이 걷는 길이라 포함합니다(foot=no 제외).
WALKABLE = set(ROAD_KIND)
# 지도 녹지 종류(src/map/map.js landColors)
LAND_KIND = {
    ("natural", "wood"): "wood", ("landuse", "forest"): "wood", ("natural", "scrub"): "wood",
    ("landuse", "grass"): "park", ("leisure", "park"): "park", ("leisure", "garden"): "park",
    ("landuse", "meadow"): "park", ("natural", "grassland"): "park", ("landuse", "village_green"): "park",
    ("leisure", "pitch"): "pitch", ("leisure", "track"): "pitch", ("leisure", "stadium"): "pitch",
    ("landuse", "construction"): "construction",
    ("natural", "water"): "water", ("landuse", "reservoir"): "water", ("landuse", "basin"): "water",
}
DORM = re.compile(r"생활관|기숙사|학사|웅비관|진리관")


def meters_per_degree(lat):
    phi = math.radians(lat)
    return (111132.92 - 559.82 * math.cos(2 * phi) + 1.175 * math.cos(4 * phi),
            111412.84 * math.cos(phi) - 93.5 * math.cos(3 * phi))


class Projector:
    def __init__(self, lon, lat):
        self.lon, self.lat = lon, lat
        self.m_lat, self.m_lon = meters_per_degree(lat)

    def xz(self, lon, lat):
        return ((lon - self.lon) * self.m_lon, (self.lat - lat) * self.m_lat)

    def geom(self, g):
        import shapely
        return shapely.transform(g, lambda c: [self.xz(x, y) for x, y in c])


def find_boundary(pbf, name_re, near):
    """amenity=university 영역 중 이름이 맞고 near에 가장 가까운 것."""
    pattern = re.compile(name_re)
    found = []
    fp = (osmium.FileProcessor(pbf)
          .with_areas(osmium.filter.TagFilter(("amenity", "university")))
          .with_filter(osmium.filter.TagFilter(("amenity", "university"))))
    for obj in fp:
        if not obj.is_area() or not pattern.search(obj.tags.get("name", "")):
            continue
        geom = wkb.loads(WKB.create_multipolygon(obj), hex=True)
        found.append((geom.distance(Point(*near)), obj.tags.get("name"), obj.orig_id(),
                      "way" if obj.from_way() else "relation", geom))
    if not found:
        raise SystemExit(f"캠퍼스 경계를 찾지 못했습니다: {name_re}")
    found.sort(key=lambda row: row[0])
    for d, name, oid, kind, g in found[:5]:
        print(f"  후보 {kind}/{oid} {name} 거리 {d:.4f}° 면적 {g.area * 1e6:.1f}")
    return found[0]


def collect(pbf, bbox):
    """bbox 안의 건물·도로·녹지·나무·횡단보도를 모읍니다(경위도 그대로)."""
    w, s, e, n = bbox
    inside = lambda lon, lat: w <= lon <= e and s <= lat <= n
    keys = ("building", "highway", "landuse", "leisure", "natural", "amenity")
    out = {"buildings": [], "roads": [], "lands": [], "trees": [], "crossings": []}
    fp = (osmium.FileProcessor(pbf)
          .with_locations()
          .with_areas(osmium.filter.KeyFilter("building", "landuse", "leisure", "natural"))
          .with_filter(osmium.filter.KeyFilter(*keys)))
    for obj in fp:
        tags = obj.tags
        if obj.is_node():
            if tags.get("natural") == "tree" and inside(obj.location.lon, obj.location.lat):
                out["trees"].append((obj.location.lon, obj.location.lat))
            continue
        if obj.is_way():
            hw = tags.get("highway")
            if not hw or not len(obj.nodes):
                continue
            first = obj.nodes[0].location
            if not first.valid() or not inside(first.lon, first.lat):
                # 긴 길은 다른 점이 bbox 안에 있을 수 있습니다.
                if not any(nd.location.valid() and inside(nd.location.lon, nd.location.lat)
                           for nd in obj.nodes):
                    continue
            coords = [(nd.location.lon, nd.location.lat) for nd in obj.nodes if nd.location.valid()]
            if len(coords) < 2:
                continue
            if hw == "footway" and tags.get("footway") == "crossing":
                out["crossings"].append({"osmWay": str(obj.id), "coordinates": coords})
            if hw in ROAD_KIND and tags.get("foot") != "no" and tags.get("area") != "yes":
                out["roads"].append({"id": obj.id, "kind": ROAD_KIND[hw], "name": tags.get("name"),
                                     "coords": coords})
            continue
        if obj.is_area():
            try:
                geom = wkb.loads(WKB.create_multipolygon(obj), hex=True)
            except Exception:
                continue
            minx, miny, maxx, maxy = geom.bounds
            if maxx < w or minx > e or maxy < s or miny > n:
                continue
            ref = ("w" if obj.from_way() else "r") + str(obj.orig_id())
            if tags.get("building") and tags.get("building") != "no":
                out["buildings"].append({"ref": ref, "geom": geom, "tags": dict(tags)})
            else:
                for (k, v), kind in LAND_KIND.items():
                    if tags.get(k) == v:
                        out["lands"].append({"kind": kind, "geom": geom})
                        break
    return out


def polygons(g):
    if g.is_empty:
        return []
    if isinstance(g, Polygon):
        return [g]
    if isinstance(g, MultiPolygon):
        return list(g.geoms)
    if hasattr(g, "geoms"):
        return [p for part in g.geoms for p in polygons(part)]
    return []


def lines(g):
    if g.is_empty:
        return []
    if g.geom_type == "LineString":
        return [g]
    if hasattr(g, "geoms"):
        return [p for part in g.geoms for p in lines(part)]
    return []


def rnd(v):
    return round(v, 2)


def num(text):
    m = re.match(r"^\s*(\d+(?:\.\d+)?)", str(text or ""))
    return float(m.group(1)) if m else None


def building_height(tags, area, vworld):
    """(높이 m, 층수). 브이월드 → OSM height/levels → 면적 추정 순."""
    if vworld:
        return vworld
    h, lv = num(tags.get("height")), num(tags.get("building:levels"))
    if h and lv:
        return h, int(lv)
    if lv:
        return round(lv * 4 + 1, 1), int(lv)
    if h:
        return h, max(1, round(h / 4))
    if tags.get("building") in ("roof", "canopy"):
        return 4.0, 1
    lv = 1 if area < 60 else 2 if area < 250 else 4 if area < 1500 else 5
    return float(lv * 4), lv


def make_graph(geoms, routable_tree, routable):
    nodes, edges, lookup, seen = {}, [], {}, set()

    def node(p):
        key = (round(p[0], 1), round(p[1], 1))
        if key not in lookup:
            nid = "n" + str(len(nodes))
            lookup[key] = nid
            nodes[nid] = {"x": key[0], "z": key[1], "name": "교내 보행로"}
        return lookup[key]

    for line in lines(geoms):
        coords = list(line.coords)
        for a, b in zip(coords, coords[1:]):
            u, v = node(a), node(b)
            if u == v:
                continue
            key = tuple(sorted([u, v]))
            if key in seen:
                continue
            seen.add(key)
            mid = Point((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
            parent = routable[routable_tree.nearest(mid)] if routable else None
            length = math.hypot(nodes[u]["x"] - nodes[v]["x"], nodes[u]["z"] - nodes[v]["z"])
            edges.append({"a": u, "b": v, "meters": round(length, 2),
                          "stairs": bool(parent and parent["kind"] == "steps"),
                          "name": (parent and parent["name"]) or "교내 보행로"})
    return nodes, edges


def components(nodes, edges):
    adj = {i: set() for i in nodes}
    for e in edges:
        adj[e["a"]].add(e["b"])
        adj[e["b"]].add(e["a"])
    result, pending = [], set(nodes)
    while pending:
        todo = [pending.pop()]
        comp = set(todo)
        while todo:
            u = todo.pop()
            for v in adj[u]:
                if v not in comp:
                    comp.add(v)
                    pending.discard(v)
                    todo.append(v)
        result.append(comp)
    return sorted(result, key=len, reverse=True)


def load_vworld(path, proj):
    """브이월드 건물 GeoJSON → [(shapely 폴리곤(미터), 높이, 층수)]."""
    if not path or not Path(path).is_file():
        return []
    data = json.loads(Path(path).read_text(encoding="utf8"))
    rows = []
    for f in data.get("features", []):
        p = f.get("properties", {})
        floors = num(p.get("grnd_flr") or p.get("gro_flo_co"))
        height = num(p.get("height") or p.get("bld_hgt"))
        if not floors and not height:
            continue
        try:
            from shapely.geometry import shape
            g = proj.geom(shape(f["geometry"]))
        except Exception:
            continue
        floors = int(floors) if floors else max(1, round(height / 4))
        height = height if height and height > 2 else floors * 4.0
        rows.append((g, round(height, 1), floors))
    return rows


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--pbf", required=True)
    ap.add_argument("--campus", required=True, help="registry.mjs의 학교 id")
    ap.add_argument("--name", required=True, help="OSM amenity=university name 정규식")
    ap.add_argument("--near", required=True, help="캠퍼스 근처 경도,위도(같은 이름 캠퍼스 구분)")
    ap.add_argument("--gate", help="정문 경도,위도(보행 그래프를 이 근처에서 나눕니다)")
    ap.add_argument("--vworld", help="브이월드 건물 GeoJSON 경로(선택)")
    ap.add_argument("--max-trees", type=int, default=2200)
    ap.add_argument("--out", help="출력 경로(기본 data/campuses/<id>.json)")
    args = ap.parse_args()
    near = tuple(map(float, args.near.split(",")))

    print("1/4 캠퍼스 경계 찾는 중...")
    _, uni_name, uni_id, uni_kind, campus_ll = find_boundary(args.pbf, args.name, near)
    if isinstance(campus_ll, MultiPolygon):
        campus_ll = max(campus_ll.geoms, key=lambda g: g.area)
    c = campus_ll.centroid
    proj = Projector(round(c.x, 7), round(c.y, 7))
    w, s, e, n = campus_ll.bounds
    pad = 0.0015
    print(f"  선택: {uni_kind}/{uni_id} {uni_name}")

    print("2/4 OSM 객체 모으는 중(몇 분 걸립니다)...")
    raw = collect(args.pbf, (w - pad, s - pad, e + pad, n + pad))
    print(f"  건물 {len(raw['buildings'])} 도로 {len(raw['roads'])} 녹지 {len(raw['lands'])} 나무 {len(raw['trees'])}")

    print("3/4 변환 중...")
    campus = proj.geom(campus_ll).buffer(0)
    clip = campus.buffer(10)
    vworld = load_vworld(args.vworld, proj)
    vworld_tree = STRtree([g for g, _, _ in vworld]) if vworld else None

    buildings, used_ids = [], set()
    for raw_b in raw["buildings"]:
        for poly in polygons(proj.geom(raw_b["geom"]).buffer(0)):
            if poly.area < 12 or not campus.covers(poly.representative_point()):
                continue
            tags = raw_b["tags"]
            bid = f"{args.campus}-{raw_b['ref']}"
            if bid in used_ids:
                bid = f"{bid}-{len(used_ids)}"
            used_ids.add(bid)
            name = (tags.get("name") or tags.get("name:ko") or "").strip()
            ref = (tags.get("ref") or tags.get("addr:housename") or "").strip()
            vw = None
            if vworld_tree is not None:
                best = None
                for i in vworld_tree.query(poly):
                    g, hh, ff = vworld[i]
                    inter = g.intersection(poly).area
                    if inter > 0.5 * min(g.area, poly.area) and (not best or inter > best[0]):
                        best = (inter, hh, ff)
                vw = best and (best[1], best[2])
            height, floors = building_height(tags, poly.area, vw)
            center = poly.centroid
            b = {
                "id": bid,
                "sourceId": f"{'way' if raw_b['ref'][0] == 'w' else 'relation'}/{raw_b['ref'][1:]}",
                "name": name or "교내 건물",
                "outline": [[rnd(x), rnd(z)] for x, z in list(poly.exterior.coords)[:-1]],
                "holes": [[[rnd(x), rnd(z)] for x, z in list(h.coords)[:-1]] for h in poly.interiors],
                "x": rnd(center.x), "z": rnd(center.y),
                "h": float(height), "floors": floors,
                "roof": tags.get("roof:colour") or tags.get("building:colour") or None,
                "kind": ("생활관" if DORM.search(name) else "학교 건물") + " · 공개 지도 데이터",
                "heightSource": "vworld" if vw else ("osm" if tags.get("height") or tags.get("building:levels") else "estimate"),
            }
            if ref and re.match(r"^[0-9A-Za-z-]{1,6}$", ref):
                b["number"] = ref
            buildings.append(b)
    polys = [Polygon(b["outline"], b["holes"]) for b in buildings]
    obstacles = unary_union(polys).buffer(0.15)

    roads = []
    for r in raw["roads"]:
        line = proj.geom(LineString(r["coords"]))
        for part in lines(line.intersection(clip)):
            if part.length < 0.5:
                continue
            roads.append({"kind": r["kind"], "name": r["name"] or "교내 보행로",
                          "points": [[rnd(x), rnd(z)] for x, z in part.coords]})
    routable = [r for r in roads if r["kind"] in {ROAD_KIND[k] for k in WALKABLE}]
    routable_lines = [LineString(r["points"]) for r in routable]
    routable_tree = STRtree(routable_lines)
    network = unary_union([ln.difference(obstacles) for ln in routable_lines])
    nodes, edges = make_graph(network, routable_tree, routable)
    comps = components(nodes, edges)
    main_nodes = comps[0]
    mainlines = [LineString([(nodes[e["a"]]["x"], nodes[e["a"]]["z"]), (nodes[e["b"]]["x"], nodes[e["b"]]["z"])])
                 for e in edges if e["a"] in main_nodes]
    # 큰 보행망에서 떨어진 길 조각(노드 3개 이상)은 25m 안이면 건물을 지나지 않는 짧은 선으로 잇습니다.
    # OSM에서 교차점이 빠져 끊긴 길을 살리는 근사 연결이며 현장 검증 전입니다.
    main_net0 = unary_union(mainlines)
    bridges = []
    for comp in comps[1:]:
        if len(comp) < 3:
            continue
        best = None
        for nid in comp:
            p = Point(nodes[nid]["x"], nodes[nid]["z"])
            q = nearest_points(p, main_net0)[1]
            d = p.distance(q)
            if d <= 25 and (not best or d < best[0]):
                best = (d, p, q)
        if not best:
            continue
        bridge = LineString([best[1], best[2]])
        if bridge.length > 0.1 and bridge.intersects(obstacles.buffer(-0.05)):
            continue
        comp_lines = [LineString([(nodes[e["a"]]["x"], nodes[e["a"]]["z"]), (nodes[e["b"]]["x"], nodes[e["b"]]["z"])])
                      for e in edges if e["a"] in comp]
        mainlines += comp_lines + ([bridge] if bridge.length > 0.1 else [])
        bridges.append(round(best[0], 1))
    print(f"  떨어진 길 조각 {len(bridges)}개 연결(연결선 길이 m): {bridges}")
    main_net = unary_union(mainlines)
    main_tree = STRtree(mainlines)

    # 이름 있는 건물마다 가장 가까운 보행로로 입구 연결선을 추정합니다.
    anchors, connectors = {}, []
    poly_tree = STRtree(polys)
    for bi, (b, poly) in enumerate(zip(buildings, polys)):
        if b["name"] == "교내 건물" or poly.area < 80:
            continue
        best = None
        for i in main_tree.query(poly.buffer(80)):
            a, p = nearest_points(poly.exterior, mainlines[i])
            conn = LineString([a, p])
            # 다른 건물을 뚫고 지나가는 연결선은 쓰지 않습니다.
            blocked = any(j != bi and conn.length > 0.1 and
                          conn.intersection(polys[j].buffer(-0.05)).length > 0.1
                          for j in poly_tree.query(conn))
            if blocked:
                continue
            if not best or conn.length < best[0]:
                best = (conn.length, a, conn)
        if not best or best[0] > 60:
            continue
        door = b["id"] + "Door"
        anchors[door] = {"x": round(best[1].x, 1), "z": round(best[1].y, 1), "name": b["name"] + " 입구 인근"}
        b["entry"] = door
        if best[0] > 0.1:
            connectors.append(best[2])
    all_lines = mainlines + connectors
    if args.gate:
        g = Point(*proj.xz(*map(float, args.gate.split(","))))
        near_pt = nearest_points(g, main_net)[1]
        anchors["gate"] = {"x": round(near_pt.x, 1), "z": round(near_pt.y, 1), "name": "정문 인근"}
    union = unary_union(all_lines)
    for a in anchors.values():
        target = nearest_points(Point(a["x"], a["z"]), union)[1]
        all_lines.append(LineString([(target.x - .001, target.y - .001), (target.x + .001, target.y + .001)]))
    nodes, edges = make_graph(unary_union(all_lines), routable_tree, routable)
    # 교차점 정리용 짧은 선이 남긴 조각을 빼고 가장 큰 연결 덩어리만 씁니다.
    keep = components(nodes, edges)[0]
    nodes = {k: v for k, v in nodes.items() if k in keep}
    edges = [e for e in edges if e["a"] in keep and e["meters"] > 0.05]
    node_tree_ids = list(nodes)
    node_tree = STRtree([Point(nodes[k]["x"], nodes[k]["z"]) for k in node_tree_ids])
    renames = {}
    for aid, anchor in anchors.items():
        nearest = node_tree_ids[node_tree.nearest(Point(anchor["x"], anchor["z"]))]
        if nearest in renames:
            continue
        renames[nearest] = aid
        nodes[nearest]["name"] = anchor["name"]
    for b in buildings:
        if b.get("entry") and b["entry"] not in renames.values():
            del b["entry"]
    nodes = {renames.get(k, k): v for k, v in nodes.items()}
    for e in edges:
        e["a"], e["b"] = renames.get(e["a"], e["a"]), renames.get(e["b"], e["b"])

    lands = []
    for land in raw["lands"]:
        for poly in polygons(proj.geom(land["geom"]).buffer(0).intersection(campus)):
            if poly.area > 8:
                lands.append({"kind": land["kind"],
                              "outline": [[rnd(x), rnd(z)] for x, z in list(poly.exterior.coords)[:-1]]})

    # 나무: OSM 나무 + 숲·잔디 안에 일정 간격으로 심은 나무(건물·도로·물 피함). 결과는 고정(시드).
    rng = random.Random(args.campus)
    road_buffer = unary_union([LineString(r["points"]).buffer(4 if r["kind"] in ("service", "residential", "tertiary", "secondary") else 2)
                               for r in roads]) if roads else Point(0, 0).buffer(0)
    water = unary_union([Polygon(l["outline"]) for l in lands if l["kind"] == "water"]) if lands else Point(0, 0).buffer(0)
    blocked = unary_union([obstacles.buffer(2), road_buffer, water])
    trees = []
    for lon, lat in raw["trees"]:
        p = Point(*proj.xz(lon, lat))
        if campus.covers(p) and not obstacles.covers(p):
            trees.append([rnd(p.x), rnd(p.y), round(rng.uniform(0.8, 1.2), 2)])
    for land in sorted(lands, key=lambda l: l["kind"] != "wood"):
        if land["kind"] not in ("wood", "park"):
            continue
        poly = Polygon(land["outline"])
        spacing = 11 if land["kind"] == "wood" else 18
        minx, minz, maxx, maxz = poly.bounds
        x = minx + spacing / 2
        while x < maxx:
            z = minz + spacing / 2
            while z < maxz:
                p = Point(x + rng.uniform(-3, 3), z + rng.uniform(-3, 3))
                if poly.contains(p) and not blocked.contains(p):
                    trees.append([rnd(p.x), rnd(p.y), round(rng.uniform(0.75, 1.25), 2)])
                z += spacing
            x += spacing
    if len(trees) > args.max_trees:
        rng.shuffle(trees)
        trees = trees[:args.max_trees]

    crosswalks = [c for c in raw["crossings"]
                  if clip.intersects(proj.geom(LineString(c["coordinates"])))]
    for c in crosswalks:
        c["coordinates"] = [[round(lon, 7), round(lat, 7)] for lon, lat in c["coordinates"]]

    result = {
        "attribution": {
            "databaseLicense": "ODbL-1.0",
            "osm": "© OpenStreetMap contributors",
            "geometrySource": f"https://www.openstreetmap.org/{uni_kind}/{uni_id}",
            "supplemental": "국토교통부 브이월드 · 공공누리 제1유형" if vworld else None,
            "changes": "Clip to campus; flat ground; derive an unverified walking graph; approximate entrance connectors; synthesize trees in wooded/grass areas; estimate missing building heights from footprint area.",
        },
        "meta": {"lat": proj.lat, "lon": proj.lon},
        "boundary": [[[rnd(x), rnd(z)] for x, z in list(campus.exterior.coords)[:-1]]],
        "buildings": buildings,
        "roads": roads,
        "lands": lands,
        "trees": trees,
        "crosswalks": crosswalks,
        "nodes": nodes,
        "edges": edges,
    }
    out = Path(args.out or ROOT / "data" / "campuses" / f"{args.campus}.json")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")), encoding="utf8")
    named = sum(b["name"] != "교내 건물" for b in buildings)
    print("4/4 저장:", out)
    print(f"  건물 {len(buildings)}(이름 {named}, 입구 {sum('entry' in b for b in buildings)}) 도로 {len(roads)} "
          f"녹지 {len(lands)} 나무 {len(trees)} 횡단보도 {len(crosswalks)} 노드 {len(nodes)} 간선 {len(edges)}")
    print("  높이 출처:", {k: sum(b['heightSource'] == k for b in buildings) for k in ('vworld', 'osm', 'estimate')})
    print("  연결 덩어리(정리 전):", [len(c) for c in comps[:6]])


if __name__ == "__main__":
    main()
