import * as THREE from "three";

const PAN_KEYS = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "Space"]);
const BOOST_KEYS = new Set(["ControlLeft", "ControlRight"]);
const SHIFT_KEYS = new Set(["ShiftLeft", "ShiftRight"]);

// Canvas-scoped controls: typing into search fields never moves the map.
export function createKeyboardPan({ element, camera, controls, isEnabled }) {
  const pressed = new Set();
  const ownerDocument = element.ownerDocument;
  const ownerWindow = ownerDocument.defaultView;
  const right = new THREE.Vector3();
  const displacement = new THREE.Vector3(),
    velocity = new THREE.Vector3(),
    desiredVelocity = new THREE.Vector3();
  let zoomVelocity = 0;
  function clear() {
    pressed.clear();
    velocity.set(0, 0, 0);
    zoomVelocity = 0;
  }
  function keydown(event) {
    if (
      (!PAN_KEYS.has(event.code) &&
        !SHIFT_KEYS.has(event.code) &&
        !BOOST_KEYS.has(event.code)) ||
      event.metaKey ||
      event.altKey ||
      event.isComposing
    )
      return;
    if (!isEnabled() || ownerDocument.activeElement !== element) return;
    event.preventDefault();
    pressed.add(event.code);
    if (event.shiftKey) pressed.add("Shift");
    if (event.ctrlKey) pressed.add("Control");
  }
  function keyup(event) {
    pressed.delete(event.code);
    if (SHIFT_KEYS.has(event.code)) pressed.delete("Shift");
    if (BOOST_KEYS.has(event.code)) pressed.delete("Control");
  }
  function visibilityChange() {
    if (ownerDocument.hidden) clear();
  }
  element.addEventListener("keydown", keydown);
  element.addEventListener("blur", clear);
  ownerWindow.addEventListener("keyup", keyup);
  ownerWindow.addEventListener("blur", clear);
  ownerDocument.addEventListener("visibilitychange", visibilityChange);
  return {
    clear,
    update(deltaSeconds) {
      if (
        !isEnabled() ||
        ownerDocument.hidden ||
        ownerDocument.activeElement !== element
      ) {
        clear();
        return;
      }
      if (!pressed.size && velocity.lengthSq() < 0.0001 && !zoomVelocity)
        return;
      const horizontal =
        Number(pressed.has("KeyD")) - Number(pressed.has("KeyA"));
      const zoomInput =
        Number(pressed.has("KeyW")) - Number(pressed.has("KeyS"));
      const vertical =
        Number(pressed.has("Space")) -
        Number(
          pressed.has("Shift") ||
            pressed.has("ShiftLeft") ||
            pressed.has("ShiftRight"),
        );
      const fast =
        pressed.has("Control") ||
        pressed.has("ControlLeft") ||
        pressed.has("ControlRight");
      const boost = fast ? 2.5 : 1;
      // Camera-local right keeps A/D aligned with the screen at every orbit angle.
      right.set(1, 0, 0).applyQuaternion(camera.quaternion);
      right.y = 0;
      right.normalize();
      desiredVelocity
        .copy(right)
        .multiplyScalar(
          horizontal *
            ((camera.top - camera.bottom) / camera.zoom) *
            0.75 *
            boost,
        );
      desiredVelocity.y =
        vertical * ((camera.top - camera.bottom) / camera.zoom) * 0.5 * boost;
      const moving = horizontal || vertical;
      const dt = THREE.MathUtils.clamp(deltaSeconds, 0, 0.05);
      const responseTime = moving ? 0.075 : 0.09;
      const blend = 1 - Math.exp(-dt / responseTime);
      // Integrate the exponential response exactly: same travel at 30/60/120 Hz.
      displacement
        .copy(velocity)
        .sub(desiredVelocity)
        .multiplyScalar(responseTime * blend)
        .addScaledVector(desiredVelocity, dt);
      velocity.lerp(desiredVelocity, blend);
      if (!moving && velocity.lengthSq() < 0.0001) velocity.set(0, 0, 0);
      // Translate camera and target together to preserve the orthographic viewing angle.
      const nextHeight = THREE.MathUtils.clamp(
        camera.position.y + displacement.y,
        2,
        2000,
      );
      if (nextHeight !== camera.position.y + displacement.y) velocity.y = 0;
      displacement.y = nextHeight - camera.position.y;
      camera.position.add(displacement);
      controls.target.add(displacement);
      // Smooth logarithmic zoom gives W/S the same feel at any starting scale.
      const desiredZoomVelocity = zoomInput * 1.1 * boost;
      const zoomResponse = zoomInput ? 0.075 : 0.09;
      const zoomBlend = 1 - Math.exp(-dt / zoomResponse);
      const zoomDelta =
        (zoomVelocity - desiredZoomVelocity) * zoomResponse * zoomBlend +
        desiredZoomVelocity * dt;
      zoomVelocity += (desiredZoomVelocity - zoomVelocity) * zoomBlend;
      const minZoom = controls.minZoom ?? 0.5;
      const maxZoom = controls.maxZoom ?? 12;
      const nextZoom = THREE.MathUtils.clamp(
        camera.zoom * Math.exp(zoomDelta),
        minZoom,
        maxZoom,
      );
      if (nextZoom !== camera.zoom) {
        camera.zoom = nextZoom;
        camera.updateProjectionMatrix();
      }
      if (
        (!zoomInput && Math.abs(zoomVelocity) < 0.0001) ||
        (nextZoom === minZoom && zoomVelocity < 0) ||
        (nextZoom === maxZoom && zoomVelocity > 0)
      )
        zoomVelocity = 0;
    },
    dispose() {
      clear();
      element.removeEventListener("keydown", keydown);
      element.removeEventListener("blur", clear);
      ownerWindow.removeEventListener("keyup", keyup);
      ownerWindow.removeEventListener("blur", clear);
      ownerDocument.removeEventListener("visibilitychange", visibilityChange);
    },
  };
}
