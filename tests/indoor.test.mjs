import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createIndoor } from "../src/indoor/model.mjs";
import {
  buildSteps,
  routeMetrics,
  progressOn,
  pointAt,
  nextStep,
} from "../src/indoor/guide.mjs";
import { createAlign } from "../src/indoor/align.mjs";
import * as L from "../src/indoor/ar/localize.mjs";
import { NODES } from "../src/data.mjs";

const M = JSON.parse(readFileSync("data/mirae/mirae.json", "utf8"));
const E = JSON.parse(readFileSync("data/mirae/entrances.json", "utf8"));
const SV = JSON.parse(readFileSync("data/mirae/sv.json", "utf8"));
const INDEX = new Uint8Array(readFileSync("data/mirae/ar-index.bin"));
const I = createIndoor(M);
const lobby = E.entrances.find((e) => e.id === "lobby");
const start = { f: lobby.f, x: lobby.p[0], y: lobby.p[1] };

test("search finds rooms by number, name, professor and category", () => {
  assert.deepEqual(
    I.search("313").map((d) => d.id),
    ["313"],
  );
  assert.equal(I.search("313호")[0].id, "313");
  assert.equal(I.search("김민호")[0].id, "223");
  assert.ok(I.search("네트워크").some((d) => d.id === "320"));
  assert.ok(I.search("화장실").length >= 8);
  assert.equal(I.search("없는방이름").length, 0);
});

test("restroom search puts the displayed floor first before applying the result limit", () => {
  for (const floor of [1, 2, 3]) {
    const results = I.search("화장실", 40, { floor, origin: start });
    assert.equal(results.filter((d) => d.f === floor).length, 4);
    assert.ok(results.slice(0, 4).every((d) => d.f === floor));
    assert.equal(I.search("화장실", 1, { floor, origin: start })[0].f, floor);
  }
  assert.equal(I.search("화장실", 1, { floor: 0, origin: start })[0].f, 1);
});

test("nearby restrooms change when the indoor origin moves between building wings", () => {
  const east = { f: 1, x: 13.8, y: 22.1 };
  const west = { f: 1, x: -41.3, y: 2 };
  const fromEast = I.search("화장실", 4, { floor: 1, origin: east });
  const fromWest = I.search("화장실", 4, { floor: 1, origin: west });
  assert.ok(
    fromEast.slice(0, 2).every((d) => ["WC-1a", "WC-1b"].includes(d.id)),
  );
  assert.ok(
    fromWest.slice(0, 2).every((d) => ["WC-1c", "WC-1d"].includes(d.id)),
  );
  // Revisit the first origin to verify the distance cache follows the user.
  assert.equal(
    I.search("화장실", 1, { floor: 1, origin: east })[0].key,
    fromEast[0].key,
  );
});

test("mistyped restroom searches retain nearby same-floor suggestions", () => {
  for (const query of ["화장싷", "화장시", "restrom"]) {
    const suggestions = I.suggest(query, 2, { floor: 3, origin: start });
    assert.equal(suggestions.length, 2, query);
    assert.ok(
      suggestions.every((d) => d.cat === "toilet" && d.f === 3),
      query,
    );
  }
  assert.deepEqual(I.suggest("zzzzzzzz", 40, { floor: 1, origin: start }), []);
});

test("indoor search normalizes full-width input and keeps restroom gender aliases separate", () => {
  assert.equal(I.search("３１３호")[0]?.id, "313");
  const female = I.search("화장실 여자", 40, { floor: 2, origin: start });
  assert.equal(female.length, 6);
  assert.ok(female.every((d) => /여/.test(d.title)));
  assert.equal(female[0].f, 2);
  const male = I.search("남자화장실", 40, { floor: 1, origin: start });
  assert.equal(male.length, 6);
  assert.ok(male.every((d) => /남/.test(d.title)));
});

test("entrances sit on walkable floor cells", () => {
  for (const e of E.entrances) assert.ok(I.walk(e.f, e.p[0], e.p[1]), e.id);
});

test("lobby entrance matches the campus futureDoor node through the plan alignment", () => {
  const A = createAlign(E.campusTransform);
  const c = A.toCampus(lobby.p[0], lobby.p[1]);
  const door = NODES.futureDoor;
  assert.ok(Math.hypot(c.x - door.x, c.z - door.z) < 1.5);
  const back = A.toIndoor(c.x, c.z);
  assert.ok(Math.hypot(back.x - lobby.p[0], back.y - lobby.p[1]) < 1e-9);
});

test("multi-floor route from the lobby reaches 313 with stairs", () => {
  const d = I.findDest("3:313");
  const r = I.routeTo(start, d, { mode: "stairs" });
  assert.ok(r);
  assert.equal(r.pts.at(-1).f, 3);
  assert.ok(r.vertical.every((l) => l.kind === "stair"));
  assert.ok(r.len > 20 && r.len < 120, `len ${r.len}`);
  // 경로 끝은 313호 문 앞
  const door = d.doors[0];
  assert.ok(
    Math.hypot(r.pts.at(-1).x - door[0], r.pts.at(-1).y - door[1]) < 1.5,
  );
  // 같은 계단을 층참만 지나 오르면 한 단계로 안내
  const steps = buildSteps(r, d);
  const vertical = steps.filter((s) => s.dir.startsWith("stair"));
  assert.equal(vertical.length, 1);
  assert.equal(vertical[0].to, 3);
  assert.match(steps.at(-1).text, /313호 도착/);
});

test("step-free mode uses only elevators where they reach", () => {
  const r = I.routeTo(start, I.findDest("3:313"), { mode: "elevator" });
  assert.ok(r);
  assert.ok(
    r.vertical.length > 0 && r.vertical.every((l) => l.kind === "elev"),
  );
  assert.equal(r.stairFloors, 0);
});

test("step-free mode falls back to the fewest stairs (313 → B104)", () => {
  const d313 = I.findDest("3:313");
  const from = { f: 3, x: d313.doors[0][0], y: d313.doors[0][1] };
  const r = I.routeTo(from, I.findDest("0:B104"), { mode: "elevator" });
  assert.ok(r, "route exists");
  // 엘리베이터로 1층까지, B1은 엘리베이터가 없으므로 계단 한 개 층만
  assert.equal(r.stairFloors, 1);
  const kinds = r.vertical.map((l) => `${l.kind}${l.from}>${l.to}`);
  assert.deepEqual(kinds, ["elev3>1", "stair1>0"]);
  // 빠른 길도 계단 3개 층 이상이면 엘리베이터 우선 → 같은 경로
  const fast = I.routeTo(from, I.findDest("0:B104"), { mode: "stairs" });
  assert.ok(fast.preferElev);
  assert.equal(fast.stairFloors, 1);
  // 모든 목적지에 계단 없이 경로가 나오고, 계단은 꼭 필요한 B1 구간만
  for (const d of I.destinations) {
    const x = I.routeTo(from, d, { mode: "elevator" });
    assert.ok(x, d.key);
    assert.ok(x.stairFloors <= (d.f === 0 ? 1 : 0), d.key);
  }
});

test("route does not cut through other rooms when a corridor exists", () => {
  const r = I.routeTo(start, I.findDest("1:125"), { mode: "stairs" });
  for (const p of r.pts) {
    const room = I.roomAt(p.f, p.x, p.y);
    assert.ok(
      !room ||
        room.id === "125" ||
        ["stair", "ostair", "elev"].includes(room.cat),
      `crosses ${room && room.id}`,
    );
  }
});

test("progress and next step follow position along the route", () => {
  const d = I.findDest("1:108");
  const r = I.routeTo(start, d);
  const cum = routeMetrics(r),
    steps = buildSteps(r, d);
  const mid = r.pts[Math.floor(r.pts.length / 2)];
  const pr = progressOn(r, cum, { f: mid.f, x: mid.x + 0.3, y: mid.y });
  assert.ok(pr.off < 0.5);
  assert.ok(pr.remain > 0 && pr.remain < cum.at(-1));
  const nx = nextStep(steps, r, cum, pr.s);
  assert.ok(nx.index > 0 && nx.dist >= 0);
});

test("AR index matches its own photo at the right heading", () => {
  const n = SV.shots.length;
  assert.equal(INDEX.length, n * L.EL_N * L.AZ_N);
  // 사진 하나의 띠에서 질의 창을 잘라 넣으면 같은 사진·같은 방향이 1위여야 합니다.
  for (const k of [10, 400, 900]) {
    const o = 9;
    const q = new Float32Array(L.EL_N * L.Q_N);
    for (let r = 0; r < L.EL_N; r++)
      for (let c = 0; c < L.Q_N; c++) {
        const v = INDEX[k * L.EL_N * L.AZ_N + r * L.AZ_N + o + c];
        q[r * L.Q_N + c] = v === 255 ? NaN : v;
      }
    const res = L.matchAll(INDEX, SV.shots, q);
    const s = SV.shots[res[0].k];
    assert.ok(
      Math.hypot(s.x - SV.shots[k].x, s.y - SV.shots[k].y) < 1 &&
        s.f === SV.shots[k].f,
    );
    assert.ok(res[0].ncc > 0.99);
    const want = L.offsetToYaw(SV.shots[k].yaw, o);
    assert.ok(Math.abs(((res[0].yaw - want + 540) % 360) - 180) < 3);
  }
});

test("offset and yaw conversions are inverse", () => {
  for (const yaw of [-170, -30, 0, 45, 179])
    for (const o of [0, 7.5, 14, 28])
      assert.ok(Math.abs(L.yawToOffset(yaw, L.offsetToYaw(yaw, o)) - o) < 1e-9);
});

// ---- 안내 문구가 실제 경로와 맞는지 (v2)
const cases = [
  ["3:313", "stairs"],
  ["2:228", "stairs"],
  ["1:125", "stairs"],
  ["3:330", "elevator"],
  ["2:216", "elevator"],
  ["0:B104", "stairs"],
];
const turnAt = (r, cum, s) => {
  const p = (v) => pointAt(r, cum, Math.max(0, Math.min(cum.at(-1), v)));
  const a = p(s - 3),
    b = p(s),
    c = p(s + 3);
  let d =
    (Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(b.y - a.y, b.x - a.x)) *
    (180 / Math.PI);
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
};

test("guidance steps follow the route order and skip trivial 1m steps", () => {
  for (const [key, mode] of cases) {
    const d = I.findDest(key);
    const r = I.routeTo(start, d, { mode });
    const steps = buildSteps(r, d, { landmarks: I.destinations });
    for (let i = 1; i < steps.length; i++)
      assert.ok(steps[i].s >= steps[i - 1].s - 1e-6, `${key} order`);
    for (const st of steps.slice(1, -1))
      if (st.kind === "walk")
        assert.ok(
          st.dist >= 2.4,
          `${key}: "${st.text}" ${st.dist.toFixed(1)}m`,
        );
    assert.equal(steps.at(-1).kind, "arrive");
  }
});

test("announced turn direction matches the path geometry", () => {
  for (const [key, mode] of cases) {
    const d = I.findDest(key);
    const r = I.routeTo(start, d, { mode });
    const cum = routeMetrics(r);
    const steps = buildSteps(r, d, { landmarks: I.destinations });
    for (const st of steps) {
      if (st.kind !== "walk" || st.exit) continue;
      const g = turnAt(r, cum, st.s);
      if (st.dir.includes("left"))
        assert.ok(g > 20, `${key}: "${st.text}" but geometry ${g.toFixed(0)}°`);
      if (st.dir.includes("right"))
        assert.ok(
          g < -20,
          `${key}: "${st.text}" but geometry ${g.toFixed(0)}°`,
        );
    }
  }
});

test("lobby to 228 announces the turns the old guidance dropped", () => {
  const d = I.findDest("2:228");
  const steps = buildSteps(I.routeTo(start, d), d, {
    landmarks: I.destinations,
  });
  const walkTurns = steps.filter(
    (s) => s.kind === "walk" && s.dir !== "straight",
  );
  assert.ok(walkTurns.length >= 2, steps.map((s) => s.text).join(" | "));
  assert.ok(steps.some((s) => s.exit === "stair"));
});

test("elevator ride has floor info and an exit direction", () => {
  const d = I.findDest("3:330");
  const r = I.routeTo(start, d, { mode: "elevator" });
  const steps = buildSteps(r, d, { landmarks: I.destinations });
  const ev = steps.find((s) => s.kind === "elev");
  assert.equal(ev.to, 3);
  assert.match(ev.text, /엘리베이터를 타고 3층으로/);
  const exit = steps.find((s) => s.exit === "elev");
  assert.ok(exit);
  assert.match(exit.text, /엘리베이터에서 내려/);
});

test("route stops in front of the destination door, outside the room", () => {
  const inPoly = (P, x, y) => {
    let c = false;
    for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
      const [xi, yi] = P[i],
        [xj, yj] = P[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
        c = !c;
    }
    return c;
  };
  for (const d of I.destinations) {
    const r = I.routeTo(start, d);
    assert.ok(r, d.key);
    const e = r.pts.at(-1),
      door = r.target.door;
    const gap = Math.hypot(e.x - door[0], e.y - door[1]);
    assert.ok(gap > 0.3 && gap < 1.3, `${d.key} gap ${gap}`);
    const room = M.floors
      .find((f) => f.n === d.f)
      .rooms.filter((rm) => rm.id === d.id);
    assert.ok(!room.some((rm) => inPoly(rm.poly, e.x, e.y)), `${d.key} inside`);
  }
});

test("fast route keeps stairs for 1–2 floors, prefers elevator for 3+", () => {
  for (const d of I.destinations) {
    for (const f of [0, 1, 2, 3]) {
      const src = I.destinations.find((x) => x.f === f && x.numbered);
      if (!src) continue;
      const from = { f, x: src.doors[0][0], y: src.doors[0][1] };
      const r = I.routeTo(from, d, { mode: "stairs" });
      assert.ok(r, `${src.key}→${d.key}`);
      assert.ok(
        r.stairFloors < 3,
        `${src.key}→${d.key} stairs ${r.stairFloors}`,
      );
    }
  }
  // 1개 층은 계단 그대로
  const r = I.routeTo(start, I.findDest("2:216"), { mode: "stairs" });
  assert.ok(!r.preferElev && r.stairFloors === 1);
});

// ---- AR 입자 필터: 촬영 사진 띠로 만든 질의로 한 층을 걸어가며 추적
import { Localizer, portalsFrom } from "../src/indoor/ar/pf.mjs";
function stripQuery(k, shift = 0) {
  // 사진 k의 가운데(정면) 18칸을 질의로 (shift: 칸 단위 좌우 이동)
  const q = new Float32Array(L.EL_N * L.Q_N);
  const base = k * L.EL_N * L.AZ_N,
    o0 = (L.AZ_N - L.Q_N) / 2 + shift;
  for (let r = 0; r < L.EL_N; r++)
    for (let c = 0; c < L.Q_N; c++) {
      const v = INDEX[base + r * L.AZ_N + o0 + c];
      q[r * L.Q_N + c] = v === 255 ? NaN : v;
    }
  return q;
}
function walkShots(f, n) {
  // 영상 순서(id)대로 같은 층에서 이어진 사진들
  const list = SV.shots
    .map((s, k) => ({ ...s, k }))
    .filter((s) => s.f === f)
    .sort((a, b) => a.id - b.id);
  for (let i = 0; i + n < list.length; i++) {
    const seq = list.slice(i, i + n);
    let ok = true;
    for (let j = 1; j < seq.length; j++)
      if (Math.hypot(seq[j].x - seq[j - 1].x, seq[j].y - seq[j - 1].y) > 2.5)
        ok = false;
    const span = Math.hypot(seq.at(-1).x - seq[0].x, seq.at(-1).y - seq[0].y);
    if (ok && span > 8) return seq;
  }
  return null;
}

test("AR particle filter tracks a walk on the expected floor with sensor offset", () => {
  const seq = walkShots(1, 30);
  assert.ok(seq, "found a walk");
  const pf = new Localizer({
    index: INDEX,
    shots: SV.shots,
    walk: I.walk,
    portals: portalsFrom(I.links),
    seed: 5,
  });
  const OFF = 33; // 센서와 건물 방위 차이(필터는 모름)
  let est = null;
  const errs = [];
  seq.forEach((s, j) => {
    if (j) {
      const p = seq[j - 1],
        d = Math.hypot(s.x - p.x, s.y - p.y);
      const n = Math.max(1, Math.round(d / 0.65));
      const h = (Math.atan2(s.y - p.y, s.x - p.x) * 180) / Math.PI;
      // 걸음 방향은 실제 이동 방향(센서 기준)
      for (let i = 0; i < n; i++) pf.step(d / n, h - OFF);
    }
    // 바로 그 사진은 빼고(자기 자신과 비교 금지) 질의
    est = pf.measure(stripQuery(s.k), s.yaw - OFF, 1, {
      exclude: new Set([s.k]),
    });
    if (j >= 5 && est.ok) errs.push(Math.hypot(est.x - s.x, est.y - s.y));
    if (j >= 5 && est.ok) assert.equal(est.f, 1, "stays on the route floor");
  });
  assert.ok(errs.length >= 15, `tracked most of the walk (${errs.length})`);
  errs.sort((a, b) => a - b);
  assert.ok(
    errs[errs.length >> 1] < 2,
    `median error ${errs[errs.length >> 1]}`,
  );
  // 센서 기준 차이(건물 − 센서)를 알아냄
  const dOff = Math.abs(((((est.off - OFF) % 360) + 540) % 360) - 180);
  assert.ok(dOff < 15, `heading offset error ${dOff}`);
});

test("AR particle filter accepts an external fix and floor override", () => {
  const pf = new Localizer({
    index: INDEX,
    shots: SV.shots,
    walk: I.walk,
    portals: portalsFrom(I.links),
    seed: 9,
  });
  const e = pf.fix({ f: 2, x: 5, y: 10, yaw: 90, conf: 1 }, 0);
  assert.equal(e.f, 2);
  assert.ok(Math.hypot(e.x - 5, e.y - 10) < 1);
  pf.setFloor(3);
  assert.equal(pf.ready, false, "re-searches after manual floor");
});

// ---- AR 보정: 화각 자동 보정, 방향 기준 필터
import {
  FovCalib,
  OffsetFilter,
  columnProfile,
  relTurn,
  manhattanAxis,
} from "../src/indoor/ar/calib.mjs";
function levelR(hDeg, pDeg = 0) {
  const h = (hDeg * Math.PI) / 180,
    p = (pDeg * Math.PI) / 180;
  const f = [Math.cos(p) * Math.cos(h), Math.cos(p) * Math.sin(h), Math.sin(p)];
  const r = [Math.sin(h), -Math.cos(h), 0];
  const d = [
    Math.sin(p) * Math.cos(h),
    Math.sin(p) * Math.sin(h),
    -Math.cos(p),
  ];
  return [r[0], d[0], f[0], r[1], d[1], f[1], r[2], d[2], f[2]];
}
test("relTurn: turning right is positive yaw", () => {
  const t = relTurn(levelR(90), levelR(80));
  assert.ok(
    Math.abs(t.yaw - 10) < 0.01 && Math.abs(t.pitch) < 0.01,
    JSON.stringify(t),
  );
});
test("FOV calibration recovers the camera field of view from panning", () => {
  for (const trueFov of [58, 66, 75]) {
    const w = 165,
      h = 220,
      long = 220; // 세로 화면: 긴 변은 세로
    const f = long / 2 / Math.tan(((trueFov / 2) * Math.PI) / 180);
    // 세계 방위에 따라 밝기가 바뀌는 무늬 (불규칙)
    const tex = (deg) =>
      128 +
      60 * Math.sin(deg * 0.21) +
      40 * Math.sin(deg * 0.57 + 1) +
      25 * Math.sin(deg * 1.33 + 2);
    const cal = new FovCalib(long);
    let H = 120;
    for (let k = 0; k < 14; k++) {
      const g = new Float32Array(w * h);
      for (let x = 0; x < w; x++) {
        const a = (Math.atan((x - w / 2) / f) * 180) / Math.PI;
        const v = tex(H - a);
        for (let y = 0; y < h; y++) g[y * w + x] = v;
      }
      cal.add(columnProfile(g, w, h), levelR(H), k * 0.2);
      H -= 6 + (k % 3); // 오른쪽으로 돌림
    }
    assert.ok(cal.fov != null, "estimated");
    assert.ok(Math.abs(cal.fov - trueFov) < 3, `fov ${cal.fov} vs ${trueFov}`);
  }
});
test("offset filter ignores outliers and follows the consensus", () => {
  const F = new OffsetFilter();
  for (const v of [30, 32, 29, 31, 30, 33, 28, 31]) F.add(v);
  F.add(95); // 틀린 사진 매칭
  F.add(-40);
  assert.ok(Math.abs(F.value - 30.5) < 2, `value ${F.value}`);
  // ±180 경계
  const G = new OffsetFilter();
  for (const v of [178, -179, 179, -178, 177]) G.add(v);
  assert.ok(
    Math.abs(((((G.value - 179) % 360) + 540) % 360) - 180) < 3,
    `wrap ${G.value}`,
  );
});

// 복도(폭 3m, 높이 2.75m)를 광선으로 그린 합성 화면: 바닥 타일·걸레받이·천장 줄
function corridorShot(alpha, yaw, pitch, w = 220, h = 165, fov = 66) {
  const D = Math.PI / 180;
  const f = w / 2 / Math.tan((fov / 2) * D);
  const h0 = yaw * D,
    p0 = pitch * D;
  const fw = [
    Math.cos(p0) * Math.cos(h0),
    Math.cos(p0) * Math.sin(h0),
    Math.sin(p0),
  ];
  const rt = [Math.sin(h0), -Math.cos(h0), 0];
  const dn = [
    Math.sin(p0) * Math.cos(h0),
    Math.sin(p0) * Math.sin(h0),
    -Math.cos(p0),
  ];
  const R = [rt[0], dn[0], fw[0], rt[1], dn[1], fw[1], rt[2], dn[2], fw[2]];
  const ca = Math.cos(alpha * D),
    sa = Math.sin(alpha * D);
  const g = new Float32Array(w * h);
  const shade = (x, y) => {
    const c = [(x - w / 2) / f, (y - h / 2) / f, 1];
    const d = [0, 1, 2].map(
      (i) => R[i * 3] * c[0] + R[i * 3 + 1] * c[1] + R[i * 3 + 2] * c[2],
    );
    // 복도 좌표(u: 복도 방향, v: 가로)
    const du = d[0] * ca + d[1] * sa,
      dv = -d[0] * sa + d[1] * ca,
      dz = d[2];
    let t = Infinity,
      kind = 0;
    if (dz < 0) {
      t = 1.35 / -dz;
      kind = 1;
    }
    if (dz > 0) {
      t = 1.4 / dz;
      kind = 2;
    }
    if (dv !== 0) {
      const tw = 1.5 / Math.abs(dv);
      if (tw < t) {
        t = tw;
        kind = 3;
      }
    }
    const u = du * t,
      v = dv * t,
      z = dz * t;
    let val;
    if (kind === 1)
      val = ((u % 1) + 1) % 1 < 0.06 || ((v % 1) + 1) % 1 < 0.06 ? 200 : 90;
    else if (kind === 2) val = ((u % 2) + 2) % 2 < 0.1 ? 250 : 200;
    else val = z < -1.2 ? 40 : z > 0.6 && z < 0.7 ? 90 : 160;
    return val;
  };
  // 3×3 표본 평균(계단 현상 없이)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let a = -1; a <= 1; a++)
        for (let b = -1; b <= 1; b++) sum += shade(x + b / 3, y + a / 3);
      g[y * w + x] = sum / 9;
    }
  return { g, w, h, K: { fx: f, fy: f, cx: w / 2, cy: h / 2 }, R };
}

test("소실점 나침반: 복도 벽 방향을 1° 안으로 찾음(카메라 방향·기울기 무관)", () => {
  for (const [alpha, yaw, pitch] of [
    [0, 20, -10],
    [9.75, -20, -5],
    [30, 200, -15],
    [72, 75, 0],
  ]) {
    const s = corridorShot(alpha, yaw, pitch);
    const r = manhattanAxis(s.g, s.w, s.h, s.K, s.R);
    assert.ok(r, `결과 없음 ${alpha}`);
    const e = Math.abs(((((r.axis - alpha) % 90) + 135) % 90) - 45);
    assert.ok(e < 1, `복도 ${alpha}° → ${r.axis.toFixed(2)}°`);
    assert.ok(r.ratio > 2, `봉우리 선명도 ${r.ratio}`);
  }
});

test("입자 필터: 소실점 방향 기준을 받으면 방향이 그쪽으로 모임", () => {
  const loc = new Localizer({
    index: INDEX,
    shots: SV.shots,
    walk: I.walk,
    portals: portalsFrom(I.links),
    seed: 3,
  });
  loc.fix({ f: 1, x: 0, y: 9, yaw: 90, conf: 0.9 }, 60);
  for (let k = 0; k < 4; k++) loc.heading(40, 5);
  const e = loc.estimate(60);
  assert.ok(Math.abs(e.off - 40) < 4, `off ${e.off}`);
});

test("every indoor start entrance (front, back, side, west, B1) routes to rooms on all floors", () => {
  const names = E.entrances.map((e) => e.name);
  for (const n of [
    "1층 로비 정문",
    "1층 로비 후문",
    "1층 측면 입구 (106호 쪽)",
    "1층 서쪽 입구 (103호 쪽)",
    "지하 1층 출입구",
  ])
    assert.ok(names.includes(n), `entrance ${n}`);
  for (const e of E.entrances) {
    assert.ok(I.walk(e.f, e.p[0], e.p[1]), `${e.name} is on the walk grid`);
    for (const id of ["108", "212", "308"]) {
      const d = I.findDest(id);
      const r = I.routeTo({ f: e.f, x: e.p[0], y: e.p[1] }, d, {});
      assert.ok(r && r.pts.length > 1, `${e.name} → ${id}`);
    }
  }
});

test("room names from the floor directory sign (B1–3F) show and are searchable", () => {
  const name = (key) => I.destinations.find((d) => d.key === key)?.name;
  assert.equal(name("3:324"), "손일수 교수연구실");
  assert.equal(name("3:308"), "이동지능연구실2");
  assert.equal(name("2:207"), "제어, 데이터와보안연구실 (김준수)");
  assert.equal(name("2:208"), "강의실");
  assert.equal(name("1:122"), "이동지능연구실");
  assert.equal(name("0:B109"), "전력전자실험실");
  assert.equal(I.search("손일수")[0]?.key, "3:324");
  assert.equal(I.search("전은솜")[0]?.key, "2:225");
});

// ---- WebXR(VIO) 방식
import {
  poseFromXR,
  intrinsicsFromProjection,
  yawOf,
  Anchor,
  LevelTracker,
  worldTransform,
  VisualAligner,
} from "../src/indoor/ar/xr-math.mjs";

// XR 카메라 자세(열 우선 4×4): 수평으로 방위 yaw(동쪽 0, 반시계)를 보고 pitch만큼 숙임, 위치 (x, h, z)
function xrMatrix(yawDeg, pitchDeg, x, h, z) {
  const y = (yawDeg * Math.PI) / 180,
    p = (pitchDeg * Math.PI) / 180;
  // 센서 세계 앞 방향 f=(cos y cos p, sin y cos p, sin p) → XR (fx, fz_up, -fy)
  const f = [
    Math.cos(y) * Math.cos(p),
    Math.sin(p),
    -Math.sin(y) * Math.cos(p),
  ];
  const r = [Math.sin(y), 0, Math.cos(y)]; // 오른쪽(수평)
  const u = [
    r[1] * f[2] - r[2] * f[1],
    r[2] * f[0] - r[0] * f[2],
    r[0] * f[1] - r[1] * f[0],
  ]; // r × f
  const zc = [-f[0], -f[1], -f[2]]; // 카메라 -z가 앞
  return [...r, 0, ...u, 0, ...zc, 0, x, h, z, 1];
}

test("WebXR 자세 → 센서 세계: 방위·위치·높이·중력 축이 맞음", () => {
  for (const [yaw, pitch] of [
    [0, 0],
    [90, -10],
    [-135, 5],
  ]) {
    const P = poseFromXR(xrMatrix(yaw, pitch, 2, 1.4, -3));
    assert.ok(
      Math.abs(((yawOf(P.R) - yaw + 540) % 360) - 180) < 1e-6,
      `yaw ${yaw}`,
    );
    assert.ok(
      Math.abs((Math.asin(P.R[8]) * 180) / Math.PI - pitch) < 1e-9,
      "pitch from R[8]",
    );
    assert.deepEqual(
      [P.x, P.y, P.h].map((v) => +v.toFixed(6)),
      [2, 3, 1.4],
    );
    // OpenCV y축(아래)은 세계 z가 음수 쪽
    assert.ok(P.R[7] < 0, "camera down axis points down");
  }
  const K = intrinsicsFromProjection(
    [1.6, 0, 0, 0, 0, 2.1, 0, 0, 0.02, -0.04, -1, -1, 0, 0, -0.1, 0],
    220,
    165,
  );
  assert.ok(Math.abs(K.fx - 176) < 1e-9 && Math.abs(K.fy - 173.25) < 1e-9);
  assert.ok(Math.abs(K.cx - 107.8) < 1e-9 && Math.abs(K.cy - 79.2) < 1e-9);
});

test("WebXR 정렬: 건물 ↔ VIO 변환이 서로 맞고, 경로 묶음이 같은 곳에 놓임", () => {
  const a = new Anchor();
  a.update({ x: 10, y: -4 }, { x: 1, y: 2 }, 37, 1);
  const b = a.toBuilding(1, 2);
  assert.ok(Math.hypot(b.x - 10, b.y + 4) < 1e-9);
  const s = a.toSensor(-3, 8),
    back = a.toBuilding(s.x, s.y);
  assert.ok(Math.hypot(back.x + 3, back.y - 8) < 1e-9);
  // three: 건물 (x, z, -y) 를 묶음 변환 → VIO (센서 x, 높이, -센서 y)
  const wt = worldTransform(a, -0.2);
  const B = [-3, 0.2, -8];
  const X = Math.cos(wt.rotY) * B[0] + Math.sin(wt.rotY) * B[2] + wt.px,
    Z = -Math.sin(wt.rotY) * B[0] + Math.cos(wt.rotY) * B[2] + wt.pz;
  assert.ok(
    Math.abs(X - s.x) < 1e-9 &&
      Math.abs(Z + s.y) < 1e-9 &&
      Math.abs(B[1] + wt.py) < 1e-9,
  );
  // 크게 다른 추정 한 번은 무시, 같은 곳이 두 번 나오면 받아들임
  assert.equal(a.update({ x: 30, y: 0 }, { x: 1, y: 2 }, 37, 1), "hold");
  assert.equal(a.update({ x: 30, y: 0 }, { x: 1, y: 2 }, 37, 1), "snap");
  assert.ok(Math.hypot(a.toBuilding(1, 2).x - 30, a.toBuilding(1, 2).y) < 1e-9);
});

test("WebXR 층 추적: 계단으로 한 층 오르내리면 ±1, 손 높이 흔들림은 무시", () => {
  const lv = new LevelTracker(4);
  assert.equal(lv.update(1.4), 0);
  for (const h of [1.3, 1.5, 1.2, 1.45]) assert.equal(lv.update(h), 0);
  let up = 0;
  for (let h = 1.4; h <= 5.5; h += 0.1) up += lv.update(h);
  assert.equal(up, 1);
  assert.ok(Math.abs(lv.floorY - 4) < 1e-9);
  let down = 0;
  for (let h = 5.4; h >= 1.3; h -= 0.1) down += lv.update(h);
  assert.equal(down, -1);
});

test("WebXR 위치 추정: VIO 궤적 + 사진 후보 RANSAC 정렬로 0.5m 안, 틀린 정렬은 내지 않음", () => {
  const seq = walkShots(1, 30);
  const pf = new Localizer({
    index: INDEX,
    shots: SV.shots,
    walk: I.walk,
    portals: portalsFrom(I.links),
    seed: 21,
  });
  // VIO 세계는 건물과 41° 돌아가 있고 원점도 다름(정렬기는 모름)
  const OFF = 41;
  const truth = new Anchor();
  Object.assign(truth, { off: OFF, tx: 7, ty: -3 });
  const va = new VisualAligner();
  const anchor = new Anchor(); // 앱처럼: 한 번 잡힌 정렬을 VIO로 이어 가고, 새 정렬로 다듬음
  const errs = [];
  seq.forEach((s, j) => {
    const sp = truth.toSensor(s.x, s.y);
    const cands = pf.candidates(stripQuery(s.k), [1], 3, new Set([s.k]));
    va.add(j * 0.8, { x: sp.x, y: sp.y, yaw: s.yaw - OFF }, 0, cands);
    const a = va.solve();
    if (a) {
      assert.equal(a.df, 1, "floor offset");
      assert.ok(
        Math.abs(((((a.off - OFF) % 360) + 540) % 360) - 180) < 4,
        `heading ${a.off}`,
      );
      const A = new Anchor();
      Object.assign(A, a);
      anchor.update(A.toBuilding(sp.x, sp.y), sp, a.off, Math.min(1, a.n / 12));
    }
    if (anchor.ok) {
      const b = anchor.toBuilding(sp.x, sp.y);
      errs.push(Math.hypot(b.x - s.x, b.y - s.y));
    }
  });
  assert.ok(errs.length >= 8, `aligned for part of the walk (${errs.length})`);
  assert.ok(Math.max(...errs) < 1, `max error ${Math.max(...errs)}`);
  errs.sort((a, b) => a - b);
  assert.ok(
    errs[errs.length >> 1] < 0.5,
    `median error ${errs[errs.length >> 1]}`,
  );
});
