# Uday Kumar Mahato — Portfolio

A single-page personal portfolio built with React + Vite + Tailwind CSS v4 and Framer Motion.

**Live site:** https://udays.space

---

## Stack

| Layer | Tooling |
|---|---|
| Framework | React 19 · Vite 8 |
| Styling | Tailwind CSS v4 (native config via `@theme` in CSS) |
| Animation | Framer Motion (scroll reveals + hero SVG draw-in) |
| Fonts | Big Shoulders Display, IBM Plex Sans, IBM Plex Mono (Google Fonts) |

---

## Design Aesthetic

Blueprint / engineering schematic — deliberately avoids common AI-portfolio clichés (warm cream + serif, neon-on-black, newspaper layout).

Key visual elements:

- Single deep-ink background (`#0a0c10`) throughout, no alternating sections
- Faint blueprint grid via CSS `::before` on body
- Corner registration marks at viewport edges
- Paper-colored spec-sheet cards with structural-line borders
- Section labels in mono: `FIG. 02 — PROJECTS`
- Dimension-line dividers (`=====`) between sections
- Single unified terracotta accent (`#c45b3e`) across the entire site
- All interactive links use `◆` Unicode glyphs

---

## Gamification Features

Light interactive touches that give the site subtle game-dev energy without being distracting:

- **RPG skill bars** — proficiency fill bars on each skill tag, styled like game stat meters
- **Pixel-art corner brackets** — blocky L-brackets on all paper cards; turn terracotta on hover
- **Project card hover flash** — left-to-right terracotta gradient sweep on hover
- **Achievement toast** — "🏆 Achievement Unlocked" notification fires once when you scroll to the Achievements section
- **Konami code easter egg** — type `↑↑↓↓←→←→BA` for a "Developer Mode Activated" center-screen toast (3s auto-dismiss)
- **CRT scanline overlay** — faint horizontal line pattern across the full viewport (subtle, never blocks interaction)

---

## Sections

| Fig | Section | Content |
|---|---|---|
| Hero | Signature name + domain callouts | Animated SVG leader lines on load |
| FIG. 01 | About | First-person bio + education/focus/leadership/languages quick facts |
| FIG. 02 | Skills | 6 grouped clusters with RPG stat bars |
| FIG. 03.1–03.3 | Projects | Software & AI, Game Dev, College & Hackathon clusters |
| FIG. 04 | Achievements | Vertical timeline with medal emojis |
| FIG. 05 | Beyond the Code | Content pipeline, Gumroad preset, 3D modeling |
| FIG. 06 | Contact | Email, handles, closing note |
| FIG. 07 | Blog (Writes) | Markdown-powered blog, powered by Supabase |

---

## Blog Setup (Supabase)

The blog uses [Supabase](https://supabase.com) as a free database backend. Here's how to set it up:

### 1. Create a Supabase project
Go to https://supabase.com → Sign up (free) → Create a new project.

### 2. Run the SQL to create the `posts` table
Copy and paste this into the Supabase **SQL Editor**:

```sql
create table posts (
  id bigint primary key generated always as identity,
  slug text unique not null,
  title text not null,
  date_published text,
  excerpt text,
  tags text[],
  content_markdown text not null,
  content_html text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts enable row level security;

create policy "Public posts are viewable by everyone"
  on posts for select using (true);

create policy "Admin can insert posts"
  on posts for insert with check (true);

create policy "Admin can update posts"
  on posts for update using (true);

create policy "Admin can delete posts"
  on posts for delete using (true);
```

### 3. Set environment variables
Create a `.env` file in the project root:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-secure-password
```
> ⚠️ Commit only `.env.example`, never the actual `.env`.

### 4. Write your first blog post
Visit `https://your-domain.com/admin` → enter password → write and publish!

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Build

```bash
npm run build
```

Output goes to `dist/` — ready for Vercel, Netlify, or GitHub Pages deployment.

---

## Accessibility

- `prefers-reduced-motion` respected — all animations disabled
- Full keyboard navigation with terracotta focus outlines
- Semantic HTML throughout (`<section>`, `<nav>`, `<main>`)
