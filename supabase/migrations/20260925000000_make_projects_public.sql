-- Projects created through the admin dashboard are public portfolio content.
-- Do not require a separate publish flag for visitors to read them.
drop policy if exists "public published projects" on public.projects;
create policy "public projects" on public.projects for select using (true);

drop policy if exists "public project images" on public.project_images;
create policy "public project images" on public.project_images for select using (
  exists (select 1 from public.projects p where p.id = project_id)
);
