-- ⚠ 아직 원격 DB에 적용되지 않은 migration입니다(2026-11-13 기준). 적용: npx supabase@2 db push
-- main의 프론트엔드 코드(src/backend.mjs insertReportRow)는 이 칸들을 보내므로, 적용 전에는 새 신고 저장이 실패합니다.
-- 현장 신고: 신고를 시작할 때 GPS 위치(캠퍼스 미터 좌표)·정확도, 앱 안 카메라 촬영 시각
alter table road_reports add column if not exists gps_x double precision;
alter table road_reports add column if not exists gps_z double precision;
alter table road_reports add column if not exists gps_accuracy real;
alter table road_reports add column if not exists taken_at timestamptz;

-- 새 신고부터 GPS 위치가 꼭 있어야 하고, 신고 지점은 GPS 위치 30m(+여유 5m) 안이어야 합니다.
-- (not valid: GPS 없이 저장된 예전 신고는 그대로 둠)
alter table road_reports drop constraint if exists road_reports_gps_required;
alter table road_reports add constraint road_reports_gps_required
  check (
    gps_x is not null and gps_z is not null
    and sqrt(power(point_x - gps_x, 2) + power(point_z - gps_z, 2)) <= 35
  ) not valid;
