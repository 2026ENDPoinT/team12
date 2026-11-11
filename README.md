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

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm test` | 테스트 실행 |
| `npm run build` | 배포용 `dist` 생성 |

Node.js 24에서 실행을 확인했습니다.
