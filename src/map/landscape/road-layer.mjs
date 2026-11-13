import * as THREE from "three";
import { roadDimensions } from "./roads.mjs";
import { createGroundMaterial } from "./ground-materials.mjs";

// Same road segments and transforms, four shared draw batches instead of one per box.
export function createRoadLayer(roads) {
  const batches = { curb: [], vehicle: [], walk: [], steps: [] };
  for (const road of roads) {
    const { vehicle, width } = roadDimensions(road);
    for (let i = 1; i < road.points.length; i++) {
      const [ax, az] = road.points[i - 1],
        [bx, bz] = road.points[i];
      const length = Math.hypot(bx - ax, bz - az);
      if (length < 0.01) continue;
      const segment = [
        (ax + bx) / 2,
        (az + bz) / 2,
        length,
        Math.atan2(bx - ax, bz - az),
      ];
      batches.curb.push([...segment, width + (vehicle ? 1.8 : 1.2), 0.35]);
      batches[
        vehicle ? "vehicle" : road.kind === "steps" ? "steps" : "walk"
      ].push([...segment, width, 0.55]);
    }
  }
  const materials = {
    curb: new THREE.MeshStandardMaterial({ color: 0xb9b9aa, roughness: 0.86 }),
    vehicle: createGroundMaterial("asphalt", 0x555c5a),
    walk: createGroundMaterial("paving", 0xc4bfae),
    steps: createGroundMaterial("paving", 0xa4a69b),
  };
  const geometry = new THREE.BoxGeometry(1, 0.22, 1),
    dummy = new THREE.Object3D();
  const group = new THREE.Group();
  group.name = "campus-roads";
  for (const [kind, segments] of Object.entries(batches)) {
    if (!segments.length) {
      materials[kind].dispose();
      continue;
    }
    const mesh = new THREE.InstancedMesh(
      geometry,
      materials[kind],
      segments.length,
    );
    mesh.name = `roads-${kind}`;
    segments.forEach(([x, z, length, angle, width, y], index) => {
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, angle, 0);
      dummy.scale.set(width, 1, length);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.receiveShadow = true;
    mesh.computeBoundingSphere();
    group.add(mesh);
  }
  return group;
}
