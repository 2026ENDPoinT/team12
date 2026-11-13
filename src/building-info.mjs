// 건물 정보 카드에 보여 줄 추가 정보입니다.
// 공개 GIS 데이터에는 층수·개방 시간·위치 설명이 없어서 팀이 직접 채웁니다.
// verified: false 인 값은 Figma 시안 값을 임시로 넣은 것으로, 팀이 현장에서 확인해야 합니다.
export const BUILDING_INFO = {
  미래관: {
    floors: "B1–7F",
    hours: "07:00–22:00",
    area: "공학관 동쪽",
    verified: false,
  },
};

// 이름으로 정보를 찾습니다. 값이 없는 칸은 화면에서 "—"로 보입니다.
export function buildingInfo(name) {
  return BUILDING_INFO[name] || {};
}
