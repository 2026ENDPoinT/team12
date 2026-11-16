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
  {
    id: "snu",
    name: "서울대학교",
    short: "서울대",
    english: "SNU",
    logo: "SN",
    location: "서울 관악구 · 관악캠퍼스",
    data: "data/campuses/snu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM way/419542255 서울대학교 정문
    gate: [126.948291, 37.466372],
    features: {},
  },
  {
    id: "kangwon",
    name: "강원대학교",
    short: "강원대",
    english: "KANGWON",
    logo: "KW",
    location: "강원 춘천시 · 춘천캠퍼스",
    data: "data/campuses/kangwon.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/2697521919 강원대 정문
    gate: [127.738797, 37.86689],
    features: {},
  },
  {
    id: "knu",
    name: "경북대학교",
    short: "경북대",
    english: "KNU",
    logo: "KN",
    location: "대구 북구 · 대구캠퍼스",
    data: "data/campuses/knu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/5635283393 경북대학교 정문 요금소
    gate: [128.614466, 35.885556],
    features: {},
  },
  {
    id: "gnu",
    name: "경상국립대학교",
    short: "경상국립대",
    english: "GNU",
    logo: "GN",
    location: "경남 진주시 · 가좌캠퍼스",
    data: "data/campuses/gnu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/9355291205 가좌캠퍼스정문 정류장에서 가장 가까운 교내 진입로
    gate: [128.105115, 35.153471],
    features: {},
  },
  {
    id: "jnu",
    name: "전남대학교",
    short: "전남대",
    english: "JNU",
    logo: "JN",
    location: "광주 북구 · 광주캠퍼스",
    data: "data/campuses/jnu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/5326431271 전남대정문
    gate: [126.904843, 35.172376],
    features: {},
  },
  {
    id: "jbnu",
    name: "전북대학교",
    short: "전북대",
    english: "JBNU",
    logo: "JB",
    location: "전북 전주시 · 전주캠퍼스",
    data: "data/campuses/jbnu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/6960021106 정문(신정문)
    gate: [127.131411, 35.842203],
    features: {},
  },
  {
    id: "jejunu",
    name: "제주대학교",
    short: "제주대",
    english: "JEJU",
    logo: "JJ",
    location: "제주 제주시 · 아라캠퍼스",
    data: "data/campuses/jejunu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/4655302248 제주대학교 정문
    gate: [126.561146, 33.45928],
    features: {},
  },
  {
    id: "cnu",
    name: "충남대학교",
    short: "충남대",
    english: "CNU",
    logo: "CN",
    location: "대전 유성구 · 대덕캠퍼스",
    data: "data/campuses/cnu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/11338234577 충남대학교입구 정류장에서 가장 가까운 교내 진입로
    gate: [127.345066, 36.362496],
    features: {},
  },
  {
    id: "cbnu",
    name: "충북대학교",
    short: "충북대",
    english: "CBNU",
    logo: "CB",
    location: "충북 청주시 · 개신캠퍼스",
    data: "data/campuses/cbnu.json",
    source: "https://www.openstreetmap.org/copyright",
    // OSM node/6403450088 충북대학교정문 정류장
    gate: [127.452339, 36.631915],
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
