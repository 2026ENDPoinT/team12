-- 신고 사진 정리: 관리자만 report-photos 버킷의 사진을 목록으로 보고 지울 수 있습니다.
-- - 반려·확정 해제로 신고를 지울 때 그 사진도 함께 지웁니다(src/backend.mjs deleteReportRows).
-- - 관리자 "사진 정리"는 어떤 신고와도 연결되지 않은 지 24시간 넘은 사진을 지웁니다(cleanupOrphanPhotos).
-- Storage API의 삭제(remove)는 select와 delete 권한이 모두 있어야 합니다.
-- 버킷은 public이라 사진 보기(공개 URL)는 이 정책과 무관하게 누구나 됩니다.
-- 관리자 판정은 secure_rls와 같이, 사용자가 바꿀 수 없는 Auth app_metadata.role = 'admin'입니다.

drop policy if exists "report photos admin list" on storage.objects;
create policy "report photos admin list"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'report-photos'
    and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "report photos admin delete" on storage.objects;
create policy "report photos admin delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'report-photos'
    and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
