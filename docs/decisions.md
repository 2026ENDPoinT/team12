# 결정 기록

길찾기 개선 작업([routing-spec.md](routing-spec.md))에서 정한 사항을 기록합니다. 최신 결정이 위에 옵니다.

## 2026-11-11 · 정문 위치는 지금 그대로 둠

- **현황**: 정문 위치가 두 군데 있다. 그래프 노드 `gate`(-146.6, 432.7)는 `prepare-campus.py`가 만든 기준점이고, `MAIN_GATE`(-233, 216)는 팀이 표시한 정문으로 지도 라벨과 출발지 목록의 "정문"에 쓰인다.
- **결정**: 코드를 바꾸지 않는다. 사용자에게 보이는 정문은 이미 `MAIN_GATE` 하나다. `gate` 노드를 쓰는 홈 미리보기 경로는 CSS로 숨겨져 있어 보이지 않는다. `gate` 노드는 신고·경로 테스트의 고정 기준점으로 유지한다.
- **나중에**: 홈 미리보기를 다시 보이게 하면 출발점을 `MAIN_GATE.entry`로 맞춘다.

## 2026-11-11 · 좌표 변환식을 SMASH 원본과 같게 통일

- **결정**: 위경도 ↔ 미터 변환을 `src/geo.mjs`의 `toScene`, `toLngLat` 두 함수로 모으고, SMASH-SEOULTECH `tools/build_campus.py`와 같은 위도 보정 계수를 쓴다. 기존 `gpsToCampus`(geo.mjs)와 `campusToGps`(gis.mjs)는 이 두 함수를 부르는 이름으로 남긴다.
- **이유**: 지도 데이터는 SMASH가 이 계수로 만든 미터 좌표다. 기존 고정 계수(111132, 111320)는 캠퍼스 끝에서 약 0.6m 어긋났다. OSM 원본 모서리로 확인한 결과 SMASH 식은 0.06m 이내로 맞는다.
- **명세와 다른 점**: 명세의 `src/geo/coords.ts` 대신 기존 `src/geo.mjs`를 쓴다. 저장소가 TypeScript가 아닌 JS(ESM)이기 때문이다.
- **남은 검증**: 명세 Phase 0 완료 기준(구글맵 건물 모서리 3곳이 지도 위 같은 모서리와 5m 이내)은 실제 세계와 지도 데이터의 차이를 보는 것이라, 팀이 구글맵 좌표를 제공해야 확인할 수 있다.

## 2026-11-11 · 데이터 이름 규칙은 팀 GIS 양식을 따름

- **결정**: 새로 추가하는 속성 이름은 명세 3장 대신 `src/gis.mjs`와 `data/team-survey-template.geojson`의 양식을 따른다.

  | 명세 3장 | 사용하는 이름 |
  | --- | --- |
  | `source: "osm" \| "manual" \| "report"` | `source_kind: "public_gis" \| "team_input" \| "generated"` |
  | `verified: boolean` | `verification_status: "candidate" \| "reviewing" \| "verified" \| "rejected" \| "expired"` |
  | `type` (간선·노드 종류) | `feature_type`: `entrance`, `sidewalk`, `stairs`, `building_passage` |

- **이유**: 팀 GIS 양식이 이미 코드·테스트·빌드에 들어가 있어서, 이름을 하나로 유지하는 편이 혼란이 적다.

## 2026-11-11 · 좌표 저장 방식: 내부는 미터, 조사·교환은 위경도

- **결정**: 지도 렌더링과 경로 계산은 기존 `data/seoultech.json`의 미터 좌표(캠퍼스 원점 기준, +x 동쪽, +z 남쪽)를 그대로 쓴다. 팀이 조사해 넣는 데이터(출입구, 인도, 계단, 건물 관통)는 위경도(EPSG:4326) GeoJSON(`data/team-survey-template.geojson` 양식)으로 저장하고, 불러올 때 `toScene`으로 미터로 바꿔 그래프에 합친다.
- **이유**: 기존 화면·경로·신고 코드를 바꾸지 않아도 되고, 조사 데이터는 원점이 바뀌어도 안전하며 외부 도구·서버(PostGIS)와 바로 주고받을 수 있다.
- **기존 데이터**: `data/seoultech.json`은 자동 생성 데이터로 두고 손으로 고치지 않는다. 팀 조사 데이터는 별도 파일에 덧붙인다.

## 2026-11-11 · 팀 main 병합 충돌 정리

- `data/seoultech.json` 충돌은 세 버전 내용이 같고 형식(들여쓰기, 줄바꿈)만 달라 `main` 버전을 썼다.
