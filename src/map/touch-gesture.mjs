// Decide intent from the whole gesture so small pinch wobble does not pan/rotate.
export function touchGestureMode(start, next) {
  const spread = Math.abs(next.distance - start.distance);
  const travel = Math.hypot(next.mid.x - start.mid.x, next.mid.y - start.mid.y);
  if (Math.max(spread, travel) < 8) return null;
  return spread > travel * 1.4 ? "zoom" : "rotate";
}
