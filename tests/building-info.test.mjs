import test from "node:test";
import assert from "node:assert/strict";
import { BUILDING_INFO, buildingInfo } from "../src/building-info.mjs";
import { BUILDINGS } from "../src/data.mjs";

test("건물 정보는 실제 지도에 있는 건물 이름으로만 적는다", () => {
  const names = new Set(BUILDINGS.map((b) => b.name));
  for (const name of Object.keys(BUILDING_INFO))
    assert.ok(names.has(name), `${name}은 지도 건물 이름과 같아야 해요`);
});

test("정보가 없는 건물은 빈 객체를 돌려준다", () => {
  assert.deepEqual(buildingInfo("없는 건물"), {});
  assert.equal(buildingInfo("미래관").floors, "B1–7F");
});
