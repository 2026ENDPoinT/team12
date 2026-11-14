# Supabase 인계 메모 (2026-11-13)

프로젝트: `https://jydziqwmhjlwlsoiegdd.supabase.co` (project ref `jydziqwmhjlwlsoiegdd`)

## 파일
- `migrations/20261113051005_remote_schema.sql`: 원격 DB의 `public`·`storage` 스키마를 `supabase db pull`로 가져온 기준점. **원격 migration 기록에 "적용됨"으로 등록돼 있다.** `db diff --linked` 결과 원격과 차이 없음.
- `migrations/20261113060000_report_gps.sql`: 원격 적용됨. 현장 신고용 GPS 칸(`gps_x`, `gps_z`, `gps_accuracy`, `taken_at`)과 GPS 필수 제약조건.
- `migrations/20261114024000_secure_rls.sql`: 원격 적용됨. 공개 사용자는 신고 조회·등록만 가능하고, 관리자 작업은 Supabase Auth `app_metadata.role = 'admin'` 계정만 가능하다.
- `config.toml`: `supabase init` 기본값 + 신고 사진 버킷 설정(로컬 개발용). 버킷은 데이터라 migration에 없다.

## 테이블
| 테이블 | 용도 | 주요 컬럼 |
|---|---|---|
| `road_reports` | 공사·통행 막힘 신고 | `id` uuid PK, `edge_id`, `point_x`/`point_z`(캠퍼스 미터 좌표), `reason`(construction/blocked/other), `reason_note`, `photo_path`, `reporter_device_id`, `status`(reported/confirmed/dismissed), `confirmed_at`, `confirmed_by`, `is_cover`, `created_at` |
| `building_works` | 관리자가 등록한 건물 공사 기간 | `id` uuid PK, `building_id`(`data/seoultech.json`의 건물 id), `start_date`, `end_date`, `note`, `created_at` |

건물·출입구·보행 노드/간선, 사용자 프로필, 신고 확인/투표 테이블은 **없다**. 건물·노드·간선·출입구는 DB가 아니라 `data/seoultech.json` + `data/team-survey.json`(GeoJSON)에 있고 앱이 불러올 때 합친다(`src/campus/data.mjs`). 신고 "투표"는 별도 테이블 없이 같은 30m 구역의 서로 다른 `reporter_device_id` 수로 센다(`src/reports/reports.mjs` `clusterReports`). 외래 키·unique·인덱스(PK 제외)·PostGIS는 쓰지 않는다.

## RLS (모든 앱 테이블 RLS 켜짐)
| 테이블 | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `road_reports` | 누구나 | 누구나(`reported`·GPS·사진 필수) | 관리자 | 관리자 |
| `building_works` | 누구나 | 관리자 | 관리자 | 관리자 |
| `storage.objects` (`report-photos`) | 공개 버킷 URL | 경로·확장자 제한 업로드 | 정책 없음 | 정책 없음 |

관리자 화면은 `?admin=1`에서 열고 Supabase Auth 이메일·비밀번호로 로그인한다. 관리자 계정은 `auth.users.raw_app_meta_data`의 `role`이 `admin`이어야 한다. 일반 사용자의 브라우저 기기 ID는 본인 인증 수단이 아니므로 익명 신고 삭제는 허용하지 않는다.

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
