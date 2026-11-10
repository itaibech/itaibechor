-- Personal site schema. RLS is the only security boundary (static site, no server).

-- Admin = the one Google account. ponytail: hardcoded email, move to an admins table if a second editor ever appears.
create or replace function public.is_admin() returns boolean
language sql stable
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'itai.bechor@gmail.com'
     and coalesce((auth.jwt() -> 'user_metadata' ->> 'email_verified')::boolean, false)
$$;

-- Habits and favourite pages, editable from /#/admin.
create table public.items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('habit', 'favorite')),
  title_en text not null check (length(title_en) between 1 and 120),
  title_he text not null default '' check (length(title_he) <= 120),
  description_en text not null default '' check (length(description_en) <= 500),
  description_he text not null default '' check (length(description_he) <= 500),
  url text check (url is null or url ~ '^https?://'),
  icon text not null default '' check (length(icon) <= 8),
  sort int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.items enable row level security;
create policy items_read on public.items for select using (true);
create policy items_admin on public.items for all using (public.is_admin()) with check (public.is_admin());

-- Contact form: anyone can insert, only the admin can read or delete.
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 1 and 100),
  email text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 200),
  body text not null check (length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy messages_insert on public.messages for insert with check (true);
create policy messages_admin_read on public.messages for select using (public.is_admin());
create policy messages_admin_delete on public.messages for delete using (public.is_admin());
-- Column-level: anon may only supply the three fields (no forged ids/timestamps).
revoke insert on public.messages from anon, authenticated;
grant insert (name, email, body) on public.messages to anon, authenticated;

-- Views + likes: one row, only changed through the two functions below.
-- ponytail: no per-visitor dedupe, a refresh counts again; add an IP/hash table if the number ever matters.
create table public.stats (
  id int primary key default 1 check (id = 1),
  views bigint not null default 0,
  likes bigint not null default 0
);
insert into public.stats default values;
alter table public.stats enable row level security;
create policy stats_read on public.stats for select using (true);

create or replace function public.bump(field text) returns public.stats
language plpgsql security definer
set search_path = ''
as $$
declare r public.stats;
begin
  if field = 'views' then
    update public.stats set views = views + 1 where id = 1 returning * into r;
  elsif field = 'likes' then
    update public.stats set likes = likes + 1 where id = 1 returning * into r;
  else
    raise exception 'bad field';
  end if;
  return r;
end $$;
revoke all on function public.bump(text) from public;
grant execute on function public.bump(text) to anon, authenticated;
