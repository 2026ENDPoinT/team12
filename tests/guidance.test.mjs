import test from "node:test";
import assert from "node:assert/strict";
import { routePoints, guidanceAt, guidanceSummary } from "../src/guidance.mjs";

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
