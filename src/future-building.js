import * as THREE from "three";

// Photo-guided approximation within the existing campus footprint, not a survey.
// All facade parts are batched by material; no external models or textures.
export function createFutureBuilding(building, wallColor) {
  const group = new THREE.Group();
  group.position.set(185.6, 0.9, 286.6);
  group.rotation.y = -Math.atan2(0.23, 0.9732);
  const material = (color, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const walls = material(wallColor);
  const frames = material(0xabbab5);
  const glass = material(0x437d83, 0.3, 0.16);
  const roofMaterial = material(0xd8e0da);
  const recess = material(0x526b6c);
  const batches = new Map();
  function box(mat, x, y, z, w, h, d, angle = 0, shade = 1) {
    if (!batches.has(mat)) batches.set(mat, []);
    batches.get(mat).push({ x, y, z, w, h, d, angle, shade });
  }
  function shapeFrom(ring) {
    return new THREE.Shape(ring.map(([x, z]) => new THREE.Vector2(x, -z)));
  }
  function volume(shape, height, bottom, mat) {
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
  const mainRing = [
    [18, 0],
    [42.6, 0],
    [42, 42.1],
    [51, 41.8],
    [51.5, 54.8],
    [52, 66],
    [46.3, 68],
    [48.4, 78.1],
    [2.1, 86.3],
    [-0.2, 76.6],
    [4.6, 75.5],
    [3, 66.9],
    [-4.9, 67.3],
    [-5.2, 54.1],
    [28.7, 53.9],
    [28.8, 43.6],
    [29.1, 18.6],
    [18, 18.4],
  ];
  const height = building.h;
  const mainShape = shapeFrom(mainRing);
  const body = volume(mainShape, height - 5, 5, walls);
  volume(mainShape, 0.55, height, roofMaterial);
  // A continuous curtain wall, with thin mullions and a recessed column level.
  for (let i = 0; i < mainRing.length; i++) {
    const [ax, az] = mainRing[i];
    const [bx, bz] = mainRing[(i + 1) % mainRing.length];
    const dx = bx - ax,
      dz = bz - az,
      length = Math.hypot(dx, dz);
    const angle = -Math.atan2(dz, dx);
    const count = Math.max(1, Math.round(length / 2.15));
    const floorHeight = (height - 5.8) / 5;
    for (let k = 0; k < count; k++) {
      const t = (k + 0.5) / count;
      const x = ax + dx * t,
        z = az + dz * t;
      for (let floor = 0; floor < 5; floor++) {
        box(
          glass,
          x,
          5.4 + (floor + 0.5) * floorHeight,
          z,
          Math.max(0.2, length / count - 0.18),
          floorHeight - 0.24,
          0.42,
          angle,
          0.93 + ((k + floor * 3) % 5) * 0.035,
        );
      }
      box(
        frames,
        ax + (dx * k) / count,
        (height + 5) / 2,
        az + (dz * k) / count,
        0.14,
        height - 5,
        0.58,
        angle,
      );
    }
    for (let floor = 0; floor <= 5; floor++)
      box(
        frames,
        (ax + bx) / 2,
        5.3 + floor * floorHeight,
        (az + bz) / 2,
        length,
        0.22,
        0.62,
        angle,
      );
    box(
      roofMaterial,
      (ax + bx) / 2,
      height + 0.85,
      (az + bz) / 2,
      length,
      0.65,
      0.7,
      angle,
    );
    const columns = Math.max(1, Math.floor(length / 6));
    for (let k = 0; k < columns; k++) {
      const t = (k + 0.5) / columns;
      box(walls, ax + dx * t, 2.5, az + dz * t, 0.65, 5, 0.65, angle);
    }
  }
  // The lower rounded white pavilion is the most distinctive photo feature.
  const pavilion = new THREE.Shape();
  pavilion.moveTo(0, 0);
  pavilion.lineTo(18, 0);
  pavilion.lineTo(18, -12);
  pavilion.quadraticCurveTo(18, -21, 8, -21);
  pavilion.quadraticCurveTo(-3, -21, -3, -13);
  pavilion.lineTo(0, 0);
  volume(pavilion, 13.6, 0, walls);
  const pavilionRing = pavilion.getPoints(6).map(({ x, y }) => [x, -y]);
  for (let i = 1; i < pavilionRing.length; i++) {
    const [ax, az] = pavilionRing[i - 1],
      [bx, bz] = pavilionRing[i];
    const length = Math.hypot(bx - ax, bz - az);
    const angle = -Math.atan2(bz - az, bx - ax);
    for (const y of [4, 9.5]) {
      box(recess, (ax + bx) / 2, y, (az + bz) / 2, length, 1.2, 0.4, angle);
      box(
        roofMaterial,
        (ax + bx) / 2,
        y - 0.7,
        (az + bz) / 2,
        length + 0.15,
        0.18,
        0.75,
        angle,
      );
    }
  }
  volume(pavilion, 0.45, 13.6, roofMaterial);
  const canopy = pavilion.clone();
  const opening = new THREE.Path();
  opening.absellipse(8, -10, 6.5, 6.5, 0, Math.PI * 2, true);
  canopy.holes.push(opening);
  volume(canopy, 0.45, 17.8, roofMaterial);
  for (const [x, z] of [
    [0, 2],
    [17, 2],
    [-1, 13],
    [17, 13],
    [7, 20],
  ])
    box(walls, x, 15.9, z, 0.45, 3.8, 0.45);
  // Entry glazing and a shallow canopy face the open court.
  box(recess, 28.3, 2, 35, 0.6, 4, 9);
  box(glass, 27.9, 2, 35, 0.2, 3.5, 7.8);
  box(roofMaterial, 26.8, 4.7, 35, 4.2, 0.4, 11);
  box(roofMaterial, 37, height + 2, 8, 6, 3, 6);
  box(roofMaterial, 18, height + 1.4, 70, 7, 1.8, 4);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D();
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
