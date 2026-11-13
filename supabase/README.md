# Supabase 인계 메모 (2026-11-13)

프로젝트: `https://jydziqwmhjlwlsoiegdd.supabase.co` (project ref `jydziqwmhjlwlsoiegdd`)

## 파일
- `migrations/20261113051005_remote_schema.sql`: 원격 DB의 `public`·`storage` 스키마를 `supabase db pull`로 가져온 기준점. **원격 migration 기록에 "적용됨"으로 등록돼 있다.** `db diff --linked` 결과 원격과 차이 없음.
- `migrations/20261113060000_report_gps.sql`: **아직 원격에 적용되지 않음.** 현장 신고용 GPS 칸(`gps_x`, `gps_z`, `gps_accuracy`, `taken_at`)과 GPS 필수 제약조건. `main`의 프론트엔드가 이 칸들을 보내므로 적용 전에는 새 신고 저장이 실패한다. 적용: `npx supabase@2 db push`
- `config.toml`: `supabase init` 기본값 + 신고 사진 버킷 설정(로컬 개발용). 버킷은 데이터라 migration에 없다.

## 테이블
| 테이블 | 용도 | 주요 컬럼 |
|---|---|---|
| `road_reports` | 공사·통행 막힘 신고 | `id` uuid PK, `edge_id`, `point_x`/`point_z`(캠퍼스 미터 좌표), `reason`(construction/blocked/other), `reason_note`, `photo_path`, `reporter_device_id`, `status`(reported/confirmed/dismissed), `confirmed_at`, `confirmed_by`, `is_cover`, `created_at` |
| `building_works` | 관리자가 등록한 건물 공사 기간 | `id` uuid PK, `building_id`(`data/seoultech.json`의 건물 id), `start_date`, `end_date`, `note`, `created_at` |

건물·출입구·보행 노드/간선, 사용자 프로필, 신고 확인/투표 테이블은 **없다**. 건물·노드·간선·출입구는 DB가 아니라 `data/seoultech.json` + `data/team-survey.json`(GeoJSON)에 있고 앱이 불러올 때 합친다(`src/data.mjs`). 신고 "투표"는 별도 테이블 없이 같은 30m 구역의 서로 다른 `reporter_device_id` 수로 센다(`src/reports.mjs` `clusterReports`). 외래 키·unique·인덱스(PK 제외)·PostGIS는 쓰지 않는다.

## RLS (모든 앱 테이블 RLS 켜짐)
| 테이블 | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `road_reports` | 누구나 | 누구나 | **누구나, 조건 없음** | **누구나** |
| `building_works` | anon·authenticated | anon·authenticated | 정책 없음(거부) | anon·authenticated |
| `storage.objects` (`report-photos`) | 공개 버킷 URL | anon·authenticated 업로드 | 정책 없음 | 정책 없음 |

⚠ **관리자 로그인이 없어서 시연용으로 열어 둔 상태다.** Publishable Key만 있으면 누구나 신고를 `confirmed`로 바꾸거나 지우고, 공사를 등록·삭제할 수 있다. 관리자 기능은 화면에서 `?admin=1` + 코드(`src/app.js` `ADMIN_DEMO_CODE`)로만 숨겨져 있다.

권장 다음 단계: Supabase Auth로 관리자 계정을 만들고, `road_reports` UPDATE/DELETE와 `building_works` INSERT/DELETE를 관리자만으로 좁힌다. 일반 사용자는 INSERT(`status = 'reported'`만)와 SELECT만 허용한다.

## 기타
- 함수·트리거: `public.rls_auto_enable()` + event trigger `ensure_rls`(새 public 테이블에 RLS 자동 적용, Supabase 기본 제공).
- Realtime: `supabase_realtime` publication에 등록된 테이블 없음. 앱은 10초 폴링(`src/app.js` `refreshShared`).
- Edge Functions: 없음.
- Storage: `report-photos` 버킷, **public**, 15MB, `image/*`.

## 명령
```bash
npx supabase@2 login                                   # Access Token은 이 컴퓨터에만 저장
npx supabase@2 link --project-ref jydziqwmhjlwlsoiegdd # DB 비밀번호는 터미널에서만 입력
npx supabase@2 db diff --linked --schema public,storage   # 원격과 migration 비교(Docker 필요)
npx supabase@2 db push                                  # 미적용 migration 적용
```
DB 세션 포트(5432)를 막는 와이파이(학교 등)에서는 `db pull/diff`가 실패한다. 핫스팟 등으로 바꿔서 실행한다.

service_role 키, DB 비밀번호, Access Token, `.env`는 커밋하지 않는다(`.gitignore` 처리됨). 브라우저는 Publishable Key만 쓴다.
