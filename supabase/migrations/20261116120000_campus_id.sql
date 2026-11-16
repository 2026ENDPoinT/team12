-- 여러 학교 지도를 지원하면서 신고·공사·지름길 제보를 학교별로 나눕니다.
-- 기존 행은 모두 서울과기대 것이므로 기본값을 'seoultech'으로 둡니다.
-- 학교 ID는 src/campus/registry.mjs의 id와 같습니다(영문 소문자·숫자·하이픈).

alter table public.road_reports
  add column campus_id text not null default 'seoultech'
  check (campus_id ~ '^[a-z0-9-]{2,40}$');

alter table public.building_works
  add column campus_id text not null default 'seoultech'
  check (campus_id ~ '^[a-z0-9-]{2,40}$');

alter table public.shortcut_reports
  add column campus_id text not null default 'seoultech'
  check (campus_id ~ '^[a-z0-9-]{2,40}$');

-- shortcut_reports는 칸 단위로 insert 권한을 주므로 새 칸도 허용합니다.
grant insert (campus_id) on public.shortcut_reports to anon, authenticated;

-- 승인된 지름길 중복 방지는 학교 안에서만 따집니다(노드 ID는 학교마다 겹칠 수 있음).
drop index if exists public.shortcut_reports_approved_pair;
create unique index shortcut_reports_approved_pair
  on public.shortcut_reports (campus_id, least(node_a, node_b), greatest(node_a, node_b))
  where status = 'approved';

create index road_reports_campus on public.road_reports (campus_id);
create index building_works_campus on public.building_works (campus_id);
create index shortcut_reports_campus on public.shortcut_reports (campus_id);
