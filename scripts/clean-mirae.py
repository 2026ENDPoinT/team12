"""미래관 3D 도면(data/mirae/mirae.glb) 다듬기. extract-mirae.py 다음에 한 번 실행합니다.

    python scripts/clean-mirae.py            # data/mirae/mirae.glb 를 고쳐 씀(이미 고친 파일이면 건너뜀)

고치는 것
  1) 겹친 면 반짝임: 문짝·걸레받이·바닥 무늬처럼 벽·바닥과 '같은 평면'에 겹쳐 있는 작은 부품은
     휴대폰 그래픽에서 가까이 갈수록 벽과 번갈아 보이며 반짝입니다. 이런 부품을 층별 'D<층>' 묶음으로
     따로 빼 두면 화면(view.js)이 살짝 앞으로 당겨 그려 항상 이기게 합니다.
  2) 공중에 뜬 부품: 아래에 바닥이 없는 바닥 무늬(계단실·뚫린 공간 위), 위에 천장이 없는 천장 조명
     (아트리움 위)을 지웁니다.
  3) 바닥 무늬는 바닥보다 4mm 올립니다.
"""
import json, struct, sys, pathlib
from collections import defaultdict
import numpy as np

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "data/mirae/mirae.glb")
M = json.loads(pathlib.Path("data/mirae/mirae.json").read_text(encoding="utf-8"))
FZ = {f["n"]: f["z"] for f in M["floors"]}

raw = SRC.read_bytes()
jl = struct.unpack("<I", raw[12:16])[0]
J = json.loads(raw[20 : 20 + jl])
BIN = raw[20 + jl + 8 :]
if J["asset"].get("extras", {}).get("cleaned"):
    print("이미 다듬은 파일이에요:", SRC)
    sys.exit(0)

DT = {5126: np.float32, 5123: np.uint16, 5125: np.uint32, 5121: np.uint8}
NC = {"SCALAR": 1, "VEC3": 3, "VEC4": 4}


def acc(i):
    a = J["accessors"][i]
    v = J["bufferViews"][a["bufferView"]]
    n = NC[a["type"]]
    off = v.get("byteOffset", 0) + a.get("byteOffset", 0)
    arr = np.frombuffer(BIN, dtype=DT[a["componentType"]], count=a["count"] * n, offset=off)
    return arr.reshape(-1, n) if n > 1 else arr


meshes = {}
for nd in J["nodes"]:
    pr = J["meshes"][nd["mesh"]]["primitives"][0]
    meshes[nd["name"]] = dict(
        P=acc(pr["attributes"]["POSITION"]).astype(np.float32).copy(),
        C=acc(pr["attributes"]["COLOR_0"]).copy(),
        T=acc(pr["indices"]).reshape(-1, 3).astype(np.uint32).copy(),
    )


def components(P, T):
    """같은 위치 꼭짓점을 공유하는 삼각형끼리 묶음 → 삼각형별 부품 번호"""
    key = np.round(P * 1000).astype(np.int64)
    _, vid = np.unique(key, axis=0, return_inverse=True)
    vid = vid.ravel()
    par = np.arange(vid.max() + 1)

    def find(x):
        r = x
        while par[r] != r:
            r = par[r]
        while par[x] != r:
            par[x], x = r, par[x]
        return r

    for a, b, c in vid[T]:
        ra = find(a)
        par[find(b)] = ra
        par[find(c)] = ra
    roots = np.array([find(v) for v in vid[T[:, 0]]])
    _, cid = np.unique(roots, return_inverse=True)
    return cid.ravel()


def boxes(P, T, cid):
    n = cid.max() + 1
    mn = np.full((n, 3), np.inf)
    mx = np.full((n, 3), -np.inf)
    V = P[T]  # (t,3,3)
    np.minimum.at(mn, cid, V.min(1))
    np.maximum.at(mx, cid, V.max(1))
    return mn, mx


CELL = 0.25


def coverage(P, T, sel):
    cov = set()
    for t in np.where(sel)[0]:
        tri = P[T[t]]
        for i in range(int(np.floor(tri[:, 0].min() / CELL)), int(np.floor(tri[:, 0].max() / CELL)) + 1):
            for j in range(int(np.floor(tri[:, 2].min() / CELL)), int(np.floor(tri[:, 2].max() / CELL)) + 1):
                cov.add((i, j))
    return cov


def covered(cov, mn, mx):
    """부품 바닥면(가운데와 네 귀퉁이 안쪽)이 모두 덮여 있는지"""
    xs = [mn[0] + 0.05, (mn[0] + mx[0]) / 2, mx[0] - 0.05]
    zs = [mn[2] + 0.05, (mn[2] + mx[2]) / 2, mx[2] - 0.05]
    return all((int(np.floor(x / CELL)), int(np.floor(z / CELL))) in cov for x in xs for z in zs)


def horiz(P, T):
    A, B, C = P[T[:, 0]], P[T[:, 1]], P[T[:, 2]]
    N = np.cross(B - A, C - A)
    ar = np.linalg.norm(N, axis=1) + 1e-12
    return np.abs(N[:, 1]) > 0.99 * ar, A[:, 1]


def overlaps(P, T, cid):
    """같은 평면에 겹친 서로 다른 부품 쌍"""
    A, B, C = (P[T[:, k]].astype(np.float64) for k in range(3))
    N = np.cross(B - A, C - A)
    ar = np.linalg.norm(N, axis=1)
    ok = ar > 1e-6
    N[ok] /= ar[ok, None]
    big = np.argmax(np.abs(N), axis=1)
    N *= np.sign(N[np.arange(len(N)), big])[:, None]
    d = (N * A).sum(1)
    bucket = defaultdict(list)
    for i in np.where(ok)[0]:
        bucket[(tuple(np.round(N[i] * 40).astype(int)), int(np.round(d[i] / 0.004)))].append(i)
    pairs = set()
    for (nk, dk), L in bucket.items():
        L2 = L + bucket.get((nk, dk + 1), [])
        if len(L2) < 2 or len(set(cid[L2])) < 2:
            continue
        L2 = np.array(L2)
        ax = big[L2[0]]
        keep = [k for k in range(3) if k != ax]
        V = np.stack([A[L2][:, keep], B[L2][:, keep], C[L2][:, keep]], 1)  # (n,3,2)
        G = V.mean(1)  # 무게중심
        # 무게중심 j가 삼각형 i 안에 있는지 (n×n)
        def side(a, b, p):
            return (b[:, None, 0] - a[:, None, 0]) * (p[None, :, 1] - a[:, None, 1]) - (
                b[:, None, 1] - a[:, None, 1]
            ) * (p[None, :, 0] - a[:, None, 0])

        s1 = side(V[:, 0], V[:, 1], G)
        s2 = side(V[:, 1], V[:, 2], G)
        s3 = side(V[:, 2], V[:, 0], G)
        e = 1e-9
        inside = ~(((s1 < -e) | (s2 < -e) | (s3 < -e)) & ((s1 > e) | (s2 > e) | (s3 > e)))
        ci = cid[L2]
        ii, jj = np.where(inside & (ci[:, None] != ci[None, :]))
        for a, b in zip(ci[ii], ci[jj]):
            pairs.add((min(a, b), max(a, b)))
    return pairs


out_nodes = {}
report = []
for name, m in meshes.items():
    kind, n = name[0], int(name[1:])
    P, C, T = m["P"], m["C"], m["T"]
    if kind not in "FC":
        out_nodes[name] = (P, C, T)
        continue
    z0 = FZ[n]
    cid = components(P, T)
    mn, mx = boxes(P, T, cid)
    size = mx - mn
    drop = np.zeros(cid.max() + 1, bool)
    hz, ty = horiz(P, T)
    big = (size[:, 0] * size[:, 2]) > 4
    if kind == "F":
        cov = coverage(P, T, hz & (np.abs(ty - z0) < 0.01) & big[cid])
        patch = (size[:, 1] < 0.01) & (np.abs(mn[:, 1] - z0) < 0.03) & (np.maximum(size[:, 0], size[:, 2]) < 3)
        lifted = 0
        for k in np.where(patch)[0]:
            if not covered(cov, mn[k], mx[k]):
                drop[k] = True
            else:
                vs = np.unique(T[cid == k])
                P[vs, 1] = z0 + 0.004
                lifted += 1
        report.append(f"{name}: 바닥 무늬 {lifted}개 4mm 올림, 바닥 없는 곳 {int((drop & patch).sum())}개 지움")
    else:
        cov = coverage(P, T, hz & big[cid])
        light = np.maximum(size[:, 0], size[:, 2]) < 2.5
        for k in np.where(light)[0]:
            if not covered(cov, mn[k], mx[k]):
                drop[k] = True
        report.append(f"{name}: 천장 없는 곳의 조명 {int(drop.sum())}개 지움")
    # 같은 평면에 겹친 작은 부품 → 자세히(D) 묶음
    detail = np.zeros_like(drop)
    if kind == "F":
        diag = np.linalg.norm(size, axis=1)
        for a, b in overlaps(P, T, cid):
            if drop[a] or drop[b]:
                continue
            s = a if diag[a] < diag[b] else b
            if diag[s] < 15:
                detail[s] = True
        report.append(f"{name}: 벽·바닥과 겹친 부품 {int(detail.sum())}개 → D{n}")

    def sub(mask):
        tsel = mask[cid]
        TT = T[tsel]
        used = np.unique(TT)
        remap = np.full(len(P), -1, np.int64)
        remap[used] = np.arange(len(used))
        return P[used], C[used], remap[TT].astype(np.uint32)

    out_nodes[name] = sub(~drop & ~detail)
    if detail.any():
        out_nodes[f"D{n}"] = sub(detail)

# ---- 새 GLB 쓰기
blob = bytearray()
views, accs, gl_meshes, nodes = [], [], [], []
color_ct = J["accessors"][J["meshes"][0]["primitives"][0]["attributes"]["COLOR_0"]]["componentType"]


def push(arr, target):
    while len(blob) % 4:
        blob.append(0)
    views.append({"buffer": 0, "byteOffset": len(blob), "byteLength": arr.nbytes, "target": target})
    blob.extend(arr.tobytes())
    return len(views) - 1


for name, (P, C, T) in out_nodes.items():
    if not len(T):
        continue
    iv = push(np.ascontiguousarray(T.ravel()), 34963)
    accs.append({"bufferView": iv, "componentType": 5125, "count": int(T.size), "type": "SCALAR"})
    pv = push(np.ascontiguousarray(P, dtype=np.float32), 34962)
    accs.append({"bufferView": pv, "componentType": 5126, "count": len(P), "type": "VEC3",
                 "min": P.min(0).tolist(), "max": P.max(0).tolist()})
    cv = push(np.ascontiguousarray(C), 34962)
    ca = {"bufferView": cv, "componentType": color_ct, "count": len(C), "type": "VEC4"}
    if color_ct != 5126:
        ca["normalized"] = True
    accs.append(ca)
    k = len(accs)
    gl_meshes.append({"name": name, "primitives": [{"attributes": {"POSITION": k - 2, "COLOR_0": k - 1}, "indices": k - 3, "mode": 4}]})
    nodes.append({"name": name, "mesh": len(gl_meshes) - 1})

while len(blob) % 4:
    blob.append(0)
G = {
    "asset": {"version": "2.0", "generator": "team12 clean-mirae.py", "extras": {"cleaned": True}},
    "scene": 0,
    "scenes": [{"nodes": list(range(len(nodes)))}],
    "nodes": nodes,
    "meshes": gl_meshes,
    "accessors": accs,
    "bufferViews": views,
    "buffers": [{"byteLength": len(blob)}],
}
js = json.dumps(G, separators=(",", ":")).encode()
js += b" " * ((4 - len(js) % 4) % 4)
total = 12 + 8 + len(js) + 8 + len(blob)
outb = struct.pack("<III", 0x46546C67, 2, total) + struct.pack("<II", len(js), 0x4E4F534A) + js
outb += struct.pack("<II", len(blob), 0x004E4942) + bytes(blob)
SRC.write_bytes(outb)
print("\n".join(report))
print("저장:", SRC, len(outb), "bytes")
