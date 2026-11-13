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

test("step-free mode uses only elevators and reports unreachable B1", () => {
  const r = I.routeTo(start, I.findDest("3:313"), { mode: "elevator" });
  assert.ok(r);
  assert.ok(
    r.vertical.length > 0 && r.vertical.every((l) => l.kind === "elev"),
  );
  assert.equal(
    I.routeTo(start, I.findDest("0:B104"), { mode: "elevator" }),
    null,
  );
  assert.ok(I.routeTo(start, I.findDest("0:B104"), { mode: "stairs" }));
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
