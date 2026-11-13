import * as THREE from "three";
import { roadDimensions } from "./landscape/roads.mjs";

export const windowLights = { value: 0 };

// Sample the existing road geometry for illustrative lamp placement.
export function createStreetLights(roads) {
  const group = new THREE.Group();
  const points = [];
  for (const road of roads) {
    const { vehicle, width } = roadDimensions(road);
    if (!vehicle) continue;
    let remaining = 10;
    for (let i = 1; i < road.points.length; i++) {
      const [ax, az] = road.points[i - 1];
      const [bx, bz] = road.points[i];
      const length = Math.hypot(bx - ax, bz - az);
      while (remaining < length) {
        const t = remaining / length;
        const offset = width / 2 + 1.2;
        const x = ax + (bx - ax) * t - ((bz - az) * offset) / length;
        const z = az + (bz - az) * t + ((bx - ax) * offset) / length;
        if (!points.some(([px, pz]) => Math.hypot(px - x, pz - z) < 15))
          points.push([x, z]);
        remaining += 26;
      }
      remaining -= length;
    }
  }

  const size = 64;
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const radius = Math.hypot(
        (x / (size - 1)) * 2 - 1,
        (y / (size - 1)) * 2 - 1,
      );
      pixels.set(
        [255, 188, 101, Math.round(185 * Math.max(0, 1 - radius) ** 2)],
        (y * size + x) * 4,
      );
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size);
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  const glowGeometry = new THREE.PlaneGeometry(14, 14).rotateX(-Math.PI / 2);
  const glow = new THREE.InstancedMesh(
    glowGeometry,
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
    points.length,
  );
  const poles = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.08, 0.12, 4, 7),
    new THREE.MeshStandardMaterial({ color: 0x526076 }),
    points.length,
  );
  const bulbs = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.24, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xffdfa2, toneMapped: false }),
    points.length,
  );
  const matrix = new THREE.Matrix4();
  points.forEach(([x, z], i) => {
    glow.setMatrixAt(i, matrix.makeTranslation(x, 0.74, z));
    poles.setMatrixAt(i, matrix.makeTranslation(x, 2, z));
    bulbs.setMatrixAt(i, matrix.makeTranslation(x, 4.08, z));
  });
  group.add(glow, poles, bulbs);
  group.visible = false;
  return group;
}
