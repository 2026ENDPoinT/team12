import geometry from "../../data/seoultech.json" with { type: "json" };
import teamSurvey from "../../data/team-survey.json" with { type: "json" };
import { mergeSurvey } from "./survey.mjs";
import { toScene } from "./geo.mjs";
import { createTerrain } from "./terrain.mjs";
import { campusById, DEFAULT_CAMPUS_ID } from "./registry.mjs";

// 서울과기대 공식 캠퍼스맵 이름으로 바로잡은 건물입니다.
const officialBuildingNames = {
  "way-382499369": "국제관",
  "way-382499356": "중앙도서관 별관",
  student: "학생회관",
  "way-470633094": "파워플랜트",
  "way-382499364": "창업보육센터",
  "vw-56": "학군단",
  "way-579071107": "창명학사",
};
for (const building of geometry.buildings)
  building.name = officialBuildingNames[building.id] || building.name;

// 아래 값들은 지금 열린 학교의 데이터입니다. 처음엔 서울과기대이고, 다른 학교를 열 때
// useCampus()가 앱을 시작하기 전에 한 번 바꿉니다. 다른 모듈은 ES 모듈의 live binding으로
// 바뀐 값을 그대로 봅니다. 학교를 바꾸면 페이지를 새로 불러오므로 실행 중에는 바뀌지 않습니다.
//
// 지도 데이터 출처: 서울과기대는 SMASH 저장소의 ODbL 데이터, 다른 학교는 OpenStreetMap(ODbL)과
// 브이월드(공공누리 제1유형)를 변환했습니다. 자세한 출처는 DATA-LICENSE.md 참고.
export let CAMPUS;
export let CAMPUS_GEOMETRY;
// 지형 높이: TERRAIN.heightAt(x, z) → 지면 높이(m). 지형 데이터가 없으면 0(평지).
export let TERRAIN;
// 실내 지도 URL과 카메라가 바라볼 출입구를 건물 ID로 연결합니다.
export let INDOOR_MAPS;
export let BUILDINGS;
// 공개 도로를 분할한 자동 생성 그래프 위에 팀 조사 데이터(서울과기대 team-survey.json)를
// 합친 그래프입니다. 경로 계산·지도·신고는 모두 이 NODES, EDGES를 씁니다.
export let NODES;
export let EDGES;
// 합친 출입구 목록과, 넣지 못한 조사 항목의 경고입니다.
export let SURVEY;
export let ENTRANCES;
export let MAIN_GATE;
export let PLACES;
// 기존 테스트와 외부 참조 호환용 별칭입니다.
export let STARTS;

const EMPTY_SURVEY = { type: "FeatureCollection", features: [] };

// 지도에 초록 점으로 표시하고 GIS로 내보내는 출입구입니다. 팀이 조사해 등록한 출입구
// (team-survey.json)만 씁니다. 예전에 코드에 적혀 있던 1차 후보 19곳은 위치가 최대 13m
// 어긋나 있어 지웠고, 편집기(?edit=1)로 다시 등록합니다. 그래서 초록 점은 곧
// 경로 계산에 실제로 쓰이는 출입구입니다.
export function toEntranceMarkers(entrances) {
  return entrances.map((e) => ({
    id: e.id,
    buildingId: e.building_id,
    name: e.name,
    x: e.x,
    z: e.z,
    verification_status: e.verification_status,
  }));
}

function nearestNodeId(point) {
  return Object.entries(NODES).reduce((best, [id, node]) => {
    const distance = Math.hypot(node.x - point.x, node.z - point.z);
    return !best || distance < best.distance ? { id, distance } : best;
  }, null).id;
}

// 건물의 출입 노드 목록입니다. 경로 계산은 이 중 가장 가까운 문을 고릅니다(route-target.mjs).
// 1) 팀이 조사한 출입구가 있으면 그것만 씁니다. 자동 생성 *Door는 실제 문과 무관해서 뺍니다.
// 2) 없으면 자동 생성 입구(building.entry), 그것도 없으면 건물 중심에서 가장 가까운
//    보행 노드에 임시로 연결합니다. 현장 조사 후 실제 출입구로 바뀌어야 합니다.
export function placeEntries(building, entrances = SURVEY.entrances) {
  const surveyed = entrances
    .filter((e) => e.building_id === building.id)
    .map((e) => e.id);
  return surveyed.length
    ? surveyed
    : [building.entry || nearestNodeId(building)];
}

// 노드 묶음에 지면 높이(y)를 붙인 복사본. 편집기·지름길로 그래프를 다시 만들 때도 씁니다.
export function withHeights(nodes) {
  return Object.fromEntries(
    Object.entries(nodes).map(([id, node]) => [
      id,
      { ...node, y: TERRAIN.heightAt(node.x, node.z) },
    ]),
  );
}

// 학교 데이터를 바꿉니다. config는 registry.mjs 항목, data는 그 학교의 지도 JSON,
// survey는 팀 조사 GeoJSON(없으면 빈 목록)입니다.
export function useCampus(config, data, survey = EMPTY_SURVEY) {
  if (!config || !data?.buildings || !data?.nodes || !data?.edges)
    throw new Error("학교 지도 데이터가 올바르지 않습니다.");
  CAMPUS = {
    id: config.id,
    name: config.name,
    short: config.short,
    english: config.english,
    logo: config.logo,
    location: config.location,
    verified: false,
    source: config.source,
    features: config.features || {},
    preview: config.preview,
  };
  CAMPUS_GEOMETRY = data;
  INDOOR_MAPS = config.features?.indoor
    ? new Map([["future", { url: "indoor/?from=futureDoor" }]])
    : new Map();
  BUILDINGS = data.buildings;
  TERRAIN = createTerrain(data.terrain);
  const merged = mergeSurvey(data, survey, {
    origin: data.meta,
    buildings: data.buildings,
  });
  // 경로 계산(오르막 시간)과 지도 표시가 쓰도록 노드마다 지면 높이 y를 붙입니다(원본 데이터는 그대로).
  NODES = withHeights(merged.nodes);
  EDGES = merged.edges;
  SURVEY = {
    data: survey,
    entrances: merged.entrances,
    warnings: merged.warnings,
  };
  ENTRANCES = toEntranceMarkers(SURVEY.entrances);
  const markedGate = config.gateScene ||
    (config.gate && toScene(config.gate, data.meta)) || { x: 0, z: 0 };
  MAIN_GATE = { ...markedGate, entry: nearestNodeId(markedGate) };
  PLACES = [
    {
      id: "gate",
      name: "정문",
      entry: MAIN_GATE.entry,
      entries: [MAIN_GATE.entry],
    },
    ...BUILDINGS.filter(({ name }) => name !== "교내 건물" && name !== "조형물")
      .map((building) => {
        const entries = placeEntries(building);
        // entry는 기존 코드 호환용(첫 번째 문)입니다.
        return {
          id: building.id,
          name: building.name,
          entry: entries[0],
          entries,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, "ko")),
  ];
  STARTS = PLACES;
  return CAMPUS;
}

useCampus(campusById(DEFAULT_CAMPUS_ID), geometry, teamSurvey);

// 첫 화면 미리보기 경로의 도착지: 학교 설정(preview)이 없으면 정문에서 가장 먼 건물로 정합니다.
export function previewPlaceId() {
  if (CAMPUS.preview && PLACES.some((p) => p.id === CAMPUS.preview))
    return CAMPUS.preview;
  return PLACES.filter((p) => p.id !== "gate").reduce(
    (best, place) => {
      const node = NODES[place.entry];
      const d = node
        ? Math.hypot(node.x - MAIN_GATE.x, node.z - MAIN_GATE.z)
        : 0;
      return d > best.d && d < 700 ? { id: place.id, d } : best;
    },
    { id: PLACES[1]?.id, d: -1 },
  ).id;
}
