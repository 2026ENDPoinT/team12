import * as THREE from "three";

// Photo-guided approximation. The source's 4 m height describes neither the
// photographed tower nor its proportions; use a visual height without changing GIS.
export function createTechnocubeBuilding(building, wallColor) {
  const group = new THREE.Group();
  const [ox, oz] = building.outline[2],
    [ex, ez] = building.outline[4];
  const angle = Math.atan2(ez - oz, ex - ox);
  const c = Math.cos(angle),
    s = Math.sin(angle);
  const width = Math.hypot(ex - ox, ez - oz);
  group.position.set(ox, 0.9, oz);
  group.rotation.y = -angle;
  const local = ([x, z]) => [
    (x - ox) * c + (z - oz) * s,
    -(x - ox) * s + (z - oz) * c,
  ];
  const material = (color, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor);
  const pale = material(0xc9cbbf);
  const dark = material(0x596360);
  const glazing = material(0x357c97, 0.3, 0.14);
  const greenGlass = material(0x4a8187, 0.32, 0.14);
  const mullions = material(0xa9b8b5);
  const shadow = material(0x3b4b4c);
  const batches = new Map();
  function box(mat, x, y, z, w, h, d, angle = 0, shade = 1) {
    if (!batches.has(mat)) batches.set(mat, []);
    batches.get(mat).push({ x, y, z, w, h, d, angle, shade });
  }
  function volume(ring, bottom, height, mat) {
    const shape = new THREE.Shape(
      ring.map(([x, z]) => new THREE.Vector2(x, -z)),
    );
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
  const footprint = building.outline.map(local);
  const height = 56,
    baseHeight = 11;
  volume(footprint, 0, baseHeight, dark);
  volume(footprint, baseHeight, 0.5, pale);
  const mainEnd = width * 0.72;
  const mainRing = [
    [0, -29],
    [mainEnd, -29],
    [mainEnd, -5],
    [0, -5],
  ];
  const body = volume(mainRing, baseHeight, 39, stone);
  volume(mainRing, 50, 0.4, pale);
  // A tall side pier and bridging top box leave a real, deep slot below it.
  box(pale, width - 1.5, 33.5, -17, 3, 45, 26);
  box(
    shadow,
    (mainEnd + width - 3) / 2,
    30.5,
    -28.8,
    width - 3 - mainEnd,
    39,
    0.4,
  );
  box(pale, (mainEnd + width) / 2 - 2, 53, -17, width - mainEnd + 4, 6, 26);
  // Dark broad elevation, with upright individual windows and a gridded stone rhythm.
  box(dark, mainEnd / 2, 30.5, -4.8, mainEnd, 39, 0.4);
  for (let x = 1.5; x < mainEnd - 0.5; x += 2.5) {
    for (let floor = 0; floor < 9; floor++) {
      const y = 14.0 + floor * 3.9;
      box(
        greenGlass,
        x,
        y,
        -4.52,
        0.95,
        2.35,
        0.28,
        0,
        0.93 + ((Math.round(x) + floor) % 5) * 0.035,
      );
      box(mullions, x, y, -4.32, 0.95, 0.08, 0.12);
    }
    box(stone, x + 0.9, 30.5, -4.5, 0.14, 39, 0.32);
  }
  for (let y = 12; y < 49; y += 3.9)
    box(stone, mainEnd / 2, y, -4.5, mainEnd, 0.18, 0.32);
  // Top projecting box: horizontal glazing on one face, narrow slits on the end.
  const bridgeStart = mainEnd - 3.5,
    bridgeEnd = width - 2.5;
  box(
    shadow,
    (bridgeStart + bridgeEnd) / 2,
    53,
    -3.8,
    bridgeEnd - bridgeStart + 0.6,
    4.4,
    0.35,
  );
  box(
    greenGlass,
    (bridgeStart + bridgeEnd) / 2,
    53,
    -3.55,
    bridgeEnd - bridgeStart - 1.2,
    3.1,
    0.3,
  );
  for (let x = bridgeStart + 0.5; x < bridgeEnd; x += 1.3)
    box(mullions, x, 53, -3.8 + 0.45, 0.08, 3.1, 0.12);
  for (let z = -27; z < -5; z += 2.7)
    box(glazing, width + 0.1, 53, z, 0.25, 3.7, 0.8);
  // Opposite photograph: tall blue strips, pale fins, and a framed upper window.
  const blueWidth = mainEnd * 0.5;
  const raisedRing = [
    [0, -29],
    [blueWidth, -29],
    [blueWidth, -5],
    [0, -5],
  ];
  volume(raisedRing, 50, 4, stone);
  volume(raisedRing, 54, 0.4, pale);
  box(greenGlass, blueWidth / 2, 52, -4.8, blueWidth - 1, 2.7, 0.35);
  box(glazing, blueWidth / 2, 32.5, -29.2, blueWidth, 43, 0.4);
  for (let x = 0; x <= blueWidth; x += 1.5)
    box(pale, x, 32.5, -29.5, 0.42, 43.3, 0.55);
  for (let y = 13; y < 54; y += 4)
    box(mullions, blueWidth / 2, y, -29.48, blueWidth, 0.09, 0.15);
  for (let x = blueWidth + 1.2; x < mainEnd; x += 2.2)
    for (let floor = 0; floor < 9; floor++) {
      const y = 14 + floor * 3.9;
      box(glazing, x, y, -29.2, 0.95, 2.8, 0.35);
      box(pale, x + 0.75, y, -29.4, 0.28, 3.9, 0.45);
    }
  box(
    glazing,
    (bridgeStart + bridgeEnd) / 2,
    53,
    -30.18,
    bridgeEnd - bridgeStart - 0.8,
    3.4,
    0.35,
  );
  for (let x = bridgeStart; x < bridgeEnd; x += 1.5)
    box(mullions, x, 53, -30.43, 0.08, 3.4, 0.12);
  // Restrained openings on the main end wall.
  for (let z = -27; z < -6; z += 3.4)
    for (let floor = 0; floor < 9; floor++)
      box(greenGlass, -0.15, 14 + floor * 3.9, z, 0.3, 2.3, 1.0);
  // Three-storey podium: thin vertical fins, horizontal window bands, glass entry.
  for (let i = 0; i < footprint.length; i++) {
    const [ax, az] = footprint[i],
      [bx, bz] = footprint[(i + 1) % footprint.length];
    const dx = bx - ax,
      dz = bz - az,
      length = Math.hypot(dx, dz);
    if (length < 1) continue;
    const turn = -Math.atan2(dz, dx),
      count = Math.max(1, Math.round(length / 1.35));
    for (let k = 0; k < count; k++) {
      const t = (k + 0.5) / count,
        x = ax + dx * t,
        z = az + dz * t;
      for (const y of [1.8, 5.0, 8.4])
        box(greenGlass, x, y, z, length / count - 0.12, 2.2, 0.32, turn);
      box(mullions, x, 6.6, z, 0.12, 7.3, 0.5, turn);
    }
    for (const y of [3.25, 6.7, 10.3])
      box(dark, (ax + bx) / 2, y, (az + bz) / 2, length, 0.65, 0.7, turn);
  }
  box(pale, 11, 51.2, -19, 6, 1.4, 5);
  const cube = new THREE.BoxGeometry(1, 1, 1),
    dummy = new THREE.Object3D();
  const color = new THREE.Color();
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((part, i) => {
      dummy.position.set(part.x, part.y, part.z);
      dummy.rotation.set(0, part.angle, 0);
      dummy.scale.set(part.w, part.h, part.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.setRGB(part.shade, part.shade, part.shade));
    });
    mesh.castShadow = mat !== glazing && mat !== greenGlass;
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
