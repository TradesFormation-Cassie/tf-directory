-- =========================================================
-- TradesFormation Directory — Supabase setup
-- Run this whole file once in: Supabase Dashboard > SQL Editor > New query
-- =========================================================

-- 1. The table that holds every resource
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  url text not null,
  category text not null,              -- shown as the pill, e.g. "Handbook", "Calculator", "Admin Tool"
  icon text not null default 'link',   -- one of the icon keys defined in app.js
  tool_username text,                  -- optional login username for the tool itself (not God Mode)
  tool_password text,                  -- optional login password for the tool itself (not God Mode)
  is_internal_only boolean not null default false,
  is_client_safe boolean not null default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 2. Lock the table down. Nobody can write to it directly, from anywhere.
alter table public.resources enable row level security;

create policy "Anyone can read resources"
  on public.resources
  for select
  using (true);

-- No insert/update/delete policies are created on purpose.
-- The ONLY way to write is through the three password-checked functions below.

-- 3. Add a resource — password is checked inside the database, not in the browser
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
  p_is_client_safe boolean default false
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
    (name, description, url, category, icon, tool_username, tool_password, is_internal_only, is_client_safe)
  values
    (p_name, p_description, p_url, p_category, p_icon, p_tool_username, p_tool_password, p_is_internal_only, p_is_client_safe)
  returning * into new_row;

  return new_row;
end;
$$;

-- 4. Edit an existing resource
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
  p_is_client_safe boolean default false
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
      is_client_safe = p_is_client_safe
  where id = p_id
  returning * into updated_row;

  return updated_row;
end;
$$;

-- 5. Delete a resource
create or replace function public.gm_delete_resource(
  p_password text,
  p_id uuid
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_password not in ('SAINTCONFETTI', 'SaintConfetti') then
    raise exception 'Incorrect password';
  end if;

  delete from public.resources where id = p_id;
end;
$$;

-- 6. Let the public "anon" key call these functions (the password check inside
--    each function is still what actually protects your data)
grant execute on function public.gm_add_resource   to anon, authenticated;
grant execute on function public.gm_update_resource to anon, authenticated;
grant execute on function public.gm_delete_resource to anon, authenticated;

-- 7. Seed with all current TradesFormation tools
insert into public.resources
  (name, description, url, category, icon, tool_username, tool_password, is_internal_only, is_client_safe, sort_order)
values
('Trainer''s Hub (Client View)', 'Where clients view every one of our Trainer''s Guides.', 'https://trainers-hub.netlify.app/', 'Client Portal', 'book', null, null, false, true, 1),
('Trainer''s Hub (Admin View)', 'Where the TradesFormation team logs in to edit and manage Trainer''s Guides.', 'https://trainers-hub.netlify.app/admin.html', 'Admin Tool', 'shield', null, null, true, false, 2),
('Home First Sell and Do Supervisor', 'A reworked DSR Handbook built for our client, Home First.', 'https://homefirst-sell-and-do-supervisor.netlify.app/', 'Handbook', 'book', null, null, false, true, 3),
('TradesFormation Coaching Programs', 'Shows our current coaching prices and program options.', 'https://tradesformation-coaching-programs.netlify.app/', 'Pricing Page', 'dollar', null, null, false, true, 4),
('Dynamic Tradies DSR Handbook', 'A hosted, editable DSR Handbook for Dynamic Tradies.', 'https://dsr-handbook-dynamic-tradies.netlify.app/', 'Handbook', 'book', null, null, false, true, 5),
('TradesFormation DSR Handbook', 'Our TF-branded master DSR Handbook.', 'https://tradesformation-dsr-handbook.netlify.app/', 'Handbook', 'book', null, null, true, false, 6),
('The Mindset Reframer', 'A companion tool for the Success Mindset Trainer''s Guide.', 'https://mindset-reframer.netlify.app/', 'Companion Tool', 'wrench', null, null, false, true, 7),
('Ask Adrian (Client Version)', 'An AI chatbot loaded with TradesFormation resources and training.', 'https://ask-adrian.netlify.app/', 'AI Chatbot', 'chat', null, 'TFVIP444', false, true, 8),
('TradesFormation Accountability Chart', 'An accountability chart for the TradesFormation team.', 'https://tradesformation-accountability-chart.netlify.app/', 'Org Chart', 'users', null, null, true, false, 9),
('SALESPRO Certification Test', 'The certification test for our SALESPRO online course.', 'https://salespro-certification.netlify.app/', 'Certification Test', 'quiz', null, null, false, true, 10),
('SALESPRO Certification Test Admin', 'Where the TradesFormation team edits, views, and manages the Certification Test.', 'https://salespro-certification-admin.netlify.app/', 'Admin Tool', 'shield', null, null, true, false, 11),
('Smart Sales Simulator', 'Where clients practice the SALESPRO system with AI customers.', 'https://smart-sales-system-sim.netlify.app/', 'Simulator', 'chat', null, null, false, true, 12),
('Billable Rate Calculator', 'Helps clients find their true billable rate.', 'https://billable-rate-calculator.netlify.app/', 'Calculator', 'dollar', null, null, false, true, 13),
('Operator Intensive Business Health Diagnostic', 'Used to determine the starting point for clients doing the Operator Intensive with Adrian.', 'https://oi-diagnostic-business-health-check.netlify.app/', 'Diagnostic', 'chart', null, null, false, true, 14),
('Tradie Mentors Calendar', 'An online calendar for Tradie Mentors to view upcoming group coaching sessions they''re hosting.', 'https://tradie-mentors-calendar.netlify.app/', 'Calendar', 'calendar', null, null, true, false, 15),
('TradesFormation Group Coaching Calendar', 'Shows upcoming group coaching sessions across every program type.', 'https://tf-group-coaching-calendar.netlify.app/', 'Calendar', 'calendar', null, null, false, true, 16),
('TradesFormation Onboarding App', 'Our hub for training and onboarding new TF team members.', 'https://tradesformation-onboarding-app.netlify.app/', 'Onboarding', 'compass', null, null, true, false, 17),
('Home First Onboarding App', 'An editable onboarding app built for Home First.', 'https://homefirst-onboarding-app.netlify.app/', 'Onboarding', 'compass', null, null, false, true, 18),
('TradesFormation Sales Manager Playbook', 'Our TF-branded master Sales Manager Playbook.', 'https://tradesformation-sales-mngr-playbook.netlify.app/', 'Playbook', 'book', null, null, true, false, 19),
('All Needs Sales Manager Playbook', 'An editable Sales Manager Playbook for All Needs.', 'https://all-needs-sales-manager-playbook.netlify.app/', 'Playbook', 'book', null, null, false, true, 20),
('DISC Quiz', 'A quick tool to determine someone''s potential DISC behavioural style.', 'https://tradesformation-disc-quiz.netlify.app/', 'Quiz', 'quiz', null, null, false, true, 21),
('The Marketing Mix', 'Helps clients adjust spend and performance levers to see how their marketing mix could change revenue and profit.', 'https://tf-marketing-mix-tool.netlify.app/', 'Marketing Tool', 'chart', null, null, false, true, 22),
('Coaching Knowledge Database', 'A library of coaching FAQs pulled from UpCoach.', 'https://tf-coaching-knowledge-database.netlify.app/', 'Knowledge Base', 'book', null, null, true, false, 23),
('Build Your AI Business Brain', 'Helps clients set up their own projects in Claude.', 'https://claude-projects-guide-ai-brain.netlify.app/', 'AI Tool', 'chat', null, null, false, true, 24),
('Event Agenda Builder', 'Helps the TradesFormation team easily create event agendas.', 'https://event-agenda-builder.netlify.app/', 'Internal Tool', 'calendar', null, null, true, false, 25),
('1% Behaviours Audit', 'A companion tool to our leadership training courses.', 'https://1-percent-audit.netlify.app/', 'Companion Tool', 'quiz', null, null, false, true, 26),
('Push vs Pull Simulator', 'A companion tool to help clients master the push vs pull method in sales opportunities.', 'https://push-vs-pull-simulator.netlify.app/', 'Simulator', 'chat', null, null, false, true, 27),
('Power of the Pause Simulator', 'A companion tool to help clients master the power of the pause in sales opportunities.', 'https://power-of-the-pause-simulator.netlify.app/', 'Simulator', 'chat', null, null, false, true, 28),
('Sole Trader vs Company Entity Factsheet', 'Helps Foundation clients confirm whether they have the right business structure.', 'https://tf-legal-business-structures.netlify.app/', 'Factsheet', 'file', null, null, false, true, 29),
('Smart Sales System Event Registration', 'Captures event registrations for the Smart Sales System.', 'https://smart-sales-system-live-event-regist.netlify.app/', 'Registration Form', 'file', null, null, false, true, 30),
('Event Expression of Interest Form', 'Captures interest in future TradesFormation events.', 'https://live-events-express-interest.netlify.app/', 'Registration Form', 'file', null, null, false, true, 31),
('HR Risk Audit', 'An interactive quiz to determine whether clients have HR risks in their businesses.', 'https://tradesformation-hr-risk-audit.netlify.app/', 'Quiz', 'quiz', null, null, false, true, 32),
('Conversion Rate Calculator App', 'Helps clients figure out their tech + CSR conversion rates.', 'https://conversion-rate-calculator.netlify.app/', 'Calculator', 'dollar', null, null, false, true, 33),
('Time Blocking Challenge', 'A companion tool for our leadership training to help clients time block their calendars.', 'https://time-blocking-challenge.netlify.app/', 'Companion Tool', 'calendar', null, null, false, true, 34),
('Lighthouse Packages', 'Coaching packages for Lighthouse companies.', 'https://tradesformation-training-curriculum.netlify.app/', 'Pricing Page', 'dollar', null, null, false, true, 35),
('Financial Terms Translator', 'A glossary of financial terms for home services business owners.', 'https://financial-terms-translator.netlify.app/', 'Glossary', 'book', null, null, false, true, 36),
('Inbox Organiser Mission', 'An interactive companion tool for our online leadership course.', 'https://inbox-organiser-mission.netlify.app/', 'Companion Tool', 'quiz', null, null, false, true, 37),
('Objections Playbook', 'Helps techs understand and neutralise objections.', 'https://tradesformation-objections-playbook.netlify.app/', 'Playbook', 'book', null, null, false, true, 38),
('The 4 Bank Accounts', 'An explainer for the four bank account system.', 'https://four-bank-accounts.netlify.app/', 'Explainer', 'book', null, null, false, true, 39),
('Tradie Training Camp', 'A free four-week training course for marketing leads.', 'https://tradesformation-tradie-training-camp.netlify.app/', 'Training Course', 'compass', null, null, false, true, 40),
('Reset Wheel', 'The TradesFormation version of the Wheel of Life exercise, used to determine which areas of a client''s life need more attention.', 'https://tradesformation-reset-wheel.netlify.app/', 'Exercise Tool', 'chart', null, null, false, true, 41),
('Sales Terms Translator', 'A glossary of sales terms for home services business owners and techs.', 'https://sales-terms-translator.netlify.app/', 'Glossary', 'book', null, null, false, true, 42),
('Marketing Terms Translator', 'A glossary of marketing terms for home services business owners and marketing managers.', 'https://marketing-terms-translator.netlify.app/', 'Glossary', 'book', null, null, false, true, 43),
('FAST Stress Relief App', 'A simplified self-help version of the Neuro Emotional Technique (NET), known as the First Aid Stress Tool (FAST).', 'https://faststressrelief.netlify.app/', 'Self-Help Tool', 'wrench', null, null, false, true, 44),
('The Five Why''s Check', 'Helps clients use the Five Why''s method to uncover the real cause of a problem.', 'https://five-whys-check.netlify.app/', 'Diagnostic Tool', 'chart', null, null, false, true, 45),
('Website Platform Picker', 'Helps clients determine which web platform is best for them.', 'https://tf-website-platform-picker.netlify.app/', 'Picker Tool', 'compass', null, null, false, true, 46),
('Foundation Business Fundamentals', 'An interactive quiz that shows clients which business fundamentals they need to work on.', 'https://foundation-business-fundamentals.netlify.app/', 'Quiz', 'quiz', null, null, false, true, 47),
('30-Day Manager Guide', 'A companion resource for our online leadership training course.', 'https://tradesformation-30-day-manager-guide.netlify.app/', 'Guide', 'book', null, null, false, true, 48),
('AI Platform Picker', 'Helps clients choose the right AI tool for the job.', 'https://ai-platform-picker.netlify.app/', 'Picker Tool', 'compass', null, null, false, true, 49),
('Slow Season Checklist', 'Helps home services business owners take the right action during a slow season.', 'https://slow-season-checklist.netlify.app/', 'Checklist', 'list', null, null, false, true, 50),
('Option Sheet Scorer', 'A free tool to review option sheets.', 'https://option-sheet-scorer.netlify.app/', 'Scoring Tool', 'chart', null, null, false, true, 51);
