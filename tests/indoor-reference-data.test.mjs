import assert from "node:assert/strict";
import test from "node:test";
import {
  REFERENCE_BYTES_PER_SHOT,
  validateReferenceData,
} from "../src/indoor/ar/reference-data.mjs";

const shot = {
  id: 15,
  x: 1,
  y: 2,
  f: 1,
  yaw: 90,
  R: [1, 0, 0, 0, 1, 0, 0, 0, 1],
};

test("AR 기준 인덱스와 위치 메타데이터가 같은 버전인지 확인한다", () => {
  const index = new Uint8Array(REFERENCE_BYTES_PER_SHOT);
  assert.equal(validateReferenceData(index, { shots: [shot] }).length, 1);
  assert.throws(
    () => validateReferenceData(index.subarray(1), { shots: [shot] }),
    /버전이 맞지 않습니다/,
  );
});

test("잘못된 카메라 위치 메타데이터를 거부한다", () => {
  const index = new Uint8Array(REFERENCE_BYTES_PER_SHOT);
  assert.throws(
    () => validateReferenceData(index, { shots: [{ ...shot, R: [] }] }),
    /잘못된 위치 기준 메타데이터/,
  );
});
