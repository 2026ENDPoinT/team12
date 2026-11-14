import { windowLights } from "../night-lighting.mjs";
import { applyBuildingFinish } from "./finishes.mjs";
import * as THREE from "three";
import { insideBuilding } from "../../campus/geo.mjs";

export function roofRectangleFits(building, x, z, halfX, halfZ) {
  const min = [x - halfX, z - halfZ],
    max = [x + halfX, z + halfZ];
  for (const cx of [min[0], max[0]])
    for (const cz of [min[1], max[1]])
      if (!insideBuilding({ x: cx, z: cz }, building)) return false;
  // Corner checks alone miss a small courtyard completely enclosed by a box,
  // or a concave notch cutting through an otherwise valid footprint.
  for (const ring of [building.outline, ...building.holes]) {
    for (let i = 0; i < ring.length; i++) {
      const a = ring[i],
        b = ring[(i + 1) % ring.length];
      let near = 0,
        far = 1;
      for (let axis = 0; axis < 2; axis++) {
        const delta = b[axis] - a[axis];
        if (Math.abs(delta) < 1e-9) {
          if (a[axis] < min[axis] || a[axis] > max[axis]) {
            far = -1;
            break;
          }
        } else {
          const t0 = (min[axis] - a[axis]) / delta,
            t1 = (max[axis] - a[axis]) / delta;
          near = Math.max(near, Math.min(t0, t1));
          far = Math.min(far, Math.max(t0, t1));
        }
      }
      if (near <= far) return false;
    }
  }
  return true;
}

// Physical wall coordinates prevent diagonal facades from stretching windows.
// Each edge has an independent fitted bay count; courtyard walls use the same rule.
export function facadeGeometry(building) {
  const shape = new THREE.Shape(
    building.outline.map(([x, z]) => new THREE.Vector2(x, -z)),
  );
  for (const ring of building.holes)
    shape.holes.push(
      new THREE.Path(ring.map(([x, z]) => new THREE.Vector2(x, -z))),
    );
  const spans = [];
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: building.h,
    bevelEnabled: false,
    UVGenerator: {
      generateTopUV(_, vertices, ...indices) {
        return indices.map((i) => {
          spans[i] = 0;
          return new THREE.Vector2(vertices[i * 3], vertices[i * 3 + 1]);
        });
      },
      generateSideWallUV(_, vertices, a, b, c, d) {
        const ax = vertices[a * 3],
          ay = vertices[a * 3 + 1];
        const dx = vertices[b * 3] - ax,
          dy = vertices[b * 3 + 1] - ay;
        const length = Math.hypot(dx, dy);
        for (let i = a; i <= d; i++) spans[i] = length;
        return [a, b, c, d].map(
          (i) =>
            new THREE.Vector2(
              ((vertices[i * 3] - ax) * dx + (vertices[i * 3 + 1] - ay) * dy) /
                Math.max(length, 0.001),
              vertices[i * 3 + 2],
            ),
        );
      },
    },
  });
  geometry.setAttribute(
    "facadeSpan",
    new THREE.Float32BufferAttribute(spans, 1),
  );
  return geometry;
}

const facadeDeclarations = `
  varying vec2 facadeUV;
  varying vec2 facadePlan;
  varying float wallSpan;
  uniform vec3 facadeGlass;
  uniform vec3 facadeFrame;
  uniform vec4 facadeLayout;
  uniform vec3 facadeSize;
  uniform vec3 facadeDoor;
  uniform float facadeMasonry;
  float rectCoverage(vec2 p, vec2 halfSize, vec2 aa) {
    vec2 edge = smoothstep(-aa, aa, halfSize - abs(p));
    return edge.x * edge.y;
  }
  float jointCoverage(float position, float spacing, float width, float aa) {
    float distance = abs(fract(position / spacing + 0.5) - 0.5) * spacing;
    return 1.0 - smoothstep(width, width + aa, distance);
  }
`;

export function facadeMaterial(appearance, wall, entrance = null) {
  const material = new THREE.MeshStandardMaterial({
    color: wall,
    roughness: 0.87,
    metalness: 0,
  });
  if (!appearance.facade) return applyBuildingFinish(material, "stone");
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      windowLights,
      facadeGlass: { value: new THREE.Color(appearance.glass) },
      facadeFrame: { value: new THREE.Color(appearance.frame) },
      facadeLayout: {
        value: new THREE.Vector4(
          appearance.bay,
          appearance.window,
          appearance.opening,
          appearance.floorHeight,
        ),
      },
      facadeSize: {
        value: new THREE.Vector3(appearance.height, appearance.floors, 0.085),
      },
      facadeDoor: {
        value: new THREE.Vector3(
          entrance?.x ?? 0,
          -(entrance?.z ?? 0),
          entrance ? 1 : 0,
        ),
      },
      facadeMasonry: { value: appearance.masonry },
    });
    shader.vertexShader = `attribute float facadeSpan;
      varying vec2 facadeUV; varying vec2 facadePlan; varying float wallSpan;
      ${shader.vertexShader}`.replace(
      "#include <begin_vertex>",
      `
      #include <begin_vertex>
      facadeUV = uv; facadePlan = position.xy; wallSpan = facadeSpan;
    `,
    );
    shader.fragmentShader = "uniform float windowLights;\n" + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
      totalEmissiveRadiance += vec3(1.0, 0.59, 0.24) *
        windowLights * architecturalGlass * step(0.28, paneTone);`,
    );
    shader.fragmentShader = facadeDeclarations + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `
      #include <color_fragment>
      float isWall = step(0.01, wallSpan);
      float bayCount = max(1.0, floor(wallSpan / facadeLayout.x + 0.5));
      float bay = max(0.1, wallSpan / bayCount);
      float storey = facadeLayout.w;
      vec2 p = vec2((fract(facadeUV.x / bay) - 0.5) * bay,
                    (fract(facadeUV.y / storey) - 0.52) * storey);
      vec2 footprint = max(fwidth(facadeUV), vec2(0.002));
      vec2 aa = min(footprint, vec2(0.35));
      vec2 opening = vec2(bay * facadeLayout.y, storey * facadeLayout.z) * 0.5;
      // Keep a solid corner pier, even on very short and fragmented GIS edges.
      float edgeGuard = smoothstep(0.25, 0.65, min(facadeUV.x, wallSpan - facadeUV.x));
      float reveal = rectCoverage(p, opening + vec2(0.11), aa) * edgeGuard;
      float frameMask = rectCoverage(p, opening, aa) * edgeGuard;
      float glassMask = rectCoverage(p, max(vec2(0.03), opening - vec2(0.075)), aa) * edgeGuard;
      float glassArea = facadeLayout.y * facadeLayout.z;
      float detail = 1.0 - smoothstep(0.35, 1.8, max(footprint.x, footprint.y));
      float upperGuard = smoothstep(0.35, 0.7, facadeUV.y) *
        (1.0 - smoothstep(facadeSize.x - 0.5, facadeSize.x - 0.12, facadeUV.y));
      // At distance, integrate openings into a stable average instead of flickering grids.
      vec3 distant = mix(diffuseColor.rgb, facadeGlass, glassArea * 0.76);
      vec3 finish = diffuseColor.rgb;
      float panel = max(jointCoverage(facadeUV.x, 1.2, 0.012, aa.x),
                        jointCoverage(facadeUV.y, 0.65, 0.012, aa.y));
      float stagger = mod(floor(facadeUV.y / 0.28), 2.0) * 0.28;
      float brick = max(jointCoverage(facadeUV.x + stagger, 0.56, 0.018, aa.x),
                        jointCoverage(facadeUV.y, 0.28, 0.018, aa.y));
      float joints = mix(panel * 0.045, brick * 0.11, facadeMasonry);
      float jointFade = 1.0 - smoothstep(0.08, 0.5, max(footprint.x, footprint.y));
      finish *= 1.0 - joints * jointFade;
      finish *= 1.0 - reveal * 0.22;
      finish = mix(finish, facadeFrame, frameMask);
      // A restrained vertical glass gradient replaces expensive live reflections.
      float paneTone = fract(sin(dot(floor(facadeUV / vec2(bay, storey)), vec2(127.1,311.7))) * 43758.5453);
      vec3 glazing = facadeGlass * (0.84 + 0.20 * smoothstep(-opening.y, opening.y, p.y) + (paneTone - 0.5) * 0.07);
      finish = mix(finish, glazing, glassMask);
      float mullion = jointCoverage(p.x, max(0.7, bay * 0.5), 0.025, aa.x) * glassMask;
      finish = mix(finish, facadeFrame * 0.88, mullion * 0.65);
      float sill = rectCoverage(p + vec2(0.0, opening.y + 0.15),
        vec2(opening.x + 0.12, 0.065), aa) * edgeGuard;
      finish = mix(finish, facadeFrame * 0.93, sill);
      float slab = jointCoverage(facadeUV.y, storey, 0.04, aa.y);
      finish *= 1.0 - slab * 0.09;
      float plinth = 1.0 - smoothstep(0.5, 0.85, facadeUV.y);
      finish *= 1.0 - plinth * 0.14;
      float doorDistance = length(facadePlan - facadeDoor.xy);
      float door = (1.0 - smoothstep(1.1, 1.25, doorDistance)) *
        (1.0 - smoothstep(min(3.0, storey * 0.85), min(3.0, storey * 0.85) + 0.15, facadeUV.y)) * facadeDoor.z;
      finish = mix(finish, facadeGlass * 0.72, door);
      diffuseColor.rgb = mix(diffuseColor.rgb,
        mix(distant, finish, detail), isWall * upperGuard);
      float architecturalGlass = glassMask * detail * upperGuard * isWall;
      float architecturalRelief = (-0.045 * reveal + 0.018 * frameMask + 0.02 * sill) * detail * isWall;
    `,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <roughnessmap_fragment>",
      `
      #include <roughnessmap_fragment>
      roughnessFactor = mix(roughnessFactor, 0.31, architecturalGlass);
    `,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <normal_fragment_maps>",
      `
      #include <normal_fragment_maps>
      // Screen-space surface gradients: shallow recesses remain light, not extra meshes.
      vec3 dpdx = dFdx(-vViewPosition), dpdy = dFdy(-vViewPosition);
      vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx);
      float determinant = dot(dpdx, r1);
      vec3 gradient = sign(determinant) *
        (dFdx(architecturalRelief) * r1 + dFdy(architecturalRelief) * r2);
      normal = normalize(abs(determinant) * normal - gradient + normal * 0.000001);
    `,
    );
  };
  material.customProgramCacheKey = () => "campus-facade-v2";
  return applyBuildingFinish(material, "facade");
}

// All roof edges, equipment and verified entrance canopies share four draw calls.
export function createBuildingDetails() {
  const parts = new Map();
  const materials = {
    coping: new THREE.MeshStandardMaterial({ color: 0xd1d5cb, roughness: 0.9 }),
    equipment: new THREE.MeshStandardMaterial({
      color: 0x9fa9a3,
      roughness: 0.85,
    }),
    vent: new THREE.MeshStandardMaterial({ color: 0x65726f, roughness: 0.9 }),
    entry: new THREE.MeshStandardMaterial({ color: 0xc9cec6, roughness: 0.85 }),
  };
  const dummy = new THREE.Object3D();
  function box(kind, x, y, z, w, h, d, turn = 0) {
    if (!parts.has(kind)) parts.set(kind, []);
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, turn, 0);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    parts.get(kind).push(dummy.matrix.clone());
  }
  function decorate(building, appearance, entrance) {
    if (!appearance.facade) return;
    for (const ring of [building.outline, ...building.holes]) {
      for (let i = 0; i < ring.length; i++) {
        const [ax, az] = ring[i],
          [bx, bz] = ring[(i + 1) % ring.length];
        const length = Math.hypot(bx - ax, bz - az);
        if (length < 0.4) continue;
        box(
          "coping",
          (ax + bx) / 2,
          building.h + 1.2,
          (az + bz) / 2,
          length + 0.05,
          0.4,
          0.35,
          -Math.atan2(bz - az, bx - ax),
        );
      }
    }
    // Test the entire equipment footprint, including courtyard holes. Never use the
    // polygon centroid blindly: it is often in the middle of an open courtyard.
    const xs = building.outline.map((p) => p[0]),
      zs = building.outline.map((p) => p[1]);
    const minX = Math.min(...xs),
      maxX = Math.max(...xs),
      minZ = Math.min(...zs),
      maxZ = Math.max(...zs);
    let placed = 0;
    for (let ix = 1; ix <= 4 && placed < 2; ix++) {
      for (let iz = 1; iz <= 4 && placed < 2; iz++) {
        const x = minX + ((maxX - minX) * ix) / 5,
          z = minZ + ((maxZ - minZ) * iz) / 5;
        if (!roofRectangleFits(building, x, z, 1.7, 1.7)) continue;
        box("equipment", x, building.h + 1.6, z, 2.5, 1.2, 2.1);
        box("vent", x, building.h + 2.24, z, 1.9, 0.08, 1.5);
        placed++;
      }
    }
    if (!entrance || building.h < 5) return;
    let closest = null;
    for (let i = 0; i < building.outline.length; i++) {
      const a = building.outline[i],
        b = building.outline[(i + 1) % building.outline.length];
      const dx = b[0] - a[0],
        dz = b[1] - a[1],
        length = Math.hypot(dx, dz);
      if (length < 3.5) continue;
      const t = Math.max(
        0,
        Math.min(
          1,
          ((entrance.x - a[0]) * dx + (entrance.z - a[1]) * dz) /
            (length * length),
        ),
      );
      const distance = Math.hypot(
        entrance.x - a[0] - dx * t,
        entrance.z - a[1] - dz * t,
      );
      if (!closest || distance < closest.distance)
        closest = { dx: dx / length, dz: dz / length, distance };
    }
    if (!closest || closest.distance > 0.5) return;
    const { dx, dz } = closest;
    let nx = -dz,
      nz = dx;
    if (
      insideBuilding(
        { x: entrance.x + nx * 0.5, z: entrance.z + nz * 0.5 },
        building,
      )
    ) {
      nx *= -1;
      nz *= -1;
    }
    const turn = -Math.atan2(dz, dx);
    const top = Math.min(3.5, appearance.floorHeight * 0.95);
    box(
      "entry",
      entrance.x + nx,
      top + 0.9,
      entrance.z + nz,
      3.5,
      0.22,
      2.2,
      turn,
    );
    for (const side of [-1, 1])
      box(
        "entry",
        entrance.x + nx * 1.8 + dx * 1.4 * side,
        top / 2 + 0.9,
        entrance.z + nz * 1.8 + dz * 1.4 * side,
        0.16,
        top,
        0.16,
      );
  }
  function finish() {
    const group = new THREE.Group(),
      geometry = new THREE.BoxGeometry(1, 1, 1);
    for (const [kind, matrices] of parts) {
      const mesh = new THREE.InstancedMesh(
        geometry,
        materials[kind],
        matrices.length,
      );
      mesh.name = `building-detail-${kind}`;
      matrices.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh);
    }
    return group;
  }
  return { decorate, finish };
}
