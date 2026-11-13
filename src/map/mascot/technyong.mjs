import * as THREE from "three";
import {
  mergeGeometries,
  mergeVertices,
} from "three/addons/utils/BufferGeometryUtils.js";

// 서울과기대 마스코트 '테크뇽' 3D 모델.
// 캐릭터 가이드의 지정 컬러(PANTONE)를 그대로 쓰고, 2D 일러스트처럼
// 셀 셰이딩 + 검은 외곽선(inverted hull)으로 그립니다.
// 크기: 발바닥 y=0, 머리 꼭대기 약 1.4, 뿔 끝 약 1.7. 정면은 +Z.

export const TECHNYONG_COLORS = {
  body: 0x75787f, // PANTONE 7544 C
  horn: 0xd8404c, // PANTONE 7626 C (빨간 뿔)
  hornBlue: 0x2f59a8, // PANTONE 7684 C (파란 뿔)
  ink: 0x111111, // PANTONE Black C
  blush: 0xf2a48c, // PANTONE 487 C
  belly: 0xd6dbdf, // PANTONE 537 C
  tuft: 0xa7a8aa, // PANTONE Cool Gray 6 C
  white: 0xffffff, // PANTONE White C
};

const OUTLINE = 0.017;

const celVertex = /* glsl */ `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// 조명은 장면과 상관없이 화면 기준 왼쪽 위에서 고정. 지정 컬러가 밝은 면에 그대로 나옵니다.
const celFragment = /* glsl */ `
uniform vec3 color;
uniform float shadow;
uniform float gloss;
varying vec3 vNormal;
void main() {
  vec3 n = normalize(vNormal);
  vec3 L = normalize(vec3(-0.45, 0.7, 0.6));
  float lit = smoothstep(-0.12, 0.02, dot(n, L));
  vec3 c = color * mix(shadow, 1.0, lit);
  float spec = smoothstep(0.985, 0.992, dot(n, normalize(L + vec3(0.0, 0.0, 1.0))));
  c = mix(c, vec3(1.0), spec * gloss);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`;

const outlineVertex = /* glsl */ `
uniform float thickness;
void main() {
  vec3 p = position + normal * thickness;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const flatFragment = /* glsl */ `
uniform vec3 color;
void main() {
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}`;

function celMaterial(hex, { shadow = 0.8, gloss = 0 } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(hex) },
      shadow: { value: shadow },
      gloss: { value: gloss },
    },
    vertexShader: celVertex,
    fragmentShader: celFragment,
  });
}

function flatMaterial(hex) {
  return new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(hex) } },
    vertexShader: celVertex,
    fragmentShader: flatFragment,
  });
}

function outlineMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(TECHNYONG_COLORS.ink) },
      thickness: { value: OUTLINE },
    },
    vertexShader: outlineVertex,
    fragmentShader: flatFragment,
    side: THREE.BackSide,
  });
}

// 이음매 정점을 합쳐 매끈한 법선을 만듭니다(외곽선이 갈라지지 않게).
function finalize(geometry) {
  const g = geometry.index ? geometry.toNonIndexed() : geometry;
  for (const name of Object.keys(g.attributes))
    if (name !== "position") g.deleteAttribute(name);
  const merged = mergeVertices(g, 1e-5);
  merged.computeVertexNormals();
  return merged;
}

function ellipsoid(rx, ry, rz, w = 32, h = 22) {
  return new THREE.SphereGeometry(1, w, h).scale(rx, ry, rz);
}

// 굵기가 변하는 튜브(양 끝 반구 마감). 뿔·꼬리·입선에 씁니다.
function taperedTube(
  points,
  radius,
  { tubular = 32, radial = 14, cap = 6 } = {},
) {
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
  const frames = curve.computeFrenetFrames(tubular, false);
  const radiusAt = typeof radius === "function" ? radius : () => radius;
  const rings = [];
  const ring = (center, normal, binormal, r) => {
    const verts = [];
    for (let j = 0; j < radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      verts.push(
        center
          .clone()
          .addScaledVector(normal, Math.cos(a) * r)
          .addScaledVector(binormal, Math.sin(a) * r),
      );
    }
    rings.push(verts);
  };
  const start = curve.getPointAt(0),
    startT = frames.tangents[0],
    startR = radiusAt(0);
  for (let k = cap; k >= 1; k--) {
    const a = (k / cap) * (Math.PI / 2);
    ring(
      start.clone().addScaledVector(startT, -Math.sin(a) * startR),
      frames.normals[0],
      frames.binormals[0],
      Math.max(Math.cos(a) * startR, 1e-4),
    );
  }
  for (let i = 0; i <= tubular; i++) {
    const t = i / tubular;
    ring(
      curve.getPointAt(t),
      frames.normals[i],
      frames.binormals[i],
      radiusAt(t),
    );
  }
  const end = curve.getPointAt(1),
    endT = frames.tangents[tubular],
    endR = radiusAt(1);
  for (let k = 1; k <= cap; k++) {
    const a = (k / cap) * (Math.PI / 2);
    ring(
      end.clone().addScaledVector(endT, Math.sin(a) * endR),
      frames.normals[tubular],
      frames.binormals[tubular],
      Math.max(Math.cos(a) * endR, 1e-4),
    );
  }
  const positions = [],
    index = [];
  for (const verts of rings)
    for (const v of verts) positions.push(v.x, v.y, v.z);
  for (let i = 0; i < rings.length - 1; i++)
    for (let j = 0; j < radial; j++) {
      const a = i * radial + j,
        b = i * radial + ((j + 1) % radial),
        c = (i + 1) * radial + j,
        d = (i + 1) * radial + ((j + 1) % radial);
      index.push(a, b, c, b, d, c);
    }
  // 양 끝을 한 점으로 닫습니다.
  const first = positions.length / 3;
  positions.push(...rings[0][0].toArray());
  const last = first + 1;
  positions.push(...rings.at(-1)[0].toArray());
  const lastRing = (rings.length - 1) * radial;
  for (let j = 0; j < radial; j++) {
    index.push(first, (j + 1) % radial, j);
    index.push(last, lastRing + j, lastRing + ((j + 1) % radial));
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setIndex(index);
  return g;
}

// 머리: 아래(볼)가 조금 넓고 앞면이 납작한 둥근 사각형 덩어리.
function headGeometry() {
  const g = new THREE.SphereGeometry(1, 80, 60);
  const p = g.attributes.position;
  const se = (c, e) => Math.sign(c) * Math.pow(Math.abs(c), e);
  for (let i = 0; i < p.count; i++) {
    let x = se(p.getX(i), 0.62),
      y = se(p.getY(i), 0.8),
      z = se(p.getZ(i), 0.78);
    x *= 0.5;
    y *= 0.44;
    z *= 0.42;
    const down = -y / 0.44; // 아래 +1, 위 -1
    x *= 1 + 0.1 * down;
    if (y < 0) y *= 0.9;
    if (z > 0) z *= 0.86 + 0.06 * Math.max(0, -down);
    p.setXYZ(i, x, y, z);
  }
  return g;
}

// 몸통: 서양배 모양 회전체.
function bodyGeometry() {
  const profile = new THREE.SplineCurve([
    new THREE.Vector2(0.001, 0.12),
    new THREE.Vector2(0.16, 0.125),
    new THREE.Vector2(0.24, 0.165),
    new THREE.Vector2(0.27, 0.23),
    new THREE.Vector2(0.255, 0.34),
    new THREE.Vector2(0.21, 0.45),
    new THREE.Vector2(0.15, 0.54),
    new THREE.Vector2(0.001, 0.57),
  ]).getPoints(40);
  return new THREE.LatheGeometry(profile, 56).scale(1, 1, 0.84);
}

// 꼬리 끝 털: 위로 뾰족한 물방울.
function tuftGeometry() {
  const profile = new THREE.SplineCurve([
    new THREE.Vector2(0.001, -0.085),
    new THREE.Vector2(0.06, -0.075),
    new THREE.Vector2(0.095, -0.025),
    new THREE.Vector2(0.09, 0.035),
    new THREE.Vector2(0.055, 0.085),
    new THREE.Vector2(0.018, 0.125),
    new THREE.Vector2(0.001, 0.14),
  ]).getPoints(28);
  return new THREE.LatheGeometry(profile, 36);
}

const Z = new THREE.Vector3(0, 0, 1);

function surfacePoint(mesh, origin, dir) {
  const ray = new THREE.Raycaster(origin, dir.clone().normalize());
  const hit = ray.intersectObject(mesh, false)[0];
  if (!hit) throw new Error("technyong: surface ray missed");
  const normal = hit.face.normal.clone().transformDirection(mesh.matrixWorld);
  return { point: hit.point.clone(), normal };
}

export function createTechnyong() {
  const mats = {
    body: celMaterial(TECHNYONG_COLORS.body),
    belly: celMaterial(TECHNYONG_COLORS.belly, { shadow: 0.88 }),
    horn: celMaterial(TECHNYONG_COLORS.horn, { shadow: 0.78, gloss: 0.18 }),
    hornBlue: celMaterial(TECHNYONG_COLORS.hornBlue, {
      shadow: 0.78,
      gloss: 0.18,
    }),
    blush: flatMaterial(TECHNYONG_COLORS.blush),
    tuft: celMaterial(TECHNYONG_COLORS.tuft, { shadow: 0.84 }),
    tuftLight: celMaterial(0xdfe2e5, { shadow: 0.9 }),
    ink: flatMaterial(TECHNYONG_COLORS.ink),
    eye: celMaterial(0x0b0b0d, { shadow: 1, gloss: 0 }),
    white: flatMaterial(TECHNYONG_COLORS.white),
    outline: outlineMaterial(),
  };

  // 같은 강체 그룹 안에서 재질이 같은 조각을 하나로 합칩니다(그리기 호출 절약).
  const pieces = new Map();
  function add(group, geometry, material, { outline = true, matrix } = {}) {
    const g = finalize(geometry);
    if (matrix) g.applyMatrix4(matrix);
    if (!pieces.has(group)) pieces.set(group, []);
    pieces.get(group).push({ g, material, outline });
    return g;
  }
  function bake(group) {
    const byMaterial = new Map();
    for (const { g, material, outline } of pieces.get(group) ?? []) {
      if (!byMaterial.has(material)) byMaterial.set(material, []);
      byMaterial.get(material).push(g);
      if (outline) {
        if (!byMaterial.has(mats.outline)) byMaterial.set(mats.outline, []);
        byMaterial.get(mats.outline).push(g);
      }
    }
    for (const [material, list] of byMaterial) {
      const mesh = new THREE.Mesh(mergeGeometries(list), material);
      mesh.renderOrder = material === mats.outline ? 0 : 1;
      group.add(mesh);
    }
  }
  const at = (x, y, z, rx = 0, ry = 0, rz = 0, s = 1) =>
    new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(s, s, s),
    );
  // 표면에 붙이는 납작한 조각(눈·볼·배 등): 로컬 z를 표면 법선에 맞춥니다.
  const onSurface = (hit, sink, extra = new THREE.Vector3()) =>
    new THREE.Matrix4().compose(
      hit.point.clone().addScaledVector(hit.normal, -sink).add(extra),
      new THREE.Quaternion().setFromUnitVectors(Z, hit.normal),
      new THREE.Vector3(1, 1, 1),
    );

  const root = new THREE.Group();
  root.name = "technyong";
  const rig = new THREE.Group(); // 걸을 때 위아래로 들썩임
  root.add(rig);

  // ── 몸통 ──
  const torso = new THREE.Group();
  rig.add(torso);
  const bodyGeo = finalize(bodyGeometry());
  const bodyProbe = new THREE.Mesh(bodyGeo);
  bodyProbe.updateMatrixWorld();
  add(torso, bodyGeo, mats.body);
  {
    const hit = surfacePoint(
      bodyProbe,
      new THREE.Vector3(0, 0.3, 2),
      new THREE.Vector3(0, 0, -1),
    );
    add(torso, ellipsoid(0.175, 0.15, 0.06), mats.belly, {
      outline: false,
      matrix: onSurface(hit, 0.045),
    });
  }
  // 등 가시: 등 가운데를 따라 세 개.
  for (const [y, s] of [
    [0.44, 0.85],
    [0.35, 1],
    [0.26, 0.9],
  ]) {
    const hit = surfacePoint(
      bodyProbe,
      new THREE.Vector3(0, y, -2),
      new THREE.Vector3(0, 0, 1),
    );
    const cone = new THREE.ConeGeometry(0.042 * s, 0.075 * s, 18, 1);
    cone.rotateX(-Math.PI / 2 - 0.55); // 뒤쪽 + 아래로 기울임
    cone.scale(0.55, 1, 1);
    cone.translate(0, 0, 0);
    add(torso, cone, mats.body, {
      matrix: new THREE.Matrix4().makeTranslation(
        hit.point.clone().addScaledVector(hit.normal, 0.012),
      ),
    });
  }
  bake(torso);

  // ── 다리 ──
  const legs = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.118, 0.24, 0.0);
    const leg = new THREE.LatheGeometry(
      new THREE.SplineCurve([
        new THREE.Vector2(0.001, 0),
        new THREE.Vector2(0.075, 0.002),
        new THREE.Vector2(0.097, 0.028),
        new THREE.Vector2(0.096, 0.08),
        new THREE.Vector2(0.086, 0.2),
        new THREE.Vector2(0.001, 0.24),
      ]).getPoints(24),
      28,
    );
    leg.scale(1, 1, 1.12);
    add(pivot, leg, mats.body, { matrix: at(0, -0.24, 0.01) });
    bake(pivot);
    rig.add(pivot);
    return pivot;
  });

  // ── 팔 ──
  const arms = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.19, 0.43, 0.09);
    pivot.rotation.set(-0.3, 0, side * 0.62);
    const arm = new THREE.CapsuleGeometry(0.066, 0.13, 10, 20);
    add(pivot, arm, mats.body, { matrix: at(0, -0.13, 0) });
    bake(pivot);
    rig.add(pivot);
    return pivot;
  });

  // ── 꼬리 ──
  const tail = new THREE.Group();
  tail.position.set(0.02, 0.2, -0.16);
  rig.add(tail);
  {
    const pts = [
      [0, 0, 0],
      [0.02, -0.08, -0.13],
      [0.1, -0.125, -0.25],
      [0.26, -0.115, -0.27],
      [0.39, -0.05, -0.18],
      [0.45, 0.05, -0.08],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
    add(
      tail,
      taperedTube(pts, (t) => 0.1 - 0.055 * t, { tubular: 48, radial: 20 }),
      mats.body,
    );
    // 꼬리 위 작은 가시
    const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    for (const [t, s] of [
      [0.14, 0.9],
      [0.3, 0.8],
      [0.46, 0.65],
    ]) {
      const p = curve.getPointAt(t),
        tangent = curve.getTangentAt(t);
      const cone = new THREE.ConeGeometry(0.035 * s, 0.07 * s, 16, 1);
      cone.scale(0.55, 1, 1);
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 1, 0).addScaledVector(tangent, -0.6).normalize(),
      );
      const r = 0.1 - 0.055 * t;
      add(tail, cone, mats.body, {
        matrix: new THREE.Matrix4().compose(
          p.clone().add(new THREE.Vector3(0, r * 0.9, 0)),
          q,
          new THREE.Vector3(1, 1, 1),
        ),
      });
    }
    const end = pts.at(-1);
    const tip = curve.getTangentAt(1);
    const tuftUp = new THREE.Vector3(0, 1, 0)
      .addScaledVector(tip, 0.5)
      .normalize();
    const tuftQ = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      tuftUp,
    );
    const tuftPos = end
      .clone()
      .addScaledVector(tip, 0.06)
      .add(new THREE.Vector3(0, 0.05, 0));
    add(tail, tuftGeometry(), mats.tuft, {
      matrix: new THREE.Matrix4().compose(
        tuftPos,
        tuftQ,
        new THREE.Vector3(1.05, 1.05, 1.05),
      ),
    });
    // 털 앞쪽 밝은 무늬
    add(tail, ellipsoid(0.055, 0.05, 0.05), mats.tuftLight, {
      outline: false,
      matrix: new THREE.Matrix4().makeTranslation(
        tuftPos.clone().add(new THREE.Vector3(-0.02, -0.025, 0.06)),
      ),
    });
    bake(tail);
  }

  // ── 머리 ──
  const neck = new THREE.Group(); // 고개 끄덕임 축
  neck.position.set(0, 0.52, 0);
  rig.add(neck);
  const head = new THREE.Group();
  head.position.set(0, 0.42, 0);
  neck.add(head);
  const headGeo = finalize(headGeometry());
  const headProbe = new THREE.Mesh(headGeo);
  headProbe.updateMatrixWorld();
  add(head, headGeo, mats.body);
  const face = (x, y) =>
    surfacePoint(
      headProbe,
      new THREE.Vector3(x, y, 2),
      new THREE.Vector3(0, 0, -1),
    );
  const tangentFrame = (n) => {
    const right = new THREE.Vector3(0, 1, 0).cross(n).normalize();
    const up = n.clone().cross(right).normalize();
    return { right, up };
  };

  // 귀: 머리 위 양옆으로 뻗은 잎사귀 모양
  for (const side of [-1, 1]) {
    const ear = ellipsoid(0.16, 0.068, 0.1, 32, 20);
    ear.translate(side * 0.1, 0, 0);
    add(head, ear, mats.body, {
      matrix: at(side * 0.38, 0.26, -0.04, 0, side * 0.3, side * 0.3),
    });
  }

  // 뿔: 빨강(화면 왼쪽 = 캐릭터 오른쪽), 파랑(화면 오른쪽)
  for (const [side, mat] of [
    [-1, mats.horn],
    [1, mats.hornBlue],
  ]) {
    const v = (x, y, z) => new THREE.Vector3(side * x, y, z);
    const stalk = [
      v(0.17, 0.3, 0.0),
      v(0.19, 0.44, -0.005),
      v(0.185, 0.56, -0.01),
      v(0.215, 0.66, -0.015),
      v(0.275, 0.71, -0.02),
    ];
    add(
      head,
      taperedTube(stalk, (t) => 0.064 - 0.016 * t, { tubular: 36, radial: 18 }),
      mat,
    );
    const prong = [
      v(0.19, 0.5, -0.008),
      v(0.25, 0.52, -0.008),
      v(0.285, 0.565, -0.01),
    ];
    add(
      head,
      taperedTube(prong, (t) => 0.04 - 0.008 * t, { tubular: 16, radial: 16 }),
      mat,
    );
  }

  // 눈썹(흰 점)
  for (const side of [-1, 1]) {
    const hit = face(side * 0.15, 0.035);
    add(head, ellipsoid(0.054, 0.032, 0.02), mats.white, {
      outline: false,
      matrix: onSurface(hit, 0.012),
    });
  }
  // 눈: 검은 눈동자 + 하이라이트 두 개
  for (const side of [-1, 1]) {
    const hit = face(side * 0.172, -0.13);
    add(head, ellipsoid(0.052, 0.057, 0.03), mats.eye, {
      outline: false,
      matrix: onSurface(hit, 0.016),
    });
    const { right, up } = tangentFrame(hit.normal);
    const lift = (dx, dy, out) =>
      right
        .clone()
        .multiplyScalar(dx)
        .addScaledVector(up, dy)
        .addScaledVector(hit.normal, out);
    add(head, ellipsoid(0.021, 0.021, 0.008), mats.white, {
      outline: false,
      matrix: onSurface(hit, 0, lift(-0.014, 0.019, 0.011)),
    });
    add(head, ellipsoid(0.01, 0.01, 0.006), mats.white, {
      outline: false,
      matrix: onSurface(hit, 0, lift(0.019, -0.021, 0.009)),
    });
  }
  // 볼 터치
  for (const side of [-1, 1]) {
    const hit = face(side * 0.285, -0.225);
    add(head, ellipsoid(0.1, 0.088, 0.03), mats.blush, {
      outline: false,
      matrix: onSurface(hit, 0.022),
    });
  }
  // 표면을 따라가는 먹선
  const inkLine = (fn, samples, radius) => {
    const pts = [];
    for (let i = 0; i <= samples; i++) {
      const [x, y] = fn(i / samples);
      const hit = face(x, y);
      pts.push(hit.point.addScaledVector(hit.normal, 0.012));
    }
    add(
      head,
      taperedTube(pts, radius, { tubular: samples * 3, radial: 10, cap: 4 }),
      mats.ink,
      {
        outline: false,
      },
    );
  };
  // 볼 위 물결선(~)
  for (const side of [-1, 1])
    inkLine(
      (u) => [
        side * (0.405 - 0.19 * u),
        -0.2 + 0.018 * Math.sin(u * Math.PI * 2),
      ],
      14,
      0.0095,
    );
  // 입: 양 끝이 살짝 올라간 ‿‿
  inkLine(
    (u) => [
      -0.16 + 0.32 * u,
      -0.272 - 0.024 * Math.abs(Math.sin(u * Math.PI * 2)),
    ],
    24,
    0.0105,
  );
  bake(head);

  // ── 애니메이션 ──
  const rest = {
    armZ: arms.map((a) => a.rotation.z),
    armX: arms[0].rotation.x,
  };
  let walkBlend = 0;
  function update(time, { moving = true, dt = 1 / 60 } = {}) {
    walkBlend += ((moving ? 1 : 0) - walkBlend) * Math.min(1, dt * 6);
    const w = time * 9; // 걸음 위상(rad/s)
    const s = Math.sin(w),
      b = walkBlend;
    legs[0].rotation.x = 0.55 * s * b;
    legs[1].rotation.x = -0.55 * s * b;
    arms[0].rotation.x = rest.armX - 0.45 * s * b;
    arms[1].rotation.x = rest.armX + 0.45 * s * b;
    arms[0].rotation.z = rest.armZ[0] - 0.08 * b;
    arms[1].rotation.z = rest.armZ[1] + 0.08 * b;
    rig.position.y = Math.abs(Math.cos(w)) * 0.045 * b;
    rig.rotation.z = 0.085 * s * b;
    const idle = Math.sin(time * 2.2);
    neck.rotation.z = -0.04 * s * b;
    neck.rotation.x = 0.03 * idle * (1 - b) + 0.04 * b;
    head.position.y = 0.42 + 0.008 * idle * (1 - b);
    tail.rotation.y = 0.28 * Math.sin(w * 0.5) * b + 0.08 * idle * (1 - b);
    tail.rotation.x = 0.06 * Math.cos(w) * b;
  }
  update(0, { moving: false, dt: 1 });

  function dispose() {
    root.traverse((o) => o.isMesh && o.geometry.dispose());
    for (const m of Object.values(mats)) m.dispose();
  }

  return { object: root, update, dispose };
}
