// 팀 조사 데이터(위경도 GeoJSON)를 자동 생성 보행 그래프(미터 좌표)에 합칩니다.
// 원본 그래프는 바꾸지 않고, 합친 결과를 새 객체로 돌려줍니다.
import { toScene, projectToSegment, insideBuilding } from "./geo.mjs";

const SNAP_NODE_M = 1; // 붙일 점이 간선 끝점 이 거리 안이면 자르지 않고 그 노드를 씀
const SNAP_LINE_M = 3; // 길·계단의 끝점이 기존 길에 붙는 최대 거리
const MAX_ATTACH_M = 30; // 출입구가 기존 길에 붙을 수 있는 최대 거리
const WALL_TOLERANCE_M = 0.7; // 벽에서 이 거리 안의 건물 내부는 관통으로 보지 않음 (기존 테스트와 같은 기준)

const TYPE_ORDER = { entrance: 0, sidewalk: 1, stairs: 1, building_passage: 2 };
const EXCLUDED_STATUS = new Set(["rejected", "expired"]);

const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const round = (value) => Math.round(value * 100) / 100;

function wallDistance(point, building) {
  let best = Infinity;
  for (const ring of [building.outline, ...building.holes])
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length];
      best = Math.min(
        best,
        projectToSegment(point, { x: ax, z: az }, { x: bx, z: bz }).distance,
      );
    }
  return best;
}

// 선분 a–b가 건물 안쪽(벽에서 0.7m보다 깊은 곳)을 지나면 그 건물을 돌려줍니다.
export function crossesBuilding(a, b, buildings) {
  const steps = Math.max(2, Math.ceil(distance(a, b) / 0.5));
  for (let i = 1; i < steps; i++) {
    const t = i / steps,
      point = { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
    for (const building of buildings)
      if (
        insideBuilding(point, building) &&
        wallDistance(point, building) > WALL_TOLERANCE_M
      )
        return building;
  }
  return null;
}

function freeId(nodes, base) {
  if (!nodes[base]) return base;
  let n = 2;
  while (nodes[`${base}${n}`]) n++;
  return `${base}${n}`;
}

/**
 * point를 그래프의 가장 가까운 간선에 붙이고, 붙은 노드 id를 돌려줍니다.
 * - 수선의 발이 간선 끝점 1m 안이면 그 끝점 노드를 씁니다.
 * - 아니면 간선을 그 점에서 둘로 자르고 `${id}:p` 노드를 만듭니다.
 * - point에서 붙을 점까지의 선이 건물을 지나면 다음으로 가까운 간선을 봅니다.
 * graph({ nodes, edges })를 직접 고칩니다. 붙을 곳이 없으면 null.
 */
export function attachToGraph(
  graph,
  point,
  { id, buildings, maxDistance = MAX_ATTACH_M },
) {
  const candidates = graph.edges
    .map((edge, index) => ({
      edge,
      index,
      ...projectToSegment(point, graph.nodes[edge.a], graph.nodes[edge.b]),
    }))
    .filter((c) => c.distance <= maxDistance)
    .sort((p, q) => p.distance - q.distance || p.index - q.index);

  for (const c of candidates) {
    const a = graph.nodes[c.edge.a],
      b = graph.nodes[c.edge.b];
    for (const [nodeId, node] of [
      [c.edge.a, a],
      [c.edge.b, b],
    ])
      if (
        distance(c.point, node) <= SNAP_NODE_M &&
        !crossesBuilding(point, node, buildings)
      )
        return { nodeId, distance: distance(point, node) };
    if (crossesBuilding(point, c.point, buildings)) continue;

    const splitId = freeId(graph.nodes, `${id}:p`);
    graph.nodes[splitId] = {
      x: round(c.point.x),
      z: round(c.point.z),
      name: c.edge.name || "교내 보행로",
      source_kind: "team_input",
    };
    graph.edges.splice(
      c.index,
      1,
      { ...c.edge, b: splitId, meters: round(c.edge.meters * c.t) },
      { ...c.edge, a: splitId, meters: round(c.edge.meters * (1 - c.t)) },
    );
    return { nodeId: splitId, distance: c.distance };
  }
  return null;
}

function addEntrance(graph, feature, id, ctx) {
  const p = feature.properties,
    pos = toScene(feature.geometry?.coordinates, ctx.origin);
  if (feature.geometry?.type !== "Point" || !pos)
    return ctx.warn(id, "출입구 좌표가 올바른 점(Point)이 아닙니다.");
  graph.nodes[id] = {
    x: round(pos.x),
    z: round(pos.z),
    name: p.name || "출입구",
    type: "entrance",
    building_id: p.building_id,
    source_kind: p.source_kind || "team_input",
    verification_status: p.verification_status || "candidate",
  };
  const attached = attachToGraph(graph, pos, {
    id,
    buildings: ctx.buildings,
  });
  if (!attached) {
    delete graph.nodes[id];
    return ctx.warn(
      id,
      `${MAX_ATTACH_M}m 안에 건물을 지나지 않고 붙을 길이 없어 넣지 않았습니다.`,
    );
  }
  graph.edges.push({
    a: id,
    b: attached.nodeId,
    meters: round(attached.distance),
    stairs: false,
    name: `${graph.nodes[id].name} 연결`,
    type: "connector",
    source_kind: "team_input",
  });
  ctx.entrances.push({ id, ...graph.nodes[id] });
}

function addLine(graph, feature, id, ctx) {
  const p = feature.properties,
    stairs = p.feature_type === "stairs",
    coords = feature.geometry?.coordinates;
  if (feature.geometry?.type !== "LineString" || !(coords?.length >= 2))
    return ctx.warn(id, "길·계단은 점 2개 이상인 선(LineString)이어야 합니다.");
  const points = coords.map((c) => toScene(c, ctx.origin));
  if (points.some((pt) => !pt)) return ctx.warn(id, "좌표가 올바르지 않습니다.");

  const nodeIds = points.map((pt, i) => {
    const isEnd = i === 0 || i === points.length - 1;
    if (isEnd) {
      const attached = attachToGraph(graph, pt, {
        id: `${id}:${i}`,
        buildings: ctx.buildings,
        maxDistance: SNAP_LINE_M,
      });
      if (attached) return attached.nodeId;
      ctx.warn(id, `${i === 0 ? "시작" : "끝"}점이 기존 길과 ${SNAP_LINE_M}m 넘게 떨어져 있습니다.`);
    }
    const nodeId = freeId(graph.nodes, `${id}:${i}`);
    graph.nodes[nodeId] = {
      x: round(pt.x),
      z: round(pt.z),
      name: p.name || (stairs ? "계단" : "교내 보행로"),
      source_kind: p.source_kind || "team_input",
    };
    return nodeId;
  });

  for (let i = 1; i < nodeIds.length; i++) {
    const a = graph.nodes[nodeIds[i - 1]],
      b = graph.nodes[nodeIds[i]];
    if (nodeIds[i - 1] === nodeIds[i]) continue;
    if (crossesBuilding(a, b, ctx.buildings))
      ctx.warn(id, `${i}번째 구간이 건물을 지나갑니다.`);
    graph.edges.push({
      a: nodeIds[i - 1],
      b: nodeIds[i],
      meters: round(distance(a, b)),
      stairs,
      name: p.name || (stairs ? "계단" : "교내 보행로"),
      type: stairs ? "stairs" : "sidewalk",
      source_kind: p.source_kind || "team_input",
    });
  }
}

function addPassage(graph, feature, id, ctx) {
  const p = feature.properties,
    from = graph.nodes[p.from],
    to = graph.nodes[p.to];
  if (from?.type !== "entrance" || to?.type !== "entrance")
    return ctx.warn(id, "관통 경로의 양 끝(from, to)은 조사한 출입구여야 합니다.");
  if (!from.building_id || from.building_id !== to.building_id)
    return ctx.warn(id, "관통 경로의 양 끝은 같은 건물의 출입구여야 합니다.");
  const length = Number(p.length_m);
  graph.edges.push({
    a: p.from,
    b: p.to,
    meters: round(length > 0 ? length : distance(from, to)),
    stairs: false,
    name: p.name || "건물 관통",
    type: "building_passage",
    source_kind: p.source_kind || "team_input",
  });
}

/**
 * base: { nodes, edges } (미터 좌표), survey: GeoJSON FeatureCollection (위경도)
 * 반환: { nodes, edges, entrances, warnings }
 * 같은 입력이면 항상 같은 결과가 나오도록 항목을 종류 → id 순으로 처리합니다.
 */
export function mergeSurvey(base, survey, { origin, buildings }) {
  const graph = {
      nodes: { ...base.nodes },
      edges: base.edges.map((edge) => ({ ...edge })),
    },
    entrances = [],
    warnings = [],
    ctx = {
      origin,
      buildings,
      entrances,
      warn: (id, message) => warnings.push({ id, message }),
    };

  const features = (Array.isArray(survey?.features) ? survey.features : [])
    .filter(
      (f) =>
        f?.properties &&
        f.properties.feature_type in TYPE_ORDER &&
        !EXCLUDED_STATUS.has(f.properties.verification_status),
    )
    .map((f) => ({ f, id: String(f.properties.id ?? f.id ?? "") }))
    .sort(
      (p, q) =>
        TYPE_ORDER[p.f.properties.feature_type] -
          TYPE_ORDER[q.f.properties.feature_type] ||
        (p.id < q.id ? -1 : p.id > q.id ? 1 : 0),
    );

  const seen = new Set();
  for (const { f, id } of features) {
    if (!id) {
      ctx.warn("(id 없음)", "조사 항목에 id가 없어 넣지 않았습니다.");
      continue;
    }
    if (seen.has(id) || graph.nodes[id]) {
      ctx.warn(id, "같은 id가 이미 있어 넣지 않았습니다.");
      continue;
    }
    seen.add(id);
    const type = f.properties.feature_type;
    if (type === "entrance") addEntrance(graph, f, id, ctx);
    else if (type === "building_passage") addPassage(graph, f, id, ctx);
    else addLine(graph, f, id, ctx);
  }
  return { nodes: graph.nodes, edges: graph.edges, entrances, warnings };
}
