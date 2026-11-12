import * as THREE from "three";

// Low historic block, perpendicular pitched wings and a central stone tower.
// Roof tiles are procedural geometry, with no external texture downloads.
export function createDaeryukBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[0],
    [ex, ez] = building.outline[17];
  const angle = Math.atan2(ez - oz, ex - ox),
    c = Math.cos(angle),
    s = Math.sin(angle);
  group.position.set(ox, 0.9, oz);
  group.rotation.y = -angle;
  const local = ([x, z]) => [
    (x - ox) * c + (z - oz) * s,
    -(x - ox) * s + (z - oz) * c,
  ];
  const material = (color) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.94, metalness: 0 });
  const stone = material(wallColor),
    trim = material(0xe5e4db);
  const roof = material(0x8b6658),
    tile = material(0x71564c);
  const glass = material(0x526d65),
    recess = material(0x60675d);
  roof.side = THREE.DoubleSide;
  const batches = new Map();
  function add(mat, matrix) {
    if (!batches.has(mat)) batches.set(mat, []);
    batches.get(mat).push(matrix.clone());
  }
  const dummy = new THREE.Object3D();
  function box(mat, x, y, z, w, h, d, angle = 0) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    add(mat, dummy.matrix);
  }
  function beam(mat, a, b, thickness) {
    const direction = new THREE.Vector3().subVectors(b, a);
    dummy.position.copy(a).add(b).multiplyScalar(0.5);
    dummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      direction.clone().normalize(),
    );
    dummy.scale.set(thickness, thickness, direction.length());
    dummy.updateMatrix();
    add(mat, dummy.matrix);
  }
  const footprint = building.outline.map(local);
  const shape = new THREE.Shape(
    footprint.map(([x, z]) => new THREE.Vector2(x, -z)),
  );
  const body = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, {
      depth: 8.2,
      bevelEnabled: false,
    }),
    stone,
  );
  body.rotation.x = -Math.PI / 2;
  body.castShadow = body.receiveShadow = true;
  group.add(body);
  function pitchedRoof(cx, cz, length, width, eave, rise, turn) {
    const co = Math.cos(turn),
      si = Math.sin(turn);
    const point = (u, v, y) =>
      new THREE.Vector3(cx + u * co - v * si, y, cz + u * si + v * co);
    const vertices = [],
      gables = [];
    function triangle(target, a, b, c) {
      target.push(...a.toArray(), ...b.toArray(), ...c.toArray());
    }
    for (const side of [-1, 1]) {
      const a = point(-length / 2, (side * width) / 2, eave);
      const b = point(length / 2, (side * width) / 2, eave);
      const c = point(length / 2, 0, eave + rise);
      const d = point(-length / 2, 0, eave + rise);
      triangle(vertices, a, b, c);
      triangle(vertices, a, c, d);
      beam(trim, a, b, 0.36);
      for (let row = 1; row < 15; row++) {
        const t = row / 15,
          v = ((side * width) / 2) * t;
        const y = eave + rise * (1 - t) + 0.03;
        beam(tile, point(-length / 2, v, y), point(length / 2, v, y), 0.035);
      }
    }
    for (const end of [-1, 1]) {
      const a = point((end * length) / 2, -width / 2, eave);
      const b = point((end * length) / 2, width / 2, eave);
      const top = point((end * length) / 2, 0, eave + rise);
      triangle(gables, a, b, top);
      beam(trim, a, top, 0.5);
      beam(trim, top, b, 0.5);
    }
    beam(
      tile,
      point(-length / 2, 0, eave + rise),
      point(length / 2, 0, eave + rise),
      0.18,
    );
    for (const [positions, mat] of [
      [vertices, roof],
      [gables, stone],
    ]) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, mat);
      // Gables must remain visible from either end without extra meshes.
      if (mat === stone) {
        mesh.material = stone.clone();
        mesh.material.side = THREE.DoubleSide;
      }
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh);
    }
  }
  pitchedRoof(45.5, 16.7, 61.5, 11.6, 8.4, 2.9, 0);
  pitchedRoof(7.5, 12.6, 27.3, 16.7, 8.5, 4.3, Math.PI / 2);
  pitchedRoof(85.1, 14.0, 30.0, 19.6, 8.5, 4.7, Math.PI / 2);
  pitchedRoof(46, 25, 7.3, 10.3, 8.3, 1.8, Math.PI / 2);
  // Two storeys on the central block; tall hall windows on the side wings.
  for (let i = 0; i < footprint.length; i++) {
    const [ax, az] = footprint[i],
      [bx, bz] = footprint[(i + 1) % footprint.length];
    const dx = bx - ax,
      dz = bz - az,
      length = Math.hypot(dx, dz);
    if (length < 2) continue;
    const turn = -Math.atan2(dz, dx),
      count = Math.max(1, Math.floor(length / 4.0));
    for (let k = 0; k < count; k++) {
      const t = (k + 0.5) / count,
        x = ax + dx * t,
        z = az + dz * t;
      const wing = x < 16 || x > 75.5;
      for (const y of wing ? [3.8, 7.1] : [2.0, 6.0]) {
        const wh = wing ? (y > 6 ? 0.65 : 3.7) : 2.4;
        box(glass, x, y, z, 1.8, wh, 0.3, turn);
        box(trim, x, y - wh / 2 - 0.1, z, 2.1, 0.12, 0.48, turn);
        box(trim, x, y, z, 0.09, wh, 0.45, turn);
      }
      if (wing)
        box(
          stone,
          x + (dx / length) * 1.5,
          4.2,
          z + (dz / length) * 1.5,
          0.5,
          8.4,
          0.6,
          turn,
        );
    }
  }
  // Tall rectangular tower, vertical recesses and a simple solid cap.
  const towerX = 46.1,
    towerZ = 14.8,
    height = 21;
  box(stone, towerX, height / 2, towerZ, 5.8, height, 5.8);
  for (const z of [towerZ - 3, towerZ + 3]) {
    for (const x of [towerX - 1.6, towerX, towerX + 1.6]) {
      box(recess, x, 12.2, z, 0.65, 9.7, 0.25);
      box(trim, x - 0.48, 12.2, z, 0.3, 10.3, 0.6);
    }
    for (const x of [towerX - 0.7, towerX + 0.7])
      box(glass, x, 18.5, z, 0.45, 1.8, 0.3);
  }
  box(stone, towerX, 18.8, towerZ, 6.4, 4.4, 6.4);
  for (const z of [towerZ - 3.3, towerZ + 3.3])
    for (const x of [towerX - 0.7, towerX + 0.7])
      box(recess, x, 18.4, z, 0.45, 1.7, 0.25);
  box(trim, towerX, height + 0.2, towerZ, 6.7, 0.4, 6.7);
  box(stone, 46, 2, 28.9, 9.6, 4, 1);
  box(glass, 46, 1.7, 29.5, 4, 3.3, 0.25);
  box(trim, 46, 3.9, 29.3, 10.3, 0.45, 3.8);
  for (const x of [41.5, 50.5]) box(stone, x, 1.8, 30.7, 0.65, 3.6, 0.65);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  for (const [mat, matrices] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, matrices.length);
    matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
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
  return { group, body, pickables, height };
}
