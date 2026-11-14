import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../campus/geo.mjs";

// Photo-guided pale stone wings, recessed central bays and low entrance canopy.
export function createHyeseongBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[1],
    [ex, ez] = building.outline[7];
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
  const material = (color, roughness = 0.9, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor),
    pale = material(0xd8d5c4),
    charcoal = material(0x606e6c);
  const glass = material(0x536f72, 0.36, 0.1),
    recess = material(0x384c4c),
    frame = material(0x9aadaa);
  const roof = material(0xa5b2a7),
    joint = material(0xb8b9aa),
    paving = material(0xc6cabb);
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
  // The footprint's forward projection is a canopy, not a four-storey wing.
  const outer = building.outline
      .filter((_, i) => ![3, 4, 5].includes(i))
      .map(local),
    height = 17.2;
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
  const body = volume(0, height, stone);
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
    face(charcoal, len / 2, height + 0.38, len, 0.55, 0.42);
    for (let y = 0.7; y < height; y += 1.05)
      face(joint, len / 2, y, len, 0.025, 0.07, 0.09);
    const count = Math.max(1, Math.floor(len / 4.4)),
      bay = len / count;
    for (let k = 0; k < count; k++) {
      const u = (k + 0.5) * bay,
        x = ax + dx * u;
      if (front && x > 51.2 && x < 68) continue;
      for (let floor = 0; floor < 4; floor++) {
        const y = 2.05 + floor * 4.2,
          w = Math.min(3.15, bay * 0.72);
        face(recess, u, y, w + 0.3, 2.35, 0.16);
        face(glass, u, y - 0.12, w, 1.95, 0.07, 0.21);
        face(frame, u, y + 0.18, w, 0.08, 0.09, 0.28);
        face(frame, u, y - 1.1, w + 0.14, 0.13, 0.35, 0.3);
        face(frame, u, y - 0.12, 0.08, 1.96, 0.08, 0.28);
      }
    }
  }
  // Dark recessed front bands are divided by substantial pale stone piers.
  const entryX = 59.9;
  box(charcoal, entryX, 10.2, 0.16, 17, 14, 0.2);
  for (let floor = 0; floor < 3; floor++) {
    const y = 6.3 + floor * 4.2;
    box(recess, entryX, y, 0.33, 16.4, 2.7, 0.15);
    box(glass, entryX, y - 0.22, 0.47, 15.8, 1.75, 0.08);
    for (const x of [52, 56, 60, 64, 68]) box(pale, x, y, 0.9, 0.55, 3, 1.2);
    box(charcoal, entryX, y - 1.75, 1.1, 17.8, 0.7, 1.7);
    for (let x = 51.2; x < 68.8; x += 0.34)
      box(frame, x, y - 1.75, 2.01, 0.07, 0.65, 0.08);
  }
  for (const x of [51.1, 68.7]) box(charcoal, x, 10.5, 0.6, 0.65, 14, 0.8);
  // Wide, shallow entrance canopy with a corrugated charcoal fascia.
  box(charcoal, entryX, 5.15, 4.2, 19.1, 0.8, 9.1);
  box(pale, entryX, 4.68, 4.2, 18.5, 0.16, 8.7);
  for (let x = 50.5; x < 69.4; x += 0.34)
    box(frame, x, 5.15, 8.82, 0.09, 0.75, 0.12);
  for (const x of [52, 56, 63.8, 67.8]) box(pale, x, 2.3, 6.7, 0.65, 4.6, 0.65);
  box(recess, entryX, 2, 0.25, 16, 4, 0.2);
  box(glass, entryX, 1.9, 0.45, 8, 3.6, 0.12);
  for (let x = entryX - 4; x <= entryX + 4.1; x += 1.33)
    box(frame, x, 1.9, 0.6, 0.12, 3.7, 0.12);
  box(paving, entryX, 0.05, 5.2, 20, 0.25, 10.5);
  for (let step = 0; step < 3; step++)
    box(
      paving,
      entryX,
      -0.2 + step * 0.09,
      11 - step * 0.4,
      19,
      0.15 + step * 0.18,
      0.5,
    );
  // Low side service room beside the entry and a restrained rooftop grille.
  box(stone, 75, 1.8, 1.6, 11.4, 3.6, 3);
  for (const x of [72.3, 77.2]) {
    box(recess, x, 1.8, 3.18, 3.2, 1.5, 0.12);
    for (let u = -1.4; u <= 1.4; u += 0.28)
      box(frame, x + u, 1.8, 3.3, 0.05, 1.5, 0.08);
  }
  box(charcoal, 76, 18.2, -7, 7, 1.5, 4.5);
  for (let y = 17.6; y < 19; y += 0.22)
    for (const z of [-9.3, -4.7]) box(frame, 76, y, z, 7.1, 0.06, 0.1);
  for (const x of [72.4, 79.6])
    for (const z of [-9.3, -4.7]) box(charcoal, x, 18.3, z, 0.12, 1.8, 0.12);
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
  applyModelFinishes({ stone: [stone, pale, charcoal], glass: [glass] });
  return { group, body, pickables, height: 19.3 };
}
