-- user_metadata is writable by the user; app_metadata is not. Admin must have signed in with Google.
create or replace function public.is_admin() returns boolean
language sql stable
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'itai.bechor@gmail.com'
     and coalesce(auth.jwt() -> 'app_metadata' ->> 'provider', '') = 'google'
$$;
