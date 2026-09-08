-- =========================================================
-- Migration 4: add a "Client-Specific" tag to each resource
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- (Run this AFTER migrations 1, 2 and 3 have already been run)
-- =========================================================

-- 1. New column
alter table public.resources add column if not exists is_client_specific boolean not null default false;

-- 2. Drop the old versions of these functions first — adding a parameter
--    creates a NEW overload in Postgres rather than replacing the old one,
--    which would leave two conflicting versions active at once.
drop function if exists public.gm_add_resource(text, text, text, text, text, text, text, text, boolean, boolean, text[]);
drop function if exists public.gm_update_resource(text, uuid, text, text, text, text, text, text, text, boolean, boolean, text[]);

-- 3. Recreate both with the new p_is_client_specific parameter
create or replace function public.gm_add_resource(
  p_password text,
  p_name text,
  p_description text,
  p_url text,
  p_category text,
  p_icon text default 'link',
  p_tool_username text default null,
  p_tool_password text default null,
  p_is_internal_only boolean default false,
  p_is_client_safe boolean default false,
  p_keywords text[] default '{}',
  p_is_client_specific boolean default false
) returns public.resources
language plpgsql
security definer
set search_path = public
as $$
declare
  new_row public.resources;
begin
  if p_password not in ('SAINTCONFETTI', 'SaintConfetti') then
    raise exception 'Incorrect password';
  end if;

  insert into public.resources
    (name, description, url, category, icon, tool_username, tool_password, is_internal_only, is_client_safe, keywords, is_client_specific)
  values
    (p_name, p_description, p_url, p_category, p_icon, p_tool_username, p_tool_password, p_is_internal_only, p_is_client_safe, p_keywords, p_is_client_specific)
  returning * into new_row;

  return new_row;
end;
$$;

create or replace function public.gm_update_resource(
  p_password text,
  p_id uuid,
  p_name text,
  p_description text,
  p_url text,
  p_category text,
  p_icon text,
  p_tool_username text default null,
  p_tool_password text default null,
  p_is_internal_only boolean default false,
  p_is_client_safe boolean default false,
  p_keywords text[] default '{}',
  p_is_client_specific boolean default false
) returns public.resources
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_row public.resources;
begin
  if p_password not in ('SAINTCONFETTI', 'SaintConfetti') then
    raise exception 'Incorrect password';
  end if;

  update public.resources
  set name = p_name,
      description = p_description,
      url = p_url,
      category = p_category,
      icon = p_icon,
      tool_username = p_tool_username,
      tool_password = p_tool_password,
      is_internal_only = p_is_internal_only,
      is_client_safe = p_is_client_safe,
      keywords = p_keywords,
      is_client_specific = p_is_client_specific
  where id = p_id
  returning * into updated_row;

  return updated_row;
end;
$$;

grant execute on function public.gm_add_resource   to anon, authenticated;
grant execute on function public.gm_update_resource to anon, authenticated;

-- Note: get_resources() already does `select * from public.resources`, so the
-- new column flows through automatically — no change needed there.
