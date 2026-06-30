# RSIC — Oasis Lens Analyzer

Rural Social Industrial Complexes (RSIC) initiative website — bilingual (Arabic / English), RTL-first.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | TanStack Start v1 (SSR) + TanStack Router |
| UI | React 19, Tailwind CSS v4, Radix UI, shadcn/ui |
| 3D | Three.js / React Three Fiber |
| Backend | Supabase (Postgres + Auth + Storage) |
| Deploy | Vercel (Nitro `vercel` preset) |
| Package manager | npm (bun can be used locally if installed) |

## Local dev

```bash
cp .env.example .env.local   # fill in your Supabase keys
npm install
npm run dev
```

## Environment variables

See [.env.example](.env.example) for the full list. All public vars are prefixed `VITE_` so they are available in the browser.

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_POC_SHEET_CSV_URL` | Optional Google Sheets CSV for the PoC dashboard |

## Supabase

Browser client: `import { supabase } from '~/lib/supabase'`
Server client (SSR): `import { createSupabaseServerClient } from '~/lib/supabase'`

## Key directories

```
src/
  routes/          # TanStack file-based routes
  components/
    ui/            # shadcn/ui primitives
    layout/        # Header, Footer, PageShell
    poc/           # Project dashboard components
  lib/
    supabase.ts    # Supabase clients (browser + server)
    site.ts        # Site-wide constants and bilingual copy
    i18n.tsx       # Language context (ar / en)
```

## Deployment

Deployed to Vercel automatically on push to `main`. Nitro uses the `vercel` preset — no extra configuration needed. Add your Supabase env vars in the Vercel project settings.

## Language / RTL

The app is RTL-first (`<html lang="ar" dir="rtl">`). The `I18nProvider` in `__root.tsx` exposes a `useLang()` hook. Bilingual copy lives in `src/lib/site.ts` and `src/lib/content.ts`.
