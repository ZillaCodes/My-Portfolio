-- Add project lifecycle status without changing existing project content or galleries.
alter table public.projects
  add column if not exists status text;

update public.projects
set status = 'completed'
where status is null;

alter table public.projects
  alter column status set default 'completed',
  alter column status set not null;

alter table public.projects
  drop constraint if exists projects_status_check;

alter table public.projects
  add constraint projects_status_check check (status in ('completed', 'in_progress'));

create index if not exists projects_status_display_order_idx
  on public.projects (status, display_order);
