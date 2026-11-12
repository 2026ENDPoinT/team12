import { BUILDINGS } from "./data.mjs";

// 학교 공식 캠퍼스맵(건물번호순)의 번호입니다.
// 출처: https://www.seoultech.ac.kr/intro/map 의 캠퍼스맵 PDF. 공식 목록에 없는 건물은 번호 없이 이름만 씁니다.
export const BUILDING_NUMBERS = {
  대학본부: 1,
  다산관: 2,
  창학관: 3,
  제2창업보육센터: 4,
  혜성관: 5,
  청운관: 6,
  서울테크노파크: 7,
  파워플랜트: 10,
  도예관: 14,
  "서울과학기술대 어린이집": 30, // 공식: SeoulTech 어린이집
  창업보육센터: 31,
  프론티어관: 32,
  하이테크관: 33,
  중앙도서관: 34,
  "중앙도서관 별관": 35,
  학생회관: 37,
  다빈치관: 39,
  어의관: 40,
  불암학사: 41,
  KB학사: 42,
  성림학사: 43,
  누리학사: 46,
  "100주년기념관": 51,
  제2학생회관: 52,
  상상관: 53,
  아름관: 54,
  체육관: 55,
  대륙관: 56,
  무궁관: 57,
  제2파워플랜트: 58,
  학군단: 59,
  미래관: 60,
  테크노큐브: 62,
};

export const buildingLabel = (b) =>
  BUILDING_NUMBERS[b.name] ? `${BUILDING_NUMBERS[b.name]} ${b.name}` : b.name;

const buildingIds = new Set(BUILDINGS.map((b) => b.id));
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// 오늘 날짜(YYYY-MM-DD, 기기 시간대 기준). 공사 기간 비교에 씁니다.
export function today(now = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

// Supabase building_works 행 → 지도에 표시할 공사 목록. 종료일이 지난 공사와 잘못된 행은 뺍니다.
export function activeWorks(rows, day = today()) {
  const result = [];
  for (const row of rows || []) {
    if (
      !row ||
      !buildingIds.has(row.building_id) ||
      !DATE.test(row.start_date) ||
      !DATE.test(row.end_date) ||
      row.start_date > row.end_date ||
      row.end_date < day
    )
      continue;
    result.push({
      id: row.id,
      buildingId: row.building_id,
      start: row.start_date,
      end: row.end_date,
      note: typeof row.note === "string" ? row.note.slice(0, 100) : "",
    });
  }
  return result;
}

export function worksPeriod(work) {
  const dot = (d) => d.replaceAll("-", ".");
  return `${dot(work.start)} ~ ${dot(work.end)}`;
}
