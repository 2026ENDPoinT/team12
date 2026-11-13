import { applyModelFinishes } from "../finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../../geo.mjs";

// Photo-proportioned tower; visual height is an estimate, not a surveyed value.
export function createTechnoparkBuilding(building) {
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
  const material = (color, roughness = 0.8, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const glass = material(0x437f91, 0.3, 0.18),
    light = material(0x488294, 0.32, 0.15),
    dark = material(0x365e6c, 0.4, 0.1);
  const silver = material(0xb1c7c8, 0.63, 0.15),
    stone = material(0x9eaca7),
    roof = material(0x91aaa8),
    paving = material(0xc3c9bd);
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
    height = 54.6,
    floors = 13,
    storey = height / floors,
    width = Math.hypot(ex - ox, ez - oz),
    mid = width / 2;
  const shape = new THREE.Shape(
    outer.map(([x, z]) => new THREE.Vector2(x, -z)),
  );
  function volume(bottom, depth, mat, footprint = shape) {
    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(footprint, { depth, bevelEnabled: false }),
      mat,
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = bottom;
    mesh.castShadow = mesh.receiveShadow = mat !== glass && mat !== light;
    group.add(mesh);
    return mesh;
  }
  // A genuine shallow roof notch separates the two tall front wings.
  const notchHeight = height - 3.5;
  const topRing = [
    outer[0],
    outer[1],
    outer[2],
    [mid - 1.6, 0],
    [mid - 1.6, -3],
    [mid + 1.6, -3],
    [mid + 1.6, 0],
    outer[3],
    outer[4],
  ];
  const topShape = new THREE.Shape(
    topRing.map(([x, z]) => new THREE.Vector2(x, -z)),
  );
  const body = volume(0, notchHeight, glass);
  volume(notchHeight, height - notchHeight, glass, topShape);
  body.receiveShadow = false;
  volume(height, 0.22, roof, topShape);
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
      front = Math.abs(az) < 0.15 && Math.abs(bz) < 0.15,
      side = Math.abs(dx) < 0.5;
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
    const count = Math.max(1, Math.round(len / 1.15)),
      bay = len / count;
    for (let k = 0; k < count; k++) {
      const u = (k + 0.5) * bay,
        x = ax + dx * u;
      if (front && Math.abs(x - mid) < 1.6) continue;
      for (let floor = 0; floor < floors; floor++) {
        const y = storey / 2 + floor * storey;
        face(
          (k + floor) % 4 === 0 ? light : glass,
          u,
          y,
          bay - 0.04,
          storey - 0.15,
          0.05,
          0.08,
        );
        face(silver, u - bay / 2, y, 0.075, storey, front ? 0.33 : 0.15, 0.2);
        // Fine subdivisions within each estimated storey.
        face(silver, u, y, bay, 0.055, 0.08, 0.22);
        face(
          side ? stone : dark,
          u,
          y - storey / 2 + 0.05,
          bay,
          side ? 0.43 : 0.16,
          0.1,
          0.18,
        );
      }
      if (front)
        face(silver, u - bay / 2, height + 0.25, 0.085, 0.8, 0.35, 0.2);
    }
    if (!front) face(silver, len / 2, height + 0.3, len, 0.2, 0.45, 0.13);
    face(stone, len / 2, 0.25, len, 0.5, 0.3);
  }
  // Tall central seam and a shallow notch between two roof-edge fins.
  box(dark, mid, notchHeight / 2, 0.18, 3.2, notchHeight, 0.16);
  box(light, mid, notchHeight / 2, 0.3, 2.6, notchHeight, 0.09);
  for (let y = 0.5; y < notchHeight; y += 2.1)
    box(silver, mid, y, 0.42, 2.8, 0.07, 0.1);
  for (const x of [mid - 1.4, mid, mid + 1.4])
    box(silver, x, notchHeight / 2, 0.43, 0.07, notchHeight, 0.1);
  for (const [x, w] of [
    [mid / 2 - 0.7, mid - 1.4],
    [mid * 1.5 + 0.7, mid - 1.4],
  ]) {
    box(dark, x, height + 0.45, 0.15, w, 0.7, 0.25);
    box(silver, x, height + 0.85, 0.15, w, 0.12, 0.45);
  }
  // Glazed vestibule projects toward the default view / south approach.
  box(dark, mid, 2.2, 2.1, 11.4, 4.4, 4.2);
  box(light, mid, 2.25, 4.26, 10.8, 4.1, 0.12);
  box(light, mid - 5.74, 2.25, 2.1, 0.12, 4.1, 4.2);
  box(light, mid + 5.74, 2.25, 2.1, 0.12, 4.1, 4.2);
  for (let x = mid - 5.5; x <= mid + 5.6; x += 1.1)
    box(silver, x, 2.3, 4.42, 0.1, 4.5, 0.13);
  for (const y of [0.35, 2.2, 4.45])
    box(silver, mid, y, 4.42, 11.5, 0.12, 0.15);
  box(silver, mid, 4.6, 2.2, 11.8, 0.22, 4.8);
  box(glass, mid, 1.4, 4.56, 4.2, 2.7, 0.13);
  for (const x of [mid - 2.1, mid, mid + 2.1])
    box(silver, x, 1.4, 4.67, 0.13, 2.8, 0.12);
  for (let step = 0; step < 6; step++)
    box(
      paving,
      mid,
      0.04 + step * 0.09,
      7.6 - step * 0.5,
      8.5,
      0.18 + step * 0.18,
      0.54,
    );
  box(stone, mid, height + 0.8, -17, 5, 1.2, 6);
  box(roof, mid, height + 1.48, -17, 5.4, 0.16, 6.4);
  // Slim roof mast from the reference, kept understated at map scale.
  box(silver, mid, height + 4.2, -14, 0.13, 5.2, 0.13);
  const cube = new THREE.BoxGeometry(1, 1, 1);
  for (const [mat, parts] of batches) {
    const mesh = new THREE.InstancedMesh(cube, mat, parts.length);
    parts.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.castShadow = mat !== glass && mat !== light;
    mesh.receiveShadow = mat !== glass && mat !== light;
    group.add(mesh);
  }
  const pickables = [];
  group.traverse((o) => {
    if (o.isMesh) {
      o.userData.building = building.id;
      pickables.push(o);
    }
  });
  applyModelFinishes({ stone: [stone], glass: [glass, light, dark] });
  return { group, body, pickables, height: height + 6.9 };
}
