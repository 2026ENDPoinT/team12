import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../campus/geo.mjs";

// The photo elevation faces north, toward the rear-gate approach.
// The south elevation seen from the default camera is an inferred rear facade.
export function createMugungBuilding(building, wallColor) {
  const group = new THREE.Group();
  group.name = "mugung-photo-model";
  const [ox, oz] = building.outline[0],
    [ex, ez] = building.outline[2];
  const angle = Math.atan2(ez - oz, ex - ox),
    c = Math.cos(angle),
    s = Math.sin(angle);
  group.position.set(ox, 0.9, oz);
  group.rotation.y = -angle;
  const local = ([x, z]) => [
    (x - ox) * c + (z - oz) * s,
    -(x - ox) * s + (z - oz) * c,
  ];
  const world = (x, z) => ({ x: ox + x * c - z * s, z: oz + x * s + z * c });
  const material = (color, roughness = 0.88, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor),
    trim = material(0xd5d8d1),
    dark = material(0x626965);
  const base = material(0x7d8780),
    glass = material(0x507e8d, 0.33, 0.12),
    frame = material(0xb7c8c5);
  const recess = material(0x405752),
    louver = material(0x979e94),
    roof = material(0xcbd2c9);
  const batches = new Map(),
    dummy = new THREE.Object3D();
  function box(mat, x, y, z, w, h, d, turn = 0) {
    if (!batches.has(mat)) batches.set(mat, []);
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, turn, 0);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    batches.get(mat).push(dummy.matrix.clone());
  }
  const outline = building.outline.map(local),
    height = 36;
  const shape = new THREE.Shape(
    outline.map(([x, z]) => new THREE.Vector2(x, -z)),
  );
  function volume(bottom, depth, mat) {
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }),
      mat,
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = bottom;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  const body = volume(0, height, stone);
  volume(height, 0.25, roof);
  // Windows and shallow panel joints on all four sides; the photo's central
  // curtain wall is reserved on the north, with a quieter counterpart behind.
  for (let i = 0; i < outline.length; i++) {
    const [ax, az] = outline[i],
      [bx, bz] = outline[(i + 1) % outline.length];
    const len = Math.hypot(bx - ax, bz - az),
      dx = (bx - ax) / len,
      dz = (bz - az) / len;
    let nx = -dz,
      nz = dx;
    if (
      insideBuilding(
        world((ax + bx) / 2 + nx * 0.1, (az + bz) / 2 + nz * 0.1),
        building,
      )
    ) {
      nx = -nx;
      nz = -nz;
    }
    const turn = -Math.atan2(dz, dx),
      north = az < -20 && bz < -20,
      south = Math.abs(az) < 0.1 && Math.abs(bz) < 0.1;
    const face = (mat, u, y, w, h, d, offset = 0.08) =>
      box(
        mat,
        ax + dx * u + nx * offset,
        y,
        az + dz * u + nz * offset,
        w,
        h,
        d,
        turn,
      );
    face(base, len / 2, 1.5, len, 3, 0.18);
    face(trim, len / 2, 36.3, len + 0.3, 0.4, 0.6);
    for (let y = 4; y < 36; y += 4) face(trim, len / 2, y, len, 0.13, 0.2);
    const count = Math.max(1, Math.round(len / 3.65));
    for (let k = 0; k < count; k++) {
      const u = ((k + 0.5) * len) / count,
        x = ax + dx * u;
      if ((north || south) && x > 24 && x < 33) continue;
      for (let f = 0; f < 9; f++) {
        const y = 1.9 + f * 3.9,
          w = f === 8 && north && x > 40 ? 0.75 : 1.65;
        face(recess, u, y, w + 0.18, 2.85, 0.15);
        face(glass, u, y, w, 2.6, 0.09, 0.18);
        face(frame, u, y - 0.35, w + 0.1, 0.09, 0.09, 0.25);
        face(frame, u - w / 2, y, 0.07, 2.7, 0.08, 0.25);
        face(frame, u + w / 2, y, 0.07, 2.7, 0.08, 0.25);
        if (f < 8) {
          face(louver, u, y + 1.55, w + 0.16, 0.43, 0.1, 0.16);
          for (let j = 0; j < 3; j++)
            face(trim, u, y + 1.42 + j * 0.13, w, 0.035, 0.05, 0.23);
        }
      }
      face(trim, u + len / count / 2, 18, 0.045, 35.6, 0.08, 0.12);
    }
  }
  // Front is the negative local-Z / north edge. Photo-left is local +X.
  box(dark, 53, 34.3, -20.99, 25.9, 5, 0.24);
  box(dark, 53, 37.1, -18.8, 26, 2.2, 4);
  box(trim, 53, 38.3, -18.8, 26.4, 0.25, 4.4);
  for (let x = 42; x < 65; x += 2.6) {
    box(glass, x, 34, -21.16, 0.63, 2.3, 0.1);
    for (let y = 33; y < 35.2; y += 0.55)
      box(frame, x, y, -21.24, 0.72, 0.065, 0.08);
  }
  for (const [z, sign, isFront] of [
    [-21, -1, true],
    [0.18, 1, false],
  ]) {
    box(glass, 28.5, 19, z, 8.5, 32, 0.16);
    for (let x = 24.25; x < 33; x += 0.85)
      box(frame, x, 19, z + sign * 0.12, 0.09, 32, 0.12);
    for (let y = 3; y < 36; y += 3.9)
      box(frame, 28.5, y, z + sign * 0.12, 8.6, 0.11, 0.12);
    box(glass, 36, 1.9, z, 15, 3.1, 0.2);
    for (let x = 29; x < 44; x += 1.8)
      box(frame, x, 1.9, z + sign * 0.2, 0.12, 3.2, 0.12);
    box(
      trim,
      36,
      3.8,
      z + sign * 1.4,
      isFront ? 18 : 12,
      0.4,
      isFront ? 3.2 : 2.2,
    );
    if (isFront) {
      // Broad front stair, extending toward the northern access road.
      for (let step = 0; step < 10; step++)
        box(
          base,
          36,
          -0.55 + step * 0.12,
          -27 + step * 0.52,
          17,
          0.13 + step * 0.24,
          0.58,
        );
      for (const x of [27.2, 44.8]) box(trim, x, 1, -23.4, 0.22, 0.14, 6.5);
    }
  }
  box(stone, 27, 37.2, -10, 9, 2.4, 7);
  box(roof, 27, 38.5, -10, 9.4, 0.25, 7.4);
  for (const x of [9, 14]) {
    box(base, x, 36.9, -9, 3.2, 1.2, 2.5);
    for (let k = 0; k < 4; k++)
      box(frame, x - 1.1 + k * 0.7, 37.55, -9, 0.07, 0.12, 2.4);
  }
  const cube = new THREE.BoxGeometry(1, 1, 1);
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.castShadow = mat !== glass;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  const pickables = [];
  group.traverse((o) => {
    if (o.isMesh) {
      o.userData.building = building.id;
      pickables.push(o);
    }
  });
  applyModelFinishes({ stone: [stone, trim, base], glass: [glass] });
  return { group, body, pickables, height: 38.7 };
}
