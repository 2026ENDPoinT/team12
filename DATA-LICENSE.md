# 서울과학기술대 지도 데이터 출처와 이용 조건

애플리케이션 소스와 지도 데이터의 이용 조건은 다릅니다.

## 지도 데이터

- 원본: [Hong-Iron/SMASH-SEOULTECH, data/campus.json](https://github.com/Hong-Iron/SMASH-SEOULTECH/blob/5f3e93bcd8570f796dc405c2c33906dcd353fd2b/data/campus.json)
- 원본 커밋: `5f3e93bcd8570f796dc405c2c33906dcd353fd2b`
- 원본 데이터의 별도 공개 조건: [저장소 LICENSE의 지도 데이터 예외](https://github.com/Hong-Iron/SMASH-SEOULTECH/blob/5f3e93bcd8570f796dc405c2c33906dcd353fd2b/LICENSE)
- © OpenStreetMap 기여자. [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/). [OSM 저작권 안내](https://www.openstreetmap.org/copyright).
- 보완 자료: 국토교통부 디지털트윈국토(브이월드) 건물통합정보·학교용지 경계·지붕 대표색. 공공누리 제1유형(출처표시). 원본 항공영상은 포함하지 않습니다.
- 수림학사 외곽선: [OpenStreetMap way 579071106](https://www.openstreetmap.org/way/579071106) (ODbL 1.0). 건물 번호와 층수는 [서울과기대 생활관 시설안내](https://housing.seoultech.ac.kr/facilities/surim)를 참고했습니다.

`data/seoultech.json`과 공개 배포 사본 `dist/data/seoultech.json`은 위 원본에서 변환한 데이터베이스이며 **ODbL 1.0으로 제공합니다.** 지도 화면에도 출처와 다운로드 링크가 있습니다. 지도 데이터에는 애플리케이션 코드의 조건을 적용해 재사용을 제한하지 않습니다.

변환 내용: 캠퍼스 내 건물/도로/녹지/연못/나무 추출, 지형 고도 평탄화, 도로 교차점 기반의 검증 전 보행 그래프 생성, 건물 외곽선과 도로 사이의 입구 인근 연결선 자동 생성. 층수·높이에는 원본의 추정값이 포함됩니다. 보행 가능 여부와 실제 출입구는 현장 검증 전이며 실시간 공사 정보가 아닙니다.

횡단보도 표시용 `data/crosswalks.json`은 [OpenStreetMap](https://www.openstreetmap.org/copyright)의 캠퍼스 내 `footway=crossing`, `crossing:markings=zebra` 선형을 사용합니다(ODbL 1.0). 항목별 원본 way ID를 기록합니다.

## SMASH 코드와 디자인

SMASH 저장소의 코드·그림·화면 디자인은 복제·재배포가 허용되지 않습니다. 이 프로젝트에는 이를 복사하지 않았습니다. 데이터 구성 방식을 읽고 참고하여 기존 사이의 독립적인 Three.js 렌더러·경로 UI·클릭 신고 기능을 구현했습니다. SMASH 대학교의 실제 외곽선 기반 캠퍼스 표현에서 영감을 받았습니다.

Three.js는 MIT 라이선스입니다. npm 번들에는 라이브러리 고지가 보존됩니다.
