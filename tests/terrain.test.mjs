import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  createTerrain,
  walkLeg,
  walkingSpeed,
  FLAT_METERS_PER_MINUTE,
} from "../src/campus/terrain.mjs";
import { shortestPath } from "../src/navigation/routing.mjs";
import { CAMPUSES } from "../src/campus/registry.mjs";

const grid = { x0: 0, z0: 0, step: 10, cols: 2, rows: 2, base: 20, heights: [0, 10, 20, 30] };

test("지형 높이는 격자를 쌍선형 보간하고 범위 밖은 가장자리 값", () => {
  const t = createTerrain(grid);
  assert.equal(t.has, true);
  assert.equal(t.heightAt(0, 0), 0);
  assert.equal(t.heightAt(10, 10), 30);
  assert.equal(t.heightAt(5, 5), 15);
  assert.equal(t.heightAt(-50, 0), 0);
  assert.equal(t.heightAt(5, 500), 25);
  assert.equal(t.max, 30);
});

test("지형 데이터가 없거나 잘못되면 평지(0)", () => {
  assert.equal(createTerrain(undefined).heightAt(3, 4), 0);
  assert.equal(createTerrain({ ...grid, heights: [1, 2] }).has, false);
});

test("걷는 속도: 평지 분당 70m, 오르막·급한 내리막은 느림", () => {
  assert.ok(Math.abs(walkingSpeed(0) - FLAT_METERS_PER_MINUTE) < 1e-9);
  assert.ok(walkingSpeed(0.1) < walkingSpeed(0));
  assert.ok(walkingSpeed(-0.05) > walkingSpeed(0));
  assert.ok(walkingSpeed(-0.3) < walkingSpeed(0));
  const leg = walkLeg(100, 0, 10);
  assert.ok(Math.abs(leg.meters - Math.hypot(100, 10)) < 1e-9);
  assert.equal(leg.slope, 0.1);
});

test("같은 거리면 언덕을 넘는 길보다 평평한 길로 간다", () => {
  const nodes = { a: { y: 0 }, hill: { y: 12 }, flat: { y: 0 }, b: { y: 0 } },
    edges = [
      { a: "a", b: "hill", meters: 100 },
      { a: "hill", b: "b", meters: 100 },
      { a: "a", b: "flat", meters: 101 },
      { a: "flat", b: "b", meters: 101 },
    ];
  const route = shortestPath("a", "b", "shortest", nodes, edges);
  assert.deepEqual(route.path, ["a", "flat", "b"]);
  assert.equal(route.steep, false);
  assert.equal(route.climb, 0);
});

test("계단 피하기: 급경사는 다른 길이 있으면 피하고, 없으면 지나가며 알린다", () => {
  const nodes = { a: { y: 0 }, top: { y: 20 }, side: { y: 0 }, b: { y: 20 } },
    steepOnly = [{ a: "a", b: "b", meters: 100 }];
  const forced = shortestPath("a", "b", "stepfree", nodes, steepOnly);
  assert.ok(forced);
  assert.equal(forced.steep, true);
  assert.ok(Math.abs(forced.climb - 20) < 1e-9);
  const withRamp = [
    ...steepOnly,
    { a: "a", b: "side", meters: 200 },
    { a: "side", b: "b", meters: 260 },
  ];
  const avoided = shortestPath("a", "b", "stepfree", nodes, withRamp);
  assert.deepEqual(avoided.path, ["a", "side", "b"]);
  assert.equal(avoided.steep, false);
  // 최단 경로 모드는 급경사여도 빠르면 그대로 간다
  assert.deepEqual(shortestPath("a", "b", "shortest", nodes, withRamp).path, ["a", "b"]);
});

test("모든 학교 데이터에 캠퍼스를 덮는 지형 격자가 있다", () => {
  for (const campus of CAMPUSES) {
    const data = JSON.parse(readFileSync(new URL(`../${campus.data}`, import.meta.url), "utf8"));
    const t = createTerrain(data.terrain);
    assert.ok(t.has, campus.name);
    assert.ok(Number.isFinite(data.terrain.base));
    assert.ok(data.attribution.terrain.includes("Copernicus"));
    for (const [x, z] of data.boundary[0]) {
      assert.ok(x >= data.terrain.x0 && z >= data.terrain.z0, "격자가 경계를 덮음");
      assert.ok(x <= data.terrain.x0 + (data.terrain.cols - 1) * data.terrain.step);
      assert.ok(z <= data.terrain.z0 + (data.terrain.rows - 1) * data.terrain.step);
    }
    // 서울대 관악캠퍼스 경계는 관악산 자락을 포함해 400m 넘게 차이 납니다.
    assert.ok(t.max < 600, "근사 지면이 비정상적으로 높지 않음");
  }
});
