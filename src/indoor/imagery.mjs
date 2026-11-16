export function photoNear(shots, x, y, floor, yaw, radius = 3.5) {
  let best = null;
  for (const shot of shots || []) {
    if (shot.f !== floor) continue;
    const distance = Math.hypot(shot.x - x, shot.y - y);
    const angle =
      yaw == null
        ? 0
        : Math.abs(((((shot.yaw - yaw + 540) % 360) + 360) % 360) - 180);
    if (distance > radius || angle > 45) continue;
    const score = distance + angle * 0.05;
    if (!best || score < best.score) best = { score, shot };
  }
  return best?.shot ?? null;
}

// 데모에는 위치 정답을 넣지 않고 촬영 당시 기울기·롤만 보정합니다.
export function demoTiltAt(demo, time) {
  const samples = demo?.attitudes;
  if (!samples?.length) return null;
  let lo = 0,
    hi = samples.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (samples[mid].t < time) lo = mid + 1;
    else hi = mid;
  }
  const current = samples[lo];
  const previous = samples[Math.max(0, lo - 1)];
  const R = (
    Math.abs(previous.t - time) < Math.abs(current.t - time)
      ? previous
      : current
  ).R;
  if (!Array.isArray(R) || R.length !== 9 || !R.every(Number.isFinite))
    return null;
  const heading = Math.atan2(R[5], R[2]);
  const c = Math.cos(heading),
    s = Math.sin(heading);
  return [
    c * R[0] + s * R[3],
    c * R[1] + s * R[4],
    c * R[2] + s * R[5],
    -s * R[0] + c * R[3],
    -s * R[1] + c * R[4],
    -s * R[2] + c * R[5],
    R[6],
    R[7],
    R[8],
  ];
}

// 녹화 데모는 실제로 촬영한 복도 경유점을 따라가며, 현재 위치는 AR이 별도로 추정합니다.
export function demoRoute(base, demo, indoor) {
  if (!base || !demo.waypoints?.length) return base;
  const floor = demo.floor;
  const points = [base.pts[0], ...demo.waypoints, base.pts.at(-1)].map(
    (point) => {
      if (
        Number.isFinite(point.x) &&
        Number.isFinite(point.y) &&
        !indoor.walk(floor, point.x, point.y)
      ) {
        const near = indoor.nearest?.(floor, point.x, point.y, 0.8);
        if (near) return { ...point, x: near[0], y: near[1] };
      }
      return point;
    },
  );
  if (
    !indoor.floors.includes(floor) ||
    points.some(
      (p) =>
        !Number.isFinite(p.x) ||
        !Number.isFinite(p.y) ||
        (p.f != null && p.f !== floor) ||
        !indoor.walk(floor, p.x, p.y),
    )
  )
    throw new Error("데모 경유점이 실내 보행 영역을 벗어났습니다.");
  const pts = points
    .filter(
      (p, i) =>
        !i || Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y) > 0.1,
    )
    .map((p) => ({
      x: p.x,
      y: p.y,
      f: floor,
      z: indoor.FL(floor).z,
      kind: "walk",
    }));
  const len = pts
    .slice(1)
    .reduce((sum, p, i) => sum + Math.hypot(p.x - pts[i].x, p.y - pts[i].y), 0);
  return {
    ...base,
    pts,
    legs: [
      {
        kind: "walk",
        f: floor,
        pts: pts.map((p) => [p.x, p.y]),
        i0: 0,
        i1: pts.length - 1,
      },
    ],
    len,
    cost: len,
    vertical: [],
    stairFloors: 0,
  };
}
