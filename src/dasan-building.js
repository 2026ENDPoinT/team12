import * as THREE from "three";

// Photo-guided four-storey courtyard block and taller central tower.
// The source's height is used for the tower, not for eight repeated floors.
export function createDasanBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[2];
  const [ex, ez] = building.outline[8];
  const angle = Math.atan2(ez - oz, ex - ox);
  const c = Math.cos(angle),
    s = Math.sin(angle);
  group.position.set(ox, 0.9, oz);
  group.rotation.y = -angle;
  const local = ([x, z]) => [
    (x - ox) * c + (z - oz) * s,
    -(x - ox) * s + (z - oz) * c,
  ];
  const material = (color, roughness = 0.9, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor);
  const pale = material(0xe3e4dc);
  const joints = material(0xb9bcae);
  const glass = material(0x547f83, 0.35, 0.12);
  const shadow = material(0x4d5e59);
  const grass = material(0x99b579);
  const paving = material(0xc9cbbd);
  const batches = new Map();
  function box(mat, x, y, z, w, h, d, angle = 0) {
    if (!batches.has(mat)) batches.set(mat, []);
    batches.get(mat).push({ x, y, z, w, h, d, angle });
  }
  function shapeFor(ring, holes = []) {
    const shape = new THREE.Shape(
      ring.map(([x, z]) => new THREE.Vector2(x, -z)),
    );
    for (const hole of holes)
      shape.holes.push(
        new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z))),
      );
    return shape;
  }
  function volume(shape, bottom, height, mat) {
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: height,
        bevelEnabled: false,
      }),
      mat,
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = bottom;
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
  // The footprint's shallow front projection is the entry canopy, not a full wing.
  const outer = building.outline
    .filter((_, i) => ![4, 5, 6].includes(i))
    .map(local);
  const holes = building.holes.map((ring) => ring.map(local));
  const height = 18;
  const shape = shapeFor(outer, holes);
  const body = volume(shape, 0, height, stone);
  volume(shape, height, 0.5, pale);
  for (const hole of holes) {
    volume(shapeFor(hole), -0.75, 0.05, grass);
  }
  // Narrow upright openings on outer and courtyard elevations.
  for (const ring of [outer, ...holes]) {
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length];
      const dx = bx - ax,
        dz = bz - az,
        length = Math.hypot(dx, dz);
      if (length < 1) continue;
      const turn = -Math.atan2(dz, dx);
      const count = Math.max(1, Math.floor(length / 2.9));
      for (let k = 0; k < count; k++) {
        const t = (k + 0.5) / count,
          x = ax + dx * t,
          z = az + dz * t;
        const centerFront = z > -1 && x > 34 && x < 57;
        if (centerFront) continue;
        for (let floor = 0; floor < 4; floor++) {
          const y = 2.5 + floor * 4;
          box(
            glass,
            x,
            y,
            z,
            Math.min(0.9, (length / count) * 0.4),
            2.05,
            0.32,
            turn,
          );
          box(pale, x, y - 1.1, z, 1.2, 0.12, 0.48, turn);
        }
      }
      // Raised parapets make the white ring roof and courtyard opening legible.
      box(
        pale,
        (ax + bx) / 2,
        height + 0.7,
        (az + bz) / 2,
        length,
        0.65,
        0.45,
        turn,
      );
      box(joints, (ax + bx) / 2, 0.4, (az + bz) / 2, length, 0.8, 0.4, turn);
    }
  }
  // Central gridded window above a recessed doorway.
  box(glass, 45.5, 12.2, 0.6, 12, 7.3, 0.4);
  for (let x = 39.5; x <= 51.6; x += 1.5)
    box(pale, x, 12.2, 0.85, 0.1, 7.3, 0.14);
  for (let y = 8.55; y <= 16; y += 1.45)
    box(pale, 45.5, y, 0.85, 12, 0.1, 0.14);
  box(shadow, 45.5, 3.3, 0.55, 10, 6.4, 0.45);
  box(glass, 45.5, 3.0, 0.85, 6.8, 5.5, 0.3);
  for (const x of [42.1, 45.5, 48.9]) box(pale, x, 3, 1.05, 0.18, 5.5, 0.14);
  // Low planted canopy visible in the aerial photo.
  box(pale, 45.4, 6.5, 4.8, 23.5, 0.55, 9.5);
  box(grass, 45.4, 6.82, 4.8, 21.9, 0.12, 8.1);
  for (const x of [34.3, 56.4])
    for (const z of [1.2, 8.8]) box(pale, x, 3.1, z, 0.7, 6.2, 0.7);
  // A slender stone tower rises from the inner edge of the front block.
  const towerHeight = building.h;
  const towerX = 45.5,
    towerZ = -14;
  box(stone, towerX, towerHeight / 2, towerZ, 6, towerHeight, 6.5);
  box(pale, towerX, towerHeight + 0.25, towerZ, 6.6, 0.5, 7.1);
  for (const z of [towerZ - 3.3, towerZ + 3.3]) {
    for (const x of [towerX - 1.7, towerX + 1.7])
      box(joints, x, towerHeight / 2, z, 0.16, towerHeight, 0.16);
    box(shadow, towerX, towerHeight / 2 + 1, z, 0.55, towerHeight - 4, 0.18);
    for (let y = 2; y < towerHeight; y += 1.4)
      box(pale, towerX, y, z + 0.04, 5.8, 0.08, 0.2);
  }
  for (const x of [towerX - 3.05, towerX + 3.05])
    for (let z = towerZ - 2.3; z < towerZ + 2.5; z += 1.1)
      box(joints, x, towerHeight / 2, z, 0.16, towerHeight, 0.12);
  // A few restrained rooftop service blocks and courtyard paths.
  box(pale, 13, 19.1, -48, 7, 1.5, 5);
  box(pale, 77, 19.1, -48, 7, 1.5, 5);
  box(paving, 45.5, -0.55, -31, 2, 0.12, 28);
  box(paving, 45.5, -0.55, -28, 60, 0.12, 2);
  const cube = new THREE.BoxGeometry(1, 1, 1),
    dummy = new THREE.Object3D();
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((part, i) => {
      dummy.position.set(part.x, part.y, part.z);
      dummy.rotation.set(0, part.angle, 0);
      dummy.scale.set(part.w, part.h, part.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.castShadow = mat !== glass;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  const pickables = [];
  group.traverse((object) => {
    if (!object.isMesh) return;
    object.userData.building = building.id;
    pickables.push(object);
  });
  return { group, body, pickables };
}
