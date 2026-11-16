// 부산대학교 대표 건물 전용 모델. 위키미디어 공용 사진(참고만 하고 저장소에 넣지 않음)과
// 학교 건물 현황표 층수를 바탕으로 한 근사 모델이며 실측 복원이 아닙니다. 원본 외곽선은 그대로 씁니다.
// - 대학본부(205): Commons "Administration bldg - PNU.jpg", "부산대(본관).jpg"
// - 인문관(306): Commons "Pusan Natl Univ by Ficell 003.jpg", "부산대 인문관.jpg"
// - 운죽정(202): Commons "Woon Jook Jeong - PNU cafeteria.JPG"
import { createModelKit, mainAxis } from "./kit.mjs";
import { applyModelFinishes } from "../finishes.mjs";
import { insideBuilding } from "../../../campus/geo.mjs";
import { NODES } from "../../../campus/data.mjs";

// 경로 입구 노드(building.entry)에 가장 가까운 외벽 변 = 정면
function frontEdge(kit, building) {
  const door = NODES[building.entry] || { x: building.x, z: building.z + 50 };
  let best = null;
  for (const edge of kit.edges(building.outline)) {
    const t = Math.max(
      0,
      Math.min(edge.length, (door.x - edge.ax) * edge.dx + (door.z - edge.az) * edge.dz),
    );
    const d = Math.hypot(edge.ax + edge.dx * t - door.x, edge.az + edge.dz * t - door.z);
    if (edge.length > 6 && (!best || d < best.d)) best = { edge, d };
  }
  return best?.edge;
}

// 대학본부: 연회색 석재 10층 탑(정면 가운데 아치형 파란 유리 띠)과 4층 저층부
export function createPnuAdminBuilding(building, wallColor) {
  const kit = createModelKit(building);
  const { box, face, material } = kit;
  const stone = material(wallColor),
    light = material(0xe4e3db),
    dark = material(0x3d4a50),
    glass = material(0x5f7f95, 0.3, 0.15),
    blue = material(0x3f6e9c, 0.22, 0.3),
    roof = material(0xbcbfb6);
  const podium = 17,
    tower = 41;
  const body = kit.extrude(building.outline, 0, podium, stone);
  kit.extrude(building.outline, podium, 0.4, roof);
  const front = frontEdge(kit, building);
  // 저층부: 1층은 큰 유리, 2~4층은 작은 창. 위쪽에 밝은 석재 띠.
  for (const edge of kit.edges(building.outline)) {
    const bays = Math.max(1, Math.floor(edge.length / 3.6)),
      bay = edge.length / bays;
    for (let k = 0; k < bays; k++) {
      const u = (k + 0.5) * bay;
      face(edge, dark, u, 2.3, bay * 0.78, 3.4, 0.14);
      face(edge, glass, u, 2.3, bay * 0.72, 3.2, 0.2);
      for (let f = 1; f < 4; f++) {
        face(edge, dark, u, 4.2 * f + 2.4, 1.7, 2.1, 0.14);
        face(edge, glass, u, 4.2 * f + 2.4, 1.5, 1.9, 0.2);
      }
    }
    face(edge, light, edge.length / 2, podium - 0.3, edge.length + 0.2, 0.6, 0.6, 0.15);
    face(edge, light, edge.length / 2, podium + 0.6, edge.length + 0.3, 0.5, 0.5, 0.1);
  }
  // 정면 가운데 입구: 짙은 유리 사이 석재 기둥(2층 높이)
  if (front) {
    const mid = front.length / 2;
    face(front, dark, mid, 4.2, 14, 8.4, 0.25, 0.2);
    for (let k = -2; k <= 2; k++) face(front, stone, mid + k * 3.4, 4.2, 0.9, 8.6, 1.2, 0.6);
  }
  // 탑: 건물 주축 방향 상자. 외곽선 안에 들어가도록 줄입니다.
  const axis = mainAxis(building.outline);
  let along = 24,
    across = 20;
  const corners = (a, c) =>
    [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([i, j]) => ({
      x: axis.cx + axis.dx * (i * a) / 2 - axis.dz * (j * c) / 2,
      z: axis.cz + axis.dz * (i * a) / 2 + axis.dx * (j * c) / 2,
    }));
  while (along > 10 && !corners(along, across).every((p) => insideBuilding(p, building))) {
    along -= 1;
    across -= 0.8;
  }
  const ring = corners(along, across).map((p) => [p.x, p.z]);
  kit.extrude(ring, podium, tower - podium, stone);
  kit.extrude(ring, tower, 0.5, roof);
  // 꼭대기 한 단 들인 마감과 옥상 기계실·안테나
  const inset = corners(along - 3, across - 3).map((p) => [p.x, p.z]);
  kit.extrude(inset, tower + 0.5, 2.2, light);
  box(roof, axis.cx, tower + 3.5, axis.cz, 4, 1.6, 3, -Math.atan2(axis.dz, axis.dx));
  // 탑 네 면: 작은 창 격자. 정면(입구 쪽)에는 가운데 파란 유리 띠와 아치형 윗부분.
  const towerEdges = kit.edges(ring);
  const facing = front
    ? towerEdges.reduce((a, b) => (a.nx * front.nx + a.nz * front.nz > b.nx * front.nx + b.nz * front.nz ? a : b))
    : towerEdges[0];
  for (const edge of towerEdges) {
    const isFront = edge === facing;
    const bays = Math.max(2, Math.floor(edge.length / 2.6)),
      bay = edge.length / bays;
    for (let f = 0; f < 6; f++) {
      const y = podium + 2.4 + f * 4;
      for (let k = 0; k < bays; k++) {
        const u = (k + 0.5) * bay;
        if (isFront && Math.abs(u - edge.length / 2) < 3.4) continue;
        face(edge, dark, u, y, 1.15, 1.75, 0.12, 0.12);
        face(edge, glass, u, y, 1.0, 1.6, 0.1, 0.17);
      }
    }
    if (isFront) {
      const mid = edge.length / 2,
        top = tower - 3;
      face(edge, blue, mid, (podium - 6 + top) / 2, 5, top - podium + 6, 0.3, 0.2);
      // 아치: 위로 갈수록 좁아지는 띠 몇 개
      for (let i = 0; i < 4; i++) {
        const w = 5 * Math.cos((i + 1) * 0.36);
        face(edge, blue, mid, top + 0.4 + i * 0.4, w, 0.4, 0.3, 0.2);
      }
      for (let y = podium - 6; y < top; y += 1.3)
        face(edge, light, mid, y, 5.1, 0.12, 0.1, 0.38);
      face(edge, light, mid, (podium - 6 + top) / 2, 0.14, top - podium + 6, 0.1, 0.38);
    }
  }
  const pickables = kit.finish();
  applyModelFinishes({ stone: [stone, light], glass: [glass, blue] });
  return { group: kit.group, body, pickables, height: tower + 4 };
}

// 인문관: 흰 곡선형 4층, 층마다 이어지는 띠 유리창과 흰 벽 띠
export function createPnuHumanitiesBuilding(building, wallColor) {
  const kit = createModelKit(building);
  const { face, material } = kit;
  const white = material(wallColor),
    frame = material(0xf4f5f1),
    glass = material(0x6f9bb8, 0.25, 0.2),
    dark = material(0x55707f),
    roof = material(0xbfc2bb);
  const floors = Math.max(1, building.floors || 4),
    storey = 4.1,
    height = floors * storey + 0.8;
  const body = kit.extrude(building.outline, 0, height, white);
  kit.extrude(building.outline, height, 0.3, roof);
  for (const edge of kit.edges(building.outline)) {
    for (let f = 0; f < floors; f++) {
      const y = f * storey + 2.1;
      // 끊기지 않는 띠창(짙은 바탕 + 유리), 1.5m마다 흰 창살
      face(edge, dark, edge.length / 2, y, edge.length, 2.3, 0.1, 0.08);
      face(edge, glass, edge.length / 2, y, edge.length, 2.1, 0.1, 0.12);
      const mullions = Math.max(1, Math.round(edge.length / 1.5));
      for (let k = 0; k <= mullions; k++)
        face(edge, frame, (k * edge.length) / mullions, y, 0.1, 2.2, 0.08, 0.2);
      face(edge, frame, edge.length / 2, y + 1.25, edge.length + 0.1, 0.35, 0.3, 0.2);
    }
    face(edge, frame, edge.length / 2, height + 0.25, edge.length + 0.2, 0.5, 0.4, 0.05);
  }
  // 옥상: 작은 계단실 두 개(긴 축의 양쪽)
  const axis = mainAxis(building.outline);
  for (const t of [-0.25, 0.25]) {
    const x = axis.cx + axis.dx * t * axis.length,
      z = axis.cz + axis.dz * t * axis.length;
    if (insideBuilding({ x, z }, building))
      kit.box(white, x, height + 1.6, z, 5, 3, 4, -Math.atan2(axis.dz, axis.dx));
  }
  const pickables = kit.finish();
  applyModelFinishes({ stone: [white, frame], glass: [glass] });
  return { group: kit.group, body, pickables, height: height + 3 };
}

// 운죽정: 가로 목재 판으로 감싼 2층 상자와 앞쪽의 흰 유리 온실형 식당(회색 금속 지붕)
export function createPnuWoonjukjeongBuilding(building, wallColor) {
  const kit = createModelKit(building);
  const { face, material } = kit;
  const wood = material(wallColor),
    plank = material(0x6b5240),
    white = material(0xf1f1ec),
    glass = material(0x8fb0b5, 0.25, 0.15),
    metal = material(0x98a2a5, 0.5, 0.35),
    roof = material(0x6d6a63);
  const height = 7.6;
  const body = kit.extrude(building.outline, 0, height, wood);
  kit.extrude(building.outline, height, 0.3, roof);
  const front = frontEdge(kit, building);
  for (const edge of kit.edges(building.outline)) {
    for (let y = 0.5; y < height; y += 0.55)
      face(edge, plank, edge.length / 2, y, edge.length, 0.05, 0.06, 0.06);
    if (edge === front) continue;
    const bays = Math.max(1, Math.floor(edge.length / 4));
    for (let k = 0; k < bays; k++)
      face(edge, white, ((k + 0.5) * edge.length) / bays, 5.4, 1.4, 1.3, 0.1, 0.1);
  }
  if (front) {
    // 1층 앞의 유리 온실: 깊이 3.6m, 흰 창살, 회색 금속 지붕
    const span = front.length * 0.78,
      mid = front.length / 2,
      depth = 3.6;
    face(front, white, mid, 0.25, span, 0.5, depth, depth / 2);
    face(front, glass, mid, 2, span, 3.2, 0.12, depth);
    for (let u = mid - span / 2; u <= mid + span / 2 + 0.01; u += 1.5)
      face(front, white, u, 2, 0.14, 3.3, 0.14, depth + 0.05);
    face(front, white, mid, 1.15, span, 0.1, 0.1, depth + 0.1);
    face(front, metal, mid, 3.85, span + 0.6, 0.25, depth + 0.6, depth / 2);
    // 지붕 위 작은 짙은 회색 지붕창
    face(front, roof, mid, height + 1.2, 2.2, 2.2, 2.2, -4);
  }
  const pickables = kit.finish();
  applyModelFinishes({ glass: [glass] });
  return { group: kit.group, body, pickables, height: height + 2.4 };
}
