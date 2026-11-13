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
      best = { along: along + length * t, offset };
    along += length;
  }
  return best && { ...best, total: along };
}

const TURN_DEGREES = 35, // 이만큼 이상 방향이 바뀌어야 회전으로 안내
  BEND_DEGREES = 3, // 이보다 작게 꺾이는 점은 곧은 길로 봄
  BEND_GAP = 20; // 이 거리(m) 안에 이어진 꺾임은 하나의 굽은 구간으로 묶음

const angleBetween = (from, to) => ((to - from + 540) % 360) - 180;

// 회전은 꺾이는 점 하나의 각도가 아니라, 가까이 이어진 꺾임들을 묶은 "굽은 구간"에
// 들어가기 전과 나온 뒤의 방향 차이로 판단합니다. 그래서 길이 살짝 옆으로 비켜 갔다가
// 원래 방향으로 돌아오는 S자 구간은 직진으로, 여러 번에 나눠 크게 도는 모퉁이는 회전 하나로 안내합니다.
function turns(points) {
  const bends = [];
  let along = 0;
  for (let i = 1; i < points.length - 1; i++) {
    along += distance(points[i - 1], points[i]);
    bends.push({
      i,
      along,
      angle: angleBetween(bearing(points[i - 1], points[i]), bearing(points[i], points[i + 1])),
    });
  }
  const result = [];
  for (let k = 0; k < bends.length; k++) {
    if (Math.abs(bends[k].angle) < BEND_DEGREES) continue;
    let end = k;
    while (
      end + 1 < bends.length &&
      Math.abs(bends[end + 1].angle) >= BEND_DEGREES &&
      bends[end + 1].along - bends[end].along <= BEND_GAP
    )
      end++;
    const first = bends[k],
      last = bends[end],
      net = angleBetween(
        bearing(points[first.i - 1], points[first.i]),
        bearing(points[last.i], points[last.i + 1]),
      );
    if (Math.abs(net) >= TURN_DEGREES) {
      // 안내 지점은 묶음 안에서 가장 크게 꺾이는 점
      const main = bends
        .slice(k, end + 1)
        .reduce((a, b) => (Math.abs(b.angle) > Math.abs(a.angle) ? b : a));
      result.push({ along: main.along, direction: net > 0 ? "right" : "left", point: points[main.i] });
    }
    k = end;
  }
  return result;
}

function routeHeading(points, lookAhead) {
  let along = 0;
  for (let i = 1; i < points.length; i++) {
    along += distance(points[i - 1], points[i]);
    if (along > lookAhead) return bearing(points[i - 1], points[i]);
  }
  return bearing(points.at(-2), points.at(-1));
}

export function guidanceAt(points, point) {
  if (points.length < 2) return null;
  const at = projectOnRoute(points, point),
    remaining = Math.max(0, at.total - at.along);
  if (remaining <= 8)
    return { remaining, next: { direction: "arrive", distance: 0 } };
  const turn = turns(points).find((item) => item.along > at.along + 3);
  return {
    remaining,
    heading: routeHeading(points, at.along + 3),
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
