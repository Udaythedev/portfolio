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
