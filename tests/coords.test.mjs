import test from "node:test";
import assert from "node:assert/strict";
import { CAMPUS_GEOMETRY, BUILDINGS } from "../src/data.mjs";
import { toScene, toLngLat, gpsToCampus } from "../src/geo.mjs";
import { campusToGps } from "../src/gis.mjs";

const origin = CAMPUS_GEOMETRY.meta;

// OpenStreetMap 원본 건물 꼭짓점(© OpenStreetMap contributors, ODbL).
// 지도 데이터는 같은 꼭짓점을 SMASH 식으로 미터 변환한 값이므로, 변환식이 같으면
// 저장 정밀도(0.1m) 수준으로 일치해야 합니다. 이전 고정 계수는 약 0.5m 어긋났습니다.
const osmCorners = [
  { building: "future", node: 3856973019, lngLat: [127.0812884, 37.6297845] },
  { building: "future", node: 3856973020, lngLat: [127.0817586, 37.6296967] },
  { building: "library", node: 3856998381, lngLat: [127.0772375, 37.6331282] },
];

test("OSM building corners land on the matching map outline vertex", () => {
  for (const { building, node, lngLat } of osmCorners) {
    const point = toScene(lngLat, origin),
      outline = BUILDINGS.find(({ id }) => id === building).outline,
      distance = Math.min(
        ...outline.map(([x, z]) => Math.hypot(point.x - x, point.z - z)),
      );
    assert.ok(distance < 0.2, `${building} node ${node}: ${distance}m`);
  }
});

test("toScene and toLngLat round-trip across the campus", () => {
  for (const point of [
    { x: 0, z: 0 },
    { x: 346.7, z: -461.8 },
    { x: -335, z: 432.7 },
  ]) {
    const back = toScene(toLngLat(point, origin), origin);
    assert.ok(Math.abs(back.x - point.x) < 1e-6);
    assert.ok(Math.abs(back.z - point.z) < 1e-6);
  }
});

test("older entry points use the same conversion", () => {
  const lngLat = [127.0812884, 37.6297845];
  assert.deepEqual(
    gpsToCampus(lngLat[1], lngLat[0], origin),
    toScene(lngLat, origin),
  );
  assert.equal(campusToGps, toLngLat);
  assert.equal(toScene([NaN, 37.6], origin), null);
  assert.equal(toLngLat({ x: 1, z: 1 }, {}), null);
});
