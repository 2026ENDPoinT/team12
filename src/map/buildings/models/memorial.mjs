import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";

// The field-facing elevation is photo-guided. Unseen sides remain schematic.
export function createMemorialBuilding(building, wallColor) {
  const group = new THREE.Group();
  // First/third footprint points define the long elevation facing the field.
  const [ox, oz] = building.outline[0];
  const [ex, ez] = building.outline[2];
  const angle = Math.atan2(ez - oz, ex - ox);
  const length = Math.hypot(ex - ox, ez - oz);
  const c = Math.cos(angle),
    s = Math.sin(angle);
  group.position.set(ox, 0.9, oz);
  group.rotation.y = -angle;
  const material = (color, roughness = 0.86, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const charcoal = material(wallColor);
  const white = material(0xe0e2da);
  const silver = material(0xa7ada8);
  const glass = material(0x4c8293, 0.3, 0.14);
  const centerGlass = material(0x387c94, 0.25, 0.18);
  const shadow = material(0x495556);
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
  const footprint = building.outline.map(([x, z]) => {
    const dx = x - ox,
      dz = z - oz;
    return [dx * c + dz * s, -dx * s + dz * c];
  });
  const h = building.h;
  const rightTop = h - 3;
  const leftEnd = length * 0.54;
  const centerEnd = length * 0.64;
  // The actual concave footprint stays intact, including the deeper rear wing.
  solid(footprint, 0, 0.45, white);
  const body = solid(footprint, 6, rightTop - 6, charcoal);
  solid(footprint, rightTop, 0.45, white);
  const leftRoof = [
    [0, 0],
    [leftEnd, 0],
    [leftEnd, -16],
    [7.4, -15.75],
  ];
  solid(leftRoof, rightTop, h - rightTop, charcoal);
  solid(leftRoof, h, 0.45, white);
  // Full-height blue glazing divides the two unequal dark wings.
  const centerX = (leftEnd + centerEnd) / 2;
  const centerWidth = centerEnd - leftEnd;
  box(
    centerGlass,
    centerX,
    rightTop / 2,
    0.48,
    centerWidth - 0.6,
    rightTop,
    0.5,
  );
  for (let k = 1; k < 4; k++)
    box(
      silver,
      leftEnd + (centerWidth * k) / 4,
      rightTop / 2,
      0.8,
      0.1,
      rightTop,
      0.12,
    );
  box(white, leftEnd, rightTop / 2, 0.8, 0.55, rightTop, 0.8);
  box(white, centerEnd, rightTop / 2, 0.8, 0.55, rightTop, 0.8);
  // Continuous ribbon windows with thin mullions and projecting ribbed spandrels.
  function ribbon(start, end, y, windowHeight) {
    const width = end - start,
      midpoint = (start + end) / 2;
    box(glass, midpoint, y, 0.5, width, windowHeight, 0.4);
    const panes = Math.max(1, Math.round(width / 2.8));
    for (let k = 0; k <= panes; k++)
      box(
        silver,
        start + (width * k) / panes,
        y,
        0.78,
        0.11,
        windowHeight,
        0.16,
      );
    box(silver, midpoint, y - 0.45, 0.78, width, 0.1, 0.16);
    box(
      white,
      midpoint,
      y + windowHeight / 2 + 0.15,
      0.7,
      width + 0.3,
      0.22,
      0.6,
    );
  }
  function balcony(start, end, y) {
    const width = end - start,
      midpoint = (start + end) / 2;
    box(silver, midpoint, y, 1.05, width, 2.25, 1.1);
    for (let k = 0; k < 5; k++)
      box(charcoal, midpoint, y - 0.9 + k * 0.43, 1.64, width, 0.045, 0.08);
    box(white, midpoint, y + 1.2, 1.0, width + 0.5, 0.18, 1.3);
  }
  const leftStart = 7;
  ribbon(leftStart, leftEnd - 0.5, 9.5, 3.1);
  ribbon(leftStart, leftEnd - 0.5, 15.4, 3.1);
  ribbon(leftStart, leftEnd - 0.5, 22.0, 3.2);
  balcony(4, leftEnd - 0.5, 6.6);
  balcony(4, leftEnd - 0.5, 12.7);
  balcony(7, leftEnd - 0.5, 18.9);
  ribbon(centerEnd + 0.6, length - 7, 9.5, 3.1);
  ribbon(centerEnd + 0.6, length - 7, 15.4, 3.1);
  ribbon(centerEnd + 0.6, length - 4, 20.4, 2.6);
  balcony(centerEnd + 0.5, length - 5, 6.6);
  balcony(centerEnd + 0.5, length - 5, 12.7);
  balcony(centerEnd + 0.5, length - 5, 17.9);
  // White columns stand out against the recessed ground floor and upper loggias.
  for (let x = 5; x < length - 3; x += 7) {
    if (x > leftEnd - 2 && x < centerEnd + 2) continue;
    box(white, x, 3, -0.4, 0.85, 6, 1.0);
  }
  for (let x = 11; x < leftEnd - 1; x += 7)
    box(white, x, 22, 1.0, 0.6, 4.3, 0.8);
  for (let x = centerEnd + 3; x < length - 3; x += 7)
    box(white, x, 20.6, 1.0, 0.6, 3.2, 0.8);
  box(white, length / 2, rightTop + 0.5, 0.2, length + 1, 0.55, 1.2);
  box(white, leftEnd / 2, h + 0.4, 0.2, leftEnd + 1, 0.55, 1.2);
  box(shadow, 24, 2.9, -3.2, 32, 5.6, 0.4);
  box(glass, 25, 2.9, -2.9, 20, 4.9, 0.3);
  box(shadow, 73, 2.9, -3.2, 20, 5.6, 0.4);
  box(glass, 73, 2.9, -2.9, 15, 4.9, 0.3);
  // Pale end wall and taller rear service block, visible in the oblique photo.
  box(white, length - 0.5, rightTop / 2, -12, 1, rightTop, 24);
  box(white, length - 6, h / 2, -35, 11, h, 13);
  box(white, length - 6, h + 0.3, -35, 11.5, 0.6, 13.5);
  for (const y of [10.5, 17.5])
    for (const z of [-5, -18]) box(shadow, length + 0.08, y, z, 0.2, 0.55, 1.1);
  // Unseen elevations use restrained openings rather than invented detail.
  for (let i = 2; i < footprint.length; i++) {
    const [ax, az] = footprint[i],
      [bx, bz] = footprint[(i + 1) % footprint.length];
    const edgeLength = Math.hypot(bx - ax, bz - az);
    if (edgeLength < 5) continue;
    const count = Math.floor(edgeLength / 5);
    const turn = -Math.atan2(bz - az, bx - ax);
    for (let k = 0; k < count; k++) {
      const t = (k + 0.5) / count;
      for (const y of [10, 16.5]) {
        box(glass, ax + (bx - ax) * t, y, az + (bz - az) * t, 2.7, 2.3, 0.35);
        batches.get(glass).at(-1).angle = turn;
      }
    }
  }
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D(),
    color = new THREE.Color();
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((part, i) => {
      dummy.position.set(part.x, part.y, part.z);
      dummy.rotation.set(0, part.angle || 0, 0);
      dummy.scale.set(part.w, part.h, part.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.setRGB(part.shade, part.shade, part.shade));
    });
    mesh.castShadow = mat !== glass && mat !== centerGlass;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  const pickables = [];
  group.traverse((object) => {
    if (!object.isMesh) return;
    object.userData.building = building.id;
    pickables.push(object);
  });
  applyModelFinishes({ stone: [charcoal, white], glass: [glass, centerGlass] });
  return { group, body, pickables };
}
