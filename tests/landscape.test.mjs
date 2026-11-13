import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createRoadLayer } from "../src/map/landscape/road-layer.mjs";
import { createBroadleafTrees } from "../src/map/landscape/broadleaf-trees.mjs";

test("road surfaces fill bends and separate crossing materials without changing source lines", () => {
  const roads = [
    {
      kind: "service",
      points: [
        [-10, 0],
        [0, 0],
        [0, 10],
      ],
    },
    {
      kind: "footway",
      points: [
        [-5, -5],
        [-5, 5],
      ],
    },
    {
      kind: "steps",
      points: [
        [0, 7],
        [0, 7],
        [4, 7],
      ],
    },
  ];
  const before = JSON.stringify(roads);
  const layer = createRoadLayer(roads);
  const hit = (x, z) =>
    new THREE.Raycaster(
      new THREE.Vector3(x, 5, z),
      new THREE.Vector3(0, -1, 0),
    ).intersectObject(layer)[0]?.object.name;

  assert.equal(layer.children.length, 4);
  assert.equal(hit(1, -1), "roads-vehicle");
  assert.equal(hit(1, 3), "roads-vehicle");
  assert.equal(hit(3.1, 3), "roads-curb");
  assert.equal(hit(4, 3), undefined);
  assert.equal(hit(-5, 0), "roads-vehicle");
  assert.equal(hit(-5, 4), "roads-walk");
  assert.equal(hit(1, 7), "roads-steps");
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
