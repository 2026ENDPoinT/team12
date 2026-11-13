import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../geo.mjs";

// Silver horizontal wings and a glazed central hall, guided by supplied photos.
export function createDavinciBuilding(building, wallColor, entrance) {
  const group = new THREE.Group();
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
  // Align the whole entrance composition with the registered path endpoint.
  const entryX = entrance ? local([entrance.x, entrance.z])[0] : 32.6;
  const entryShift = entryX - 38;
  const world = (x, z) => ({ x: ox + x * c - z * s, z: oz + x * s + z * c });
  const material = (color, roughness = 0.87, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor),
    silver = material(0xd2dad6, 0.7, 0.1),
    frame = material(0xa9c4c5, 0.65, 0.12);
  const glass = material(0x457c91, 0.3, 0.15),
    dark = material(0x425f65),
    roof = material(0xb8c4bf),
    paving = material(0xc5cec6);
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
  const outer = building.outline.map(local);
  function volume(ring, bottom, height, mat) {
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
  // Keep the source stepped footprint; only the ground-level piers are open.
  const body = volume(outer, 4, 27.2, stone);
  volume(outer, 31.2, 0.3, roof);
  const left = [
    [0, 0],
    [entryX - 4, 0],
    [entryX - 4, -19.3],
    [-0.3, -19.3],
  ];
  volume(left, 31.2, 1.5, stone);
  volume(left, 32.7, 0.3, roof);
  for (let i = 0; i < outer.length; i++) {
    const [ax, az] = outer[i],
      [bx, bz] = outer[(i + 1) % outer.length],
      len = Math.hypot(bx - ax, bz - az);
    if (len < 1) continue;
    const dx = (bx - ax) / len,
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
      front = Math.abs(az) < 0.15 && Math.abs(bz) < 0.15;
    const face = (mat, u, y, w, h, d, offset = 0.1) =>
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
    // Side walls use restrained narrow glazing; long walls receive ribbon bands.
    const side = Math.abs(dx) < 0.5,
      count = Math.max(1, Math.floor(len / (side ? 6 : 2.8))),
      bay = len / count;
    for (let k = 0; k < count; k++) {
      const u = (k + 0.5) * bay,
        x = ax + dx * u;
      if (front && Math.abs(x - entryX) < 5.3) continue;
      if (k % 3 === 0 || k === count - 1) face(silver, u, 2, 0.85, 4, 0.9);
      if (!side) face(glass, u, 1.9, bay - 0.6, 3.6, 0.13, -0.4);
      for (let f = 0; f < 7; f++) {
        const lower = f < 2;
        const y = lower
          ? 6.2 + f * 4.1
          : 14.5 +
            (f - 2) * 4.1 -
            (x < entryX - 4 && az + dz * u > -19.5 ? 0 : 1.3);
        const w = side
          ? Math.min(0.8, bay * 0.4)
          : f === 0
            ? Math.min(1.3, bay * 0.55)
            : bay - 0.13;
        face(dark, u, y, w + 0.15, 2.95, 0.12);
        face(glass, u, y, w, 2.7, 0.08, 0.2);
        face(frame, u - w / 2, y, 0.09, 2.8, 0.1, 0.3);
        face(frame, u, y - 0.35, w, 0.08, 0.08, 0.29);
        if (!side) {
          face(silver, u, y - 1.62, bay + 0.05, 0.55, 0.65, 0.32);
          face(frame, u, y + 1.47, bay + 0.05, 0.12, 0.7, 0.38);
          // Thin projecting sunshade brackets repeat above the upper ribbons.
          if (!lower)
            face(silver, u - bay / 2 + 0.08, y + 1.36, 0.08, 0.16, 0.95, 0.46);
        }
      }
    }
    face(silver, len / 2, 11.5, len, 0.5, 1.3, 0.42);
  }
  const entryBox = (mat, x, ...args) => box(mat, x + entryShift, ...args);
  // Continuous central atrium, set behind the projecting window wings.
  entryBox(dark, 38, 16.4, 0.18, 9, 32.8, 0.3);
  entryBox(glass, 38, 16.4, 0.4, 8.8, 32.5, 0.12);
  for (let x = 33.6; x <= 42.5; x += 1.1)
    entryBox(frame, x, 16.5, 0.55, 0.085, 32.5, 0.1);
  for (let y = 3.5; y < 33; y += 2.05)
    entryBox(frame, 38, y, 0.56, 8.9, 0.085, 0.1);
  for (let y = 7.5; y < 33; y += 4.1) entryBox(dark, 38, y, 0.7, 9, 0.24, 0.24);
  entryBox(glass, 38, 1.9, 1, 8.2, 3.6, 0.18);
  for (let x = 33.9; x <= 42.2; x += 1.37)
    entryBox(silver, x, 1.9, 1.14, 0.13, 3.8, 0.15);
  entryBox(silver, 38, 4.1, 2, 11.5, 0.35, 3.3);
  for (const x of [32.3, 43.7]) entryBox(silver, x, 5.6, 0.8, 0.95, 11.2, 1);
  entryBox(paving, 38, 0.05, 3.5, 13, 0.25, 6.2);
  // Wide floating cap is the distinctive skyline above the glazed atrium.
  entryBox(dark, 38, 33.8, -8, 25, 0.3, 23);
  entryBox(silver, 38, 34.1, -8, 26, 0.25, 24);
  for (let x = 25.5; x < 51; x += 2)
    entryBox(frame, x, 33.57, -8, 0.07, 0.12, 23);
  box(stone, 51, 32.2, -34, 6, 1.5, 6);
  box(roof, 51, 33, -34, 6.4, 0.22, 6.4);
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
  applyModelFinishes({ stone: [stone, silver], glass: [glass] });
  return { group, body, pickables, height: 34.5 };
}
