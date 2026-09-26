-- Add a distinct, ungrouped-from-technical content type without altering existing records.
alter table public.skills
  drop constraint if exists skills_content_type_check,
  add constraint skills_content_type_check check (content_type in ('skill', 'capability', 'professional_skill')),
  drop constraint if exists skills_skill_group_check,
  add constraint skills_skill_group_check check (skill_group is null or skill_group in (
    'Development', 'AI & Automation', 'Backend & Infrastructure', 'Finance Technology', 'Professional Skills'
  )),
  drop constraint if exists skills_type_group_check,
  add constraint skills_type_group_check check (
    (content_type = 'skill' and skill_group in ('Development', 'AI & Automation', 'Backend & Infrastructure', 'Finance Technology'))
    or (content_type = 'capability' and skill_group is null)
    or (content_type = 'professional_skill' and skill_group = 'Professional Skills')
  );

insert into public.skills (name, category, content_type, skill_group, display_order, published)
select item.name, 'Professional Skills', 'professional_skill', 'Professional Skills', item.display_order, true
from (values
  ('Critical Thinking', 1), ('Problem Solving', 2), ('Analytical Thinking', 3), ('Systems Thinking', 4),
  ('Research & Analysis', 5), ('Attention to Detail', 6), ('Communication', 7), ('Adaptability', 8)
) as item(name, display_order)
where not exists (
  select 1 from public.skills existing
  where existing.name = item.name and existing.content_type = 'professional_skill'
);
