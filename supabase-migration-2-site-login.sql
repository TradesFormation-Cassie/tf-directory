-- =========================================================
-- Migration 2: gate reading the resources table behind a password
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- (Run this AFTER supabase-setup.sql has already been run once)
-- =========================================================

-- 1. Remove the old "anyone can read" policy. Without any select policy,
--    a direct `.from('resources').select()` now returns zero rows for
--    everyone — including anyone who has your public anon key.
drop policy if exists "Anyone can read resources" on public.resources;

-- 2. The only way to read the table now: this function, which checks the
--    site password server-side before returning anything.
create or replace function public.get_resources(p_password text)
returns setof public.resources
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_password <> 'TFTEAM26' then
    raise exception 'Incorrect password';
  end if;

  return query
    select * from public.resources
    order by sort_order asc, created_at asc;
end;
$$;

grant execute on function public.get_resources to anon, authenticated;

-- To change the site password later: replace 'TFTEAM26' above, re-run just
-- this create-or-replace block, and update SITE_PASSWORD in app.js to match.
