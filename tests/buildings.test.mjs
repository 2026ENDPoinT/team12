import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { BUILDINGS } from "../src/data.mjs";
import {
  BUILDING_NUMBERS,
  buildingLabel,
  activeWorks,
  worksPeriod,
  today,
} from "../src/buildings.mjs";
import { insideBuilding } from "../src/geo.mjs";
import { buildingAppearance } from "../src/map/buildings/appearance.mjs";
import {
  facadeGeometry,
  createBuildingDetails,
  roofRectangleFits,
} from "../src/map/buildings/procedural.mjs";

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

// Exercise the complete layer, including photo models, generic models and studies.
test("building registry creates all visible buildings with valid interaction records", async () => {
  const { ENTRANCES } = await import("../src/data.mjs");
  const { BUILDING_DESIGNS } = await import("../src/map/buildings/catalog.mjs");
  const { createBuildingLayer } = await import(
    "../src/map/buildings/index.mjs"
  );
  const before = JSON.stringify(BUILDINGS);
  const layer = createBuildingLayer(BUILDINGS, ENTRANCES);
  const expected = BUILDINGS.filter((b) => !BUILDING_DESIGNS[b.id]?.hidden);
  assert.deepEqual(
    layer.records.map((r) => r.b.id),
    expected.map((b) => b.id),
  );
  const ids = new Set(expected.map((b) => b.id));
  for (const record of layer.records) {
    assert(record.body.isMesh);
    assert(
      record.body.material.userData.buildingFinish,
      `Missing finish: ${record.b.id}`,
    );
    assert(Number.isFinite(record.height) && record.height > 0);
    assert(Number.isInteger(record.profile.wall));
    assert(layer.pickables.includes(record.body));
  }
  for (const mesh of layer.pickables) assert(ids.has(mesh.userData.building));
  for (const [id, design] of Object.entries(BUILDING_DESIGNS)) {
    assert(
      BUILDINGS.some((b) => b.id === id),
      `Unknown design ID: ${id}`,
    );
    if (design.model)
      assert(!design.facadeStudy, `Conflicting facade modes: ${id}`);
  }
  layer.group.updateMatrixWorld(true);
  layer.group.traverse((object) => {
    assert(object.matrixWorld.elements.every(Number.isFinite));
    if (object.isInstancedMesh)
      assert(object.instanceMatrix.array.every(Number.isFinite));
  });
  assert.equal(JSON.stringify(BUILDINGS), before);
  const geometries = new Set(),
    materials = new Set();
  layer.group.traverse((o) => {
    if (o.geometry) geometries.add(o.geometry);
    if (o.material) [].concat(o.material).forEach((m) => materials.add(m));
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
});

test("every numbered name exists in the campus data", () => {
  const names = new Set(BUILDINGS.map((b) => b.name));
  for (const name of Object.keys(BUILDING_NUMBERS))
    assert.ok(names.has(name), name);
});
test("labels show the official number, or just the name when there is none", () => {
  assert.equal(buildingLabel({ name: "미래관" }), "60 미래관");
  assert.equal(buildingLabel({ name: "창조관" }), "창조관");
});
test("activeWorks keeps ongoing/upcoming works and drops ended or malformed rows", () => {
  const id = BUILDINGS[0].id,
    row = (o) => ({ id: "w", building_id: id, ...o });
  const works = activeWorks(
    [
      row({ start_date: "2026-11-01", end_date: "2026-12-20" }), // 진행 중
      row({ start_date: "2026-12-01", end_date: "2027-01-10" }), // 예정
      row({ start_date: "2026-10-01", end_date: "2026-11-11" }), // 끝남
      row({ start_date: "2026-12-20", end_date: "2026-11-01" }), // 순서 뒤집힘
      row({ start_date: "11/01", end_date: "2026-12-20" }), // 형식 틀림
      {
        ...row({ start_date: "2026-11-01", end_date: "2026-12-20" }),
        building_id: "nope",
      },
    ],
    "2026-11-12",
  );
  assert.equal(works.length, 2);
  assert.equal(worksPeriod(works[0]), "2026.11.01 ~ 2026.12.20");
  assert.equal(activeWorks(null).length, 0);
  assert.equal(today(new Date(2026, 0, 5)), "2026-01-05");
});
