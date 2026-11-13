import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createRoadLayer } from "../src/map/landscape/road-layer.mjs";
import { createBroadleafTrees } from "../src/map/landscape/broadleaf-trees.mjs";

test("batched road boxes preserve endpoints, height, width and material separation", () => {
  const roads = [
    {
      kind: "service",
      points: [
        [10, 20],
        [40, 60],
      ],
    },
    {
      kind: "footway",
      points: [
        [-5, -10],
        [15, -10],
      ],
    },
    {
      kind: "steps",
      points: [
        [0, 0],
        [0, 0],
        [0, 8],
      ],
    },
  ];
  const before = JSON.stringify(roads),
    layer = createRoadLayer(roads);
  assert.equal(layer.children.length, 4);
  const matrix = new THREE.Matrix4(),
    point = new THREE.Vector3();
  for (const [name, ends, width] of [
    [
      "vehicle",
      [
        [10, 20],
        [40, 60],
      ],
      5.8,
    ],
    [
      "walk",
      [
        [-5, -10],
        [15, -10],
      ],
      2.8,
    ],
    [
      "steps",
      [
        [0, 0],
        [0, 8],
      ],
      2,
    ],
  ]) {
    const mesh = layer.getObjectByName(`roads-${name}`);
    assert.equal(mesh.count, 1);
    mesh.getMatrixAt(0, matrix);
    for (let i = 0; i < 2; i++) {
      point.set(0, 0, i - 0.5).applyMatrix4(matrix);
      assert.ok(Math.abs(point.x - ends[i][0]) < 1e-5);
      assert.ok(Math.abs(point.z - ends[i][1]) < 1e-5);
      assert.ok(Math.abs(point.y - 0.55) < 1e-5);
    }
    point.set(1, 0, 0).transformDirection(matrix);
    const scale = new THREE.Vector3().setFromMatrixScale(matrix);
    assert.ok(Math.abs(scale.x - width) < 1e-5);
  }
  assert.equal(layer.getObjectByName("roads-curb").count, 3);
  assert.equal(JSON.stringify(roads), before);
});

test("tree detail swaps 8/16 cards with stable positions and hysteresis", () => {
  const group = createBroadleafTrees([
    [10, 20, 1],
    [30, 40, 0.7, 0.9],
  ]);
  const leaves = group.children[1],
    positions = Array.from(leaves.instanceMatrix.array);
  assert.equal(leaves.geometry.index.count / 6, 16);
  group.updateDetail(1);
  assert.equal(leaves.geometry.index.count / 6, 8);
  group.updateDetail(1.6);
  assert.equal(group.userData.leafCards, 8);
  group.updateDetail(2);
  assert.equal(leaves.geometry.index.count / 6, 16);
  group.updateDetail(1.6);
  assert.equal(group.userData.leafCards, 16);
  assert.deepEqual(Array.from(leaves.instanceMatrix.array), positions);
});
