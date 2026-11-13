export const normalizeHeading = (degrees) => ((degrees % 360) + 360) % 360;
export function headingDelta(from, to) {
  return ((to - from + 540) % 360) - 180;
}
export function smoothHeading(from, to, weight) {
  return from == null ? normalizeHeading(to) : normalizeHeading(from + headingDelta(from, to) * weight);
}
export function orientationHeading(event, screenAngle = 0) {
  if (Number.isFinite(event.webkitCompassHeading) &&
      !(Number.isFinite(event.webkitCompassAccuracy) && (event.webkitCompassAccuracy < 0 || event.webkitCompassAccuracy > 50))) {
    return normalizeHeading(event.webkitCompassHeading + screenAngle);
  }
  // 상대 alpha는 북쪽 기준이 아니므로 사용하지 않습니다.
  if ((event.absolute === true || event.type === "deviceorientationabsolute") && Number.isFinite(event.alpha))
    return normalizeHeading(360 - event.alpha + screenAngle);
  return null;
}
export function gpsHeading(coords, previous, point) {
  if (Number.isFinite(coords.heading) && Number.isFinite(coords.speed) && coords.speed >= .8)
    return normalizeHeading(coords.heading);
  if (!previous || !point) return null;
  const dx = point.x - previous.x, dz = point.z - previous.z;
  if (Math.hypot(dx, dz) < Math.max(6, (coords.accuracy || 0) * .8, (previous.accuracy || 0) * .8)) return null;
  return normalizeHeading(Math.atan2(dx, -dz) * 180 / Math.PI);
}
export function cameraOffsetForHeading(heading, distance, tilt = .45) {
  const radians = heading * Math.PI / 180;
  return { x: -Math.sin(radians) * distance * Math.sin(tilt),
    y: distance * Math.cos(tilt), z: Math.cos(radians) * distance * Math.sin(tilt) };
}

export function createHeadingTracker(win, onHeading, onUnavailable = () => {}) {
  let generation = 0, listening = false;
  const receive = (event) => {
    const heading = orientationHeading(event, win.screen?.orientation?.angle ?? win.orientation ?? 0);
    if (heading !== null) onHeading(heading);
  };
  const stop = () => {
    generation++;
    listening = false;
    win.removeEventListener("deviceorientation", receive);
    win.removeEventListener("deviceorientationabsolute", receive);
  };
  return {
    // 반드시 클릭 핸들러 안에서 호출해야 Safari 권한 요청이 가능합니다.
    start() {
      if (listening) return;
      const token = ++generation;
      const Type = win.DeviceOrientationEvent;
      if (!Type || win.isSecureContext === false) { onUnavailable(); return; }
      let permission;
      try { permission = typeof Type.requestPermission === "function" ? Type.requestPermission(true) : "granted"; }
      catch { onUnavailable(); return; }
      Promise.resolve(permission).then((result) => {
        if (token !== generation) return;
        if (result !== "granted") { onUnavailable(); return; }
        listening = true;
        win.addEventListener("deviceorientationabsolute", receive);
        win.addEventListener("deviceorientation", receive);
      }).catch(() => { if (token === generation) onUnavailable(); });
    },
    stop,
  };
}
