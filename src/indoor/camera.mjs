import * as THREE from "three";

// Fit the actual floor, including its height, instead of a fixed building outline.
export function floorViewPose(
  bounds,
  { width, height, fov = 38, direction } = {},
) {
  const portrait = width < height;
  const dir =
    direction?.clone().normalize() ||
    new THREE.Vector3(
      portrait ? -Math.sin(0.5) : 0,
      Math.cos(0.5),
      portrait ? 0 : Math.sin(0.5),
    );
  const right = new THREE.Vector3()
    .crossVectors(new THREE.Vector3(0, 1, 0), dir)
    .normalize();
  const up = new THREE.Vector3().crossVectors(dir, right).normalize();
  const target = bounds.getCenter(new THREE.Vector3());
  const tanV = Math.tan(THREE.MathUtils.degToRad(fov / 2));
  const tanH = (tanV * width) / height;
  let distance = 10;
  for (const x of [bounds.min.x, bounds.max.x])
    for (const y of [bounds.min.y, bounds.max.y])
      for (const z of [bounds.min.z, bounds.max.z]) {
        const offset = new THREE.Vector3(x, y, z).sub(target);
        const depth = offset.dot(dir);
        distance = Math.max(
          distance,
          depth + ((Math.abs(offset.dot(right)) + 2) / tanH) * 1.12,
          depth + ((Math.abs(offset.dot(up)) + 2) / tanV) * 1.12,
        );
      }
  return {
    target,
    position: target.clone().addScaledVector(dir, distance),
    distance,
  };
}
