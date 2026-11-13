// 미래관 실내 좌표(x 동, y 북) ↔ 캠퍼스 지도 좌표(X 동, Z 남) 변환.
// 변환 값은 data/mirae/entrances.json 의 campusTransform (도면을 건물 외곽선에 맞춘 결과)입니다.
export function createAlign(t) {
  const r = (t.rotationDeg * Math.PI) / 180,
    c = Math.cos(r),
    s = Math.sin(r);
  return {
    toCampus: (x, y) => ({ x: c * x + s * y + t.tx, z: s * x - c * y + t.tz }),
    toIndoor: (X, Z) => ({
      x: c * (X - t.tx) + s * (Z - t.tz),
      y: s * (X - t.tx) - c * (Z - t.tz),
    }),
    // 실내 방위(도, 동쪽 0 반시계) → 캠퍼스 화면 방위
    northOffsetDeg: t.rotationDeg,
  };
}
