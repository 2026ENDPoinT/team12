-- Supabase SQL Editor에서 새 창(New query)에 붙여 넣고 한 번 실행하세요.
-- 관리자가 확정할 때 고른 대표 사진 표시. 사용자는 빨간색 표시를 누르면 이 사진을 봅니다.
alter table road_reports add column if not exists is_cover boolean not null default false;
