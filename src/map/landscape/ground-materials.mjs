import * as THREE from "three";

// World-space variations stay continuous across adjacent ground polygons.
// No texture downloads, displacement, animation, or additional render passes.
export function createGroundMaterial(kind, color) {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: kind === "asphalt" ? 0.96 : 1,
    metalness: 0,
  });
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = `varying vec2 groundWorld;\nvarying vec2 groundLocal;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      groundLocal = position.xz;
      vec4 groundPosition = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        groundPosition = instanceMatrix * groundPosition;
        groundLocal *= vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[2].xyz));
      #endif
      groundWorld = (modelMatrix * groundPosition).xz;`,
    );
    shader.fragmentShader = `
      varying vec2 groundWorld;
      varying vec2 groundLocal;
      float groundHash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float groundNoise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(groundHash(i), groundHash(i + vec2(1., 0.)), f.x),
          mix(groundHash(i + vec2(0., 1.)), groundHash(i + vec2(1., 1.)), f.x), f.y);
      }
      ${shader.fragmentShader}`;
    const grass = kind === "grass" || kind === "wood" || kind === "pitch";
    const detail = grass
      ? `
        float broad = groundNoise(groundWorld * 0.035);
        float mottling = groundNoise(groundWorld * 0.18 + 27.0);
        float turf = groundNoise(groundWorld * 1.1);
        float fine = groundNoise(groundWorld * vec2(9.0, 5.0));
        float fade = 1.0 - smoothstep(0.15, 0.9, max(fwidth(groundWorld.x), fwidth(groundWorld.y)));
        diffuseColor.rgb *= 0.77 + broad * 0.24 + mottling * 0.14;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.15, 1.03, 0.78), smoothstep(0.48, 0.80, mottling) * 0.32);
        float turfFade = 1.0 - smoothstep(0.6, 2.2, max(fwidth(groundWorld.x), fwidth(groundWorld.y)));
        diffuseColor.rgb *= 1.0 + (turf - 0.5) * 0.42 * turfFade + (fine - 0.5) * 0.38 * fade;
      `
      : kind === "paving"
        ? `
        vec2 p = groundLocal / vec2(0.6, 0.9);
        p.y += mod(floor(p.x), 2.0) * 0.5;
        vec2 edge = min(fract(p), 1.0 - fract(p));
        vec2 aa = max(fwidth(p), vec2(0.001));
        vec2 interior = smoothstep(vec2(0.012), vec2(0.012) + aa, edge);
        float visible = 1.0 - smoothstep(0.15, 0.6, max(aa.x, aa.y));
        float joint = (1.0 - interior.x * interior.y) * visible;
        diffuseColor.rgb *= 0.87 + groundHash(floor(p)) * 0.22 * visible;
        diffuseColor.rgb *= 1.0 - joint * 0.32;
        float gritFade = 1.0 - smoothstep(0.1, 0.7, max(fwidth(groundWorld.x), fwidth(groundWorld.y)));
        diffuseColor.rgb *= 1.0 + (groundNoise(groundWorld * 7.0) - 0.5) * 0.22 * gritFade;
      `
        : `
        float broad = groundNoise(groundWorld * 0.13);
        float fine = groundNoise(groundWorld * 5.0);
        float fade = 1.0 - smoothstep(0.08, 0.6, max(fwidth(groundWorld.x), fwidth(groundWorld.y)));
        diffuseColor.rgb *= 0.86 + broad * 0.23 + (fine - 0.5) * 0.42 * fade;
      `;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>\n${detail}`,
    );
  };
  material.customProgramCacheKey = () => `campus-ground-v2-${kind}`;
  return material;
}
