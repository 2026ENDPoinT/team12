create table public.shortcut_reports (
  id uuid primary key default gen_random_uuid(),
  node_a text not null check (char_length(node_a) between 1 and 160),
  node_b text not null check (char_length(node_b) between 1 and 160),
  note text not null check (char_length(btrim(note)) between 1 and 300),
  has_stairs boolean not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  check (node_a <> node_b)
);

create unique index shortcut_reports_approved_pair
  on public.shortcut_reports (least(node_a, node_b), greatest(node_a, node_b))
  where status = 'approved';

alter table public.shortcut_reports enable row level security;
revoke all on public.shortcut_reports from anon, authenticated;
grant select on public.shortcut_reports to anon, authenticated;
grant insert (node_a, node_b, note, has_stairs) on public.shortcut_reports to anon, authenticated;
grant update (status) on public.shortcut_reports to authenticated;

create policy "approved shortcuts are public" on public.shortcut_reports
  for select to anon, authenticated using (status = 'approved');
create policy "admins see all shortcut reports" on public.shortcut_reports
  for select to authenticated using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "visitors submit pending shortcuts" on public.shortcut_reports
  for insert to anon, authenticated with check (status = 'pending');
create policy "admins review shortcuts" on public.shortcut_reports
  for update to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and status in ('pending', 'approved'))
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and status in ('approved', 'rejected'));
