import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { floorViewPose } from "../src/indoor/camera.mjs";

test("floor views center translated basement geometry and fit every corner on desktop and mobile", () => {
  const basement = new THREE.Box3(
    new THREE.Vector3(-44, -3.8, -30),
    new THREE.Vector3(-20, -0.4, 12),
  );
  for (const [width, height] of [
    [1440, 900],
    [820, 900],
    [390, 844],
    [320, 740],
  ]) {
    const pose = floorViewPose(basement, { width, height });
    assert.ok(pose.target.distanceTo(new THREE.Vector3(-32, -2.1, -9)) < 1e-8);
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.5, 2000);
    camera.position.copy(pose.position);
    camera.lookAt(pose.target);
    camera.updateMatrixWorld(true);
    for (const x of [basement.min.x, basement.max.x])
      for (const y of [basement.min.y, basement.max.y])
        for (const z of [basement.min.z, basement.max.z]) {
          const p = new THREE.Vector3(x, y, z).project(camera);
          assert.ok(
            Math.abs(p.x) < 0.9 && Math.abs(p.y) < 0.9,
            `${width}: ${p.toArray()}`,
          );
          assert.ok(p.z > -1 && p.z < 1);
        }
  }
});

test("changing floors can preserve a rotated view while reset restores the initial angle", () => {
  const bounds = new THREE.Box3(
    new THREE.Vector3(-44, 0, -30),
    new THREE.Vector3(44, 3.4, 30),
  );
  const direction = new THREE.Vector3(0.6, 0.7, -0.3).normalize();
  const rotated = floorViewPose(bounds, {
    width: 1440,
    height: 900,
    direction,
  });
  assert.ok(
    rotated.position
      .clone()
      .sub(rotated.target)
      .normalize()
      .distanceTo(direction) < 1e-8,
  );
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
  ]) {
    const pose = floorViewPose(bounds, { width, height });
    const dir = pose.position.clone().sub(pose.target).normalize();
    assert.ok(Math.abs(Math.acos(dir.y) - 0.5) < 1e-8);
    assert.ok(
      width < height
        ? dir.x < 0 && Math.abs(dir.z) < 1e-8
        : Math.abs(dir.x) < 1e-8 && dir.z > 0,
    );
  }
});
