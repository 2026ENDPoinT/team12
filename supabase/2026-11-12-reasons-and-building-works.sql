-- Supabase 대시보드 → SQL Editor에 붙여 넣고 한 번 실행하세요.
-- 1) 신고 사유 "기타(직접 입력)" + 사진 필수
-- 2) 관리자가 등록하는 건물 공사 표 building_works

-- ===== 1. road_reports =====
alter table road_reports add column if not exists reason_note text;

-- 사유는 세 가지만. 기타는 글이 있어야 하고, 사진은 새 신고부터 필수입니다.
-- (not valid: 사진 없이 이미 저장된 예전 신고는 그대로 두고 새 행에만 적용)
alter table road_reports drop constraint if exists road_reports_reason_check;
alter table road_reports add constraint road_reports_reason_check
  check (reason in ('construction', 'blocked', 'other')) not valid;
alter table road_reports drop constraint if exists road_reports_other_note_check;
alter table road_reports add constraint road_reports_other_note_check
  check (reason <> 'other' or length(trim(coalesce(reason_note, ''))) between 1 and 100) not valid;
alter table road_reports drop constraint if exists road_reports_photo_required;
alter table road_reports add constraint road_reports_photo_required
  check (photo_path is not null) not valid;

-- ===== 1-2. 신고 사진 저장소 (report-photos) =====
-- 지금은 anon 업로드 정책이 없어 사진 업로드가 전부 막혀 있습니다(RLS 오류).
-- 사진 주소(getPublicUrl)로 보여 주므로 공개 버킷으로 두고, 이미지·15MB까지만 받습니다.
update storage.buckets
  set public = true,
      file_size_limit = 15728640,
      allowed_mime_types = array['image/*']
  where id = 'report-photos';
drop policy if exists "report photos upload" on storage.objects;
create policy "report photos upload" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'report-photos');

-- ===== 2. building_works =====
create table if not exists building_works (
  id uuid primary key default gen_random_uuid(),
  building_id text not null,
  start_date date not null,
  end_date date not null,
  note text check (note is null or length(note) <= 100),
  created_at timestamptz not null default now(),
  check (start_date <= end_date)
);

alter table building_works enable row level security;

-- 누구나 공사 표시를 볼 수 있습니다.
drop policy if exists "building_works read" on building_works;
create policy "building_works read" on building_works
  for select to anon, authenticated using (true);

-- TODO(보안): 지금 관리자 잠금은 브라우저 안 시연용 코드라, road_reports의 확정/반려와 똑같이
-- anon 키로 등록·삭제를 열어 둡니다. 관리자 로그인을 붙이면 아래 두 정책을 관리자만으로 좁히세요.
drop policy if exists "building_works demo insert" on building_works;
create policy "building_works demo insert" on building_works
  for insert to anon, authenticated with check (true);
drop policy if exists "building_works demo delete" on building_works;
create policy "building_works demo delete" on building_works
  for delete to anon, authenticated using (true);
