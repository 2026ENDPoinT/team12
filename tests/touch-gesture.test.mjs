import test from "node:test";
import assert from "node:assert/strict";
import { touchGestureMode } from "../src/map/touch-gesture.mjs";
const start = { mid: { x: 100, y: 100 }, distance: 120 };
test("pinch zooms despite small midpoint drift", () => {
  assert.equal(
    touchGestureMode(start, { mid: { x: 102, y: 101 }, distance: 150 }),
    "zoom",
  );
  assert.equal(
    touchGestureMode(start, { mid: { x: 99, y: 102 }, distance: 90 }),
    "zoom",
  );
});
test("parallel horizontal, vertical and diagonal gestures rotate rather than pan", () => {
  for (const [x, y] of [
    [30, 0],
    [0, 30],
    [20, 20],
  ])
    assert.equal(
      touchGestureMode(start, {
        mid: { x: 100 + x, y: 100 + y },
        distance: 122,
      }),
      "rotate",
    );
});
test("small movement stays undecided to avoid accidental gestures", () => {
  assert.equal(
    touchGestureMode(start, { mid: { x: 102, y: 101 }, distance: 124 }),
    null,
  );
});

test("twisting in place rotates even when midpoint and spacing stay fixed", () => {
  assert.equal(
    touchGestureMode({ ...start, angle: 3.1 }, { ...start, angle: -2.9 }),
    "twist",
  );
});
