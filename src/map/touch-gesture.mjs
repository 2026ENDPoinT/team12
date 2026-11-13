// Decide intent from the whole gesture so small pinch wobble does not pan/rotate.
export function touchTurn(from, to) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function touchGestureMode(start, next) {
  const spread = Math.abs(next.distance - start.distance);
  const travel = Math.hypot(next.mid.x - start.mid.x, next.mid.y - start.mid.y);
  const twist =
    Math.abs(touchTurn(start.angle ?? 0, next.angle ?? 0)) *
    Math.min(start.distance, next.distance) / 2;
  if (twist >= 8 && twist > Math.max(spread, travel) * 1.2) return "twist";
  if (Math.max(spread, travel) < 8) return null;
  return spread > travel * 1.4 ? "zoom" : "rotate";
}
