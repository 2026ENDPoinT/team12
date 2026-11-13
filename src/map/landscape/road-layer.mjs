import * as THREE from "three";
import { roadDimensions } from "./roads.mjs";
import { createGroundMaterial } from "./ground-materials.mjs";

const JOIN_SIDES = 16;
const JOIN_RING = Array.from({ length: JOIN_SIDES }, (_, i) => {
  const angle = (i / JOIN_SIDES) * Math.PI * 2;
  return [Math.cos(angle), Math.sin(angle)];
});

function appendTriangle(positions, a, b, c, y) {
  positions.push(a[0], y, a[1], b[0], y, b[1], c[0], y, c[1]);
}

function appendRoadSurface(positions, points, width, y, rounded = true) {
  const radius = width / 2;
  for (let i = 1; i < points.length; i++) {
    const [ax, az] = points[i - 1];
    const [bx, bz] = points[i];
    const length = Math.hypot(bx - ax, bz - az);
    if (length < 0.01) continue;
    const dx = ((az - bz) / length) * radius;
    const dz = ((bx - ax) / length) * radius;
    const a = [ax + dx, az + dz];
    const b = [bx + dx, bz + dz];
    const c = [bx - dx, bz - dz];
    const d = [ax - dx, az - dz];
    appendTriangle(positions, a, b, c, y);
    appendTriangle(positions, a, c, d, y);
  }
  if (!rounded) return;
  // Round joins and caps fill the outside of bends within the original road radius.
  for (const point of points) {
    const [x, z] = point;
    for (let i = 0; i < JOIN_SIDES; i++) {
      const [ax, az] = JOIN_RING[i];
      const [bx, bz] = JOIN_RING[(i + 1) % JOIN_SIDES];
      appendTriangle(
        positions,
        point,
        [x + bx * radius, z + bz * radius],
        [x + ax * radius, z + az * radius],
        y,
      );
    }
  }
}

function createCrosswalkMarkings(crosswalks) {
  const positions = [];
  for (const points of crosswalks) {
    let offset = 0;
    let nextStripe = 0.35;
    for (let i = 1; i < points.length; i++) {
      const [ax, az] = points[i - 1];
      const [bx, bz] = points[i];
      const length = Math.hypot(bx - ax, bz - az);
      while (nextStripe + 0.16 <= offset + length) {
        if (nextStripe - 0.16 >= offset) {
          const at = (distance) => {
            const t = (distance - offset) / length;
            return [ax + (bx - ax) * t, az + (bz - az) * t];
          };
          appendRoadSurface(
            positions,
            [at(nextStripe - 0.16), at(nextStripe + 0.16)],
            2,
            0.7,
            false,
          );
        }
        nextStripe += 0.65;
      }
      offset += length;
    }
  }
  return positions;
}

export function createRoadLayer(roads, crosswalks = []) {
  const batches = { curb: [], vehicle: [], walk: [], steps: [] };
  for (const road of roads) {
    if (road.points.length < 2) continue;
    const { vehicle, width } = roadDimensions(road);
    appendRoadSurface(
      batches.curb,
      road.points,
      width + (vehicle ? 1.8 : 1.2),
      0.46,
    );
    // Give different surfaces a stable visual order where the source lines meet.
    const kind = vehicle ? "vehicle" : road.kind === "steps" ? "steps" : "walk";
    const y = { walk: 0.64, vehicle: 0.66, steps: 0.68 }[kind];
    appendRoadSurface(batches[kind], road.points, width, y);
  }
  batches.crosswalks = createCrosswalkMarkings(crosswalks);
  const materials = {
    crosswalks: new THREE.MeshStandardMaterial({
      color: 0xf3f1dd,
      roughness: 0.9,
    }),
    curb: new THREE.MeshStandardMaterial({ color: 0xb9b9aa, roughness: 0.86 }),
    vehicle: createGroundMaterial("asphalt", 0x555c5a),
    walk: createGroundMaterial("paving", 0xc4bfae),
    steps: createGroundMaterial("paving", 0xa4a69b),
  };
  const group = new THREE.Group();
  group.name = "campus-roads";
  for (const [kind, positions] of Object.entries(batches)) {
    if (!positions.length) {
      materials[kind].dispose();
      continue;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, materials[kind]);
    mesh.name = `roads-${kind}`;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  return group;
}
