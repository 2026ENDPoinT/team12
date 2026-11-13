// 건물 정보 카드에 표시하는 층 범위입니다.
// 출처: https://seoultech-map.pages.dev/data/campus.js (원자료: https://www.seoultech.ac.kr/intro/map/)
// 출처에 등재됐거나 별도 공식 자료로 확인한 층을 표시합니다.
// 생활관의 시간은 등록 입주생의 출입문 개방 시간입니다.
const residentHours = "05:00–24:00 (입주생)";
export const BUILDING_INFO = {
  "대학본부": { floors: "B1 · 1F–5F" },
  // 기계공학과 시설 현황에 다산관 401호가 등재돼 있습니다.
  // https://mech.seoultech.ac.kr/cert/learning_environment/facility_status
  "다산관": { floors: "B1 · 1F–7F" },
  "창학관": { floors: "1F–4F" },
  "혜성관": { floors: "B1 · 1F–5F · 옥탑 1층" },
  "청운관": { floors: "B1 · 1F–4F" },
  // 서울시 공공산업지원시설 자료의 연구본부동 규모입니다.
  // https://opengov.seoul.go.kr/og/com/download.php?uri=%2Ffiles%2Fdcdata%2F100304%2F20170120%2FF0000054505672.pdf
  "서울테크노파크": { floors: "B1 · 1F–12F" },
  "창조관": { floors: "B1 · 1F–5F · 옥탑 1층" },
  "파워플랜트": { floors: "B2–B1 · 1F" },
  "도예관": { floors: "1F" },
  "창업보육센터": { floors: "B1 · 1F–4F" },
  "프론티어관": { floors: "B1 · 1F–10F · 옥탑 1층" },
  "중앙도서관": { floors: "1F–3F · 옥탑 1층" },
  "중앙도서관 별관": { floors: "B1 · 1F–2F" },
  "학생회관": { floors: "B1 · 1F–3F · 옥탑 1층" },
  "국제관": { floors: "B1 · 1F–5F" },
  "다빈치관": { floors: "B1 · 1F–7F · 옥탑 1층" },
  "어의관": { floors: "1F–7F" },
  // https://housing.seoultech.ac.kr/facilities/buram
  "불암학사": { floors: "B1 · 1F–4F · 옥탑 1층", hours: residentHours },
  // https://housing.seoultech.ac.kr/facilities/kb
  "KB학사": { floors: "B1 · 1F–7F · 옥탑 1층", hours: residentHours },
  // https://housing.seoultech.ac.kr/facilities/sunglim
  "성림학사": { floors: "B1 · 남학생동 12F / 여학생·국제동 8F", hours: residentHours },
  // https://housing.seoultech.ac.kr/facilities/nuri
  "누리학사": { floors: "B1 · 1F–10F", hours: residentHours },
  // https://housing.seoultech.ac.kr/facilities/changmyeong
  "창명학사": { floors: "1F–4F", hours: residentHours },
  // https://housing.seoultech.ac.kr/facilities/surim
  "수림학사": { floors: "B1 · 1F–7F", hours: residentHours },
  "100주년기념관": { floors: "B1 · 1F–4F" },
  "제2학생회관": { floors: "B1 · 1F–3F · 옥탑 1층" },
  "상상관": { floors: "B1 · 1F–8F" },
  "아름관": { floors: "B1 · 1F–4F · 옥탑 1층" },
  "체육관": { floors: "B1 · 1F–2F" },
  "대륙관": { floors: "1F–2F" },
  "무궁관": { floors: "B1 · 1F–9F" },
  "제2파워플랜트": { floors: "B2–B1 · 1F" },
  "학군단": { floors: "B1 · 1F–3F" },
  "미래관": { floors: "B1 · 1F–5F" },
  // 서울과기대 산학협력연구동 보도자료
  // https://www.seoultech.ac.kr/intro/infobox/press/?bidx=424292&bnum=6306&do=commonview
  "테크노큐브": { floors: "B1 · 1F–12F" },
};

export function buildingInfo(name) {
  return Object.hasOwn(BUILDING_INFO, name) ? BUILDING_INFO[name] : {};
}
