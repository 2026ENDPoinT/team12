// 미래관 3D 도면 질감: 비공개 촬영 영상(private/mirae/sv)의 실제 모습을 참고해 바닥·벽·문·유리·계단 등에
// 코드로 그린 무늬(캔버스 텍스처)와 빛 반응(거칠기·금속감)을 입힙니다. 이미지 파일 없이 만듭니다.
//  · 바닥: 밝은 화강석 테라조 60cm 타일(잔점·줄눈·타일마다 약간 다른 톤), 은은한 광택
//  · 바닥 띠: 짙은 회색 화강석
//  · 벽: 상아색 도장(아주 옅은 얼룩), 걸레받이: 짙은 갈회색 반광
//  · 문: 민트그린 판(세로 결), 문틀·창살·난간: 회색 금속(가로 결)
//  · 계단·디딤판: 석재, 손잡이: 나무 결, 천장: 60cm 천장판(작은 구멍 무늬)
//  · 유리: 푸른빛 반투명 + 주변 반사
// 도면(GLB)은 꼭짓점 색만 있고 UV가 없어서, 면 방향에 맞춰 미터 단위로 투영해 UV를 만듭니다.
import * as THREE from "three";

// 시드 고정 난수(매번 같은 무늬)
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

function canvas(n, draw) {
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const x = c.getContext("2d");
  draw(x, n);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const gray = (v, a = 1) => `rgba(${v},${v},${v},${a})`;

// 잔점(테라조·화강석): 밝기 base에 작은 점들
function speckle(x, n, r, base, dots, sizes, tones) {
  x.fillStyle = gray(base);
  x.fillRect(0, 0, n, n);
  for (let i = 0; i < dots; i++) {
    const t = tones[Math.floor(r() * tones.length)];
    x.fillStyle = gray(t[0], t[1]);
    const s = sizes[0] + r() * (sizes[1] - sizes[0]);
    x.beginPath();
    x.arc(r() * n, r() * n, s, 0, Math.PI * 2);
    x.fill();
  }
}

const TEX = {
  // 1.2m = 타일 2×2
  floor: (n = 512) =>
    canvas(n, (x) => {
      const r = rng(11);
      speckle(
        x,
        n,
        r,
        236,
        5200,
        [0.5, 1.6],
        [
          [150, 0.55],
          [120, 0.45],
          [255, 0.7],
          [196, 0.6],
          [170, 0.5],
        ],
      );
      const h = n / 2;
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++) {
          // 타일마다 톤 차이
          const v = 0.92 + r() * 0.08;
          x.fillStyle = gray(Math.round(255 * v), 0.18);
          x.fillRect(i * h, j * h, h, h);
        }
      // 줄눈
      x.fillStyle = gray(150, 0.9);
      for (let k = 0; k <= 2; k++) {
        x.fillRect(k * h - 1, 0, 2, n);
        x.fillRect(0, k * h - 1, n, 2);
      }
    }),
  inlay: (n = 256) =>
    canvas(n, (x) => {
      const r = rng(23);
      speckle(
        x,
        n,
        r,
        205,
        2600,
        [0.5, 1.4],
        [
          [90, 0.6],
          [255, 0.5],
          [140, 0.5],
        ],
      );
    }),
  wall: (n = 256) =>
    canvas(n, (x) => {
      const r = rng(5);
      x.fillStyle = gray(248);
      x.fillRect(0, 0, n, n);
      // 아주 옅은 롤러 얼룩
      for (let i = 0; i < 160; i++) {
        x.fillStyle = gray(r() < 0.5 ? 232 : 255, 0.08);
        x.beginPath();
        x.ellipse(
          r() * n,
          r() * n,
          6 + r() * 26,
          4 + r() * 14,
          r() * 3,
          0,
          Math.PI * 2,
        );
        x.fill();
      }
    }),
  ceiling: (n = 256) =>
    canvas(n, (x) => {
      const r = rng(7);
      x.fillStyle = gray(250);
      x.fillRect(0, 0, n, n);
      x.fillStyle = gray(200, 0.6);
      for (let i = 0; i < 1400; i++)
        x.fillRect(Math.floor(r() * n), Math.floor(r() * n), 1, 1);
      // 60cm 천장판 이음(1.2m에 2칸)
      x.fillStyle = gray(190);
      const h = n / 2;
      for (let k = 0; k <= 2; k++) {
        x.fillRect(k * h - 1, 0, 2, n);
        x.fillRect(0, k * h - 1, n, 2);
      }
    }),
  door: (n = 256) =>
    canvas(n, (x) => {
      const r = rng(13);
      x.fillStyle = gray(246);
      x.fillRect(0, 0, n, n);
      for (let i = 0; i < 90; i++) {
        x.fillStyle = gray(r() < 0.5 ? 228 : 255, 0.25);
        x.fillRect(r() * n, 0, 1 + r() * 2, n); // 세로 결(v가 높이)
      }
    }),
  metal: (n = 128) =>
    canvas(n, (x) => {
      const r = rng(17);
      x.fillStyle = gray(236);
      x.fillRect(0, 0, n, n);
      for (let i = 0; i < 120; i++) {
        x.fillStyle = gray(r() < 0.5 ? 205 : 255, 0.35);
        x.fillRect(0, r() * n, n, 1); // 가로 결
      }
    }),
  wood: (n = 256) =>
    canvas(n, (x) => {
      const r = rng(19);
      x.fillStyle = gray(232);
      x.fillRect(0, 0, n, n);
      for (let i = 0; i < 70; i++) {
        x.strokeStyle = gray(r() < 0.6 ? 190 : 255, 0.35);
        x.lineWidth = 1 + r() * 2;
        x.beginPath();
        const y0 = r() * n;
        x.moveTo(0, y0);
        for (let u = 0; u <= n; u += 16)
          x.lineTo(u, y0 + Math.sin(u / 40 + i) * 3);
        x.stroke();
      }
    }),
  stone: (n = 256) =>
    canvas(n, (x) => {
      const r = rng(29);
      speckle(
        x,
        n,
        r,
        240,
        2600,
        [0.5, 1.5],
        [
          [160, 0.5],
          [120, 0.4],
          [255, 0.6],
        ],
      );
    }),
  // 엘리베이터 문: 샴페인 골드 헤어라인(세로 결) + 가운데 세로 틈(양쪽으로 열리는 문) + 양옆 틈
  elevDoor: () => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 512;
    const x = c.getContext("2d");
    const r = rng(41);
    const g = x.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, "#d2b06a");
    g.addColorStop(0.25, "#f0d699");
    g.addColorStop(0.5, "#e1c07c");
    g.addColorStop(0.75, "#f6dea4");
    g.addColorStop(1, "#d2b06a");
    x.fillStyle = g;
    x.fillRect(0, 0, 256, 512);
    for (let i = 0; i < 260; i++) {
      x.fillStyle =
        r() < 0.5 ? "rgba(255,240,200,0.10)" : "rgba(90,60,20,0.08)";
      x.fillRect(r() * 256, 0, 1, 512);
    }
    // 양옆 틈(문틀과 맞닿는 곳)
    x.fillStyle = "rgba(60,40,15,0.55)";
    x.fillRect(0, 0, 3, 512);
    x.fillRect(253, 0, 3, 512);
    // 가운데 세로 틈: 짙은 선 + 양옆 빛 받는 모서리
    x.fillStyle = "#2a1d0c";
    x.fillRect(126, 0, 4, 512);
    x.fillStyle = "rgba(255,236,190,0.55)";
    x.fillRect(123, 0, 2, 512);
    x.fillRect(131, 0, 2, 512);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  },
  plain: (n = 128) =>
    canvas(n, (x) => {
      const r = rng(31);
      x.fillStyle = gray(246);
      x.fillRect(0, 0, n, n);
      for (let i = 0; i < 500; i++) {
        x.fillStyle = gray(r() < 0.5 ? 230 : 255, 0.3);
        x.fillRect(r() * n, r() * n, 1, 1);
      }
    }),
};

// 면 종류: 무늬, 무늬 한 장이 덮는 길이(m), 거칠기, 금속감
const KINDS = {
  floor: { tex: "floor", m: 1.2, rough: 0.42 },
  inlay: { tex: "inlay", m: 0.8, rough: 0.36 },
  wall: { tex: "wall", m: 2.4, rough: 0.82 },
  ceiling: { tex: "ceiling", m: 1.2, rough: 0.92 },
  base: { tex: "plain", m: 1, rough: 0.45 },
  door: { tex: "door", m: 1.0, rough: 0.5 },
  metal: { tex: "metal", m: 0.6, rough: 0.38, metal: 0.55 },
  wood: { tex: "wood", m: 0.8, rough: 0.55 },
  stone: { tex: "stone", m: 1.2, rough: 0.42 },
  dark: { tex: "plain", m: 1, rough: 0.15, metal: 0.2 }, // 문 유리창·짙은 판
  light: { emissive: true },
  elevDoor: { tex: "elevDoor", fit: true, rough: 0.3, metal: 0.35 }, // 문 한 짝에 질감 한 장
  plain: { tex: "plain", m: 1.5, rough: 0.7 },
};

// 꼭짓점 색(0~255) → 면 종류. 도면 색은 몇 가지로 정해져 있음(scripts/clean-mirae.py 참고)
function kindOf(r, g, b, horizontal, prefix) {
  const is = (R, G, B) =>
    Math.abs(r - R) < 4 && Math.abs(g - G) < 4 && Math.abs(b - B) < 4;
  if (prefix === "C") {
    if (is(255, 255, 255)) return "light";
    if (is(244, 244, 238)) return "ceiling";
    return "plain";
  }
  if (is(216, 210, 198) || is(203, 200, 192))
    return horizontal ? "floor" : "plain";
  if (is(168, 171, 168)) return "inlay";
  if (is(236, 228, 205)) return "wall";
  if (is(62, 56, 50)) return "base";
  if (is(152, 192, 150)) return "door";
  if (is(105, 112, 112) || is(170, 174, 178)) return "metal";
  if (is(150, 96, 58) || is(150, 110, 80)) return "wood";
  if (is(205, 200, 190) || is(244, 244, 238)) return "stone";
  if (is(40, 48, 52)) return "dark";
  return "plain";
}

let shared = null;
function materials(renderer) {
  if (shared) return shared;
  const aniso = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const tex = {};
  const mats = {};
  for (const [k, d] of Object.entries(KINDS)) {
    if (d.emissive) {
      mats[k] = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xfffbf0,
        emissiveIntensity: 0.9,
        side: THREE.DoubleSide,
      });
      continue;
    }
    const t = (tex[d.tex] ||= TEX[d.tex]());
    const map = t.clone();
    map.needsUpdate = true;
    if (!d.fit) map.repeat.set(1 / d.m, 1 / d.m);
    map.anisotropy = aniso;
    mats[k] = new THREE.MeshStandardMaterial({
      vertexColors: !d.fit,
      map,
      roughness: d.rough,
      metalness: d.metal || 0,
      side: THREE.DoubleSide,
    });
  }
  shared = mats;
  return mats;
}

/** 주변 반사광(유리·광택 바닥에 비치는 실내 모습). scene.environment 로 씁니다. */
export function interiorEnvironment(renderer) {
  return import("three/examples/jsm/environments/RoomEnvironment.js").then(
    ({ RoomEnvironment }) => {
      const pm = new THREE.PMREMGenerator(renderer);
      const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
      pm.dispose();
      return env;
    },
  );
}

/** 도면에는 법선이 없어서, 질감 없이 쓰는 메시(유리·바깥 땅)에 면 법선을 붙입니다(없으면 빛을 못 받아 검게 보임) */
export function flatNormals(mesh) {
  const g = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry;
  g.computeVertexNormals();
  if (g !== mesh.geometry) mesh.geometry.dispose();
  mesh.geometry = g;
}

/** 실내 조명 세기: 반사광·톤 매핑과 함께 맞춘 값 */
export const LIGHTING = {
  hemi: 1.15,
  sun: 0.55,
  env: 0.4,
  exposure: 1.1, // 걸어 보기(1인칭)
  mapExposure: 1.4, // 지도 보기(위에서)
};

// Presentation palette for the cutaway. First-person navigation retains the
// photo-matched finishes used to recognize real rooms and doors.
const CUTAWAY_FINISH = {
  floor: { color: 0xe7ddca, vertexColors: false, roughness: 0.76 },
  wall: { color: 0xf5f0e7, vertexColors: false, roughness: 0.88 },
  stone: { color: 0xdad7cf, vertexColors: false, roughness: 0.78 },
  wood: { color: 0xc39a70, vertexColors: false, roughness: 0.68 },
  door: { color: 0xa7b8a3, vertexColors: false, roughness: 0.7 },
};

// Subtle contact shading at the base of cutaway walls.
function cutawayMaterial(material, kind, floorHeight) {
  const finish = CUTAWAY_FINISH[kind];
  if (!finish) return material;
  const cutaway = material.clone();
  cutaway.color.setHex(finish.color);
  cutaway.vertexColors = false;
  cutaway.roughness = finish.roughness;
  if (kind === "wall") {
    cutaway.onBeforeCompile = (shader) => {
      shader.uniforms.cutawayFloorHeight = { value: floorHeight };
      shader.vertexShader = "varying float cutawayHeight;\n" + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\ncutawayHeight = position.y;",
      );
      shader.fragmentShader =
        "varying float cutawayHeight;\nuniform float cutawayFloorHeight;\n" +
        shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         float wallBase = smoothstep(0.05, 0.95, cutawayHeight - cutawayFloorHeight);
         diffuseColor.rgb *= mix(0.80, 1.0, wallBase);`,
      );
    };
    cutaway.customProgramCacheKey = () => "mirae-cutaway-wall-contact";
  }
  return cutaway;
}

/** 유리(G<층>) 재질 */
export function glassMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0xcfe3ee,
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false,
    envMapIntensity: 1.4,
  });
}

/**
 * 도면 메시 하나(F·C·D)에 질감 입히기: 면 종류별로 삼각형을 모아 그룹을 만들고 UV·법선을 붙입니다.
 * extra: 재질 옵션(예: D 묶음의 polygonOffset)
 */
export function texturize(mesh, renderer, extra = {}, opts = {}) {
  // opts.elevDoors: [[x, y], ...] 이 층 엘리베이터 문 자리(건물 좌표). 근처 나무색 문짝 → 골드 문
  const elev = opts.elevDoors || [];
  const mats = materials(renderer);
  const src = mesh.geometry.index
    ? mesh.geometry.toNonIndexed()
    : mesh.geometry;
  const P = src.getAttribute("position"),
    C = src.getAttribute("color");
  const nTri = P.count / 3;
  const prefix = mesh.name[0];
  const names = Object.keys(KINDS);
  const kindIdx = new Uint8Array(nTri);
  const a = new THREE.Vector3(),
    b = new THREE.Vector3(),
    c = new THREE.Vector3(),
    nrm = new THREE.Vector3(),
    tmp = new THREE.Vector3();
  const tris = names.map(() => []);
  for (let t = 0; t < nTri; t++) {
    a.fromBufferAttribute(P, 3 * t);
    b.fromBufferAttribute(P, 3 * t + 1);
    c.fromBufferAttribute(P, 3 * t + 2);
    nrm.subVectors(c, b).cross(tmp.subVectors(b, a)).normalize();
    const hz = Math.abs(nrm.y) > 0.7;
    const r = Math.round(C.getX(3 * t) * 255),
      g = Math.round(C.getY(3 * t) * 255),
      bl = Math.round(C.getZ(3 * t) * 255);
    let kind = kindOf(r, g, bl, hz, prefix);
    if (kind === "wood" && !hz && elev.length && r === 150 && g === 110) {
      const cx = (a.x + b.x + c.x) / 3,
        cy = -(a.z + b.z + c.z) / 3;
      if (elev.some((e) => Math.hypot(e[0] - cx, e[1] - cy) < 1.6))
        kind = "elevDoor";
    }
    const k = names.indexOf(kind);
    kindIdx[t] = k;
    tris[k].push(t);
  }
  // 종류별로 모아 새 배열(위치·색·법선·UV)
  const pos = new Float32Array(P.count * 3),
    col = new Float32Array(P.count * 3),
    nor = new Float32Array(P.count * 3),
    uv = new Float32Array(P.count * 2);
  // 엘리베이터 문: 문마다 폭·높이를 재서 질감 한 장이 문 전체를 덮게(가운데 틈이 문 가운데)
  const fitBox = new Map();
  const ek = names.indexOf("elevDoor");
  for (const t of tris[ek] || []) {
    a.fromBufferAttribute(P, 3 * t);
    const cx = a.x,
      cy = -a.z;
    const di = elev.reduce(
      (bi, e, i) =>
        Math.hypot(e[0] - cx, e[1] - cy) <
        Math.hypot(elev[bi][0] - cx, elev[bi][1] - cy)
          ? i
          : bi,
      0,
    );
    fitBox.set(t, di);
  }
  // 문마다 수평 x·z와 높이 범위. 더 길게 퍼진 수평 축이 문 폭 방향(두께 쪽 옆면에 속지 않게)
  const boxes = elev.map(() => ({
    x0: Infinity,
    x1: -Infinity,
    z0: Infinity,
    z1: -Infinity,
    y0: Infinity,
    y1: -Infinity,
  }));
  for (const [t, di] of fitBox) {
    const bx = boxes[di];
    for (let v = 0; v < 3; v++) {
      a.fromBufferAttribute(P, 3 * t + v);
      bx.x0 = Math.min(bx.x0, a.x);
      bx.x1 = Math.max(bx.x1, a.x);
      bx.z0 = Math.min(bx.z0, a.z);
      bx.z1 = Math.max(bx.z1, a.z);
      bx.y0 = Math.min(bx.y0, a.y);
      bx.y1 = Math.max(bx.y1, a.y);
    }
  }
  for (const bx of boxes) {
    const alongX = bx.x1 - bx.x0 >= bx.z1 - bx.z0;
    bx.u0 = alongX ? bx.x0 : bx.z0;
    bx.u1 = alongX ? bx.x1 : bx.z1;
    bx.n = alongX ? "z" : "x"; // 문 법선 축(u는 그에 수직인 축)
  }
  const geo = new THREE.BufferGeometry();
  const matList = [];
  const cutawayList = [];
  let w = 0;
  for (let k = 0; k < names.length; k++) {
    if (!tris[k].length) continue;
    const start = w;
    for (const t of tris[k]) {
      a.fromBufferAttribute(P, 3 * t);
      b.fromBufferAttribute(P, 3 * t + 1);
      c.fromBufferAttribute(P, 3 * t + 2);
      nrm.subVectors(c, b).cross(tmp.subVectors(b, a)).normalize();
      const ax = Math.abs(nrm.x),
        ay = Math.abs(nrm.y),
        az = Math.abs(nrm.z);
      for (let v = 0; v < 3; v++) {
        const i = 3 * t + v;
        const px = P.getX(i),
          py = P.getY(i),
          pz = P.getZ(i);
        pos.set([px, py, pz], w * 3);
        col.set([C.getX(i), C.getY(i), C.getZ(i)], w * 3);
        // 엘리베이터 문은 금속 반사가 바른 쪽을 비추도록 삼각형 감김 방향 그대로의 법선
        if (k === ek) nor.set([-nrm.x, -nrm.y, -nrm.z], w * 3);
        else nor.set([nrm.x, nrm.y, nrm.z], w * 3);
        // 면 방향 투영(미터): 바닥·천장은 위에서, 벽은 벽면 가로·높이
        if (k === ek && fitBox.has(t)) {
          const bx = boxes[fitBox.get(t)];
          const u = bx.n === "x" ? pz : px;
          uv.set(
            [
              (u - bx.u0) / Math.max(1e-6, bx.u1 - bx.u0),
              (py - bx.y0) / Math.max(1e-6, bx.y1 - bx.y0),
            ],
            w * 2,
          );
        } else if (ay >= ax && ay >= az) uv.set([px, -pz], w * 2);
        else if (ax >= az) uv.set([-pz, py], w * 2);
        else uv.set([px, py], w * 2);
        w++;
      }
    }
    geo.addGroup(start, w - start, matList.length);
    const m = mats[names[k]];
    const material = Object.keys(extra).length ? Object.assign(m.clone(), extra) : m;
    matList.push(material);
    cutawayList.push(Number.isFinite(opts.floorHeight)
        ? cutawayMaterial(material, names[k], opts.floorHeight)
        : material);
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geo.computeBoundingSphere();
  geo.computeBoundingBox();
  mesh.geometry.dispose();
  if (src !== mesh.geometry) src.dispose();
  mesh.geometry = geo;
  mesh.material = matList;
  return { firstPerson: matList, cutaway: cutawayList };
}
