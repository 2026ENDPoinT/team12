import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { BUILDINGS } from "../src/data.mjs";
import { insideBuilding } from "../src/geo.mjs";
import { buildingAppearance } from "../src/building-appearance.mjs";
import {
  facadeGeometry,
  createBuildingDetails,
  roofRectangleFits,
} from "../src/procedural-building.mjs";

function courtyardBuilding(angle = 0) {
  const rotate = ([x, z]) => [
    x * Math.cos(angle) - z * Math.sin(angle),
    x * Math.sin(angle) + z * Math.cos(angle),
  ];
  return {
    id: "test",
    name: "교내 건물",
    h: 12,
    floors: 3,
    outline: [
      [0, 0],
      [24, 0],
      [24, 20],
      [0, 20],
    ].map(rotate),
    holes: [
      [
        [6, 6],
        [18, 6],
        [18, 14],
        [6, 14],
      ].map(rotate),
    ],
  };
}

test("wall UVs preserve physical bay widths on rotated outer and courtyard walls", () => {
  for (const angle of [0, Math.PI / 5, Math.PI / 2]) {
    const geometry = facadeGeometry(courtyardBuilding(angle));
    const positions = geometry.getAttribute("position");
    const uv = geometry.getAttribute("uv");
    const span = geometry.getAttribute("facadeSpan");
    const observed = new Set();
    assert.equal(span.count, positions.count);
    for (let i = 0; i < positions.count; i++) {
      if (span.getX(i) < 0.01) continue;
      observed.add(Math.round(span.getX(i)));
      assert.ok(uv.getX(i) >= -0.001 && uv.getX(i) <= span.getX(i) + 0.001);
      assert.ok(uv.getY(i) >= 0 && uv.getY(i) <= 12);
    }
    assert.deepEqual(
      [...observed].sort((a, b) => a - b),
      [8, 12, 20, 24],
    );
    geometry.dispose();
  }
});

test("roof equipment stays on solid roof instead of bridging a courtyard", () => {
  const building = courtyardBuilding(Math.PI / 5);
  const details = createBuildingDetails();
  details.decorate(building, buildingAppearance(building));
  const group = details.finish();
  const equipment = group.getObjectByName("building-detail-equipment");
  assert.ok(equipment && equipment.count > 0);
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < equipment.count; i++) {
    equipment.getMatrixAt(i, matrix);
    for (const x of [-0.5, 0.5])
      for (const z of [-0.5, 0.5]) {
        const corner = new THREE.Vector3(x, 0, z).applyMatrix4(matrix);
        assert.ok(insideBuilding({ x: corner.x, z: corner.z }, building));
      }
  }
});

test("equipment rejects an enclosed courtyard even when every box corner is on the roof", () => {
  const building = courtyardBuilding();
  building.holes = [
    [
      [9, 9],
      [10, 9],
      [10, 10],
      [9, 10],
    ],
  ];
  assert.equal(roofRectangleFits(building, 10, 10, 3, 3), false);
  assert.equal(roofRectangleFits(building, 3, 3, 1, 1), true);
});

test("all campus shapes generate finite facade attributes without changing source geometry", () => {
  for (const building of BUILDINGS) {
    const original = JSON.stringify(building);
    const geometry = facadeGeometry(building);
    for (const name of ["position", "normal", "uv", "facadeSpan"])
      assert.ok(
        geometry.getAttribute(name).array.every(Number.isFinite),
        `${building.id}: ${name}`,
      );
    assert.equal(JSON.stringify(building), original);
    const look = buildingAppearance(building);
    assert.ok(look.floorHeight > 0 && look.floors >= 1);
    if (building.name === "조형물") assert.equal(look.facade, false);
    geometry.dispose();
  }
});
