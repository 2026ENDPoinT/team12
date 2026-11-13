import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../geo.mjs";

// Photo-guided International Hall; orientation follows its south-facing frontage.
export function createInternationalBuilding(building, wallColor) {
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
  const world = (x, z) => ({ x: ox + x * c - z * s, z: oz + x * s + z * c });
  const material = (color, roughness = 0.88, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const wall = material(wallColor),
    pale = material(0xe0e3da),
    base = material(0x5b6a65);
  const glass = material(0x648b85, 0.35, 0.1),
    dark = material(0x3f5954),
    frame = material(0xb0c1b8);
  const shade = material(0x96aaa0),
    roof = material(0xb4c1b4),
    paving = material(0xc7cbbc);
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
  const outer = building.outline.map(local),
    height = 16.8,
    width = Math.hypot(ex - ox, ez - oz),
    entryX = width * 0.68;
  const shape = new THREE.Shape(
    outer.map(([x, z]) => new THREE.Vector2(x, -z)),
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
  const body = volume(0, height, wall);
  volume(height, 0.25, roof);
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
      front = Math.abs(az) < 0.2 && Math.abs(bz) < 0.2;
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
    face(base, len / 2, 1.9, len, 3.8, 0.2);
    face(pale, len / 2, 4.1, len, 0.65, 0.6, 0.23);
    face(pale, len / 2, height + 0.32, len, 0.4, 0.38);
    const count = Math.max(1, Math.floor(len / 3.4)),
      bay = len / count;
    for (let k = 0; k < count; k++) {
      const u = (k + 0.5) * bay,
        x = ax + dx * u;
      if (front && Math.abs(x - entryX) < 5) continue;
      for (let f = 0; f < 4; f++) {
        const y = 2 + f * 4.1,
          w = Math.min(2.7, bay * 0.82);
        face(dark, u, y, w + 0.2, 2.85, 0.16);
        face(glass, u, y, w, 2.6, 0.08, 0.21);
        face(frame, u, y - 0.35, w, 0.075, 0.08, 0.29);
        for (const v of [-w / 2, 0, w / 2])
          face(frame, u + v, y, 0.07, 2.65, 0.08, 0.3);
        if (f > 0) {
          face(pale, u, y - 1.65, bay + 0.05, 0.4, 0.55, 0.2);
          for (const offset of [0.3, 0.65, 1])
            face(shade, u, y + 1.48, w + 0.2, 0.06, 0.12, offset);
          for (const v of [-w / 2, w / 2])
            face(shade, u + v, y + 1.42, 0.07, 0.16, 0.9, 0.55);
        }
      }
    }
  }
  // Broad right-offset recessed hall and a smaller projecting glazed stair box.
  box(dark, entryX, 10.5, 0.15, 9.8, 12.3, 0.18);
  box(glass, entryX, 10.5, 0.31, 9.5, 12.1, 0.1);
  for (let x = entryX - 4.6; x < entryX + 4.8; x += 1.2)
    box(frame, x, 10.5, 0.43, 0.08, 12.1, 0.1);
  for (let y = 4.4; y < 16.7; y += 1.7)
    box(frame, entryX, y, 0.44, 9.6, 0.08, 0.1);
  for (const x of [entryX - 5.3, entryX + 5.3])
    box(pale, x, 10.4, 0.7, 0.9, 12.7, 1.1);
  box(pale, entryX, 16.5, 0.8, 11.5, 0.65, 1.3);
  box(glass, entryX - 2.1, 8.1, 1, 3.5, 7.9, 1.2);
  for (let x = entryX - 3.85; x <= entryX - 0.3; x += 1.15)
    box(frame, x, 8.1, 1.65, 0.1, 7.9, 0.12);
  for (let y = 4.2; y <= 12; y += 1.55)
    box(frame, entryX - 2.1, y, 1.65, 3.6, 0.1, 0.13);
  box(glass, entryX, 1.9, 0.5, 8.7, 3.6, 0.15);
  for (let x = entryX - 4.3; x < entryX + 4.4; x += 1.4)
    box(frame, x, 1.9, 0.65, 0.12, 3.7, 0.14);
  box(pale, entryX, 4.25, 1.65, 11.4, 0.4, 3.5);
  box(paving, entryX, 0.06, 3.7, 12.5, 0.25, 6.7);
  // Stair core and open rooftop frame above the glass hall.
  box(wall, entryX - 2, 19.4, -8, 5, 5, 5.5);
  box(pale, entryX - 2, 22, -8, 5.3, 0.2, 5.8);
  for (const x of [entryX + 1.5, entryX + 9])
    for (const z of [-3, -9]) box(pale, x, 18, z, 0.35, 2.4, 0.35);
  for (let x = entryX + 1.5; x <= entryX + 9; x += 1.5)
    box(pale, x, 19.4, -6, 0.2, 0.25, 7);
  for (const z of [-2.6, -9.4]) box(pale, entryX + 5.3, 19.55, z, 8, 0.2, 0.3);
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
  applyModelFinishes({ stone: [wall, pale, base], glass: [glass] });
  return { group, body, pickables, height: 22.3 };
}
