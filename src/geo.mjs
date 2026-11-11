// Three.js와 무관한 평면 지리 계산. 좌표 단위는 데이터 원점 기준 미터입니다.

// 위경도 ↔ 미터 변환은 이 두 함수(toScene, toLngLat)만 씁니다.
// 지도 데이터를 만든 SMASH-SEOULTECH tools/build_campus.py와 같은 식입니다.
// 원점은 데이터의 meta(위도·경도)이고, +x는 동쪽, +z는 남쪽(화면 아래쪽)입니다.
function metersPerDegree(originLat) {
  const phi = (originLat * Math.PI) / 180;
  return {
    lat: 111132.92 - 559.82 * Math.cos(2 * phi) + 1.175 * Math.cos(4 * phi),
    lon: 111412.84 * Math.cos(phi) - 93.5 * Math.cos(3 * phi),
  };
}
const validOrigin = (origin) =>
  Number.isFinite(origin?.lat) && Number.isFinite(origin?.lon);

// [경도, 위도] → { x, z } (미터)
export function toScene(lngLat, origin) {
  const [longitude, latitude] = lngLat ?? [];
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !validOrigin(origin)
  )
    return null;
  const m = metersPerDegree(origin.lat);
  return {
    x: (longitude - origin.lon) * m.lon,
    z: (origin.lat - latitude) * m.lat,
  };
}

// { x, z } (미터) → [경도, 위도]
export function toLngLat(point, origin) {
  if (
    !Number.isFinite(point?.x) ||
    !Number.isFinite(point?.z) ||
    !validOrigin(origin)
  )
    return null;
  const m = metersPerDegree(origin.lat);
  return [origin.lon + point.x / m.lon, origin.lat - point.z / m.lat];
}

// GPS 콜백용 이름. 인자 순서(위도, 경도)는 기존 호출부와 같습니다.
export function gpsToCampus(latitude, longitude, origin) {
  return toScene([longitude, latitude], origin);
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
