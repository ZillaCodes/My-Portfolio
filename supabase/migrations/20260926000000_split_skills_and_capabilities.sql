-- Keep the existing skills table and records intact while distinguishing legacy
-- capability content from the new, grouped technical skills profile.
alter table public.skills
  add column if not exists content_type text,
  add column if not exists skill_group text;

-- All existing rows were created by the original capability editor. Preserve
-- their content and public visibility by classifying them as capabilities.
update public.skills
set content_type = 'capability'
where content_type is null;

alter table public.skills
  alter column content_type set default 'capability',
  alter column content_type set not null;

alter table public.skills
  drop constraint if exists skills_content_type_check,
  add constraint skills_content_type_check check (content_type in ('skill', 'capability')),
  drop constraint if exists skills_skill_group_check,
  add constraint skills_skill_group_check check (skill_group is null or skill_group in (
    'Development', 'AI & Automation', 'Backend & Infrastructure', 'Finance Technology'
  ));

-- A grouped technical skill always has one of the four supported groups;
-- capabilities intentionally remain ungrouped.
alter table public.skills
  drop constraint if exists skills_type_group_check,
  add constraint skills_type_group_check check (
    (content_type = 'skill' and skill_group is not null)
    or (content_type = 'capability' and skill_group is null)
  );

create index if not exists skills_public_type_group_display_order_idx
  on public.skills (published, content_type, skill_group, display_order);
