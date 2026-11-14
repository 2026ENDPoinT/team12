import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createNavigationBounds } from "../src/map/navigation-bounds.mjs";
import { CAMPUS_GEOMETRY } from "../src/campus/data.mjs";
import { pointInRing, projectToSegment } from "../src/campus/geo.mjs";

const square = [
  [-100, -100],
  [100, -100],
  [100, 100],
  [-100, 100],
];
function setup(target = new THREE.Vector3()) {
  const camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 3500);
  camera.position.copy(target).add(new THREE.Vector3(0, 100, 100));
  camera.lookAt(target);
  return { camera, controls: { target } };
}
function ground(camera) {
  const d = camera.getWorldDirection(new THREE.Vector3());
  return {
    x: camera.position.x - (camera.position.y * d.x) / d.y,
    z: camera.position.z - (camera.position.y * d.z) / d.y,
  };
}
function near(a, b) {
  assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
}

test("inside navigation is unchanged; every outside direction stops at the campus edge", () => {
  const clamp = createNavigationBounds([square]);
  const inside = setup();
  assert.equal(clamp(inside.camera, inside.controls), false);
  for (const [x, z] of [
    [500, 0],
    [-500, 0],
    [0, 500],
    [0, -500],
    [500, 500],
  ]) {
    const f = setup(new THREE.Vector3(x, 0, z));
    const offset = f.camera.position.clone().sub(f.controls.target);
    const orientation = f.camera.quaternion.clone();
    f.camera.zoom = 4;
    assert.equal(clamp(f.camera, f.controls), true);
    const p = ground(f.camera);
    assert.ok(Math.abs(p.x) <= 100.000001 && Math.abs(p.z) <= 100.000001);
    near(
      f.camera.position.clone().sub(f.controls.target).distanceTo(offset),
      0,
    );
    near(f.camera.quaternion.angleTo(orientation), 0);
    near(f.camera.zoom, 4);
    assert.equal(clamp(f.camera, f.controls), false);
  }
});

test("raising and lowering the camera cannot move the visible ground centre outside", () => {
  const clamp = createNavigationBounds([square]);
  for (const y of [2, 500, 2000]) {
    const f = setup(new THREE.Vector3(0, y - 100, 0));
    clamp(f.camera, f.controls);
    const p = ground(f.camera);
    assert.ok(Math.abs(p.x) <= 100.000001 && Math.abs(p.z) <= 100.000001);
    near(f.camera.position.y, y);
  }
});

test("concave boundaries use the actual outline instead of its bounding box", () => {
  const ring = [
    [0, 0],
    [100, 0],
    [100, 30],
    [30, 30],
    [30, 100],
    [0, 100],
  ];
  const f = setup(new THREE.Vector3(80, 0, 80));
  assert.equal(createNavigationBounds([ring])(f.camera, f.controls), true);
  const p = ground(f.camera);
  assert.ok(p.x <= 30.000001 || p.z <= 30.000001);
});

test("real campus navigation remains on the outline under repeated pan, rotation and altitude changes", () => {
  const clamp = createNavigationBounds(CAMPUS_GEOMETRY.boundary);
  const f = setup();
  for (let i = 0; i < 200; i++) {
    f.camera.position.x += 60;
    f.controls.target.x += 60;
    f.camera.position.y += 5;
    f.controls.target.y += 5;
    const offset = f.camera.position.clone().sub(f.controls.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.05);
    f.camera.position.copy(f.controls.target).add(offset);
    f.camera.lookAt(f.controls.target);
    clamp(f.camera, f.controls);
    const p = ground(f.camera);
    assert.ok(
      CAMPUS_GEOMETRY.boundary.some(
        (r) =>
          pointInRing(p, r) ||
          r.some(([x, z], index) => {
            const b = r[(index + 1) % r.length];
            return (
              projectToSegment(p, { x, z }, { x: b[0], z: b[1] }).distance <
              1e-7
            );
          }),
      ),
    );
  }
});
