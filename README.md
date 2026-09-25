# Fagbamila Olumide Felix Portfolio Platform

Dynamic React/Vite portfolio and private Supabase-powered content dashboard.

## Setup
1. Copy `.env.example` to `.env.local` and supply the **public** Supabase URL and anon key.
2. Link the project with the Supabase CLI and run `supabase db push` to apply `supabase/migrations/20260924000000_portfolio_platform.sql`.
3. In Supabase Dashboard **Authentication → Users**, create your administrator user (disable public sign-ups in Authentication → Providers). In SQL Editor, run: `insert into public.profiles (id, is_admin) values ('AUTH_USER_UUID', true);` replacing the UUID with that user’s Auth user ID.
4. Run `npm run dev`. Vercel uses the normal `npm run build` command.

The dashboard is available at `/admin`. Publish projects and skills only when final; no projects are seeded or hardcoded into the public portfolio.
