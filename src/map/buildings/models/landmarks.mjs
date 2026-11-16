// 다른 학교 대표 건물용 매개변수 모델. 사진에서 확인한 외관 유형(archetype)을 고르고
// 색·층·강조 요소만 설정해 만듭니다(설정은 catalog.mjs의 landmark). 원본 외곽선은 그대로 쓰고,
// 높이는 building.floors(학교 현황표·OSM·추정)를 따릅니다. 실측 복원이 아닌 근사 모델입니다.
//
// 유형:
// - towerPodium: 저층부(외곽선 전체) + 주축 방향 탑. 탑 정면 가운데 강조 띠(아치 선택).
// - ribbon:      층마다 끊기지 않는 띠 유리창과 흰 벽 띠(곡선형 근대·현대 건물).
// - punched:     벽돌·석재 벽에 반복 창, 기단·처마 띠, 정면 입구. 박공지붕(roof: "gable") 선택.
// - curtain:     전면 유리 커튼월과 세로 프레임, 층 띠.
// - pavilion:    가로 목재 판 외벽 + 정면 1층 유리 온실(작은 식당·카페).
// - hanok:       한옥 양식(나무 기둥·창살 벽, 짙은 기와 팔작지붕 근사).
//
// punched 추가 설정: bands(층 띠), strip(정면 세로 유리 띠 {at, width, color}), glassGround(1층 유리),
//   colonnade(정면 열주), crown({floors, color} 위층 다른 색), roofAccent(색: 꼭대기 돌출 처마),
//   dome({color, radius} 가운데 돔), frontTower({floors, width} 정면 가운데 탑), roof: "gable".
// curtain 추가 설정: pier(굵은 기둥 간격 m), pierWidth.
import * as THREE from "three";
import { createModelKit, mainAxis } from "./kit.mjs";
import { applyModelFinishes } from "../finishes.mjs";
import { insideBuilding } from "../../../campus/geo.mjs";
import { NODES } from "../../../campus/data.mjs";

const STOREY = 4;

// 경로 입구 노드(building.entry)에 가장 가까운 외벽 변 = 정면
function frontEdge(kit, ring, building) {
  const door = NODES[building.entry] || { x: building.x, z: building.z + 50 };
  let best = null;
  for (const edge of kit.edges(ring)) {
    const t = Math.max(0, Math.min(edge.length, (door.x - edge.ax) * edge.dx + (door.z - edge.az) * edge.dz));
    const d = Math.hypot(edge.ax + edge.dx * t - door.x, edge.az + edge.dz * t - door.z);
    if (edge.length > 6 && (!best || d < best.d)) best = { edge, d };
  }
  return best?.edge;
}

// 반복 창(짙은 테 + 유리)을 한 변의 한 층에
function windowRow(kit, edge, mats, y, { bay = 3.4, w = 1.6, h = 1.9 } = {}) {
  const bays = Math.max(1, Math.floor(edge.length / bay)),
    step = edge.length / bays;
  for (let k = 0; k < bays; k++) {
    const u = (k + 0.5) * step;
    kit.face(edge, mats.dark, u, y, w + 0.18, h + 0.16, 0.12, 0.12);
    kit.face(edge, mats.glass, u, y, w, h, 0.1, 0.17);
  }
}

function entrance(kit, edge, mats, { width = 8, height = 7.6, piers = 3, canopy = true } = {}) {
  if (!edge) return;
  const mid = edge.length / 2;
  kit.face(edge, mats.dark, mid, height / 2, Math.min(width, edge.length * 0.6), height, 0.25, 0.22);
  kit.face(edge, mats.glass, mid, height / 2, Math.min(width, edge.length * 0.6) - 0.4, height - 0.4, 0.12, 0.32);
  for (let k = -piers; k <= piers; k++)
    kit.face(edge, mats.wall, mid + (k * width) / (piers * 2 + 0.5), height / 2, 0.7, height + 0.2, 1, 0.6);
  if (canopy) kit.face(edge, mats.trim, mid, height + 0.3, width + 2, 0.35, 3, 1.5);
}

function cornice(kit, ring, mats, height) {
  for (const edge of kit.edges(ring)) {
    kit.face(edge, mats.trim, edge.length / 2, height - 0.3, edge.length + 0.2, 0.6, 0.6, 0.15);
    kit.face(edge, mats.trim, edge.length / 2, height + 0.5, edge.length + 0.3, 0.5, 0.5, 0.1);
  }
}

function materials(kit, o) {
  return {
    wall: kit.material(o.wall),
    trim: kit.material(o.trim ?? 0xe7e6de),
    dark: kit.material(o.dark ?? 0x3d4a50),
    glass: kit.material(o.glass ?? 0x5f7f95, 0.3, 0.15),
    accent: kit.material(o.accent ?? 0x3f6e9c, 0.22, 0.3),
    // roof는 지붕 색(숫자) 또는 지붕 모양("gable"). 모양을 고르면 색은 roofColor로 받습니다.
    roof: kit.material(o.roofColor ?? (typeof o.roof === "number" ? o.roof : 0xbcbfb6)),
    base: kit.material(o.base ?? o.wall),
  };
}

function towerPodium(kit, b, o, m) {
  const podium = (o.podiumFloors ?? 4) * STOREY + 1;
  const floors = o.towerFloors ?? b.floors ?? 8;
  const top = floors * STOREY + 1;
  const body = kit.extrude(b.outline, 0, podium, m.wall);
  kit.extrude(b.outline, podium, 0.4, m.roof);
  const front = frontEdge(kit, b.outline, b);
  for (const edge of kit.edges(b.outline)) {
    windowRow(kit, edge, m, 2.3, { bay: 3.6, w: 2.8, h: 3.2 });
    for (let f = 1; f < (o.podiumFloors ?? 4); f++) windowRow(kit, edge, m, STOREY * f + 2.4, { bay: 3.6 });
  }
  cornice(kit, b.outline, m, podium);
  entrance(kit, front, m, { width: 14, height: 8.4, piers: 2, canopy: false });
  // 탑: 주축 방향 상자를 외곽선 안에 들어가게 줄임
  const axis = mainAxis(b.outline);
  let along = o.towerLength ?? 24,
    across = o.towerWidth ?? 20;
  const corners = (a, c) =>
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([i, j]) => [
      axis.cx + (axis.dx * i * a) / 2 - (axis.dz * j * c) / 2,
      axis.cz + (axis.dz * i * a) / 2 + (axis.dx * j * c) / 2,
    ]);
  while (along > 10 && !corners(along, across).every(([x, z]) => insideBuilding({ x, z }, b))) {
    along -= 1;
    across -= 0.8;
  }
  const ring = corners(along, across);
  kit.extrude(ring, podium, top - podium, m.wall);
  kit.extrude(ring, top, 0.5, m.roof);
  kit.extrude(corners(along - 3, across - 3), top + 0.5, 2.2, m.trim);
  const towerEdges = kit.edges(ring);
  const facing = front
    ? towerEdges.reduce((a, c) => (a.nx * front.nx + a.nz * front.nz > c.nx * front.nx + c.nz * front.nz ? a : c))
    : towerEdges[0];
  for (const edge of towerEdges) {
    const isFront = edge === facing && o.accentStrip !== false;
    const bays = Math.max(2, Math.floor(edge.length / 2.6)),
      bay = edge.length / bays;
    for (let f = 0; f < floors - (o.podiumFloors ?? 4); f++) {
      const y = podium + 2.4 + f * STOREY;
      for (let k = 0; k < bays; k++) {
        const u = (k + 0.5) * bay;
        if (isFront && Math.abs(u - edge.length / 2) < 3.4) continue;
        kit.face(edge, m.dark, u, y, 1.15, 1.75, 0.12, 0.12);
        kit.face(edge, m.glass, u, y, 1.0, 1.6, 0.1, 0.17);
      }
    }
    if (isFront) {
      const mid = edge.length / 2,
        stripTop = top - 3,
        bottom = podium - 6;
      kit.face(edge, m.accent, mid, (bottom + stripTop) / 2, 5, stripTop - bottom, 0.3, 0.2);
      if (o.accentArch)
        for (let i = 0; i < 4; i++)
          kit.face(edge, m.accent, mid, stripTop + 0.4 + i * 0.4, 5 * Math.cos((i + 1) * 0.36), 0.4, 0.3, 0.2);
      for (let y = bottom; y < stripTop; y += 1.3) kit.face(edge, m.trim, mid, y, 5.1, 0.12, 0.1, 0.38);
    }
  }
  return { body, height: top + 4 };
}

function ribbon(kit, b, o, m) {
  const floors = b.floors ?? 4,
    height = floors * STOREY + 0.8;
  const body = kit.extrude(b.outline, 0, height, m.wall);
  kit.extrude(b.outline, height, 0.3, m.roof);
  for (const edge of kit.edges(b.outline)) {
    for (let f = 0; f < floors; f++) {
      const y = f * STOREY + 2.1;
      kit.face(edge, m.dark, edge.length / 2, y, edge.length, 2.3, 0.1, 0.08);
      kit.face(edge, m.glass, edge.length / 2, y, edge.length, 2.1, 0.1, 0.12);
      const mullions = Math.max(1, Math.round(edge.length / 1.5));
      for (let k = 0; k <= mullions; k++)
        kit.face(edge, m.trim, (k * edge.length) / mullions, y, 0.1, 2.2, 0.08, 0.2);
      kit.face(edge, m.trim, edge.length / 2, y + 1.25, edge.length + 0.1, 0.35, 0.3, 0.2);
    }
    kit.face(edge, m.trim, edge.length / 2, height + 0.25, edge.length + 0.2, 0.5, 0.4, 0.05);
  }
  const axis = mainAxis(b.outline);
  for (const t of [-0.25, 0.25]) {
    const x = axis.cx + axis.dx * t * axis.length,
      z = axis.cz + axis.dz * t * axis.length;
    if (insideBuilding({ x, z }, b)) kit.box(m.wall, x, height + 1.6, z, 5, 3, 4, -Math.atan2(axis.dz, axis.dx));
  }
  return { body, height: height + 3 };
}

function punched(kit, b, o, m) {
  const floors = b.floors ?? 4,
    height = floors * STOREY + 0.6;
  const body = kit.extrude(b.outline, 0, height, m.wall);
  const front = frontEdge(kit, b.outline, b);
  const crown = o.crown && kit.material(o.crown.color);
  for (const edge of kit.edges(b.outline)) {
    kit.face(edge, m.base, edge.length / 2, 0.6, edge.length + 0.1, 1.2, 0.3, 0.12);
    // 위층 다른 색(벽 위에 얇게 덧댐)
    if (crown) {
      const cf = Math.min(o.crown.floors, floors);
      kit.face(edge, crown, edge.length / 2, height - (cf * STOREY) / 2, edge.length + 0.05, cf * STOREY, 0.1, 0.05);
    }
    for (let f = o.glassGround ? 1 : 0; f < floors; f++)
      windowRow(kit, edge, m, f * STOREY + 2.3, { bay: o.bay ?? 3.2, w: o.windowW ?? 1.5, h: o.windowH ?? 2 });
    if (o.glassGround) {
      kit.face(edge, m.dark, edge.length / 2, 2, edge.length - 0.6, 3.4, 0.1, 0.1);
      kit.face(edge, m.glass, edge.length / 2, 2, edge.length - 0.8, 3.2, 0.1, 0.15);
    }
    if (o.bands)
      for (let f = 1; f < floors; f++) kit.face(edge, m.trim, edge.length / 2, f * STOREY + 0.2, edge.length, 0.3, 0.2, 0.12);
  }
  if (front && o.strip) {
    const u = front.length * (o.strip.at ?? 0.2),
      w = o.strip.width ?? 3,
      color = kit.material(o.strip.color ?? 0x7fa6a8, 0.3, 0.15);
    kit.face(front, m.dark, u, height / 2, w + 0.3, height - 1, 0.12, 0.2);
    kit.face(front, color, u, height / 2, w, height - 1.2, 0.1, 0.28);
    for (let y = STOREY; y < height; y += STOREY) kit.face(front, m.trim, u, y, w, 0.15, 0.1, 0.35);
  }
  if (front && o.colonnade) {
    const n = Math.max(3, Math.floor(front.length / 4.5));
    for (let k = 0; k <= n; k++) kit.face(front, m.trim, (k * front.length) / n, (STOREY * 2) / 2, 0.9, STOREY * 2, 0.9, 1.4);
    kit.face(front, m.trim, front.length / 2, STOREY * 2 + 0.3, front.length, 0.6, 2.4, 1.2);
  }
  if (o.roof === "gable") {
    // 박공지붕: 주축(가장 긴 변)을 용마루로 두 경사면 + 양 끝 삼각형 벽. 외곽선을 감싸는 상자 기준 근사.
    const axis = mainAxis(b.outline);
    const ax = [axis.dx, axis.dz],
      cr = [-axis.dz, axis.dx];
    const along = b.outline.map(([x, z]) => (x - axis.cx) * ax[0] + (z - axis.cz) * ax[1]),
      across = b.outline.map(([x, z]) => (x - axis.cx) * cr[0] + (z - axis.cz) * cr[1]);
    const a0 = Math.min(...along),
      a1 = Math.max(...along),
      c0 = Math.min(...across),
      c1 = Math.max(...across);
    const midA = (a0 + a1) / 2,
      midC = (c0 + c1) / 2,
      half = (c1 - c0) / 2 + 0.6,
      rise = Math.min(o.rise ?? 5, half * 0.6),
      slope = Math.atan2(rise, half),
      turn = -Math.atan2(axis.dz, axis.dx);
    const at = (a, c) => [axis.cx + ax[0] * a + cr[0] * c, axis.cz + ax[1] * a + cr[1] * c];
    for (const side of [-1, 1]) {
      const [x, z] = at(midA, midC + (side * half) / 2);
      kit.box(m.roof, x, height + rise / 2, z, a1 - a0 + 1.2, 0.35, Math.hypot(half, rise), turn, side * slope);
    }
    for (const a of [a0, a1]) {
      const [lx, lz] = at(a, midC - half + 0.6),
        [rx, rz] = at(a, midC + half - 0.6),
        [tx, tz] = at(a, midC);
      kit.triangle(m.wall, [[lx, height, lz], [rx, height, rz], [tx, height + rise - 0.2, tz]]);
    }
  } else {
    kit.extrude(b.outline, height, 0.4, m.roof);
    cornice(kit, b.outline, m, height);
  }
  // 꼭대기 돌출 처마(색 있는 얇은 판, 정면 쪽으로 2m 내밂)
  if (front && o.roofAccent) {
    const accent = kit.material(o.roofAccent);
    kit.face(front, accent, front.length / 2, height + 0.9, front.length * 0.7, 0.9, 3, 1);
  }
  let extra = o.roof === "gable" ? 6 : 1;
  if (o.dome) {
    const axis = mainAxis(b.outline),
      r = o.dome.radius ?? 7;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      kit.material(o.dome.color ?? 0x5f8f75, 0.6, 0.2),
    );
    mesh.position.set(axis.cx, height + 2.4, axis.cz);
    mesh.castShadow = mesh.receiveShadow = true;
    kit.group.add(mesh);
    kit.extrude(
      Array.from({ length: 16 }, (_, i) => [axis.cx + Math.cos((i / 16) * Math.PI * 2) * r, axis.cz + Math.sin((i / 16) * Math.PI * 2) * r]),
      height,
      2.4,
      m.trim,
    );
    extra = Math.max(extra, r + 2.4);
  }
  if (front && o.frontTower) {
    // 정면 가운데 탑(시계탑 등): 정면 변 가운데에서 안쪽으로 붙은 상자
    const w = o.frontTower.width ?? 9,
      top = (o.frontTower.floors ?? floors + 3) * STOREY,
      depth = w * 0.9,
      mid = front.length / 2;
    const cx = front.ax + front.dx * mid - front.nx * (depth / 2 - 1),
      cz = front.az + front.dz * mid - front.nz * (depth / 2 - 1);
    kit.box(m.wall, cx, top / 2, cz, w, top, depth, front.turn);
    kit.box(m.trim, cx, top + 0.4, cz, w + 0.6, 0.8, depth + 0.6, front.turn);
    kit.box(m.dark, cx + front.nx * (depth / 2 + 0.05), top - 3.2, cz + front.nz * (depth / 2 + 0.05), 2.6, 2.6, 0.1, front.turn);
    kit.box(m.trim, cx + front.nx * (depth / 2 + 0.1), top - 3.2, cz + front.nz * (depth / 2 + 0.1), 2.2, 2.2, 0.1, front.turn);
    extra = Math.max(extra, top - height + 1);
  }
  entrance(kit, front, m, { width: o.entryWidth ?? 7, height: 4.2, piers: 1, canopy: !o.colonnade });
  return { body, height: height + extra };
}

function curtain(kit, b, o, m) {
  const floors = b.floors ?? 4,
    height = floors * STOREY + 0.8;
  const body = kit.extrude(b.outline, 0, height, m.wall);
  kit.extrude(b.outline, height, 0.4, m.roof);
  for (const edge of kit.edges(b.outline)) {
    kit.face(edge, m.dark, edge.length / 2, height / 2, edge.length - 0.4, height - 0.6, 0.1, 0.08);
    kit.face(edge, m.glass, edge.length / 2, height / 2, edge.length - 0.6, height - 0.8, 0.1, 0.13);
    const mullions = Math.max(1, Math.round(edge.length / (o.mullion ?? 1.8)));
    for (let k = 1; k < mullions; k++)
      kit.face(edge, m.trim, (k * edge.length) / mullions, height / 2, 0.12, height - 0.6, 0.12, 0.22);
    // 굵은 기둥(흰 석재 등)이 유리면을 일정 간격으로 나눔
    if (o.pier) {
      const piers = Math.max(1, Math.round(edge.length / o.pier));
      for (let k = 0; k <= piers; k++)
        kit.face(edge, m.wall, (k * edge.length) / piers, height / 2, o.pierWidth ?? 1.2, height, 0.9, 0.4);
    }
    for (let f = 1; f < floors; f++) kit.face(edge, m.trim, edge.length / 2, f * STOREY, edge.length, 0.45, 0.16, 0.22);
    kit.face(edge, m.wall, edge.length / 2, height + 0.3, edge.length + 0.2, 0.6, 0.5, 0.05);
  }
  return { body, height: height + 1 };
}

function pavilion(kit, b, o, m) {
  const height = (b.floors ?? 2) * 3.8;
  const plank = kit.material(o.plank ?? 0x6b5240),
    white = kit.material(0xf1f1ec),
    metal = kit.material(0x98a2a5, 0.5, 0.35);
  const body = kit.extrude(b.outline, 0, height, m.wall);
  kit.extrude(b.outline, height, 0.3, m.roof);
  const front = frontEdge(kit, b.outline, b);
  for (const edge of kit.edges(b.outline)) {
    for (let y = 0.5; y < height; y += 0.55) kit.face(edge, plank, edge.length / 2, y, edge.length, 0.05, 0.06, 0.06);
    if (edge === front) continue;
    const bays = Math.max(1, Math.floor(edge.length / 4));
    for (let k = 0; k < bays; k++) kit.face(edge, white, ((k + 0.5) * edge.length) / bays, height - 2.2, 1.4, 1.3, 0.1, 0.1);
  }
  if (front) {
    const span = front.length * 0.78,
      mid = front.length / 2,
      depth = 3.6;
    kit.face(front, white, mid, 0.25, span, 0.5, depth, depth / 2);
    kit.face(front, m.glass, mid, 2, span, 3.2, 0.12, depth);
    for (let u = mid - span / 2; u <= mid + span / 2 + 0.01; u += 1.5) kit.face(front, white, u, 2, 0.14, 3.3, 0.14, depth + 0.05);
    kit.face(front, white, mid, 1.15, span, 0.1, 0.1, depth + 0.1);
    kit.face(front, metal, mid, 3.85, span + 0.6, 0.25, depth + 0.6, depth / 2);
    kit.face(front, m.roof, mid, height + 1.2, 2.2, 2.2, 2.2, -4);
  }
  return { body, height: height + 2.4 };
}

// 한옥: 나무 기둥과 창살 벽, 흰 회벽 띠, 짙은 기와 지붕(외곽선을 감싸는 상자 기준 근사)
function hanok(kit, b, o, m) {
  const floors = Math.min(b.floors ?? 2, 2),
    height = floors * 3.6;
  const wood = kit.material(o.wood ?? 0x9a5a34),
    plaster = kit.material(0xefe9dc),
    tile = kit.material(o.tile ?? 0x3f4448, 0.8);
  const body = kit.extrude(b.outline, 0, height, plaster);
  kit.extrude(b.outline, 0, 0.8, kit.material(0xbdb7aa));
  for (const edge of kit.edges(b.outline)) {
    const bays = Math.max(1, Math.round(edge.length / 3));
    for (let k = 0; k <= bays; k++) kit.face(edge, wood, (k * edge.length) / bays, height / 2, 0.45, height, 0.45, 0.25);
    for (let f = 0; f < floors; f++) {
      kit.face(edge, wood, edge.length / 2, f * 3.6 + 1.9, edge.length, 2.2, 0.08, 0.12);
      for (let k = 0; k < bays; k++)
        for (let j = 1; j < 4; j++)
          kit.face(edge, plaster, ((k + j / 4) * edge.length) / bays, f * 3.6 + 1.9, 0.06, 2.1, 0.05, 0.18);
      kit.face(edge, wood, edge.length / 2, (f + 1) * 3.6 - 0.2, edge.length + 0.2, 0.4, 0.5, 0.2);
    }
    if (floors > 1) kit.face(edge, wood, edge.length / 2, 3.6 + 0.6, edge.length + 1.6, 0.15, 1.2, 0.6);
  }
  // 지붕: 처마를 2m 내민 낮은 경사판 두 장 + 용마루
  const axis = mainAxis(b.outline);
  const ax = [axis.dx, axis.dz],
    cr = [-axis.dz, axis.dx];
  const along = b.outline.map(([x, z]) => (x - axis.cx) * ax[0] + (z - axis.cz) * ax[1]),
    across = b.outline.map(([x, z]) => (x - axis.cx) * cr[0] + (z - axis.cz) * cr[1]);
  const a0 = Math.min(...along) - 2,
    a1 = Math.max(...along) + 2,
    c0 = Math.min(...across),
    c1 = Math.max(...across);
  const half = (c1 - c0) / 2 + 2.2,
    rise = Math.min(4.5, half * 0.55),
    slope = Math.atan2(rise, half),
    turn = -Math.atan2(axis.dz, axis.dx),
    midC = (c0 + c1) / 2,
    midA = (a0 + a1) / 2;
  const at = (a, c) => [axis.cx + ax[0] * a + cr[0] * c, axis.cz + ax[1] * a + cr[1] * c];
  for (const side of [-1, 1]) {
    const [x, z] = at(midA, midC + (side * half) / 2);
    kit.box(tile, x, height + 0.4 + rise / 2, z, a1 - a0, 0.5, Math.hypot(half, rise), turn, side * slope);
  }
  const [rx, rz] = at(midA, midC);
  kit.box(tile, rx, height + 0.6 + rise, rz, (a1 - a0) * 0.8, 0.7, 0.9, turn);
  for (const a of [a0 + 1, a1 - 1]) {
    const [lx, lz] = at(a, midC - half * 0.45),
      [qx, qz] = at(a, midC + half * 0.45),
      [tx, tz] = at(a, midC);
    kit.triangle(wood, [[lx, height + rise * 0.55, lz], [qx, height + rise * 0.55, qz], [tx, height + rise, tz]]);
  }
  return { body, height: height + rise + 1 };
}

const ARCHETYPES = { towerPodium, ribbon, punched, curtain, pavilion, hanok };

// catalog.mjs: { model: "landmark", landmark: { type, ...설정 } }
export function createLandmarkBuilding(building, wallColor, entranceInfo, options = {}) {
  const make = ARCHETYPES[options.type];
  if (!make) throw new Error(`Unknown landmark type: ${options.type} (${building.id})`);
  const kit = createModelKit(building);
  const m = materials(kit, { ...options, wall: wallColor });
  // floors: 사진으로 확인한 층수가 있으면 데이터(추정값)보다 우선합니다.
  const b = options.floors ? { ...building, floors: options.floors } : building;
  const { body, height } = make(kit, b, options, m);
  const pickables = kit.finish();
  applyModelFinishes({ stone: [m.wall, m.trim], glass: [m.glass, m.accent] });
  return { group: kit.group, body, pickables, height };
}
