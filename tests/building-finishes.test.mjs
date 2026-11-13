import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { applyBuildingFinish } from "../src/map/buildings/finishes.mjs";

test("building finish preserves existing shader hooks, uniforms and material identity", () => {
  const material = new THREE.MeshStandardMaterial({ color: 0xdac9bd });
  const color = material.color.clone();
  material.onBeforeCompile = (shader) => {
    shader.uniforms.existing = { value: 7 };
  };
  material.customProgramCacheKey = () => "existing-facade";
  assert.equal(applyBuildingFinish(material, "facade"), material);
  const firstHook = material.onBeforeCompile,
    firstKey = material.customProgramCacheKey();
  applyBuildingFinish(material, "facade");
  assert.equal(material.onBeforeCompile, firstHook);
  assert.equal(material.customProgramCacheKey(), firstKey);
  assert.ok(firstKey.startsWith("existing-facade|"));
  const shader = {
    uniforms: {},
    vertexShader: THREE.ShaderLib.standard.vertexShader,
    fragmentShader: THREE.ShaderLib.standard.fragmentShader,
  };
  material.onBeforeCompile(shader);
  assert.equal(shader.uniforms.existing.value, 7);
  assert.ok(shader.vertexShader.includes("instanceMatrix * finishPosition"));
  assert.deepEqual(material.color, color);
  assert.equal(material.map, null);
  material.dispose();
});

test("finish program keys reuse code across colours but keep glass and stone distinct", () => {
  const a = applyBuildingFinish(
    new THREE.MeshStandardMaterial({ color: 0xffffff }),
    "glass",
  );
  const b = applyBuildingFinish(
    new THREE.MeshStandardMaterial({ color: 0x347e99 }),
    "glass",
  );
  const c = applyBuildingFinish(new THREE.MeshStandardMaterial(), "stone");
  assert.equal(a.customProgramCacheKey(), b.customProgramCacheKey());
  assert.notEqual(a.customProgramCacheKey(), c.customProgramCacheKey());
  assert.equal(a.transparent, false);
  assert.equal(a.map, null);
  [a, b, c].forEach((m) => m.dispose());
});
