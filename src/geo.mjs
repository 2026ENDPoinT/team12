// Three.js와 무관한 평면 지리 계산. 좌표 단위는 데이터 원점 기준 미터입니다.
export function gpsToCampus(latitude, longitude, origin) {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !Number.isFinite(origin?.lat) ||
    !Number.isFinite(origin?.lon)
  )
    return null;
  return {
    x:
      (longitude - origin.lon) *
      111320 *
      Math.cos((origin.lat * Math.PI) / 180),
    // 저장된 캠퍼스 도형은 화면 아래쪽(남쪽)이 +z인 좌표계입니다.
    z: (origin.lat - latitude) * 111132,
  };
}
export function pointInRing(point, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x, z] = ring[i],
      [px, pz] = ring[j];
    if (
      z > point.z !== pz > point.z &&
      point.x < ((px - x) * (point.z - z)) / (pz - z) + x
    )
      inside = !inside;
  }
  return inside;
}
export function insideBuilding(point, building) {
  return (
    pointInRing(point, building.outline) &&
    !building.holes.some((hole) => pointInRing(point, hole))
  );
}
export function projectToSegment(point, a, b) {
  const dx = b.x - a.x,
    dz = b.z - a.z,
    length = dx * dx + dz * dz;
  const t = length
    ? Math.max(
        0,
        Math.min(1, ((point.x - a.x) * dx + (point.z - a.z) * dz) / length),
      )
    : 0;
  const closest = { x: a.x + dx * t, z: a.z + dz * t };
  return {
    point: closest,
    distance: Math.hypot(point.x - closest.x, point.z - closest.z),
    t,
  };
}
