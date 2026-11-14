import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../campus/geo.mjs";

// Three-storey courtyard block, proportioned from the supplied photographs.
export function createChanghakBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[1],
    [ex, ez] = building.outline[3];
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
  const material = (color, roughness = 0.9) =>
    new THREE.MeshStandardMaterial({ color, roughness });
  const stone = material(wallColor),
    cream = material(0xe5e0cc),
    roof = material(0xe7e8df);
  const gray = material(0x9baba5),
    shadow = material(0x343f3d),
    frame = material(0x596760);
  const glass = material(0x69847c, 0.36),
    joints = material(0xc3b79b),
    lawn = material(0x94a67c);
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
  const height = 12.6,
    shape = shapeFor(outer, holes);
  const body = volume(shape, 0, height, stone);
  volume(shape, height, 0.22, roof);
  for (const hole of holes) volume(shapeFor(hole), -0.7, 0.1, lawn);
  for (const [ringIndex, ring] of [outer, ...holes].entries()) {
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length];
      const length = Math.hypot(bx - ax, bz - az),
        dx = (bx - ax) / length,
        dz = (bz - az) / length;
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
        inner = ringIndex > 0;
      if (inner)
        box(
          cream,
          (ax + bx) / 2 + nx * 0.04,
          height / 2,
          (az + bz) / 2 + nz * 0.04,
          length,
          height,
          0.13,
          turn,
        );
      box(
        roof,
        (ax + bx) / 2,
        height + 0.4,
        (az + bz) / 2,
        length,
        0.48,
        0.32,
        turn,
      );
      box(joints, (ax + bx) / 2, 0.25, (az + bz) / 2, length, 0.5, 0.18, turn);
      const count = Math.max(1, Math.floor(length / (inner ? 4.3 : 4.8)));
      for (let k = 0; k < count; k++) {
        const t = (k + 0.5) / count,
          x = ax + (bx - ax) * t,
          z = az + (bz - az) * t;
        if (!inner && z > -0.2 && x > 34 && x < 58) continue;
        for (let floor = 0; floor < 3; floor++) {
          const y = 2.2 + floor * 3.9;
          for (const offset of inner ? [0] : [-0.62, 0.62]) {
            const wx = x + dx * offset,
              wz = z + dz * offset;
            box(
              shadow,
              wx + nx * 0.11,
              y,
              wz + nz * 0.11,
              0.96,
              2.08,
              0.2,
              turn,
            );
            box(
              glass,
              wx + nx * 0.22,
              y,
              wz + nz * 0.22,
              0.7,
              1.82,
              0.05,
              turn,
            );
            box(
              frame,
              wx + nx * 0.26,
              y - 0.22,
              wz + nz * 0.26,
              0.73,
              0.065,
              0.06,
              turn,
            );
            box(
              cream,
              wx + nx * 0.26,
              y - 1.08,
              wz + nz * 0.26,
              1.02,
              0.12,
              0.3,
              turn,
            );
          }
        }
      }
    }
  }
  // The central entrance is a dark, full-height recess flanked by gray stone.
  box(gray, 46, 6.2, 0.13, 23, 12.4, 0.3);
  box(shadow, 46, 6.4, 0.34, 12.6, 11.7, 0.25);
  for (const x of [40.3, 43.15, 46, 48.85, 51.7])
    box(gray, x, 6.6, 0.66, 0.65, 11.8, 0.8);
  for (const x of [36.8, 38.1, 53.9, 55.2])
    for (let f = 0; f < 3; f++)
      box(glass, x, 2.2 + f * 3.9, 0.35, 0.65, 1.8, 0.1);
  box(glass, 46, 1.5, 0.85, 7.4, 2.8, 0.12);
  for (const x of [42.3, 44.15, 46, 47.85, 49.7])
    box(gray, x, 1.5, 1.02, 0.13, 2.9, 0.14);
  box(gray, 46, 3.3, 2, 16, 0.38, 4.2);
  for (const x of [38.6, 53.4]) box(gray, x, 1.5, 3.4, 0.45, 3, 0.45);
  box(roof, 46, 0.05, 3.2, 17, 0.25, 5.4);
  // Sparse rooftop plant stays on the front wing, away from the courtyard.
  for (const start of [16, 66])
    for (let k = 0; k < 5; k++) {
      box(gray, start + k * 2, 13.5, -5.4, 1.6, 1.3, 1.1);
      for (let y = 13.1; y < 14; y += 0.22)
        box(frame, start + k * 2, y, -4.81, 1.35, 0.055, 0.05);
    }
  for (const [x, z] of [
    [8, -47],
    [78, -47],
  ])
    box(roof, x, 13.3, z, 5.5, 1.2, 4);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
    mesh.castShadow = mat !== glass;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  const pickables = [];
  group.traverse((object) => {
    if (object.isMesh) {
      object.userData.building = building.id;
      pickables.push(object);
    }
  });
  applyModelFinishes({ stone: [stone, cream], glass: [glass] });
  return { group, body, pickables, height: 14.2 };
}
