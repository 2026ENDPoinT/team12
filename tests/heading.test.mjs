import test from "node:test";
import assert from "node:assert/strict";
import { orientationHeading, smoothHeading, headingDelta, gpsHeading, cameraOffsetForHeading, createHeadingTracker } from "../src/heading.mjs";

test("compass accepts iOS and absolute Android headings, but rejects relative or inaccurate data", () => {
  assert.equal(orientationHeading({ webkitCompassHeading: 350, webkitCompassAccuracy: 10 }, 90), 80);
  assert.equal(orientationHeading({ alpha: 90, absolute: true }), 270);
  assert.equal(orientationHeading({ alpha: 90, absolute: false }), null);
  assert.equal(orientationHeading({ webkitCompassHeading: 90, webkitCompassAccuracy: -1 }), null);
  assert.equal(orientationHeading({ alpha: null, absolute: true }), null);
});

test("north crossing interpolates over the shortest arc", () => {
  assert.equal(smoothHeading(359, 1, .5), 0);
  assert.equal(headingDelta(1, 359), -2);
  assert.equal(smoothHeading(null, 270, .1), 270);
});

test("GPS fallback rejects stationary drift and uses reliable movement", () => {
  assert.equal(gpsHeading({ heading: 0, speed: 1 }, null, null), 0);
  assert.equal(gpsHeading({ heading: 90, speed: 0, accuracy: 20 }, { x: 0, z: 0, accuracy: 20 }, { x: 3, z: 0 }), null);
  assert.equal(gpsHeading({ heading: null, accuracy: 5 }, { x: 0, z: 0 }, { x: 10, z: 0 }), 90);
});

test("camera sits behind the travel bearing with stable overhead tilt", () => {
  const north = cameraOffsetForHeading(0, 100);
  const east = cameraOffsetForHeading(90, 100);
  assert.ok(north.z > 0 && Math.abs(north.x) < 1e-9);
  assert.ok(east.x < 0 && Math.abs(east.z) < 1e-9);
  assert.ok(north.y > Math.abs(north.z));
});

test("permission completion after guidance stops cannot reactivate sensor listeners", async () => {
  let resolve, additions = 0, requested = false;
  const win = { isSecureContext: true, DeviceOrientationEvent: { requestPermission(absolute) {
    requested = absolute; return new Promise((done) => { resolve = done; });
  } }, addEventListener() { additions++; }, removeEventListener() {} };
  const tracker = createHeadingTracker(win, () => {});
  tracker.start();
  assert.equal(requested, true);
  tracker.stop();
  resolve("granted");
  await Promise.resolve();
  assert.equal(additions, 0);
});

test("denied compass permission retains GPS fallback without subscribing", async () => {
  let unavailable = 0;
  const win = { isSecureContext: true, DeviceOrientationEvent: { requestPermission: () => Promise.resolve("denied") },
    addEventListener() { assert.fail("must not listen"); }, removeEventListener() {} };
  createHeadingTracker(win, () => {}, () => { unavailable++; }).start();
  await Promise.resolve();
  assert.equal(unavailable, 1);
});
