// 캠퍼스 지형 높이(미터). 데이터의 terrain 격자(scripts/add-terrain.py, Copernicus DEM 기반 근사)를
// 쌍선형 보간해 (x, z) 지점의 지면 높이를 돌려줍니다. 0은 캠퍼스에서 가장 낮은 지면(terrain.base, 해발 m)입니다.
// 지형 데이터가 없으면 모든 곳이 0(평지)입니다.
export function createTerrain(terrain) {
  const valid =
    terrain &&
    Number.isFinite(terrain.step) &&
    terrain.step > 0 &&
    terrain.cols >= 2 &&
    terrain.rows >= 2 &&
    terrain.heights?.length === terrain.cols * terrain.rows;
  if (!valid) return { has: false, base: 0, max: 0, heightAt: () => 0 };
  const { x0, z0, step, cols, rows, heights } = terrain;
  const at = (row, col) => heights[row * cols + col];
  function heightAt(x, z) {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return 0;
    const c = Math.min(Math.max((x - x0) / step, 0), cols - 1),
      r = Math.min(Math.max((z - z0) / step, 0), rows - 1);
    const c0 = Math.min(Math.floor(c), cols - 2),
      r0 = Math.min(Math.floor(r), rows - 2),
      fc = c - c0,
      fr = r - r0;
    const top = at(r0, c0) * (1 - fc) + at(r0, c0 + 1) * fc,
      bottom = at(r0 + 1, c0) * (1 - fc) + at(r0 + 1, c0 + 1) * fc;
    return top * (1 - fr) + bottom * fr;
  }
  let max = 0;
  for (const h of heights) if (h > max) max = h;
  return { has: true, base: terrain.base ?? 0, max, heightAt };
}

// 평지 걷기 속도(분당 70m, 기존 시연값)를 기준으로 경사에 따른 속도를 줄입니다.
// Tobler 보행 함수: 속도 ∝ exp(-3.5·|경사 + 0.05|). 약한 내리막(-5%)이 가장 빠릅니다.
export const FLAT_METERS_PER_MINUTE = 70;
const TOBLER_FLAT = Math.exp(-3.5 * 0.05);
export function walkingSpeed(slope) {
  return (FLAT_METERS_PER_MINUTE * Math.exp(-3.5 * Math.abs(slope + 0.05))) / TOBLER_FLAT;
}
// 휠체어·유모차 기준으로 급경사로 보는 경사(8%)
export const STEEP_SLOPE = 0.08;

// from → to 방향으로 간선을 걸을 때 실제 길이(경사 포함), 걸리는 분, 경사.
// 한쪽이라도 높이를 모르면(null·undefined) 평지로 봅니다.
export function walkLeg(planarMeters, fromY = null, toY = null) {
  const rise =
    Number.isFinite(fromY) && Number.isFinite(toY) ? toY - fromY : 0;
  const slope = planarMeters > 0.5 ? rise / planarMeters : 0;
  const meters = Math.hypot(planarMeters, rise);
  return { meters, minutes: meters / walkingSpeed(slope), slope };
}
