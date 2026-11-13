import { getBuildingDesign } from "./catalog.mjs";
// Schematic campus architecture, not photo-verified building classifications.
// Keep choices explicit so a later photo correction changes one entry.
// Illustrative waterproof-roof colors, not sampled geographic measurements.
const ROOF_PALETTE = [
  0x527a65, 0x678b70, 0x7f997e, 0x92aa8b, 0x607f75, 0x7f958b, 0x9faf9f,
  0xaeb9af,
];

export function roofColorForBuilding(building) {
  if (getBuildingDesign(building.id).model || building.name === "조형물")
    return building.roof || 0x82928c;
  let hash = 2166136261;
  for (const character of building.id)
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  // Mix the upper bits too, so nearby/sequential IDs need not share a tone.
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b);
  return ROOF_PALETTE[(hash >>> 0) % ROOF_PALETTE.length];
}

export const FACADE_FAMILIES = {
  academic: {
    wall: 0xd2d0c2,
    glass: 0x527985,
    frame: 0xcbd0c8,
    bay: 3.4,
    window: 0.4,
    opening: 0.57,
    masonry: 0,
  },
  warm: {
    wall: 0xc9b28d,
    glass: 0x566f75,
    frame: 0xd4cbb7,
    bay: 3.3,
    window: 0.43,
    opening: 0.58,
    masonry: 1,
  },
  ribbon: {
    wall: 0xcbd1ca,
    glass: 0x527d88,
    frame: 0xc2ccc7,
    bay: 4.2,
    window: 0.89,
    opening: 0.48,
    masonry: 0,
  },
  curtain: {
    wall: 0xbdc9c5,
    glass: 0x4c7c8d,
    frame: 0xb3c6c6,
    bay: 2.4,
    window: 0.91,
    opening: 0.84,
    masonry: 0,
  },
  residence: {
    wall: 0xd0c8b8,
    glass: 0x5a7980,
    frame: 0xd6d7cb,
    bay: 3.3,
    window: 0.47,
    opening: 0.49,
    masonry: 0,
  },
  service: {
    wall: 0xbfc3b7,
    glass: 0x657b78,
    frame: 0xcdd0c5,
    bay: 4.4,
    window: 0.35,
    opening: 0.38,
    masonry: 0,
  },
};

const familiesByName = {
  테니스장관리동: "service",
  "서울테크노파크 어린이집": "warm",
  동아리실: "warm",
  청운관: "academic",
  창학관: "warm",
  건축설계관: "ribbon",
  중앙도서관: "curtain",
  "중앙도서관 별관": "academic",
  체육관: "service",
  어의관: "academic",
  혜성관: "academic",
  다빈치관: "ribbon",
  국제관: "academic",
  성림학사: "residence",
  학생회관: "warm",
  대학본부: "academic",
  제2학생회관: "warm",
  무궁관: "academic",
  누리학사: "residence",
  서울테크노파크: "curtain",
  창조관: "warm",
  KB학사: "residence",
  도예관: "warm",
  파워플랜트: "service",
  불암학사: "residence",
  창업보육센터: "ribbon",
  제2파워플랜트: "service",
  창명학사: "residence",
  수림학사: "residence",
  제2창업보육센터: "ribbon",
  "서울과학기술대 어린이집": "warm",
  학군단: "academic",
};

export function buildingAppearance(building) {
  const family =
    familiesByName[building.name] ??
    (building.name === "교내 건물" ? "service" : "academic");
  const height = Math.max(1, Number(building.h) || 4);
  const floors = Math.max(
    1,
    Math.min(
      Math.round(Number(building.floors) || height / 3.8),
      Math.max(1, Math.floor(height / 2.4)),
      24,
    ),
  );
  return {
    ...FACADE_FAMILIES[family],
    family,
    height,
    floors,
    floorHeight: height / floors,
    facade: building.name !== "조형물",
    source: "schematic",
  };
}
