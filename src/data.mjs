import geometry from "../data/seoultech.json" with { type: "json" };
import teamSurvey from "../data/team-survey.json" with { type: "json" };
import { mergeSurvey } from "./survey.mjs";

const officialBuildingNames = {
  "way-382499369": "국제관",
  "way-382499356": "중앙도서관 별관",
  student: "학생회관",
  "way-470633094": "파워플랜트",
  "way-382499364": "창업보육센터",
  "vw-56": "학군단",
};
for (const building of geometry.buildings)
  building.name = officialBuildingNames[building.id] || building.name;

// 지도 데이터는 SMASH 서울과기대 저장소에서 별도 ODbL로 공개한 데이터를 변환했습니다.
// 앱 코드·디자인·게임 로직은 가져오지 않았습니다. 자세한 출처는 DATA-LICENSE.md 참고.
export const CAMPUS_GEOMETRY = geometry;
export const CAMPUS = {
  id: "seoultech",
  name: "서울과학기술대학교",
  short: "서울과기대",
  english: "SEOULTECH",
  location: "서울 노원구 · 공릉캠퍼스",
  verified: false,
  source: "https://github.com/Hong-Iron/SMASH-SEOULTECH",
};
// 실내 지도 URL과 카메라가 바라볼 출입구를 건물 ID로 연결합니다.
export const INDOOR_MAPS = new Map([
  ["future", { url: "indoor/?from=futureDoor" }],
]);
export const BUILDINGS = geometry.buildings;
// 공개 도로를 분할한 자동 생성 그래프(seoultech.json) 위에 팀 조사 데이터(team-survey.json)를
// 합친 그래프입니다. 경로 계산·지도·신고는 모두 이 NODES, EDGES를 씁니다.
const merged = mergeSurvey(geometry, teamSurvey, {
  origin: geometry.meta,
  buildings: geometry.buildings,
});
export const NODES = merged.nodes;
export const EDGES = merged.edges;
// 합친 출입구 목록과, 넣지 못한 조사 항목의 경고입니다.
export const SURVEY = {
  data: teamSurvey,
  entrances: merged.entrances,
  warnings: merged.warnings,
};

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
export const ENTRANCES = toEntranceMarkers(SURVEY.entrances);

const markedGate = { x: -233, z: 216 };
export const MAIN_GATE = {
  ...markedGate,
  entry: Object.entries(NODES).reduce((best, [id, node]) => {
    const distance = Math.hypot(node.x - markedGate.x, node.z - markedGate.z);
    return !best || distance < best.distance ? { id, distance } : best;
  }, null).id,
};
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
export const PLACES = [
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

// 기존 테스트와 외부 참조 호환용 별칭입니다.
export const STARTS = PLACES;
