import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";

// Front/left photo study, fitted approximately to the public footprint.
// Rear details and dimensions remain schematic. No image textures are loaded.
export function createSangsangBuilding(building, wallColor) {
  const group = new THREE.Group();
  const angle = Math.atan2(4.5, 70.8);
  group.position.set(69.7, 0.9, 146.3);
  group.rotation.y = -angle;
  const material = (color, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor);
  const pale = material(0xe1e3dc);
  const darkStone = material(0x687674);
  const glazing = material(0x43758a, 0.32, 0.12);
  const frame = material(0xa4b2b3);
  const shadow = material(0x4e5c60);
  const batches = new Map();
  function box(mat, x, y, z, w, h, d, shade = 1) {
    if (!batches.has(mat)) batches.set(mat, []);
    batches.get(mat).push({ x, y, z, w, h, d, shade });
  }
  function solid(ring, bottom, height, mat) {
    const shape = new THREE.Shape(
      ring.map(([x, z]) => new THREE.Vector2(x, -z)),
    );
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false }),
      mat,
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = bottom;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  const c = Math.cos(angle),
    s = Math.sin(angle);
  const footprint = building.outline.map(([x, z]) => {
    const dx = x - 69.7,
      dz = z - 146.3;
    return [dx * c + dz * s, -dx * s + dz * c];
  });
  solid(footprint, 0, 0.55, pale);
  // The podium steps back behind the tall entrance colonnade.
  box(stone, 43, 5.6, 11.2, 76, 10.2, 19);
  box(pale, 42, 10.5, 11, 82, 1.1, 22);
  for (const z of [1.55, 20.85]) {
    for (let x = 7; x < 81; x += 2.6) {
      box(glazing, x, 4.9, z, 2.25, 7.2, 0.3);
      box(frame, x + 1.2, 4.9, z, 0.12, 7.2, 0.45);
    }
    box(pale, 43, 5.3, z, 76, 0.35, 0.5);
    box(frame, 43, 2.5, z, 76, 0.15, 0.5);
  }
  // A notch beneath the projecting upper frame makes the left-side recess real.
  const frontRing = [
    [0, 0],
    [36, 0],
    [36, 22],
    [10, 22],
    [10, 17],
    [0, 17],
  ];
  const body = solid(frontRing, 15, 20, stone);
  box(stone, 18, 37.5, 11, 36, 5, 22);
  box(stone, 49, 25.2, 11, 26, 28.4, 22);
  box(darkStone, 64.5, 25, 11, 5, 30, 22.6);
  box(stone, 74.5, 25, 11, 15, 29, 22);
  // Front: broad horizontal blue windows inside a substantial pale frame.
  for (let floor = 0; floor < 6; floor++) {
    const y = 17.2 + floor * 3.55;
    box(glazing, -0.18, y, 8.5, 0.36, 2.45, 14.1);
    for (let k = 0; k <= 7; k++)
      box(frame, -0.4, y, 1.5 + k * 2, 0.22, 2.45, 0.1);
    box(pale, -0.35, y - 1.5, 8.5, 0.6, 0.55, 14.3);
  }
  box(pale, -0.15, 27.5, 0.75, 0.65, 25, 1.5);
  box(pale, -0.15, 27.5, 16.25, 0.65, 25, 1.5);
  // Right of the front view: groups of tall slits and recessed ribbon windows.
  for (let x = 3; x < 62; x += 3.4) {
    const ribbon = (x > 18 && x < 26) || (x > 39 && x < 46);
    for (let floor = 0; floor < 6; floor++) {
      const y = 17.2 + floor * 3.55;
      box(glazing, x, y, -0.16, ribbon ? 3.0 : 0.95, ribbon ? 2.4 : 3.0, 0.32);
      box(frame, x, y, -0.36, ribbon ? 3.0 : 0.95, 0.1, 0.12);
    }
  }
  // Left elevation: a denser grid of stone piers and narrow blue windows.
  for (let x = 12; x < 62; x += 2.5) {
    for (let floor = 0; floor < 7; floor++) {
      const y = 13.2 + floor * 3.7;
      box(glazing, x, y, 22.16, 1.12, 2.65, 0.32, 0.94 + (floor % 3) * 0.04);
      box(frame, x, y - 0.45, 22.38, 1.12, 0.12, 0.12);
    }
    box(pale, x + 0.95, 25.2, 22.3, 0.32, 28.4, 0.6);
  }
  // Deep shadow under the overhang, with a single upper ribbon window.
  box(shadow, 5, 25, 17.12, 9.8, 20, 0.25);
  box(pale, 1, 25, 21.5, 1.1, 20, 1.0);
  box(glazing, 5, 37.4, 22.16, 7.6, 1.8, 0.32);
  for (let x = 68; x < 82; x += 2.6) {
    for (let floor = 0; floor < 7; floor++) {
      const y = 13.2 + floor * 3.7;
      for (const z of [-0.16, 22.16]) box(glazing, x, y, z, 1.4, 2.8, 0.32);
    }
  }
  // Rear elevation is intentionally regular until rear photos are available.
  for (let z = 2.5; z < 21; z += 2.7)
    for (let floor = 0; floor < 7; floor++)
      box(glazing, 82.16, 13.2 + floor * 3.7, z, 0.32, 2.8, 1.5);
  // Entrance canopy, tall pillars, and a recessed glass vestibule.
  box(pale, 4.5, 9.8, 11, 10.5, 1, 23);
  for (const x of [0.7, 8.5])
    for (const z of [1.6, 20.3]) box(stone, x, 4.8, z, 0.9, 9.6, 0.9);
  for (const z of [2.2, 14.8]) box(stone, 0.7, 12.5, z, 0.8, 5, 0.8);
  box(glazing, 4.7, 4, 11, 0.35, 7, 15);
  box(frame, 4.4, 4, 11, 0.2, 7, 0.16);
  box(pale, 18, 40.2, 11, 36.7, 0.45, 22.7);
  box(pale, 49, 39.65, 11, 26.5, 0.45, 22.5);
  box(darkStone, 65, 40.3, 11, 5.5, 0.6, 23);
  box(pale, 74.5, 39.7, 11, 15.5, 0.4, 22.5);
  box(darkStone, 72, 40.4, 6, 5, 1.1, 4);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D(),
    color = new THREE.Color();
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((part, i) => {
      dummy.position.set(part.x, part.y, part.z);
      dummy.scale.set(part.w, part.h, part.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.setRGB(part.shade, part.shade, part.shade));
    });
    mesh.castShadow = mat !== glazing;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  const pickables = [];
  group.traverse((object) => {
    if (!object.isMesh) return;
    object.userData.building = building.id;
    pickables.push(object);
  });
  applyModelFinishes({ stone: [stone, pale, darkStone], glass: [glazing] });
  return { group, body, pickables };
}
