import test from "node:test";
import assert from "node:assert/strict";
import {
  subdivideTriangles,
  drapedPolygon,
  buildingBase,
  terrainSkirt,
} from "../src/map/terrain-drape.mjs";
import { createTerrain } from "../src/campus/terrain.mjs";

// 동쪽으로 갈수록 10m마다 1m씩 높아지는 경사면
const slope = createTerrain({
  x0: -100, z0: -100, step: 10, cols: 21, rows: 21, base: 0,
  heights: Array.from({ length: 21 * 21 }, (_, i) => (i % 21) * 1),
});
const area = (p) => {
  let sum = 0;
  for (let i = 0; i < p.length; i += 9)
    sum += Math.abs((p[3 + i] - p[i]) * (p[8 + i] - p[2 + i]) - (p[6 + i] - p[i]) * (p[5 + i] - p[2 + i])) / 2;
  return sum;
};

test("삼각형을 maxEdge 이하로 나누고 넓이는 그대로", () => {
  const triangle = [0, 0, 0, 40, 0, 0, 0, 0, 30];
  const pieces = subdivideTriangles(triangle, 6);
  assert.ok(pieces.length > 9);
  assert.ok(Math.abs(area(pieces) - area(triangle)) < 1e-6);
  for (let i = 0; i < pieces.length; i += 9)
    for (const [a, b] of [[0, 3], [3, 6], [6, 0]])
      assert.ok(Math.hypot(pieces[i + a] - pieces[i + b], pieces[i + a + 2] - pieces[i + b + 2]) <= 6 + 1e-9);
});

test("지면 면은 꼭짓점마다 지형 높이 + 띄움 높이", () => {
  const geometry = drapedPolygon([[0, 0], [30, 0], [30, 30], [0, 30]], [], 0.15, slope, 5);
  const p = geometry.getAttribute("position");
  assert.ok(p.count > 4);
  for (let i = 0; i < p.count; i++)
    assert.ok(Math.abs(p.getY(i) - (slope.heightAt(p.getX(i), p.getZ(i)) + 0.15)) < 1e-4);
});

test("지형이 없으면 기존처럼 평평한 면(높이 y)", () => {
  const flat = createTerrain(null);
  const p = drapedPolygon([[0, 0], [30, 0], [0, 30]], [], 0.3, flat).getAttribute("position");
  for (let i = 0; i < p.count; i++) assert.ok(Math.abs(p.getY(i) - 0.3) < 1e-6);
});

test("건물 바닥은 외곽선 아래 가장 낮은 지면(비탈 아래쪽에서 뜨지 않음)", () => {
  const building = { x: 25, z: 0, outline: [[10, -5], [40, -5], [40, 5], [10, 5]] };
  assert.ok(Math.abs(buildingBase(building, slope) - slope.heightAt(10, 0)) < 1e-9);
  assert.equal(buildingBase(building, createTerrain(null)), 0);
});

test("땅 옆면은 경계를 따라 지면에서 바닥까지 내려온다", () => {
  const p = terrainSkirt([[0, 0], [20, 0], [20, 20]], slope, -5, 6).getAttribute("position");
  let top = 0;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i);
    if (y === -5) continue;
    top++;
    assert.ok(Math.abs(y - slope.heightAt(p.getX(i), p.getZ(i))) < 1e-4);
  }
  assert.ok(top > 0);
});
