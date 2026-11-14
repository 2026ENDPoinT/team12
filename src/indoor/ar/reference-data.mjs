// ar-index.bin은 각 기준 사진을 46×20 밝기 격자로 변환한 공개용 파생 데이터입니다.
export const REFERENCE_BYTES_PER_SHOT = 46 * 20;

export function validateReferenceData(index, metadata) {
  const shots = metadata?.shots;
  if (!Array.isArray(shots) || shots.length === 0)
    throw new Error("위치 기준 메타데이터가 비어 있습니다");

  for (const shot of shots) {
    if (
      !Number.isInteger(shot.id) ||
      !Number.isFinite(shot.x) ||
      !Number.isFinite(shot.y) ||
      !Number.isFinite(shot.f) ||
      !Number.isFinite(shot.yaw) ||
      !Array.isArray(shot.R) ||
      shot.R.length !== 9
    )
      throw new Error(`잘못된 위치 기준 메타데이터: ${shot?.id ?? "unknown"}`);
  }

  const expected = shots.length * REFERENCE_BYTES_PER_SHOT;
  if (index.byteLength !== expected)
    throw new Error(
      `위치 기준 데이터 버전이 맞지 않습니다: ${index.byteLength}/${expected} bytes`,
    );
  return shots;
}
