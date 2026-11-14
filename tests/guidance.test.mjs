import test from "node:test";
import assert from "node:assert/strict";
import { routePoints, guidanceAt, guidanceSummary } from "../src/navigation/guidance.mjs";

const route = [
  { x: 0, z: 0 },
  { x: 0, z: -100 },
  { x: 100, z: -100 },
];

test("routePoints keeps route order and removes duplicate points", () => {
  const nodes = {
    a: { x: 0, z: 0 },
    b: { x: 0, z: 0 },
    c: { x: 5, z: 0 },
  };
  assert.deepEqual(routePoints(["a", "b", "missing", "c"], nodes), [
    { x: 0, z: 0 },
    { x: 5, z: 0 },
  ]);
});

test("guidanceAt reports the next turn and remaining distance", () => {
  const guide = guidanceAt(route, { x: 0, z: -30 });
  assert.deepEqual(guide.next, { direction: "right", distance: 70 });
  assert.equal(guide.remaining, 170);
  assert.deepEqual(guide.nextPoint, { x: 0, z: -100 });
  // 걷는 방향: 북쪽(0°), 꺾은 뒤에는 동쪽(90°). 데스크톱 지도를 이 방향이 위로 오게 돌립니다.
  assert.equal(guide.heading, 0);
  assert.equal(guidanceAt(route, { x: 40, z: -100 }).heading, 90);
});

test("navigation time matches route walking speed and progress survives rerouting", () => {
  assert.deepEqual(guidanceSummary(140, 280), { meters: 140, minutes: 2, progress: 0.5 });
  assert.equal(guidanceSummary(350, 280).progress, 0);
  assert.deepEqual(guidanceSummary(0, 280), { meters: 0, minutes: 1, progress: 1 });
});

test("guidanceAt reports arrival near the destination", () => {
  assert.deepEqual(guidanceAt(route, { x: 96, z: -100 }).next, {
    direction: "arrive",
    distance: 0,
  });
  assert.equal(guidanceAt([{ x: 0, z: 0 }], { x: 0, z: 0 }), null);
});

test("guidance heading follows the route as it turns", () => {
  assert.equal(guidanceAt(route, { x: 0, z: -30 }).heading, 0);
  assert.equal(guidanceAt(route, { x: 0, z: -100 }).heading, 90);
});

test("a short sideways jog that returns to the same direction is not a turn", () => {
  // 북쪽으로 가다 왼쪽으로 조금씩 비켜 간 뒤(−7°·−25°·−9°) 한 번에 원래 방향으로 돌아오는(+45°) 길
  const jog = [
    { x: 0, z: 0 },
    { x: 0, z: -100 },
    { x: -0.5, z: -110 },
    { x: -3.5, z: -117 },
    { x: -11, z: -130 },
    { x: -11, z: -200 },
    { x: 89, z: -200 },
  ];
  // S자 구간은 건너뛰고 끝의 실제 오른쪽 회전까지 거리를 안내합니다.
  const guide = guidanceAt(jog, { x: 0, z: -20 });
  assert.equal(guide.next.direction, "right");
  assert.deepEqual(guide.nextPoint, { x: -11, z: -200 });
});

test("a corner taken in several small bends is one turn", () => {
  // 20°씩 다섯 번 꺾어 동쪽(90°)으로 도는 모퉁이
  const corner = [{ x: 0, z: 0 }, { x: 0, z: -100 }];
  let heading = 0;
  for (let i = 0; i < 5; i++) {
    heading += 18;
    const last = corner.at(-1),
      rad = (heading * Math.PI) / 180;
    corner.push({ x: last.x + Math.sin(rad) * 5, z: last.z - Math.cos(rad) * 5 });
  }
  const last = corner.at(-1);
  corner.push({ x: last.x + 100, z: last.z });
  const guide = guidanceAt(corner, { x: 0, z: -20 });
  assert.equal(guide.next.direction, "right");
  assert.ok(guide.next.distance >= 75 && guide.next.distance < 110);
});
