import test from "node:test";
import assert from "node:assert/strict";
import { photoNear, demoTiltAt, demoRoute } from "../src/indoor/imagery.mjs";

test("실사 사진은 같은 층·가까운 위치·보는 방향에 맞게 고른다", () => {
  const shots = [
    { id: 1, f: 1, x: 0, y: 0, yaw: 0 },
    { id: 2, f: 2, x: 1, y: 0, yaw: 359 },
    { id: 3, f: 2, x: 0, y: 0, yaw: 180 },
  ];
  assert.equal(photoNear(shots, 0, 0, 2, 1)?.id, 2);
  assert.equal(photoNear(shots, 10, 0, 2, 1), null);
  assert.equal(photoNear(shots, 0, 0, 3, 1), null);
});

test("녹화 데모 경유점은 같은 층 보행 지점을 잇고 AR 현재 위치를 덮어쓰지 않는다", () => {
  const base = {
    pts: [
      { x: 0, y: 0, f: 2 },
      { x: 10, y: 10, f: 2 },
    ],
    target: { door: [10, 10] },
  };
  const indoor = { floors: [2], FL: () => ({ z: 4.2 }), walk: () => true };
  const route = demoRoute(
    base,
    { floor: 2, waypoints: [{ x: 0, y: 10, f: 2 }] },
    indoor,
  );
  assert.equal(route.len, 20);
  assert.equal(route.target, base.target);
  assert.equal(route.vertical.length, 0);
  assert.deepEqual(
    route.pts.map((p) => p.f),
    [2, 2, 2],
  );
  assert.equal(demoRoute(base, {}, indoor), base);
  assert.throws(
    () =>
      demoRoute(base, { floor: 2, waypoints: [{ x: 1, y: 1, f: 3 }] }, indoor),
    /보행/,
  );
});

test("데모 자세는 시간에 맞는 기울기·롤만 쓰고 위치·절대 방위는 사용하지 않는다", () => {
  const pitch = -0.1;
  const cp = Math.cos(pitch),
    sp = Math.sin(pitch);
  const R = [1, 0, 0, 0, sp, cp, 0, -cp, sp]; // 북쪽을 보는 카메라
  const demo = {
    attitudes: [
      { t: 0, R },
      { t: 10, R: [0, sp, cp, -1, 0, 0, 0, -cp, sp] },
    ],
  };
  const first = demoTiltAt(demo, -5);
  const last = demoTiltAt(demo, 30);
  assert.ok(Math.abs(Math.atan2(first[5], first[2])) < 1e-9);
  assert.ok(Math.abs(Math.atan2(last[5], last[2])) < 1e-9);
  assert.equal(first[8], sp);
  assert.equal(last[8], sp);
  assert.equal(demoTiltAt({}, 0), null);
  assert.equal(demoTiltAt({ attitudes: [{ t: 0, R: [] }] }, 0), null);
});
