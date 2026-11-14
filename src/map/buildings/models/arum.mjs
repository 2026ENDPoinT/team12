import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../campus/geo.mjs";

// Photo-guided C-shaped low block. Adjacent Sangsang buildings are separate models.
export function createArumBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[15],
    [ex, ez] = building.outline[14];
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
    pale = material(0xe5e2d5);
  const roof = material(0xb9c1b5),
    frame = material(0x9faeaa);
  const glass = material(0x4c7478, 0.32, 0.12),
    recess = material(0x465957);
  const solar = material(0x354c54, 0.55, 0.1);
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
  const outline = building.outline.map(local),
    lowHeight = 13.5,
    mainHeight = 18;
  const body = volume(outline, 0, lowHeight, stone);
  volume(outline, lowHeight, 0.35, roof);
  const mainRing = [
    [0, 0],
    [46.1, 0],
    [46.1, 18.7],
    [0.7, 18.5],
  ];
  volume(mainRing, lowHeight, mainHeight - lowHeight, stone);
  volume(mainRing, mainHeight, 0.35, roof);
  // Recessed horizontal windows framed by thick ivory spandrels and square piers.
  for (let i = 0; i < outline.length; i++) {
    const [ax, az] = outline[i],
      [bx, bz] = outline[(i + 1) % outline.length];
    const length = Math.hypot(bx - ax, bz - az);
    if (length < 4) continue;
    const dx = (bx - ax) / length,
      dz = (bz - az) / length;
    let nx = -dz,
      nz = dx;
    if (
      insideBuilding(
        world((ax + bx) / 2 + nx * 0.15, (az + bz) / 2 + nz * 0.15),
        building,
      )
    ) {
      nx = -nx;
      nz = -nz;
    }
    const turn = -Math.atan2(dz, dx);
    const highWall = Math.max(az, bz) < 19 && Math.max(ax, bx) < 47;
    const floors = highWall ? 4 : 3;
    const h = highWall ? mainHeight : lowHeight;
    const bays = Math.max(1, Math.round(length / 4.8)),
      bay = length / bays;
    function face(mat, u, y, w, height, depth, offset = 0) {
      box(
        mat,
        ax + dx * u + nx * offset,
        y,
        az + dz * u + nz * offset,
        w,
        height,
        depth,
        turn,
      );
    }
    // The central court-facing section is a continuous curtain wall instead.
    const courtGlazing = Math.abs(az - 18.6) < 0.7 && Math.abs(bz - 18.6) < 0.7;
    for (let floor = 0; floor < floors; floor++) {
      const y = 2.3 + floor * 4.5;
      for (let k = 0; k < bays; k++) {
        const u = (k + 0.5) * bay;
        const x = ax + dx * u;
        if (courtGlazing && x > 18 && x < 40) continue;
        face(recess, u, y, Math.max(0.5, bay - 0.65), 2.05, 0.25, 0.12);
        face(
          glass,
          u,
          y - 0.08,
          Math.max(0.3, bay - 1.0),
          floor === 0 ? 2.15 : 1.65,
          0.22,
          0.27,
        );
        face(frame, u, y - 0.38, Math.max(0.3, bay - 1.0), 0.09, 0.15, 0.44);
        face(pale, u, y - 1.12, bay - 0.25, 0.15, 0.65, 0.28);
      }
    }
    for (let k = 0; k <= bays; k++) {
      const u = k * bay,
        x = ax + dx * u;
      if (courtGlazing && x > 18 && x < 40) continue;
      face(pale, u, h / 2, 0.48, h, 0.65, 0.32);
    }
    face(pale, length / 2, h + 0.5, length + 0.2, 0.55, 0.8, 0.1);
    face(stone, length / 2, 0.35, length, 0.7, 0.5, 0.1);
  }
  // Large green-grey glazed court facade, flanked by the pale solid volumes.
  box(recess, 29, 9, 18.95, 23, 16.8, 0.3);
  box(glass, 29, 9, 19.16, 22.4, 16.4, 0.25);
  for (let x = 18.2; x <= 40; x += 2.7)
    box(frame, x, 9, 19.36, 0.14, 16.4, 0.18);
  for (let y = 4.5; y <= 14; y += 4.5)
    box(recess, 29, y, 19.42, 22.5, 0.7, 0.45);
  box(pale, 17.3, 9, 19.1, 0.65, 18, 0.75);
  box(pale, 40.7, 9, 19.1, 0.65, 18, 0.75);
  box(pale, 29, 18.5, 19.1, 24.2, 0.6, 0.9);
  box(pale, 29, 3.8, 20.2, 8.2, 0.45, 3.2);
  for (const x of [25.5, 32.5]) box(pale, x, 1.85, 21.5, 0.38, 3.7, 0.38);
  // The flat roofs contain a restrained panel array and an open ivory pergola.
  box(solar, 20.5, 14.0, 87.5, 37, 0.18, 7.4);
  for (let x = 2.5; x < 39; x += 2.5)
    box(frame, x, 14.12, 87.5, 0.045, 0.035, 7.4);
  for (let z = 84.5; z < 91; z += 1.5)
    box(frame, 20.5, 14.12, z, 37, 0.035, 0.045);
  for (const z of [77.8, 82.2]) box(pale, 20.5, 16.7, z, 39, 0.35, 0.35);
  for (let x = 2; x <= 39; x += 5.2) {
    for (const z of [77.8, 82.2]) box(pale, x, 15.2, z, 0.36, 3, 0.36);
    box(pale, x, 16.9, 80, 0.4, 0.35, 6.5);
  }
  box(stone, 35.5, 19.2, 7.5, 9, 2.4, 7);
  box(pale, 35.5, 20.6, 7.5, 9.4, 0.4, 7.4);
  const cube = new THREE.BoxGeometry(1, 1, 1),
    pickables = [];
  for (const [mat, matrices] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, matrices.length);
    matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
    mesh.castShadow = mat !== glass;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  group.traverse((object) => {
    if (!object.isMesh) return;
    object.userData.building = building.id;
    pickables.push(object);
  });
  applyModelFinishes({ stone: [stone, pale], glass: [glass] });
  return { group, body, pickables, height: 20.8 };
}
