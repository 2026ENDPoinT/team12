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
});

test("층 정보에 공개 지도와 추가 공식 자료를 반영한다", () => {
  assert.equal(buildingInfo("미래관").floors, "B1 · 1F–5F");
  assert.equal(buildingInfo("상상관").floors, "B1 · 1F–8F");
  assert.equal(buildingInfo("다산관").floors, "B1 · 1F–7F");
  assert.equal(buildingInfo("서울테크노파크").floors, "B1 · 1F–12F");
  assert.equal(buildingInfo("미래관").hours, undefined);
});

test("공식 생활관 출입 시간은 입주생 기준으로 표시한다", () => {
  assert.deepEqual(buildingInfo("누리학사"), {
    floors: "B1 · 1F–10F",
    hours: "24시간 (입주생)",
  });
  assert.equal(buildingInfo("창명학사").floors, "1F–4F");
  assert.equal(buildingInfo("수림학사").floors, "B1 · 1F–7F");
  assert.equal(buildingInfo("테크노큐브").floors, "B1 · 1F–12F");
});
