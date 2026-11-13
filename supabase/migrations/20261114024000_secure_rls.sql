-- 공개 사용자는 신고 조회·등록만, 관리자는 상태 변경과 공사 관리를 맡습니다.
-- 관리자 권한은 사용자가 바꿀 수 없는 Auth app_metadata.role = 'admin'으로 판정합니다.

alter table public.road_reports enable row level security;
alter table public.building_works enable row level security;

drop policy if exists "road_reports demo delete any" on public.road_reports;
drop policy if exists "누구나 신고 등록 가능" on public.road_reports;
drop policy if exists "누구나 신고 조회 가능" on public.road_reports;
drop policy if exists "상태 변경 허용 (임시, 관리자 로그인 전)" on public.road_reports;

create policy "road reports public read"
  on public.road_reports
  for select
  to anon, authenticated
  using (true);

create policy "road reports public submit"
  on public.road_reports
  for insert
  to anon, authenticated
  with check (
    status = 'reported'
    and confirmed_at is null
    and confirmed_by is null
    and is_cover = false
    and photo_path is not null
    and reporter_device_id is not null
    and gps_x is not null
    and gps_z is not null
    and gps_accuracy between 0 and 50
    and taken_at is not null
  );

create policy "road reports admin update"
  on public.road_reports
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "road reports admin delete"
  on public.road_reports
  for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "building_works demo delete" on public.building_works;
drop policy if exists "building_works demo insert" on public.building_works;
drop policy if exists "building_works read" on public.building_works;

create policy "building works public read"
  on public.building_works
  for select
  to anon, authenticated
  using (true);

create policy "building works admin insert"
  on public.building_works
  for insert
  to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "building works admin update"
  on public.building_works
  for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "building works admin delete"
  on public.building_works
  for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- 정책뿐 아니라 테이블 권한도 필요한 작업만 남깁니다.
revoke all on table public.road_reports from anon, authenticated;
grant select, insert on table public.road_reports to anon, authenticated;
grant update, delete on table public.road_reports to authenticated;

revoke all on table public.building_works from anon, authenticated;
grant select on table public.building_works to anon, authenticated;
grant insert, update, delete on table public.building_works to authenticated;

drop policy if exists "report photos upload" on storage.objects;
create policy "report photos constrained upload"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'report-photos'
    and name ~* '^[a-z0-9_-]{16,64}/[0-9]{10,20}\.(jpg|jpeg|png|webp)$'
  );

update storage.buckets
set public = true,
    file_size_limit = 15728640,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'report-photos';
