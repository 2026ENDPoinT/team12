import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../geo.mjs";

// Photo-guided courtyard building; roof structures are schematic, not surveyed.
export function createCheongunBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[1],
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
  const material = (color, roughness = 0.88) =>
    new THREE.MeshStandardMaterial({ color, roughness });
  const stone = material(wallColor),
    white = material(0xe5e7df),
    gray = material(0xa5b1a8);
  const glass = material(0x527e7e, 0.34),
    shadow = material(0x455952),
    solar = material(0x354a51, 0.55);
  const roof = material(0xa3b0a0),
    lawn = material(0x879d70),
    paving = material(0xc4c7b9);
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
    holes = building.holes.map((r) => r.map(local));
  const shapeFor = (ring, voids = []) => {
    const shape = new THREE.Shape(
      ring.map(([x, z]) => new THREE.Vector2(x, -z)),
    );
    for (const hole of voids)
      shape.holes.push(
        new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z))),
      );
    return shape;
  };
  function volume(shape, bottom, height, mat) {
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
  const height = 13.5,
    shape = shapeFor(outer, holes),
    body = volume(shape, 0, height, stone);
  volume(shape, height, 0.22, roof);
  for (const hole of holes) volume(shapeFor(hole), -0.7, 0.1, lawn);
  for (const ring of [outer, ...holes])
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
      const turn = -Math.atan2(dz, dx);
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
      face(white, len / 2, height + 0.42, len, 0.6, 0.36);
      for (const y of [4.4, 8.7]) face(white, len / 2, y, len, 0.4, 0.42);
      const count = Math.max(1, Math.floor(len / 4.7)),
        bay = len / count;
      for (let k = 0; k < count; k++) {
        const u = (k + 0.5) * bay,
          x = ax + dx * u,
          z = az + dz * u;
        if (Math.abs(z) < 0.2 && x > 28 && x < 57) continue;
        for (let f = 0; f < 3; f++) {
          const y = 2.3 + f * 4.25,
            w = Math.min(3.15, bay * 0.72);
          face(shadow, u, y, w + 0.3, 2.9, 0.16);
          face(glass, u, y - 0.1, w, 2.5, 0.08, 0.22);
          face(white, u, y - 1.45, w + 0.5, 0.2, 0.65, 0.28);
          for (const offset of [-w / 2, 0, w / 2])
            face(gray, u + offset, y - 0.1, 0.09, 2.6, 0.08, 0.29);
          face(gray, u, y - 0.35, w, 0.09, 0.08, 0.29);
          if (f === 2) face(white, u, y + 1.35, w + 0.5, 0.2, 0.85, 0.35);
        }
      }
    }
  // Projecting central hall and slender white fins over the main entry.
  box(shadow, 43, 9.8, 0.25, 28, 6.4, 0.3);
  box(glass, 43, 9.8, 0.48, 27, 6.1, 0.12);
  box(white, 43, 13.2, 1, 29, 0.5, 2.3);
  box(white, 43, 6.55, 1, 29, 0.45, 2.3);
  for (let x = 29.5; x <= 56.6; x += 1.8) box(white, x, 10, 1, 0.26, 6.1, 1.55);
  box(gray, 43, 9.7, 1.1, 28, 0.13, 0.12);
  box(glass, 43, 2.9, 0.35, 21, 5.3, 0.2);
  for (let x = 32.5; x < 54; x += 2.1) box(gray, x, 2.9, 0.54, 0.14, 5.3, 0.12);
  box(white, 43, 5.8, 2.8, 18, 0.65, 5.8);
  for (const x of [34.4, 51.6]) box(stone, x, 2.65, 4.8, 0.7, 5.3, 0.7);
  box(paving, 43, 0.05, 4.6, 19, 0.3, 8);
  // Aerial reference: paired solar strips on each long wing, separated by
  // the entrance core and long, low clerestory/service structures.
  function solarArray(x, z, w, d) {
    box(gray, x, 14, z, w + 0.25, 0.14, d + 0.25);
    box(solar, x, 14.12, z, w, 0.12, d);
    for (let u = -w / 2; u <= w / 2; u += 1.6)
      box(gray, x + u, 14.2, z, 0.045, 0.03, d);
    for (let v = -d / 2; v <= d / 2; v += 1.3)
      box(gray, x, 14.2, z + v, w, 0.03, 0.045);
  }
  for (const z of [-4.6, -52.4]) {
    solarArray(23, z, 27, 5.2);
    solarArray(63, z, 27, 5.2);
  }
  for (const z of [-12, -61])
    for (const x of [23, 64]) {
      box(white, x, 14.5, z, 24, 1.5, 3.5);
      box(gray, x, 14.7, z + 1.81, 21, 0.7, 0.1);
      for (let u = -10; u <= 10; u += 1.5)
        box(white, x + u, 14.7, z + 1.9, 0.1, 0.8, 0.18);
      box(white, x, 15.35, z, 24.4, 0.2, 3.9);
    }
  for (const z of [-8, -60]) box(white, 43, 14.7, z, 6, 2.1, 6);
  box(paving, 43, -0.55, -34, 2, 0.12, 30);
  box(paving, 43, -0.55, -34, 68, 0.12, 2);
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
  applyModelFinishes({ stone: [stone, white], glass: [glass] });
  return { group, body, pickables, height: 15.8 };
}
