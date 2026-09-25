-- The public site reads the active row from resumes, while write access remains admin-only.
create policy "public published resumes" on public.resumes for select using (published);

-- Preserve existing deployments that stored the public URL in site_settings before the
-- resumes table was wired into the UI. Future uploads write directly to resumes.
insert into public.resumes (storage_path, published)
select regexp_replace(value, '^.*/storage/v1/object/public/resumes/', ''), true
from public.site_settings
where key = 'resume_url'
  and value like '%/storage/v1/object/public/resumes/%'
  and not exists (select 1 from public.resumes where published)
on conflict do nothing;
