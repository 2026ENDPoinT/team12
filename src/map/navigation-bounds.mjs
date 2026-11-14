import * as THREE from "three";
import { pointInRing } from "../campus/geo.mjs";

// Constrain the ground point at the viewport centre, rather than the orbit target:
// Space/Shift can move the target above/below ground while keeping its angle.
export function createNavigationBounds(rings) {
  const direction = new THREE.Vector3();
  const centre = { x: 0, z: 0 };
  return function constrain(camera, controls) {
    camera.getWorldDirection(direction);
    if (direction.y >= -1e-6 || camera.position.y <= 0) return false;
    const distance = -camera.position.y / direction.y;
    centre.x = camera.position.x + direction.x * distance;
    centre.z = camera.position.z + direction.z * distance;
    if (rings.some((ring) => pointInRing(centre, ring))) return false;
    let bestDistance = Infinity,
      nearestX = centre.x,
      nearestZ = centre.z;
    for (const ring of rings) {
      for (let i = 0; i < ring.length; i++) {
        const a = ring[i],
          b = ring[(i + 1) % ring.length];
        const dx = b[0] - a[0],
          dz = b[1] - a[1];
        const lengthSq = dx * dx + dz * dz;
        const t = lengthSq
          ? THREE.MathUtils.clamp(
              ((centre.x - a[0]) * dx + (centre.z - a[1]) * dz) / lengthSq,
              0,
              1,
            )
          : 0;
        const x = a[0] + dx * t,
          z = a[1] + dz * t;
        const d = (x - centre.x) ** 2 + (z - centre.z) ** 2;
        if (d < bestDistance) {
          bestDistance = d;
          nearestX = x;
          nearestZ = z;
        }
      }
    }
    if (!Number.isFinite(bestDistance) || bestDistance < 1e-12) return false;
    const dx = nearestX - centre.x,
      dz = nearestZ - centre.z;
    camera.position.x += dx;
    camera.position.z += dz;
    controls.target.x += dx;
    controls.target.z += dz;
    camera.updateMatrixWorld();
    return true;
  };
}
