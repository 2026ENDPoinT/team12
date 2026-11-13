import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createKeyboardPan } from "../src/map/keyboard-pan.mjs";

function setup() {
  const element = new EventTarget(),
    doc = new EventTarget(),
    win = new EventTarget();
  doc.defaultView = win;
  doc.activeElement = element;
  doc.hidden = false;
  element.ownerDocument = doc;
  const camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 1000);
  camera.position.set(0, 100, 100);
  camera.lookAt(0, 0, 0);
  const controls = { target: new THREE.Vector3() };
  let enabled = true;
  const pan = createKeyboardPan({
    element,
    camera,
    controls,
    isEnabled: () => enabled,
  });
  function key(code, type = "keydown", modifiers = {}) {
    const e = new Event(type, { cancelable: true });
    Object.assign(e, { code, ...modifiers });
    (type === "keydown" ? element : win).dispatchEvent(e);
    return e;
  }
  return {
    element,
    doc,
    win,
    camera,
    controls,
    pan,
    key,
    disable: () => {
      enabled = false;
    },
  };
}
function near(a, b) {
  assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
}

test("W/S zoom without moving the orbit, A/D follows screen heading", () => {
  const x = setup();
  const position = x.camera.position.clone();
  const orientation = x.camera.quaternion.clone();
  assert.equal(x.key("KeyW").defaultPrevented, true);
  x.pan.update(0.02);
  assert.ok(x.camera.zoom > 1);
  near(x.camera.position.distanceTo(position), 0);
  near(x.controls.target.length(), 0);
  near(x.camera.quaternion.angleTo(orientation), 0);
  x.pan.clear();
  x.key("KeyS");
  for (let i = 0; i < 20; i++) x.pan.update(0.02);
  assert.ok(x.camera.zoom < 1);
  x.pan.dispose();
  const rotated = setup();
  rotated.camera.position.set(100, 100, 0);
  rotated.camera.lookAt(0, 0, 0);
  rotated.key("KeyD");
  rotated.key("KeyW");
  rotated.pan.update(0.02);
  assert.ok(rotated.controls.target.z < 0);
  near(rotated.controls.target.x, 0);
  assert.ok(rotated.camera.zoom > 1);
  rotated.pan.dispose();
});

test("typing, modifiers, blur and hidden tabs do not leave keyboard panning active", () => {
  const x = setup();
  x.doc.activeElement = { tagName: "INPUT" };
  assert.equal(x.key("KeyW").defaultPrevented, false);
  x.pan.update(0.02);
  near(x.controls.target.length(), 0);
  near(x.camera.zoom, 1);
  x.doc.activeElement = x.element;
  assert.equal(
    x.key("KeyW", "keydown", { metaKey: true }).defaultPrevented,
    false,
  );
  x.key("KeyW");
  x.pan.update(0.02);
  const before = x.controls.target.clone();
  const zoomBeforeBlur = x.camera.zoom;
  x.element.dispatchEvent(new Event("blur"));
  x.pan.update(0.02);
  near(x.controls.target.distanceTo(before), 0);
  near(x.camera.zoom, zoomBeforeBlur);
  x.key("KeyD");
  x.win.dispatchEvent(new Event("blur"));
  x.pan.update(0.02);
  near(x.controls.target.distanceTo(before), 0);
  x.key("KeyD");
  x.doc.hidden = true;
  x.doc.dispatchEvent(new Event("visibilitychange"));
  x.doc.hidden = false;
  x.pan.update(0.02);
  near(x.controls.target.distanceTo(before), 0);
  x.disable();
  assert.equal(x.key("KeyW").defaultPrevented, false);
  x.pan.dispose();
});

test("release decelerates briefly, zoom scales travel and dispose stops immediately", () => {
  const x = setup();
  x.key("KeyD");
  for (let i = 0; i < 50; i++) x.pan.update(0.02);
  const distance = x.controls.target.x;
  x.key("KeyD", "keyup");
  x.pan.update(0.02);
  assert.ok(x.controls.target.x > distance);
  for (let i = 0; i < 100; i++) x.pan.update(0.02);
  const stopped = x.controls.target.clone();
  x.pan.update(0.02);
  near(x.controls.target.distanceTo(stopped), 0);
  const zoomed = setup();
  zoomed.camera.zoom = 2;
  zoomed.key("KeyD");
  for (let i = 0; i < 50; i++) zoomed.pan.update(0.02);
  near(zoomed.controls.target.x, distance / 2);
  zoomed.pan.dispose();
  const before = x.controls.target.clone();
  x.pan.dispose();
  assert.equal(x.key("KeyW").defaultPrevented, false);
  x.pan.update(0.02);
  near(x.controls.target.distanceTo(before), 0);
});

test("movement is frame-rate independent and Ctrl gives a 2.5x boost", () => {
  const slow = setup(),
    fast = setup(),
    boosted = setup();
  slow.key("KeyD");
  fast.key("KeyD");
  boosted.key("KeyD", "keydown", { ctrlKey: true });
  for (let i = 0; i < 30; i++) slow.pan.update(1 / 30);
  for (let i = 0; i < 120; i++) {
    fast.pan.update(1 / 120);
    boosted.pan.update(1 / 120);
  }
  near(slow.controls.target.x, fast.controls.target.x);
  near(boosted.controls.target.x, fast.controls.target.x * 2.5);
  [slow, fast, boosted].forEach((x) => x.pan.dispose());
});

test("zoom is frame-rate independent, boosted and clamped to configured bounds", () => {
  const slow = setup(),
    fast = setup(),
    boosted = setup();
  slow.key("KeyW");
  fast.key("KeyW");
  boosted.key("KeyW", "keydown", { ctrlKey: true });
  for (let i = 0; i < 15; i++) slow.pan.update(1 / 30);
  for (let i = 0; i < 60; i++) {
    fast.pan.update(1 / 120);
    boosted.pan.update(1 / 120);
  }
  near(slow.camera.zoom, fast.camera.zoom);
  near(Math.log(boosted.camera.zoom), Math.log(fast.camera.zoom) * 2.5);
  fast.controls.minZoom = 0.8;
  fast.controls.maxZoom = 2;
  for (let i = 0; i < 200; i++) fast.pan.update(0.02);
  near(fast.camera.zoom, 2);
  fast.key("KeyW", "keyup");
  fast.key("KeyS");
  for (let i = 0; i < 200; i++) fast.pan.update(0.02);
  near(fast.camera.zoom, 0.8);
  fast.key("KeyS", "keyup");
  fast.key("KeyW");
  fast.pan.update(0.02);
  assert.ok(fast.camera.zoom > 0.8);
  fast.key("KeyW", "keyup");
  for (let i = 0; i < 100; i++) fast.pan.update(0.02);
  const stopped = fast.camera.zoom;
  fast.pan.update(0.02);
  near(fast.camera.zoom, stopped);
  [slow, fast, boosted].forEach((x) => x.pan.dispose());
});

test("Space rises and Shift descends without changing orthographic scale or viewing angle", () => {
  const x = setup(),
    start = x.camera.position.clone(),
    offset = x.camera.position.clone().sub(x.controls.target);
  assert.equal(x.key("Space").defaultPrevented, true);
  for (let i = 0; i < 20; i++) x.pan.update(0.02);
  assert.ok(x.camera.position.y > start.y);
  near(x.camera.position.x, start.x);
  near(x.camera.position.z, start.z);
  near(x.camera.zoom, 1);
  near(x.camera.position.clone().sub(x.controls.target).distanceTo(offset), 0);
  x.pan.clear();
  x.key("ShiftLeft");
  for (let i = 0; i < 50; i++) x.pan.update(0.02);
  assert.ok(x.camera.position.y < start.y);
  for (let i = 0; i < 500; i++) x.pan.update(0.02);
  near(x.camera.position.y, 2);
  x.pan.clear();
  x.key("Space");
  x.pan.update(0.02);
  assert.ok(x.camera.position.y > 2);
  x.element.dispatchEvent(new Event("blur"));
  const stopped = x.camera.position.clone();
  x.pan.update(0.02);
  near(x.camera.position.distanceTo(stopped), 0);
  x.doc.activeElement = { tagName: "INPUT" };
  assert.equal(x.key("Space").defaultPrevented, false);
  x.pan.dispose();
});
