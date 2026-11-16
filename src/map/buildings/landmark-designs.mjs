// 서울과기대 외 학교의 대표 건물 설정. ID는 <학교 id>-w<OSM way>(또는 -r<relation>).
// 각 항목은 사진으로 외관을 확인한 건물만 넣습니다. photo: 참고한 위키미디어 공용 파일(저장소에 넣지 않음).
// landmark.type은 models/landmarks.mjs의 외관 유형입니다. colors.wall이 외벽색입니다.
const landmark = (wall, glass, options, photo) => ({
  model: "landmark",
  colors: { wall, glass },
  landmark: { glass, ...options },
  photo,
});

export const LANDMARK_DESIGNS = {
  // ===== 부산대학교 =====
  // 205 대학본부: 연회색 석재 10층 탑, 정면 가운데 아치형 파란 유리 띠, 4층 저층부
  "pusan-w108067609": landmark(
    0xd5d5ce,
    0x5f7f95,
    { type: "towerPodium", podiumFloors: 4, accentArch: true, accent: 0x3f6e9c },
    ["Administration bldg - PNU.jpg", "부산대(본관).jpg"],
  ),
  // 306 인문관: 흰 곡선형 4층, 층마다 이어지는 띠 유리창
  "pusan-w108072568": landmark(
    0xeceeea,
    0x6f9bb8,
    { type: "ribbon", trim: 0xf4f5f1, dark: 0x55707f, roof: 0xbfc2bb },
    ["Pusan Natl Univ by Ficell 003.jpg", "부산대 인문관.jpg"],
  ),
  // 202 운죽정: 가로 목재 판 2층 + 정면 흰 유리 온실형 식당
  "pusan-w472078880": landmark(
    0x8a6a4f,
    0x8fb0b5,
    { type: "pavilion", roof: 0x6d6a63 },
    ["Woon Jook Jeong - PNU cafeteria.JPG"],
  ),

  // ===== 서울대학교 (층수: OSM·추정) =====
  // 관정도서관: 청동빛 금속 패널과 좁은 세로 창이 촘촘한 외벽, 짙은 화강석 기단
  "snu-w329398175": landmark(
    0x8d826c,
    0x4d5a60,
    { type: "punched", bay: 1.4, windowW: 0.5, windowH: 2.6, base: 0x3c3d3f, dark: 0x5b5446, roof: 0x6f6a60, trim: 0x7d735f },
    ["가을의 관정도서관.jpeg"],
  ),
  // 박물관: 밝은 베이지 석재, 넓은 간격의 낮은 창, 1층 유리 출입부, 짙은 처마
  "snu-w439693757": landmark(
    0xddd5c6,
    0x557580,
    { type: "punched", floors: 2, bay: 7, windowW: 3.5, windowH: 1.2, glassGround: true, trim: 0x6b5f57, roof: 0x7a6f66 },
    ["Seoul National University Museum building and stele.jpg"],
  ),
  // 음악대학(3개 동): 짙은 갈색 벽돌, 위층에 붉은 세로 루버
  ...Object.fromEntries(
    ["snu-w439693764", "snu-w439693765", "snu-w439693766"].map((id) => [
      id,
      landmark(
        0x6e5446,
        0x55707a,
        { type: "punched", floors: 3, bay: 3, windowW: 1, windowH: 1.6, crown: { floors: 1, color: 0xa4553c }, trim: 0x5d4a3f, roof: 0x5b5450 },
        ["College of Music, Seoul National University.jpeg"],
      ),
    ]),
  ),

  // ===== 강원대학교 =====
  // 60주년기념관: 회색 화강석 9층, 한쪽 끝 세로 유리 띠, 1층 유리(필로티)
  "kangwon-w468923483": landmark(
    0xa7a8a4,
    0x4f6d6a,
    { type: "punched", bay: 3.4, windowW: 2.2, windowH: 1.7, strip: { at: 0.12, width: 4, color: 0x7fb3a3 }, glassGround: true, trim: 0xbfc0bc, roof: 0x8d9090 },
    ["강원대학교 60주년 기념관.jpg"],
  ),
  // 백령아트센터: 흰 격자 타일, 넓은 띠창, 1층 유리
  "kangwon-w469892264": landmark(
    0xefefe9,
    0x3c4c55,
    { type: "punched", floors: 3, bay: 6, windowW: 4.4, windowH: 1.6, glassGround: true, trim: 0xdedfd9, dark: 0x2f3a3f },
    ["백령아트센터.jpg"],
  ),
  // 중앙도서관: 베이지 석재, 정면 열주, 긴 세로 창
  "kangwon-w300174137": landmark(
    0xd9c4a0,
    0x55646a,
    { type: "punched", floors: 4, bay: 3, windowW: 1.2, windowH: 2.6, colonnade: true, trim: 0xe9dcc2 },
    ["KangwonUniv Mirae.jpg"],
  ),

  // ===== 경북대학교 =====
  // 본관: 흰 석재 4층, 정면 열주, 가운데 초록 구리 돔
  "knu-w468931858": landmark(
    0xe3e0d6,
    0x55707a,
    { type: "punched", floors: 4, bay: 3, windowW: 1.3, windowH: 2.2, colonnade: true, trim: 0xf1eee6, dome: { color: 0x6f9a7c, radius: 8 } },
    ["2012년본관.jpg", "KNU Daegu Campus MB.JPG"],
  ),
  // 글로벌플라자: 파란 유리 커튼월 고층
  "knu-w468931850": landmark(
    0x8fa3b8,
    0x4a6f9c,
    { type: "curtain", mullion: 2.4, trim: 0x9db1c4 },
    ["Global Plaza and Main Library on March 30th, 2016.jpg"],
  ),
  // 중앙도서관: 흰 격자 프레임 안의 파란 유리, 층 띠
  "knu-w468931852": landmark(
    0xf0f1ee,
    0x4f78a8,
    { type: "curtain", pier: 7, pierWidth: 0.9, mullion: 2.2, trim: 0xf4f5f2 },
    ["Global Plaza and Main Library on March 30th, 2016.jpg", "KNU Library.jpg"],
  ),

  // ===== 전북대학교 =====
  // 박물관: 노출 콘크리트 판과 넓은 유리면
  "jbnu-w115951820": landmark(
    0xb9b7ae,
    0x7e9eb0,
    { type: "curtain", floors: 3, pier: 9, pierWidth: 6, mullion: 1.6, trim: 0xc9c7bf, roof: 0x9d9b94 },
    ["전북대학교박물관.jpg"],
  ),
  // 신정문: 한옥 양식 누각 두 동을 2층 회랑으로 이은 문
  "jbnu-w1228643053": landmark(
    0xefe9dc,
    0x8a6a4a,
    { type: "hanok", floors: 2, wood: 0xa25a2e, tile: 0x3d4246 },
    ["JBNU 신정문.jpg", "Jeonbuk national university 20230408 004.jpg"],
  ),

  // ===== 경상국립대학교 =====
  // 대학본부: 흰 기둥 사이 층 전체를 잇는 세로 유리
  "gnu-w115455602": landmark(
    0xf4f4f1,
    0x5d86a8,
    { type: "curtain", pier: 4.4, pierWidth: 1.6, mullion: 1.5, trim: 0xe8e8e4 },
    ["대학본부.jpg"],
  ),
  // 중앙도서관: 짙은 갈색 벽돌, 층 띠, 넓은 띠창
  "gnu-w115469226": landmark(
    0x6b5649,
    0x4d5d66,
    { type: "punched", bay: 4, windowW: 3.2, windowH: 1.4, bands: true, trim: 0xd8d2c6 },
    ["GNU-library.JPG"],
  ),

  // ===== 전남대학교 =====
  // 중앙도서관: 붉은 벽돌, 층 띠, 1층 유리 입구
  "jnu-w270549104": landmark(
    0x8a3d30,
    0x55666b,
    { type: "punched", bay: 3.3, windowW: 1.4, windowH: 1.6, bands: true, trim: 0xc9c2b3 },
    ["CNU University Library Red.JPG"],
  ),
  // 용봉관(옛 본관): 적갈색 벽돌 3층, 흰 처마 장식, 정면 가운데 시계탑
  "jnu-w290680706": landmark(
    0x7a4c43,
    0x5a6d73,
    { type: "punched", floors: 3, bay: 3, windowW: 1.3, windowH: 1.8, bands: true, trim: 0xf0ece4, frontTower: { floors: 6, width: 8 } },
    ["518memorial hall in Chonnam National University.JPG"],
  ),
  // 인문대 1호관: 붉은 벽돌 4층, 박공지붕, 석재 띠
  "jnu-w271056106": landmark(
    0x8b3e30,
    0x5b6a70,
    { type: "punched", floors: 4, bay: 3, windowW: 1.6, windowH: 1.9, bands: true, trim: 0xd8cdb5, roof: "gable", roofColor: 0xa48270 },
    ["CNU College of Humanities Building 1.JPG"],
  ),

  // ===== 충남대학교 =====
  // 법학전문대학원(N12): 황갈색 벽돌 6층, 흰 층 띠, 가운데 유리 계단탑
  "cnu-w585935651": landmark(
    0xd2a77c,
    0x5b7a86,
    { type: "punched", floors: 6, bay: 4, windowW: 3, windowH: 1.5, bands: true, trim: 0xf1efe9, strip: { at: 0.55, width: 6, color: 0x86a6a6 } },
    ["Chungnam National University Law School Building N12.jpg"],
  ),
};
