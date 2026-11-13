import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../geo.mjs";

// Corrected photo reference: tall glazed main block with a low east wing.
export function createAdminBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[3],
    [ex, ez] = building.outline[4];
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
    white = material(0xdedbca),
    roof = material(0xbac4b9);
  const base = material(0x596863),
    glass = material(0x3c7d7d, 0.34, 0.12),
    dark = material(0x405a57);
  const frame = material(0xb3c5be, 0.7, 0.1),
    shade = material(0x718b81),
    paving = material(0xc4c9bc);
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
  const outline = building.outline.map(local);
  // A compact tall main block and a lower east wing, following the aerial view.
  const splitX = 41.7,
    height = 25.5,
    wingHeight = 11.7,
    entryX = 21;
  const tower = [...outline.slice(0, 4), [splitX, 0], ...outline.slice(11)];
  const wing = [[splitX, 0], ...outline.slice(4, 12)];
  function volume(ring, bottom, depth, mat) {
    const shape = new THREE.Shape(
      ring.map(([x, z]) => new THREE.Vector2(x, -z)),
    );
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
  const body = volume(tower, 0, height, wall);
  volume(tower, height, 0.3, roof);
  volume(wing, 0, wingHeight, wall);
  volume(wing, wingHeight, 0.25, roof);
  for (const [ring, h, isTower] of [
    [tower, height, true],
    [wing, wingHeight, false],
  ]) {
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length],
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
      const face = (mat, u, y, w, hh, d, offset = 0.1) =>
        box(
          mat,
          ax + dx * u + nx * offset,
          y,
          az + dz * u + nz * offset,
          w,
          hh,
          d,
          turn,
        );
      if (isTower && front) continue;
      face(base, len / 2, 0.5, len, 1, 0.2);
      face(white, len / 2, h + 0.4, len, 0.5, 0.4);
      const count = Math.max(1, Math.floor(len / 3)),
        bay = len / count,
        floors = isTower ? 6 : 3,
        storey = h / floors;
      for (let f = 0; f < floors; f++) {
        const y = (f + 0.5) * storey;
        for (let k = 0; k < count; k++) {
          const u = (k + 0.5) * bay,
            w = bay * 0.87;
          face(dark, u, y, w + 0.15, storey * 0.78, 0.16);
          face(glass, u, y, w, storey * 0.72, 0.1, 0.23);
          face(frame, u, y, w, 0.08, 0.08, 0.33);
          face(frame, u - bay / 2, y, 0.09, storey * 0.8, 0.08, 0.33);
        }
        face(wall, len / 2, f * storey, len, 0.7, 0.4, 0.15);
        if (!isTower)
          face(shade, len / 2, (f + 1) * storey - 0.4, len, 0.12, 1, 0.6);
      }
    }
  }
  // The entire main front is a glazed screen, framed by tall stone piers.
  box(dark, entryX, 12.7, 0.15, 41.4, 25.4, 0.22);
  box(glass, entryX, 12.7, 0.34, 40.8, 25.2, 0.12);
  for (let x = 1; x < 42; x += 1.35)
    box(frame, x, 12.7, 0.49, 0.07, 25.1, 0.12);
  for (let y = 0.65; y < 25.5; y += 1.4)
    box(frame, entryX, y, 0.5, 40.9, 0.08, 0.12);
  for (let y = 4.2; y < 25.5; y += 4.2)
    box(dark, entryX, y, 0.6, 41, 0.45, 0.2);
  for (let x = 0.7; x < 42; x += 5.1) {
    box(wall, x, 12.9, 1.2, 0.9, 25.8, 1.6);
    box(white, x, 12.9, 2.04, 0.65, 25.8, 0.12);
    for (let y = 4; y < 25; y += 2.1) box(shade, x, y, 2.13, 0.85, 0.06, 0.08);
  }
  // Broad transparent-looking gridded canopy supported at roof height.
  for (let x = -1; x < 44; x += 2) box(dark, x, 25.7, 1.7, 0.18, 0.35, 6.5);
  for (let z = -1.4; z <= 5; z += 1.05)
    box(shade, entryX, 25.85, z, 45, 0.16, 0.15);
  box(wall, entryX, 26.05, -0.6, 42.7, 0.8, 0.8);
  for (let x = 0; x < 43; x += 2.5) box(shade, x, 26.55, -0.1, 0.14, 0.12, 3.8);
  // Symmetrical upper service blocks and roof garden/pergola grid.
  for (const x of [10.7, 34.5]) {
    box(wall, x, 27.4, -16, 7, 3.8, 10);
    box(white, x, 29.4, -16, 7.3, 0.2, 10.3);
    for (const z of [-10.91, -21.1]) {
      box(dark, x, 27.5, z, 5.5, 1.35, 0.16);
      for (let y = 27; y < 28.2; y += 0.22)
        box(shade, x, y, z, 5.5, 0.055, 0.22);
    }
  }
  for (let x = 9; x < 36; x += 3) box(white, x, 26.3, -10, 0.2, 0.25, 13);
  for (let z = -16; z <= -4; z += 3) box(white, 22, 26.3, z, 27, 0.25, 0.2);
  // Subdued solar strips on the lower connecting wing, from the aerial reference.
  for (const x of [50, 69]) {
    box(dark, x, 12.15, -6.3, 12, 0.16, 5);
    for (let u = -5.5; u < 6; u += 1.3)
      box(frame, x + u, 12.25, -6.3, 0.04, 0.03, 5);
    for (let z = -8.8; z <= -3.8; z += 1)
      box(frame, x, 12.25, z, 12, 0.03, 0.04);
  }
  // Entrance glazing and forecourt join the existing approach node.
  box(glass, entryX, 1.9, 1.05, 9, 3.6, 0.15);
  for (let x = entryX - 4.5; x <= entryX + 4.6; x += 1.5)
    box(frame, x, 1.9, 1.2, 0.13, 3.7, 0.15);
  box(paving, entryX, 0.06, 5, 15, 0.28, 9);
  box(paving, 30.2, 0.15, 10.6, 20.5, 0.12, 2.1);
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
  applyModelFinishes({ stone: [wall, white, base], glass: [glass] });
  return { group, body, pickables, height: 29.8 };
}
