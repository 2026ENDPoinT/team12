import { applyModelFinishes } from "./finishes.mjs";
import { getBuildingDesign } from "./catalog.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../campus/geo.mjs";

// Schematic facade study, not a photo-verified reconstruction.
// Only these IDs opt in; photo-based models never pass through this module.
export function createFacadeStudy(building, profile, entrance) {
  const style = getBuildingDesign(building.id).facadeStudy;
  if (!style) return null;
  const group = new THREE.Group();
  group.name = `facade-study-${building.id}`;
  const material = (color, roughness = 0.85, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const materials = {
    stone: material(profile.wall),
    frame: material(style === "stone-grid" ? 0xc4ac85 : 0xdce0d8),
    glass: material(
      style === "stone-grid"
        ? 0x3f656e
        : style === "vertical-glass"
          ? 0x376e82
          : 0x447f8f,
      0.3,
      0.15,
    ),
    recess: material(style === "stone-grid" ? 0x776b56 : 0x465b60),
    ledge: material(style === "stone-grid" ? 0xe0ceb0 : 0xc7d1cb),
  };
  applyModelFinishes({ stone: [materials.stone], glass: [materials.glass] });
  const batches = new Map(),
    dummy = new THREE.Object3D();
  function box(kind, x, y, z, w, h, d, turn = 0) {
    if (!batches.has(kind)) batches.set(kind, []);
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, turn, 0);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    batches.get(kind).push(dummy.matrix.clone());
  }
  const height = building.h;
  const floors = Math.max(1, Math.round(building.floors));
  const storey = height / floors;
  let entryWall = null;
  for (const [ringIndex, ring] of [
    building.outline,
    ...building.holes,
  ].entries()) {
    for (let i = 0; i < ring.length; i++) {
      const [ax, az] = ring[i],
        [bx, bz] = ring[(i + 1) % ring.length];
      const length = Math.hypot(bx - ax, bz - az);
      if (length < 2) continue;
      const dx = (bx - ax) / length,
        dz = (bz - az) / length;
      let nx = -dz,
        nz = dx;
      if (
        insideBuilding(
          { x: (ax + bx) / 2 + nx * 0.1, z: (az + bz) / 2 + nz * 0.1 },
          building,
        )
      ) {
        nx = -nx;
        nz = -nz;
      }
      const turn = -Math.atan2(dz, dx);
      function face(kind, u, y, w, h, d, offset = 0) {
        box(
          kind,
          ax + dx * u + nx * offset,
          y + 0.9,
          az + dz * u + nz * offset,
          w,
          h,
          d,
          turn,
        );
      }
      if (entrance && ringIndex === 0) {
        const t = Math.max(
          0,
          Math.min(length, (entrance.x - ax) * dx + (entrance.z - az) * dz),
        );
        const distance = Math.hypot(
          entrance.x - ax - dx * t,
          entrance.z - az - dz * t,
        );
        if (!entryWall || distance < entryWall.distance)
          entryWall = { distance, dx, dz, nx, nz, turn };
      }
      // A substantial roof cornice defines the silhouette at campus scale.
      face("ledge", length / 2, height + 0.9, length + 0.25, 0.7, 0.9, 0.18);
      if (style === "vertical-glass") {
        face(
          "recess",
          length / 2,
          height / 2,
          length - 0.5,
          height - 0.5,
          0.25,
          0.16,
        );
        face(
          "glass",
          length / 2,
          height / 2 + 0.1,
          length - 1.0,
          height - 1.1,
          0.22,
          0.34,
        );
        const bays = Math.max(1, Math.round(length / 6.4));
        for (let k = 0; k <= bays; k++)
          face(
            "frame",
            (length * k) / bays,
            height / 2,
            0.95,
            height + 0.8,
            1.05,
            0.5,
          );
        for (let u = 1.6; u < length - 0.8; u += 1.6)
          face("ledge", u, height / 2, 0.075, height - 1.0, 0.16, 0.52);
        for (let f = 1; f < floors; f++) {
          face("frame", length / 2, f * storey, length, 0.42, 0.8, 0.5);
          face(
            "ledge",
            length / 2,
            f * storey + storey * 0.48,
            length - 0.6,
            0.09,
            0.15,
            0.52,
          );
        }
        face("recess", length / 2, 0.55, length, 0.7, 0.6, 0.2);
      } else if (style === "stone-grid") {
        const bays = Math.max(1, Math.round(length / 5.3)),
          bay = length / bays;
        const pier = ringIndex === 0 ? 0.68 : 0.42;
        for (let k = 0; k < bays; k++) {
          const u = (k + 0.5) * bay,
            w = Math.max(0.5, bay * 0.63);
          face("recess", u, height / 2, w, height - 1.4, 0.18, 0.12);
          for (let f = 0; f < floors; f++) {
            face(
              "glass",
              u,
              (f + 0.53) * storey,
              w - 0.3,
              storey * 0.64,
              0.18,
              0.27,
            );
            face(
              "ledge",
              u,
              (f + 0.53) * storey,
              0.09,
              storey * 0.64,
              0.15,
              0.41,
            );
            face(
              "ledge",
              u,
              f * storey + storey * 0.16,
              w + 0.12,
              0.18,
              0.7,
              0.38,
            );
          }
        }
        for (let k = 0; k <= bays; k++)
          face("frame", k * bay, height / 2, pier, height + 0.25, 0.85, 0.43);
        for (let f = 1; f < floors; f++) {
          face(
            "recess",
            length / 2,
            f * storey - 0.28,
            length,
            0.16,
            0.25,
            0.5,
          );
          face("frame", length / 2, f * storey, length + 0.15, 0.42, 1.0, 0.48);
        }
        face("frame", length / 2, 0.5, length, 0.9, 0.75, 0.32);
      } else {
        // Continuous ribbons and deep projecting floor plates, with solid corner piers.
        face("stone", length / 2, height / 2, length, height, 0.22, 0.12);
        for (let f = 0; f < floors; f++) {
          const y = (f + 0.57) * storey;
          face(
            "recess",
            length / 2,
            y,
            length - 0.65,
            storey * 0.64,
            0.2,
            0.25,
          );
          face(
            "glass",
            length / 2,
            y + 0.05,
            length - 1.15,
            storey * 0.51,
            0.22,
            0.4,
          );
          for (let u = 2.4; u < length - 1; u += 2.4)
            face("ledge", u, y, 0.08, storey * 0.51, 0.14, 0.56);
          face(
            "recess",
            length / 2,
            (f + 1) * storey - 0.36,
            length,
            0.18,
            0.3,
            0.5,
          );
          face(
            "frame",
            length / 2,
            (f + 1) * storey - 0.08,
            length + 0.2,
            0.48,
            1.25,
            0.5,
          );
        }
        for (const u of [0.3, length - 0.3])
          face("frame", u, height / 2, 0.65, height, 0.85, 0.48);
      }
    }
  }
  if (entrance && entryWall?.distance < 0.5) {
    const { dx, dz, nx, nz, turn } = entryWall;
    const x = entrance.x,
      z = entrance.z;
    const portalWidth = style === "vertical-glass" ? 7.5 : 6;
    const top = Math.min(storey - 0.3, 4.4);
    box(
      "glass",
      x + nx * 0.5,
      top / 2 + 0.9,
      z + nz * 0.5,
      portalWidth - 0.8,
      top,
      0.3,
      turn,
    );
    box(
      "frame",
      x + nx * 1.8,
      top + 1.0,
      z + nz * 1.8,
      portalWidth + 0.6,
      0.6,
      4.1,
      turn,
    );
    for (const side of [-1, 1])
      box(
        "frame",
        x + nx * 3.2 + ((dx * portalWidth) / 2) * side,
        top / 2 + 0.9,
        z + nz * 3.2 + ((dz * portalWidth) / 2) * side,
        0.42,
        top,
        0.42,
      );
  }
  const cube = new THREE.BoxGeometry(1, 1, 1),
    pickables = [];
  for (const [kind, matrices] of batches) {
    const mesh = new THREE.InstancedMesh(
      cube,
      materials[kind],
      matrices.length,
    );
    mesh.name = `${building.id}-${style}-${kind}`;
    mesh.userData.building = building.id;
    matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
    mesh.castShadow = kind !== "glass";
    mesh.receiveShadow = true;
    group.add(mesh);
    pickables.push(mesh);
  }
  return { group, pickables };
}
