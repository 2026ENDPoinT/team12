-- 사용자의 원래 신고 위치·간선은 증거로 보존하고, 관리자가 실제 차단할 간선을 따로 선택합니다.
alter table public.road_reports
  add column if not exists confirmed_edge_id text;

alter table public.road_reports
  drop constraint if exists road_reports_confirmed_edge_id_check;
alter table public.road_reports
  add constraint road_reports_confirmed_edge_id_check
  check (confirmed_edge_id is null or char_length(confirmed_edge_id) between 1 and 320);

-- 일반 사용자는 관리자 선택 칸을 채울 수 없습니다.
drop policy if exists "road reports public submit" on public.road_reports;
create policy "road reports public submit"
  on public.road_reports
  for insert
  to anon, authenticated
  with check (
    status = 'reported'
    and confirmed_at is null
    and confirmed_by is null
    and confirmed_edge_id is null
    and is_cover = false
    and photo_path is not null
    and reporter_device_id is not null
    and gps_x is not null
    and gps_z is not null
    and gps_accuracy between 0 and 50
    and taken_at is not null
  );
