-- Supabase SQL Editor에서 새 창(New query)에 붙여 넣고 한 번 실행하세요.

-- 1) 확정 해제: 확정(confirmed)된 신고도 지울 수 있게 합니다.
-- TODO(보안): 시연용 관리자 잠금과 같은 수준(anon 허용). 관리자 로그인을 붙이면 관리자만으로 좁히세요.
drop policy if exists "road_reports demo delete any" on road_reports;
create policy "road_reports demo delete any" on road_reports
  for delete to anon, authenticated using (true);

-- 2) 예전 테스트 신고 정리 (DB 연결 시험 + 2026-11-12 e2e 시험)
delete from road_reports
  where reporter_device_id like 'e2e-test%'
     or reporter_device_id in ('console-test', 'console-update-test', 'dup-check');
