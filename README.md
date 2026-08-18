# Uday Kumar Mahato — Portfolio

A single-page portfolio with a blueprint/engineering-schematic aesthetic, built with **React 19 + Vite 8 + Tailwind CSS v4 + Framer Motion**, deployed to [udays.space](https://udays.space) via Vercel.

## Features

- **Blueprint aesthetic**: ink background, paper cards, terracotta accent, FIG labels, dimension dividers
- **Gamification**: CRT scanlines, pixel-art corners, RPG skill bars, achievement toast, Konami code Easter egg
- **Blog**: Supabase-powered blog with admin panel (email/password auth, Markdown editor, RLS policies)
- **Animations**: Framer Motion scroll reveals, hero SVG draw-in, project hover flash
- **Responsive**: mobile-first, dark/light theme, prefers-reduced-motion support

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Udaythedev/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema (see below)
   - Enable email/password auth: Supabase Dashboard → Authentication → Providers → Email/Password
   - Add your email as an admin user: Authentication → Users → Add user

4. Create `.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Run locally:
   ```bash
   npm run dev
   ```

## Supabase Schema

```sql
-- Posts table
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  tags text[],
  content_html text not null,
  content_markdown text not null,
  date_published date,
  created_at timestamp with time zone default now()
);

-- RLS policies (run AFTER enabling email/password auth)
create policy "public read" on posts for select using (true);
create policy "auth write" on posts for insert to authenticated with check (true);
create policy "auth update" on posts for update to authenticated using (true);
create policy "auth delete" on posts for delete to authenticated using (true);
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUdaythedev%2Fportfolio)

- Set the same env vars as `.env.local`
- Remove `VITE_ADMIN_PASSWORD` (not used anymore)
- Add rewrite rules for SPA routing (see `vercel.json`)

## License

MIT