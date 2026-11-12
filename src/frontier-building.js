import * as THREE from "three";

// Photo-guided massing: tall glazed bar and a lower perpendicular wing.
// Unseen elevations are schematic; all repeated parts are instanced.
export function createFrontierBuilding(building, wallColor) {
  const group = new THREE.Group();
  // The tall bar occupies the western leg of the L, not the northern leg.
  const [ox, oz] = building.outline[4];
  const [ex, ez] = building.outline[2];
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
  const material = (color, roughness = 0.86, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const stone = material(wallColor);
  const pale = material(0xe0e1d7);
  const glass = material(0x347e99, 0.3, 0.14);
  const darkGlass = material(0x376675, 0.4, 0.1);
  const mullion = material(0xa8bec1);
  const blueBand = material(0x2d6578);
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
  const h = building.h,
    baseHeight = 12.5,
    depth = local(building.outline[5])[1];
  volume(footprint, 0, baseHeight, stone);
  volume(footprint, baseHeight, 0.4, pale);
  const upperRing = [
    [0, 0],
    [width * 0.32, 0],
    [width * 0.32, 2.3],
    [width * 0.46, 2.3],
    [width * 0.46, 0],
    [width, 0],
    [width, depth],
    [0, depth],
  ];
  const body = volume(upperRing, baseHeight, h - baseHeight, stone);
  volume(upperRing, h, 0.5, pale);
  // Only the courtyard-facing long elevation is a full curtain wall.
  const start = 3.2,
    end = width - 2.2;
  const paneCount = Math.round((end - start) / 1.65);
  const paneWidth = (end - start) / paneCount;
  const floorHeight = (h - baseHeight - 1.1) / 7;
  for (const z of [depth + 0.18]) {
    for (let floor = 0; floor < 7; floor++) {
      const bottom = baseHeight + 0.25 + floor * floorHeight;
      for (let k = 0; k < paneCount; k++) {
        const x = start + (k + 0.5) * paneWidth;
        box(
          glass,
          x,
          bottom + floorHeight / 2,
          z,
          paneWidth - 0.1,
          floorHeight - 0.55,
          0.4,
          0,
          0.92 + ((k + floor * 2) % 7) * 0.025,
        );
      }
      box(blueBand, (start + end) / 2, bottom, z, end - start, 0.75, 0.46);
      box(pale, (start + end) / 2, bottom + 0.4, z, end - start, 0.26, 0.64);
      box(
        mullion,
        (start + end) / 2,
        bottom + floorHeight * 0.5,
        z,
        end - start,
        0.09,
        0.62,
      );
    }
    for (let k = 0; k <= paneCount; k++)
      box(
        mullion,
        start + k * paneWidth,
        (h + baseHeight) / 2,
        z,
        0.08,
        h - baseHeight - 0.3,
        0.6,
      );
    box(pale, width / 2, h + 0.4, z, width + 0.7, 0.5, 0.9);
    box(pale, 1.5, h / 2, z, 3, h, 0.8);
    box(pale, width - 0.85, h / 2, z, 1.7, h, 0.8);
  }
  // Rear photo: pale stone, isolated windows, stacked recessed balconies,
  // and a glazed upper section on just one side of the balcony shaft.
  const rear = -0.2;
  const balconyStart = width * 0.32,
    balconyEnd = width * 0.46;
  const balconyMid = (balconyStart + balconyEnd) / 2;
  const balconyWidth = balconyEnd - balconyStart;
  function rearWindow(x, y, w, height = 1.8) {
    box(darkGlass, x, y, rear, w, height, 0.35);
    box(pale, x, y - height / 2 - 0.12, rear - 0.15, w + 0.3, 0.18, 0.5);
    for (let k = 1; k < 4; k++)
      box(mullion, x - w / 2 + (w * k) / 4, y, rear - 0.23, 0.07, height, 0.12);
    box(mullion, x, y - height * 0.15, rear - 0.23, w, 0.08, 0.12);
  }
  for (let floor = 0; floor < 10; floor++) {
    const y = 2.2 + floor * 4;
    for (const x of [width * 0.1, width * 0.23])
      rearWindow(x, y, floor === 0 ? 3.3 : 2.6);
    rearWindow(width * 0.285, y, 0.9, 1.7);
    if (floor < 5) {
      rearWindow(width * 0.58, y, 5.8, floor === 0 ? 3.2 : 2.1);
      rearWindow(width * 0.8, y, 7.2, floor === 0 ? 3.2 : 2.1);
    }
    // Actual recess above the base, with a set-back wall and simple railings.
    if (floor >= 3) {
      box(blueBand, balconyMid, y, 2.08, balconyWidth - 0.5, 2.7, 0.25);
      box(pale, balconyMid, y - 1.65, 1.1, balconyWidth, 0.45, 2.6);
      box(mullion, balconyMid, y - 0.6, -0.12, balconyWidth - 0.3, 0.09, 0.12);
      for (let k = 1; k < 12; k++)
        box(
          mullion,
          balconyStart + (balconyWidth * k) / 12,
          y - 1.1,
          -0.12,
          0.055,
          1.0,
          0.08,
        );
    } else {
      box(blueBand, balconyMid, y, rear, balconyWidth - 0.8, 2.8, 0.3);
      box(pale, balconyMid, y - 1.65, -0.4, balconyWidth, 0.45, 0.8);
    }
  }
  const rearGlassStart = width * 0.49,
    rearGlassEnd = width - 2.5;
  const rearGlassWidth = rearGlassEnd - rearGlassStart;
  box(
    glass,
    (rearGlassStart + rearGlassEnd) / 2,
    31.1,
    rear - 0.08,
    rearGlassWidth,
    19.5,
    0.35,
  );
  for (let x = rearGlassStart; x <= rearGlassEnd; x += 1.65)
    box(mullion, x, 31.1, rear - 0.33, 0.08, 19.5, 0.12);
  for (let y = 21.4; y <= 41; y += 2)
    box(
      mullion,
      (rearGlassStart + rearGlassEnd) / 2,
      y,
      rear - 0.33,
      rearGlassWidth,
      0.09,
      0.12,
    );
  box(pale, rearGlassStart - 0.3, 31.1, rear - 0.1, 0.6, 20.1, 0.7);
  box(
    pale,
    (rearGlassStart + rearGlassEnd) / 2,
    21.15,
    rear - 0.1,
    rearGlassWidth + 0.6,
    0.5,
    0.7,
  );
  box(pale, width / 2, h + 0.4, rear, width + 0.7, 0.5, 0.9);
  // The pale end tower has a narrow stack of windows rather than full glazing.
  for (const x of [-0.18, width + 0.18]) {
    for (let floor = 0; floor < 10; floor++)
      box(darkGlass, x, 2.2 + floor * 4, 9.2, 0.35, 2.0, 2.1);
    for (const z of [2.8, 15.6]) box(pale, x, h / 2, z, 0.6, h, 0.65);
  }
  // Low stone wing: fewer storeys, paired horizontal windows and roof steps.
  for (let i = 0; i < footprint.length; i++) {
    const [ax, az] = footprint[i],
      [bx, bz] = footprint[(i + 1) % footprint.length];
    const dx = bx - ax,
      dz = bz - az,
      length = Math.hypot(dx, dz);
    if (length < 2) continue;
    const turn = -Math.atan2(dz, dx);
    const count = Math.max(1, Math.floor(length / 4.6));
    for (let k = 0; k < count; k++) {
      const t = (k + 0.5) / count,
        x = ax + dx * t,
        z = az + dz * t;
      if (Math.abs(z) < 0.8) continue; // rear windows are photo-specific above
      for (let floor = 0; floor < 3; floor++) {
        const y = 2.3 + floor * 3.7;
        box(
          darkGlass,
          x,
          y,
          z,
          Math.min(2.9, length / count - 0.5),
          1.5,
          0.32,
          turn,
        );
        box(
          pale,
          x,
          y - 0.85,
          z,
          Math.min(3.1, length / count - 0.3),
          0.18,
          0.55,
          turn,
        );
      }
    }
    box(
      pale,
      (ax + bx) / 2,
      baseHeight + 0.6,
      (az + bz) / 2,
      length,
      0.5,
      0.5,
      turn,
    );
  }
  for (const [x, z, w, d, rise] of [
    [width - 7, 27, 5, 6, 3.2],
    [width - 10, 38, 6, 6, 2.0],
    [width - 9, 47, 8, 6, 1.3],
  ]) {
    box(stone, x, baseHeight + rise / 2, z, w, rise, d);
    box(pale, x, baseHeight + rise + 0.2, z, w + 0.4, 0.4, d + 0.4);
  }
  // A shallow entrance canopy and glazing mark the foot of the tall block.
  box(darkGlass, 24, 3, -0.3, 9, 5.8, 0.45);
  box(pale, 24, 6.3, -1.5, 13, 0.5, 3.3);
  for (const x of [18.5, 29.5]) box(pale, x, 3.1, -2.7, 0.5, 6.2, 0.5);
  box(pale, 8, h + 1.0, 8, 6, 1, 5);
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
    mesh.castShadow = mat !== glass && mat !== darkGlass;
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
