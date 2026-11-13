// 테스트용 출입구 위치(지도 미터 좌표). 실제 데이터가 아니라 건물 외곽선 위의 점입니다.
// 예전에 코드에 적혀 있던 출입구 후보를 외곽선에 맞춘 값으로, 후보 목록을 지운 뒤에도
// 합치기·출입구 선택 테스트에 쓰기 위해 옮겨 두었습니다.
export const SAMPLE_DOORS = {
  futureWest: {
    buildingId: "future",
    name: "미래관 서측 출입구",
    x: 179.135,
    z: 340.608,
  },
  futureNorthEast: {
    buildingId: "future",
    name: "미래관 북동측 출입구",
    x: 223.507,
    z: 310.633,
  },
  futureEast: {
    buildingId: "future",
    name: "미래관 동측 출입구",
    x: 224.406,
    z: 307.073,
  },
  dasanNorth: {
    buildingId: "dasan",
    name: "다산관 북측 출입구",
    x: -98.732,
    z: -40.259,
  },
};
