// 3D 지도를 제공하는 학교 목록입니다. name은 src/ui/schools.json의 학교 이름과 같아야 합니다.
// id는 주소(#campus/<id>)·데이터 파일·Supabase campus_id에 그대로 쓰므로 바꾸지 않습니다.
// gate는 정문 표시 위치([경도, 위도])이고, 가장 가까운 보행 노드를 출발점으로 씁니다.
// features: 서울과기대에만 있는 기능(팀 조사 출입구·편집기·실내 지도·마스코트·건물 안내 등)입니다.
export const CAMPUSES = [
  {
    id: "seoultech",
    name: "서울과학기술대학교",
    short: "서울과기대",
    english: "SEOULTECH",
    logo: "ST",
    location: "서울 노원구 · 공릉캠퍼스",
    data: "data/seoultech.json",
    source: "https://github.com/Hong-Iron/SMASH-SEOULTECH",
    // 기존 지도에서 정한 정문 위치(미터 좌표)를 그대로 씁니다.
    gateScene: { x: -233, z: 216 },
    // 첫 화면 미리보기 경로의 도착 건물
    preview: "future",
    features: {
      survey: true,
      editor: true,
      indoor: true,
      mascot: true,
      buildingInfo: true,
      crosswalks: true,
      pond: true,
    },
  },
  {
    id: "pusan",
    name: "부산대학교",
    short: "부산대",
    english: "PNU",
    logo: "PN",
    location: "부산 금정구 · 부산캠퍼스",
    data: "data/campuses/pusan.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM 노드 414663679 "부산대정문앞"(정문 앞 정류장) 위치
    gate: [129.08416, 35.231622],
    features: {},
  },
];

export const DEFAULT_CAMPUS_ID = "seoultech";

export function campusById(id) {
  return CAMPUSES.find((campus) => campus.id === id) || null;
}

// "#campus/pusan" → "pusan". 지원하지 않는 학교면 null.
export function campusIdFromHash(hash) {
  const id = /^#campus\/([a-z0-9-]+)$/.exec(hash || "")?.[1];
  return id && campusById(id) ? id : null;
}

export function campusByName(name) {
  return CAMPUSES.find((campus) => campus.name === name) || null;
}
