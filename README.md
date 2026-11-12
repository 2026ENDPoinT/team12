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
미래관 실내 지도·AR 길안내는 http://127.0.0.1:4173/indoor/ 입니다.

### 휴대폰에서 확인 (AR 카메라)

카메라와 방향 센서는 HTTPS에서만 동작합니다. PC와 휴대폰을 같은 와이파이에 연결하고
`npm run dev:phone`을 실행한 뒤, 터미널에 나오는 `https://<PC IP>:4173/indoor/` 주소를
휴대폰에서 엽니다. 인증서 경고가 나오면 "계속"을 누릅니다. 배포 주소(GitHub Pages)는 바로 열립니다.

## IntelliJ에서 실행

1. IntelliJ에서 내려받은 `team12` 폴더를 엽니다.
2. 아래쪽 Terminal을 엽니다.
3. 처음 한 번 `npm ci`를 실행합니다.
4. `npm run dev`를 실행합니다.
5. 브라우저에서 http://127.0.0.1:4173 을 엽니다.

## 명령어

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm test` | 테스트 실행 |
| `npm run build` | 배포용 `dist` 생성 |
| `npm run dev:phone` | 휴대폰 확인용 HTTPS 개발 서버 |

## 미래관 실내 데이터 (`data/mirae/`)

| 파일 | 만드는 방법 |
| --- | --- |
| `mirae.glb`, `mirae.json` | `python scripts/extract-mirae.py <v6 index.html>` |
| `ar-index.bin` | `python scripts/build-ar-index.py <원본 sv 폴더> data/mirae/sv.json data/mirae/ar-index.bin` |
| `sv/`, `sv.json` | 촬영 영상 프레임(480×270로 축소)과 카메라 자세 |
| `entrances.json` | 도면 ↔ 캠퍼스 좌표 변환, 실내 출입구 |
| `demo.mp4`, `demo.json` | AR 데모용 영상 구간 (원본 `room.mp4`는 커밋하지 않음) |

Node.js 24에서 실행을 확인했습니다.
