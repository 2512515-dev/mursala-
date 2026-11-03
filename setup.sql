-- Paste this whole file into Supabase > SQL Editor > Run
create table site(id int primary key, data jsonb not null);
create table moods(id bigint generated always as identity primary key, mood text not null, at timestamptz default now());
alter table site enable row level security;
alter table moods enable row level security;
create policy "anyone reads site" on site for select using (true);
create policy "admin inserts site" on site for insert to authenticated with check (true);
create policy "admin updates site" on site for update to authenticated using (true) with check (true);
create policy "anyone adds mood" on moods for insert to anon, authenticated with check (true);
create policy "admin reads moods" on moods for select to authenticated using (true);
insert into storage.buckets (id, name, public) values ('media','media',true) on conflict do nothing;
create policy "admin uploads media" on storage.objects for insert to authenticated with check (bucket_id='media');
create policy "admin deletes media" on storage.objects for delete to authenticated using (bucket_id='media');
