// 미래관 실내 데이터 모델: 걸을 수 있는 격자, 목적지 목록·검색, 층을 오가는 경로 탐색.
// 브라우저와 Node 테스트에서 함께 쓰므로 DOM·three에 의존하지 않습니다.
// 좌표는 건물 기준 미터(x 동쪽, y 북쪽, z 위)이며 v6 도면 데이터(M)를 그대로 씁니다.

const K = 3; // 경로 탐색 격자: 원본 0.15m 칸 3개 = 0.45m
const ROOM_COST = 4; // 목적지가 아닌 방 안을 지나갈 때 거리 가중치 (복도 우선)
const STAIR_EXTRA = 4; // 계단 한 번에 더하는 비용(m)
// 계단 없이 모드: 엘리베이터가 닿지 않는 층(B1 등)만 계단을 쓰도록 계단 한 개 층마다 큰 비용
const STAIR_AVOID = 2000;
// 빠른 길에서 계단으로 이만큼 이상 오르내리면 엘리베이터 경로로 바꿈
const ELEV_PREFER_FLOORS = 3;
const ELEV_WAIT = 40; // 엘리베이터 대기·탑승 비용(m 환산, 약 30초)
const ELEV_PER_FLOOR = 3;

const NO_DEST = /^(\dC|\dS|\dW|\dE|\dK)-/;
const CAT_ALIAS = {
  toilet: ["화장실", "toilet", "wc"],
  elev: ["엘리베이터", "승강기", "elevator", "ev"],
  prof: ["교수", "교수실", "교수연구실", "연구실"],
  lab: ["실습실", "lab"],
  office: ["사무실", "학과", "과사"],
  studio: ["스튜디오"],
  server: ["서버"],
  prep: ["준비실"],
  store: ["창고"],
  room: ["강의실", "교실"],
};
const CAT_LABEL = {
  toilet: "화장실",
  elev: "엘리베이터",
  prof: "교수연구실",
  lab: "실습실",
  office: "사무실",
  studio: "스튜디오",
  server: "서버실",
  prep: "준비실",
  store: "창고",
  room: "강의실",
};

export function floorLabel(n) {
  return n === 0 ? "B1" : `${n}F`;
}
export function floorName(n) {
  return n === 0 ? "지하 1층" : `${n}층`;
}

function decodeGrid(b64) {
  if (typeof atob === "function")
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new Uint8Array(Buffer.from(b64, "base64"));
}

/** 도면 걷기 격자 → walk(층, x, y) (AR 워커처럼 경로 탐색 없이 격자만 필요할 때) */
export function makeWalk(M) {
  const grids = {};
  for (const f of M.floors) grids[f.n] = decodeGrid(f.grid);
  return (n, x, y) => {
    const i = Math.floor((x - M.gx0) / M.cell),
      j = Math.floor((M.gy1 - y) / M.cell);
    if (!grids[n] || i < 0 || j < 0 || i >= M.gw || j >= M.gh) return false;
    const k = j * M.gw + i;
    return ((grids[n][k >> 3] >> (7 - (k & 7))) & 1) === 1;
  };
}

export function inPoly(p, x, y) {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if (
      p[i][1] > y !== p[j][1] > y &&
      x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]
    )
      c = !c;
  }
  return c;
}

const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/호$/, "");

export function createIndoor(M) {
  const floors = M.floors.map((f) => f.n);
  const FL = (n) => M.floors.find((f) => f.n === n);
  const walk = makeWalk(M);
  function nearest(n, x, y, R = 18) {
    if (walk(n, x, y)) return [x, y];
    for (let r = M.cell; r < R; r += M.cell)
      for (let a = 0; a < Math.PI * 2; a += Math.max(0.05, M.cell / r)) {
        const px = x + r * Math.cos(a),
          py = y + r * Math.sin(a);
        if (walk(n, px, py)) return [px, py];
      }
    return null;
  }
  function roomAt(n, x, y) {
    const f = FL(n);
    return f ? f.rooms.find((r) => inPoly(r.poly, x, y)) || null : null;
  }

  // ---- 경사로(계단) 길이 미리 계산
  const ramps = M.ramps.map((r) => {
    let T = 0;
    const cum = [0];
    for (let i = 1; i < r.pts.length; i++) {
      T += Math.hypot(
        r.pts[i][0] - r.pts[i - 1][0],
        r.pts[i][1] - r.pts[i - 1][1],
      );
      cum.push(T);
    }
    return { ...r, cum, T };
  });

  // ---- 거친 격자
  const CW = Math.floor(M.gw / K),
    CH = Math.floor(M.gh / K),
    NPF = CW * CH;
  const cxy = (c) => [
    M.gx0 + ((c % CW) * K + K / 2) * M.cell,
    M.gy1 - (Math.floor(c / CW) * K + K / 2) * M.cell,
  ];
  const cwalk = {},
    croom = {},
    cwall = {};
  const WALL_COST = [1, 1.7, 1.2, 1]; // 벽까지 0·1·2·3+칸
  for (const n of floors) {
    const a = new Uint8Array(NPF),
      rm = new Int16Array(NPF).fill(-1);
    const rooms = FL(n).rooms;
    for (let c = 0; c < NPF; c++) {
      const [x, y] = cxy(c);
      a[c] = walk(n, x, y) ? 1 : 0;
      if (a[c])
        for (let r = 0; r < rooms.length; r++)
          if (
            !["stair", "ostair", "elev"].includes(rooms[r].cat) &&
            inPoly(rooms[r].poly, x, y)
          ) {
            rm[c] = r;
            break;
          }
    }
    cwalk[n] = a;
    croom[n] = rm;
    // 벽까지 거리(칸): 복도 가운데로 걷도록 벽 옆 칸에 비용을 더합니다.
    const wd = new Uint8Array(NPF).fill(255);
    const q = [];
    for (let c = 0; c < NPF; c++)
      if (!a[c]) {
        wd[c] = 0;
        q.push(c);
      }
    for (let h = 0; h < q.length; h++) {
      const c = q[h],
        i = c % CW,
        j = (c / CW) | 0;
      if (wd[c] >= 3) continue;
      for (let dj = -1; dj <= 1; dj++)
        for (let di = -1; di <= 1; di++) {
          const ni = i + di,
            nj = j + dj;
          if (ni < 0 || nj < 0 || ni >= CW || nj >= CH) continue;
          const nc = nj * CW + ni;
          if (wd[nc] > wd[c] + 1) {
            wd[nc] = wd[c] + 1;
            q.push(nc);
          }
        }
    }
    cwall[n] = wd;
  }
  function csnap(n, x, y) {
    const i0 = Math.floor((x - M.gx0) / M.cell / K),
      j0 = Math.floor((M.gy1 - y) / M.cell / K),
      a = cwalk[n];
    if (!a) return -1;
    let best = -1,
      bd = 1e9;
    for (let r = 0; r < 40 && best < 0; r++)
      for (let j = j0 - r; j <= j0 + r; j++)
        for (let i = i0 - r; i <= i0 + r; i++) {
          if (i < 0 || j < 0 || i >= CW || j >= CH || !a[j * CW + i]) continue;
          const d = (i - i0) ** 2 + (j - j0) ** 2;
          if (d < bd) {
            bd = d;
            best = j * CW + i;
          }
        }
    return best;
  }

  // ---- 층 사이 연결: 계단(경사로)과 엘리베이터
  const links = [];
  for (const r of ramps) {
    const a = r.pts[0],
      b = r.pts[r.pts.length - 1];
    const ca = csnap(r.lo, a[0], a[1]),
      cb = csnap(r.lo + 1, b[0], b[1]);
    if (ca >= 0 && cb >= 0 && FL(r.lo + 1))
      links.push({
        kind: "stair",
        id: r.id,
        fa: r.lo,
        fb: r.lo + 1,
        ca,
        cb,
        cost: r.T + STAIR_EXTRA,
        ramp: r,
      });
  }
  function cabCenter(f, p) {
    let best = null;
    for (const r of FL(f).rooms)
      if (r.cat === "elev") {
        const d = Math.hypot(r.c[0] - p[0], r.c[1] - p[1]);
        if (!best || d < best[0]) best = [d, r.c];
      }
    return best && best[0] < 5 ? best[1] : p;
  }
  // 같은 위치(3m 이내)의 엘리베이터 문을 층별로 묶어 승강로로 봅니다.
  const elevDoors = [];
  for (const f of M.floors)
    for (const d of f.doors)
      if (d.cat === "elev") elevDoors.push({ f: f.n, p: d.p, id: d.id });
  const shafts = [];
  for (const d of elevDoors) {
    let s = shafts.find(
      (s) =>
        Math.hypot(s.p[0] - d.p[0], s.p[1] - d.p[1]) < 3 &&
        !s.doors.some((e) => e.f === d.f),
    );
    if (!s) shafts.push((s = { p: d.p, doors: [] }));
    s.doors.push(d);
  }
  shafts.forEach((s, si) => {
    s.id = `EV${si + 1}`;
    s.doors.sort((a, b) => a.f - b.f);
    for (let i = 0; i < s.doors.length; i++)
      for (let j = i + 1; j < s.doors.length; j++) {
        const A = s.doors[i],
          B = s.doors[j];
        const ca = csnap(A.f, A.p[0], A.p[1]),
          cb = csnap(B.f, B.p[0], B.p[1]);
        if (ca >= 0 && cb >= 0)
          links.push({
            kind: "elev",
            id: s.id,
            fa: A.f,
            fb: B.f,
            ca,
            cb,
            cost: ELEV_WAIT + ELEV_PER_FLOOR * (B.f - A.f),
            pa: A.p,
            pb: B.p,
            // 엘리베이터 칸 가운데: 탈 때(문→칸)·내릴 때(칸→문) 바라보는 방향 계산용
            qa: cabCenter(A.f, A.p),
            qb: cabCenter(B.f, B.p),
          });
      }
  });

  // ---- 다익스트라 (여러 도착 후보 중 가장 가까운 곳으로)
  const fi = (n) => floors.indexOf(n);
  function route(start, targets, opts = {}) {
    const mode = opts.mode || "stairs"; // "stairs" | "elevator"
    const avoidRoomsExcept = new Set(opts.allowRooms || []);
    const N = NPF * floors.length;
    const s = csnap(start.f, start.x, start.y);
    if (s < 0) return null;
    const S = fi(start.f) * NPF + s;
    const T = new Map();
    for (const t of targets) {
      const c = csnap(t.f, t.x, t.y);
      if (c >= 0) T.set(fi(t.f) * NPF + c, t);
    }
    if (!T.size) return null;
    const D = new Float64Array(N).fill(Infinity),
      prev = new Int32Array(N).fill(-1),
      via = new Int32Array(N).fill(-1);
    D[S] = 0;
    const linkAt = new Map();
    links.forEach((l, k) => {
      const A = fi(l.fa) * NPF + l.ca,
        B = fi(l.fb) * NPF + l.cb;
      (linkAt.get(A) || linkAt.set(A, []).get(A)).push([B, k]);
      (linkAt.get(B) || linkAt.set(B, []).get(B)).push([A, k]);
    });
    const heap = [];
    const push = (d, v) => {
      heap.push([d, v]);
      let i = heap.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heap[p][0] <= heap[i][0]) break;
        [heap[p], heap[i]] = [heap[i], heap[p]];
        i = p;
      }
    };
    const pop = () => {
      const top = heap[0],
        last = heap.pop();
      if (heap.length) {
        heap[0] = last;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1,
            r = l + 1;
          let m = i;
          if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
          if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
          if (m === i) break;
          [heap[m], heap[i]] = [heap[i], heap[m]];
          i = m;
        }
      }
      return top;
    };
    push(0, S);
    const step = K * M.cell;
    let hit = -1;
    while (heap.length) {
      const [d, u] = pop();
      if (d > D[u]) continue;
      if (T.has(u)) {
        hit = u;
        break;
      }
      const fIdx = Math.floor(u / NPF),
        c = u - fIdx * NPF,
        n = floors[fIdx],
        a = cwalk[n],
        rm = croom[n],
        i = c % CW,
        j = Math.floor(c / CW);
      for (let dj = -1; dj <= 1; dj++)
        for (let di = -1; di <= 1; di++) {
          if (!di && !dj) continue;
          const ni = i + di,
            nj = j + dj;
          if (ni < 0 || nj < 0 || ni >= CW || nj >= CH) continue;
          const nc = nj * CW + ni;
          if (!a[nc]) continue;
          if (di && dj && !(a[j * CW + ni] && a[nj * CW + i])) continue;
          const r = rm[nc];
          const pen =
            (r >= 0 && !avoidRoomsExcept.has(FL(n).rooms[r].id)
              ? ROOM_COST
              : 1) * WALL_COST[Math.min(3, cwall[n][nc])];
          const v = fIdx * NPF + nc,
            nd = d + Math.hypot(di, dj) * step * pen;
          if (nd < D[v]) {
            D[v] = nd;
            prev[v] = u;
            via[v] = -1;
            push(nd, v);
          }
        }
      const ls = linkAt.get(u);
      if (ls)
        for (const [v, k] of ls) {
          const nd =
            d +
            links[k].cost +
            (mode === "elevator" && links[k].kind === "stair" ? STAIR_AVOID : 0);
          if (nd < D[v]) {
            D[v] = nd;
            prev[v] = u;
            via[v] = k;
            push(nd, v);
          }
        }
    }
    if (hit < 0) return null;

    // 경로 복원: 층별 걷기 구간 + 층 이동 구간
    const raw = [];
    for (let u = hit; u >= 0; u = prev[u]) raw.push(u);
    raw.reverse();
    const legs = [];
    let cur = null;
    for (let i = 0; i < raw.length; i++) {
      const u = raw[i],
        f = floors[Math.floor(u / NPF)],
        [x, y] = cxy(u % NPF);
      if (via[u] >= 0) {
        const l = links[via[u]],
          up = f > floors[Math.floor(raw[i - 1] / NPF)];
        legs.push({
          kind: l.kind,
          id: l.id,
          from: up ? l.fa : l.fb,
          to: f,
          link: l,
          up,
        });
        cur = null;
      }
      if (!cur) {
        cur = { kind: "walk", f, pts: [] };
        legs.push(cur);
      }
      cur.pts.push([x, y]);
    }
    // 시작·끝을 실제 좌표로 맞추고 선을 다듬습니다.
    const target = T.get(hit);
    const walks = legs.filter((l) => l.kind === "walk");
    walks[0].pts[0] = [start.x, start.y];
    const lastW = walks[walks.length - 1];
    lastW.pts.push([target.x, target.y]);
    for (const w of walks) w.pts = smooth(w.f, w.pts);

    // 3D 점 목록(렌더링·진행률 계산용)
    const pts = [];
    for (const leg of legs) {
      leg.i0 = pts.length; // 이 구간이 pts에서 시작하는 위치
      if (leg.kind === "walk") {
        const z = FL(leg.f).z;
        for (const [x, y] of leg.pts)
          pts.push({ x, y, z, f: leg.f, kind: "walk" });
      } else if (leg.kind === "stair") {
        const r = leg.link.ramp,
          z0 = FL(r.lo).z;
        const seq = leg.up ? r.pts : [...r.pts].reverse();
        for (const q of seq)
          pts.push({
            x: q[0],
            y: q[1],
            z: z0 + q[2] * M.FH,
            f: r.lo + (q[2] > 0.5 ? 1 : 0),
            kind: "stair",
          });
      } else {
        const l = leg.link,
          p0 = leg.up ? l.pa : l.pb,
          p1 = leg.up ? l.pb : l.pa;
        pts.push({
          x: p0[0],
          y: p0[1],
          z: FL(leg.from).z,
          f: leg.from,
          kind: "elev",
        });
        pts.push({
          x: p1[0],
          y: p1[1],
          z: FL(leg.to).z,
          f: leg.to,
          kind: "elev",
        });
      }
      leg.i1 = pts.length - 1;
    }
    let len = 0;
    for (let i = 1; i < pts.length; i++)
      if (!(pts[i].kind === "elev" && pts[i - 1].kind === "elev"))
        len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    const vertical = legs.filter((l) => l.kind !== "walk");
    // 계단으로 오르내린 층 수(계단 없이 모드에서 피할 수 없었던 구간 안내용)
    const stairFloors = vertical
      .filter((l) => l.kind === "stair")
      .reduce((n, l) => n + Math.abs(l.to - l.from), 0);
    return { pts, legs, len, cost: D[hit], target, vertical, mode, stairFloors };
  }

  // 같은 층 걷기 구간: 시야가 트인 점만 남기는 줄당기기
  // 선분 좌우로 0.25m 여유가 있어야 '트였다'고 봅니다(모서리를 스치지 않게).
  function clear(n, a, b) {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (L < 1e-6) return true;
    const steps = Math.ceil(L / 0.1),
      nx = (-(b[1] - a[1]) / L) * 0.25,
      ny = ((b[0] - a[0]) / L) * 0.25;
    for (let s = 1; s < steps; s++) {
      const t = s / steps,
        x = a[0] + (b[0] - a[0]) * t,
        y = a[1] + (b[1] - a[1]) * t;
      if (
        !walk(n, x, y) ||
        !walk(n, x + nx, y + ny) ||
        !walk(n, x - nx, y - ny)
      )
        return false;
    }
    return true;
  }
  function smooth(n, pts) {
    if (pts.length < 3) return pts;
    const out = [pts[0]];
    let i = 0;
    while (i < pts.length - 1) {
      let j = pts.length - 1;
      // 멀리 있는 점부터 시도 (긴 직선 우선)
      while (j > i + 1 && !clear(n, pts[i], pts[j])) j--;
      out.push(pts[j]);
      i = j;
    }
    return rdp(n, out, 0.35);
  }
  // 남은 계단 모양 꺾임 정리 (Ramer–Douglas–Peucker, 벽을 넘지 않을 때만)
  function rdp(n, pts, eps) {
    if (pts.length < 3) return pts;
    const a = pts[0],
      b = pts[pts.length - 1];
    let best = -1,
      bd = 0;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1e-9;
    for (let i = 1; i < pts.length - 1; i++) {
      const d =
        Math.abs(
          (b[0] - a[0]) * (a[1] - pts[i][1]) -
            (a[0] - pts[i][0]) * (b[1] - a[1]),
        ) / L;
      if (d > bd) {
        bd = d;
        best = i;
      }
    }
    if (bd <= eps && clear(n, a, b)) return [a, b];
    if (best < 0) return pts;
    const l = rdp(n, pts.slice(0, best + 1), eps),
      r = rdp(n, pts.slice(best), eps);
    return [...l.slice(0, -1), ...r];
  }

  // ---- 목적지 목록
  const names = M.names || {};
  const dest = new Map();
  for (const f of M.floors) {
    const add = (id, name, cat, p, isDoor) => {
      if (cat === "stair" || cat === "ostair" || NO_DEST.test(id)) return;
      const key = `${f.n}:${id}`;
      let d = dest.get(key);
      if (!d) {
        const numbered = /^[0-9B]/.test(id);
        // 호실 번호 첫 글자가 층(B는 지하 1층 = 0)과 맞을 때만 이름을 붙임
        const idFloor = id[0] === "B" ? 0 : +id[0];
        const extra = names[id] && f.n === idFloor ? names[id] : "";
        const nm = extra || (name !== id && name !== "실" ? name : "");
        d = {
          key,
          id,
          f: f.n,
          cat,
          numbered,
          title: numbered ? `${id}호` : name,
          name: numbered ? nm : "",
          catLabel: CAT_LABEL[cat] || "",
          doors: [],
          center: null,
        };
        d.search = [id, d.title, nm, ...(CAT_ALIAS[cat] || [])]
          .map(norm)
          .join("|");
        dest.set(key, d);
      }
      if (isDoor) d.doors.push(p);
      else d.center = p;
    };
    for (const d of f.doors) add(d.id, d.name, d.cat, d.p, true);
    for (const r of f.rooms) add(r.id, r.name, r.cat, r.c, false);
  }
  // 같은 층 화장실·엘리베이터가 여러 곳이면 위치로 구분합니다.
  const destinations = [...dest.values()].map((d) => ({
    ...d,
    doors: d.doors.length ? d.doors : [d.center],
  }));
  for (const d of destinations) {
    if (d.numbered) continue;
    const same = destinations.filter((e) => e.f === d.f && e.title === d.title);
    if (same.length > 1) {
      const p = d.doors[0];
      d.name = p[0] < 0 ? "서쪽" : "동쪽";
    }
  }
  destinations.sort(
    (a, b) =>
      a.f - b.f ||
      Number(b.numbered) - Number(a.numbered) ||
      a.id.localeCompare(b.id, "ko", { numeric: true }),
  );

  function search(q, limit = 30) {
    const s = norm(q);
    if (!s) return [];
    const scored = [];
    for (const d of destinations) {
      const id = norm(d.id);
      let sc = 0;
      if (id === s) sc = 100;
      else if (id.startsWith(s)) sc = 80 - (id.length - s.length);
      else if (norm(d.title) === s) sc = 70;
      else if (norm(d.name).includes(s)) sc = 60;
      else if (d.search.includes(s)) sc = 40;
      if (sc) scored.push([sc, d]);
    }
    scored.sort((a, b) => b[0] - a[0] || a[1].f - b[1].f);
    return scored.slice(0, limit).map((x) => x[1]);
  }
  const findDest = (key) =>
    destinations.find((d) => d.key === key) ||
    destinations.find((d) => norm(d.id) === norm(key)) ||
    null;

  // 문 앞 도착점: 문이 놓인 벽에서 방 바깥(복도) 쪽으로 STANDOFF m.
  // 방 안이나 문틀 가운데가 아니라 문을 마주 보는 자리에서 멈춥니다.
  const STANDOFF = 0.7;
  function doorFront(f, p, rid) {
    const polys = FL(f).rooms.filter((r) => r.id === rid).map((r) => r.poly);
    if (!polys.length) return null;
    // 문에서 가장 가까운 벽(외곽선 선분)
    let best = null;
    for (const poly of polys)
      for (let i = 1; i < poly.length; i++) {
        const a = poly[i - 1],
          b = poly[i],
          ex = b[0] - a[0],
          ey = b[1] - a[1],
          L2 = ex * ex + ey * ey;
        if (L2 < 1e-6) continue;
        const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * ex + (p[1] - a[1]) * ey) / L2));
        const d = Math.hypot(a[0] + t * ex - p[0], a[1] + t * ey - p[1]);
        if (!best || d < best[0]) {
          const L = Math.sqrt(L2);
          best = [d, -ey / L, ex / L];
        }
      }
    if (!best || best[0] > 1) return null;
    const inside = (x, y) => polys.some((poly) => inPoly(poly, x, y));
    for (const sgn of [1, -1]) {
      const nx = best[1] * sgn,
        ny = best[2] * sgn;
      if (inside(p[0] + nx * 0.3, p[1] + ny * 0.3)) continue; // 방 안쪽 방향
      for (const r of [STANDOFF, 0.55, 0.9, 1.1, 0.4]) {
        const x = p[0] + nx * r,
          y = p[1] + ny * r;
        if (walk(f, x, y) && !inside(x, y)) return [x, y];
      }
    }
    return null;
  }

  // 목적지까지 경로: 문이 여러 개면 가장 가까운 문으로
  function routeTo(start, d, opts = {}) {
    const targets = d.doors
      .map((p) => {
        const s = doorFront(d.f, p, d.id) || nearest(d.f, p[0], p[1], 6) || p;
        return { f: d.f, x: s[0], y: s[1], door: p };
      })
      .filter(Boolean);
    const o = { ...opts, allowRooms: [d.id] };
    const r = route(start, targets, o);
    // 빠른 길이라도 계단으로 3개 층 이상 오르내리면 엘리베이터 경로를 우선합니다.
    if (r && (opts.mode || "stairs") === "stairs" && r.stairFloors >= ELEV_PREFER_FLOORS) {
      const e = route(start, targets, { ...o, mode: "elevator" });
      if (e && e.stairFloors < r.stairFloors)
        return { ...e, mode: "stairs", preferElev: true };
    }
    return r;
  }

  return {
    M,
    floors,
    FL,
    walk,
    nearest,
    roomAt,
    ramps,
    shafts,
    links,
    route,
    routeTo,
    destinations,
    search,
    findDest,
  };
}
