// GPS 위치를 경로 위에 내려 다음 회전과 남은 거리를 계산합니다.
const distance = (a, b) => Math.hypot(b.x - a.x, b.z - a.z);

export const INSTRUCTION = {
  left: "왼쪽 방향",
  right: "오른쪽 방향",
  arrive: "목적지 도착",
};

export function routePoints(path, nodes) {
  const points = [];
  for (const id of path || []) {
    const point = nodes?.[id],
      previous = points.at(-1);
    if (point && (!previous || distance(previous, point) > 0.01))
      points.push({ x: point.x, z: point.z });
  }
  return points;
}

function bearing(a, b) {
  return ((Math.atan2(b.x - a.x, a.z - b.z) * 180) / Math.PI + 360) % 360;
}

function projectOnRoute(points, point) {
  let best = null,
    along = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1],
      b = points[i],
      length = distance(a, b),
      t = Math.max(
        0,
        Math.min(
          1,
          ((point.x - a.x) * (b.x - a.x) +
            (point.z - a.z) * (b.z - a.z)) /
            (length * length),
        ),
      ),
      x = a.x + (b.x - a.x) * t,
      z = a.z + (b.z - a.z) * t,
      offset = Math.hypot(point.x - x, point.z - z);
    if (!best || offset < best.offset)
      best = { along: along + length * t, offset, segment: i - 1 };
    along += length;
  }
  return best && { ...best, total: along };
}

function turns(points) {
  const result = [];
  let along = 0;
  for (let i = 1; i < points.length - 1; i++) {
    along += distance(points[i - 1], points[i]);
    const angle =
      ((bearing(points[i], points[i + 1]) -
        bearing(points[i - 1], points[i]) +
        540) %
        360) -
      180;
    if (Math.abs(angle) >= 35)
      result.push({ along, direction: angle > 0 ? "right" : "left", point: points[i] });
  }
  return result;
}

export function guidanceAt(points, point) {
  if (points.length < 2) return null;
  const at = projectOnRoute(points, point),
    remaining = Math.max(0, at.total - at.along),
    // 지금 걷는 구간의 방위(북 0°, 시계 방향). 데스크톱은 나침반이 없어 이 방향이 화면 위가 되게 지도를 돌립니다.
    heading = bearing(points[at.segment], points[at.segment + 1]);
  if (remaining <= 8)
    return { remaining, heading, next: { direction: "arrive", distance: 0 } };
  const turn = turns(points).find((item) => item.along > at.along + 3);
  return {
    remaining,
    heading,
    nextPoint: turn?.point ?? points.at(-1),
    next: turn
      ? { direction: turn.direction, distance: turn.along - at.along }
      : { direction: "arrive", distance: remaining },
  };
}

// 경로 재계산 뒤에도 처음 안내를 시작한 거리를 기준으로 진행률을 계산합니다.
export function guidanceSummary(remaining, initialMeters) {
  const meters = Math.max(0, remaining);
  return {
    meters: Math.round(meters),
    minutes: Math.max(1, Math.ceil(meters / 70)),
    progress: Math.max(0, Math.min(1, 1 - meters / Math.max(1, initialMeters))),
  };
}
