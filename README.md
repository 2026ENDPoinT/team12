# team12

ENDPoinT 해커톤 2026 Team 12 · 서울과기대 캠퍼스 길찾기 프로젝트

## 프로젝트 실행

Node.js와 Git을 설치한 뒤 터미널에서 아래 명령어를 순서대로 실행합니다.

```sh
git clone https://github.com/2026ENDPoinT/team12.git
cd team12
npm ci
npm run dev
```

브라우저에서 http://127.0.0.1:4173 을 열면 됩니다. 개발 서버는 `Ctrl+C`로 종료합니다.

## IntelliJ에서 실행

1. IntelliJ에서 내려받은 `team12` 폴더를 엽니다.
2. 아래쪽 Terminal을 엽니다.
3. 처음 한 번 `npm ci`를 실행합니다.
4. `npm run dev`를 실행합니다.
5. 브라우저에서 http://127.0.0.1:4173 을 엽니다.

## 명령어

| 명령어          | 용도                |
| --------------- | ------------------- |
| `npm run dev`   | 로컬 개발 서버 실행 |
| `npm test`      | 테스트 실행         |
| `npm run build` | 배포용 `dist` 생성  |

Node.js 24에서 실행을 확인했습니다.

## 소스 구조

```text
src/
  app.js                    화면 흐름과 UI 연결
  map.js                    지도 카메라·상호작용·경로 표시
  map/
    buildings/
      catalog.mjs           건물별 외관 등록 정보
      index.mjs             건물 레이어 생성
      models/               사진 기반 건물 16개
      appearance.mjs        공통 외벽·지붕 스타일
      procedural.mjs        공통 파사드 셰이더·옥상 장식
      facade-studies.mjs    중앙도서관 외벽 시안
    landscape/              붕어방·나무·식재·도로 폭 규칙
  data.mjs                  데이터 연결·건물 이름·출입구 후보
  geo.mjs                   좌표·평면 기하 계산
  routing.mjs               길찾기
  reports.mjs               길 막힘 제보
  gis.mjs                   GIS 내보내기
  schools.json              학교 목록

data/                       원본 지리 데이터·현장 조사 양식
scripts/                    개발·빌드·데이터 준비
tests/                     자동 검증
dist/                      배포 파일 (`npm run build`로 갱신)
```

건물의 형태·색·등록 방법은 [건물 디자인 관리](BUILDING-DESIGN.md)를 참고하세요. 건물 외관 수정은 `src/map/buildings/`에서 진행하고, 생성된 `dist/app.js`는 직접 편집하지 않습니다.
