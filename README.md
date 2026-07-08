# Pacharla Kumara Swamy — Profile · "Loam & Lumen"

A distinctive, dark-first personal profile for **Pacharla Kumara Swamy**, Software & Generative AI
Developer at Ajuserv IT Solutions, Hyderabad. Built with **React + TypeScript + Vite**.

## Design direction

**"Loam & Lumen"** — his story is *soil meeting silicon*: an agricultural upbringing turned
Generative-AI career. The page is a cinematic dark dossier where warm earth tones meet a restrained
luminous "AI" glow.

- **Palette:** warm espresso canvas, bone text, wheat-gold accent, a sparing jade "lumen" for
  AI/live signals.
- **Type:** Bricolage Grotesque (display) · Inter (body) · JetBrains Mono (data/labels).
- **Signature:** a hero canvas of luminous filaments that grow from a "soil line" up into circuit
  nodes — roots becoming circuitry (respects `prefers-reduced-motion`).
- **Highlights:** bento "at a glance" grid, scrolling tech marquee, magnetic portrait tilt,
  scroll-reveal, numbered chronological journey, light/dark toggle.

All content lives in **`src/data.ts`** — edit that one file to change text, contacts, family,
skills, or photos (photos are in `src/assets/`).

## Local development

```bash
npm install       # install deps (react, vite, typescript…)
npm run dev       # dev server → http://localhost:5173
npm run build     # typecheck + production build → dist/
npm run preview   # preview the production build
```

> In this monorepo the app also resolves dependencies from the parent `frontend/node_modules`, so
> `npm run build` works without a local install. For a standalone deploy, run `npm install` first.

## Deploy to Vercel

Set the **Root Directory** to `Kumar` when importing (this is a subfolder project).

**Dashboard:** Add New → Project → import repo → Root Directory: `Kumar` → Framework: **Vite** →
Build: `npm run build` → Output: `dist` → Deploy.

**CLI:**
```bash
cd Kumar
npm i -g vercel
vercel --prod
```

## Tech
React 18 · TypeScript 5 · Vite 5 · zero runtime deps beyond React · Google Fonts.
