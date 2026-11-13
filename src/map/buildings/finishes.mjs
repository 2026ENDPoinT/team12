// Shared architectural finishes. All details reuse existing triangles/materials.
// No images, reflections, extra render passes or per-frame JS updates.
export function applyBuildingFinish(material, kind = "stone") {
  if (!material?.isMeshStandardMaterial || material.userData.buildingFinish)
    return material;
  const previousCompile = material.onBeforeCompile;
  const previousKey = material.customProgramCacheKey();
  material.userData.buildingFinish = kind;
  if (kind === "glass") material.roughness = Math.min(material.roughness, 0.34);
  material.onBeforeCompile = function (shader, renderer) {
    previousCompile.call(this, shader, renderer);
    const glass = kind === "glass";
    shader.vertexShader = `${glass ? "varying vec2 finishPanel; varying vec2 finishSpan; varying float finishSeed;" : "varying vec3 finishWorld;"}\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      ${
        glass
          ? `
      finishPanel = vec2(0.0); finishSpan = vec2(0.0); finishSeed = 0.5;
      #ifdef USE_INSTANCING
        vec3 panelScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
        if (abs(normal.z) > 0.5) {
          finishPanel = position.xy * panelScale.xy; finishSpan = panelScale.xy;
        } else if (abs(normal.x) > 0.5) {
          finishPanel = position.zy * panelScale.zy; finishSpan = panelScale.zy;
        }
        finishSeed = fract(sin(dot(instanceMatrix[3].xyz, vec3(12.9898, 37.719, 78.233))) * 43758.5453);
      #endif
      `
          : `
      vec4 finishPosition = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        finishPosition = instanceMatrix * finishPosition;
      #endif
      finishWorld = (modelMatrix * finishPosition).xyz;
      `
      }`,
    );
    shader.fragmentShader = `${glass ? "varying vec2 finishPanel; varying vec2 finishSpan; varying float finishSeed;" : "varying vec3 finishWorld;"}\n${shader.fragmentShader}`;
    const detail = glass
      ? `
      float finishGlassRelief = 0.0;
      if (finishSpan.x > 0.1 && finishSpan.y > 0.1) {
        vec2 pixelFootprint = max(fwidth(finishPanel), vec2(0.002));
        float detailFade = 1.0 - smoothstep(0.15, 0.65, max(pixelFootprint.x, pixelFootprint.y));
        vec2 edge = max(vec2(0.0), finishSpan * 0.5 - abs(finishPanel));
        float border = 1.0 - smoothstep(0.035, 0.035 + max(pixelFootprint.x, pixelFootprint.y), min(edge.x, edge.y));
        float reveal = 1.0 - smoothstep(0.09, 0.09 + max(pixelFootprint.x, pixelFootprint.y), min(edge.x, edge.y));
        float verticalTint = smoothstep(-finishSpan.y * 0.5, finishSpan.y * 0.5, finishPanel.y);
        diffuseColor.rgb *= 0.92 + verticalTint * 0.13 + (finishSeed - 0.5) * 0.06;
        diffuseColor.rgb *= 1.0 - reveal * detailFade * 0.15;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.39,0.44,0.42), border * detailFade * 0.65);
        // A small crossbar on individual windows; existing curtain-wall grids stay intact.
        float crossbar = (1.0 - smoothstep(0.022, 0.022 + pixelFootprint.y, abs(finishPanel.y + finishSpan.y * 0.17)))
          * step(finishSpan.x, 2.5) * step(1.5, finishSpan.y) * step(finishSpan.y, 4.0) * detailFade;
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.39,0.44,0.42), crossbar * 0.55);
        finishGlassRelief = (border * 0.008 + reveal * 0.009 + crossbar * 0.006) * detailFade;
      }
      `
      : `
      vec3 finishSurface = normalize(cross(dFdx(finishWorld), dFdy(finishWorld)));
      float along = abs(finishSurface.x) > abs(finishSurface.z) ? finishWorld.z : finishWorld.x;
      vec2 finishUV = vec2(along / 0.85, finishWorld.y / 0.38);
      vec2 finishFootprint = max(fwidth(finishUV), vec2(0.001));
      float finishFade = 1.0 - smoothstep(0.25, 0.9, max(finishFootprint.x, finishFootprint.y));
      float blockTone = fract(sin(dot(floor(finishUV), vec2(127.1,311.7))) * 43758.5453);
      diffuseColor.rgb *= 1.0 + (blockTone - 0.5) * 0.045 * finishFade;
      ${
        kind === "stone"
          ? `
      finishUV.x += mod(floor(finishUV.y), 2.0) * 0.5;
      vec2 edge = min(fract(finishUV), 1.0 - fract(finishUV));
      vec2 interior = smoothstep(vec2(0.009,0.014), vec2(0.009,0.014) + finishFootprint, edge);
      float seam = 1.0 - interior.x * interior.y;
      diffuseColor.rgb *= 1.0 - seam * finishFade * 0.13 * (1.0 - smoothstep(0.5,0.85,abs(finishSurface.y)));
      `
          : ""
      }
      `;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>\n${detail}`,
    );
    if (glass)
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
      vec3 finishDx = dFdx(-vViewPosition), finishDy = dFdy(-vViewPosition);
      vec3 finishR1 = cross(finishDy, normal), finishR2 = cross(normal, finishDx);
      float finishDet = dot(finishDx, finishR1);
      vec3 finishGradient = sign(finishDet) * (dFdx(finishGlassRelief) * finishR1 + dFdy(finishGlassRelief) * finishR2);
      normal = normalize(abs(finishDet) * normal - finishGradient + normal * 0.000001);`,
      );
  };
  material.customProgramCacheKey = () =>
    `${previousKey}|building-finish-v1-${kind}`;
  material.needsUpdate = true;
  return material;
}

// Roles are explicit in each photo model, avoiding colour-based guesses.
export function applyModelFinishes({ stone = [], glass = [] }) {
  stone.forEach((material) => applyBuildingFinish(material, "stone"));
  glass.forEach((material) => applyBuildingFinish(material, "glass"));
}
