# RSIC Website — Per-Page Rebuild Prompts

> Working roadmap for rebuilding the RSIC site page-by-page. The **Shared
> foundations** section is applied globally; the numbered sections are the
> per-page targets we work through incrementally.

## Shared foundations (apply to every page below)

- **Stack:** TanStack Start v1 + React 19 + Vite 7 + Tailwind v4 + shadcn/ui + Lovable Cloud. Edge target.
- **Brand:** primary `#077a75`, accent `#ca943f`; semantic tokens only (no hardcoded colors).
- **Bilingual:** Arabic (RTL) + English (LTR) via `useI18n()` from `src/lib/i18n.tsx`; language toggle in header, persisted.
- **English casing rule:** every heading, subheading, nav item, card title, KPI label, phase name, section eyebrow in Title Case. Body prose stays sentence case.
- **Terminology:** always "shareholders / مساهمين" — never "investors".
- **Contact phone everywhere:** `+249 112 560 828`.
- **SEO per route:** unique `head()` with title, description, og:title/description, canonical. `og:image` only on leaves with a real hero. Single H1, semantic HTML, alt text.
- **Route hygiene:** every route with a loader has `errorComponent` + `notFoundComponent`; root has `notFoundComponent`.

---

## 1) `/` — Home (`src/routes/index.tsx`)

Build the landing page for the Rural Social Industrial Complexes (RSIC).

- Hero: eyebrow `A Sudanese National Initiative`, H1 `A Community-Led Industrial Renaissance, From The Countryside To The Nation`, short lede, primary CTA to `/donate`, secondary to `/about`. Warm-earth institutional aesthetic, not "AI purple".
- Section: H2 `A Defining Historical Moment To Rebuild Sudan` with supporting paragraph.
- Section: H2 `Six Pillars That Build An Integrated, Self-Sufficient Complex` — 6 cards, bilingual titles/summaries pulled from `src/lib/site.ts`.
- Section: H2 `Six National Goals Driving The Transformation` — 6 goal cards.
- Section: H2 `A Nation-Scale Project, Not A Sector Project` — closing narrative + CTA.
- All copy sourced from `i18n.tsx` / `site.ts`. Language toggle flips every string.

---

## 2) `/about` — About (`src/routes/about.tsx`)

Explain the initiative's origin, thesis, and scope.

- Page banner via `PageHeader` (eyebrow / title / description).
- Sections: The problem, the thesis, the model in one paragraph, who this is for (shareholders, communities, partners).
- Fully bilingual through `i18n.tsx`. Titles in Title Case (EN), Arabic natural.

---

## 3) `/projects` — Model & Factories (`src/routes/projects.tsx`)

Detail the six pillars as production units.

- Grid of six factory/unit cards with icon, bilingual name, one-line role, KPI chip.
- Detail block per pillar: inputs, outputs, community linkage.
- Must render in English too — no untranslated Arabic strings when `lang === 'en'`.

---

## 4) `/impact` — National Goals (`src/routes/impact.tsx`)

Show the six national goals with measurable outcomes.

- Counter tiles (`components/motion/Counter.tsx`) with Arabic-Indic digits in `ar-EG` locale and ASCII digits in `en-US`.
- Each goal: Title Case EN label, Arabic label, short paragraph, target metric.

---

## 5) `/governance` — Governance & Funding (`src/routes/governance.tsx`)

Community-ownership model + blended finance.

- `PageHeader` with eyebrow / title / description from `i18n`.
- Entity section — Arabic body must be exactly:
  > "تدمج بين مبادئ الشركات الخاصة (الربحية و الكفاءة ) و مبادئ المنظمات الغير ربحية (التركيز على مصلحة المجتمع و العدالة في التوزيع)، لتكون أفضل وسيلة قانونية لتمكين المجتمعات من امتلاك القوة المالية بطريقة مؤسسية مستدامة."
- Three member cards.
- Two-column block: Community Council + Profit Distribution (ordered list of 3 items).
- Blended-Finance section closes the page.

---

## 6) `/donate` — Nafeer-Style Catalog (`src/routes/donate.tsx`)

Contribution catalog + tier ladder.

- `CatalogHero` shows totals: must render `$0` raised and `0%` progress (baseline `received_usd = 0` in `src/lib/poc-fallback.json`).
- `CatalogFilters` (category, tier, price band).
- `CatalogCard` grid from `src/lib/catalog.ts`:
  - "جناح مصنع باسمك" card uses `src/assets/catalog/named-wing.png` (brass plaque on white wall).
  - Co-founder tier card uses `src/assets/catalog/cofounder.png` (boardroom photo).
- `TierLadder` + `BackDrawer` for the pledge flow.
- All item names bilingual via `pickName(item, lang)`.

---

## 7) `/poc` — Real-Time PoC Dashboard (`src/routes/poc.tsx` + `poc.index.tsx`)

Transparency dashboard for the pilot complex.

- Data source: Google Sheets → falls back to `src/lib/poc-fallback.json`; all records carry `name_ar/name_en` and `title_ar/title_en`; render via `pickName` / `pickTitle`.
- Components: `Complex3D` (bilingual unit labels), `KpiStrip` (Funding %, Progress %, Schedule, Docs — labels + subs from `i18n`), `MilestonesPanel`, `TimelinePanel` (Planned vs Actual legend from `i18n`), `FundingPanel` (grouped by category), `DocumentsPanel`, `UnitDetailDrawer`, `WorkPackageFilters`, `GlobalIndicesStrip`.
- Oasis Lens sub-dashboard: `SudanMap` (from `src/lib/geo/sudan-states.json` + `oasis-data.ts`), `RoadmapSidebar`, `StateDetailDrawer`, `TasksPanel`.
- Numbers formatted `ar-EG` in Arabic, `en-US` in English.
- Every dashboard string must switch languages — no Arabic-only leaks.

---

## 8) `/blog` — Blog Index (`src/routes/blog.tsx` + `blog.index.tsx`)

Three-part editorial hub: News, Articles, Reports.

- Tabs/segments per type, sourced from `src/lib/content.ts` (bilingual `title_ar/en`, `body_ar/en`).
- Card grid with cover, type badge, date, reading time, metric chips (views/likes/comments from `src/lib/metrics.ts`, localStorage-backed).
- Sidebar for related content.
- Both AR and EN listings must fully populate.

---

## 9) `/blog/news/$id` and `/blog/articles/$id` — Post Detail

Dynamic post pages.

- `PostDetail.tsx` renders bilingual body; falls back gracefully if a translation is missing.
- `MetricChips` at top; `CommentsSection` at bottom.
- News post `n2` uses `src/assets/blog/n2.png` (microscope + gear render) as its cover.
- `head()` derives title / description / og:image from the post's language-picked fields.

---

## 10) `/contact` — Contact (`src/routes/contact.tsx`)

Contact info + inbound form.

- Show phone `+249 112 560 828`, email, socials from `src/lib/site.ts`.
- Bilingual labels and validation messages via `i18n`.
- Form posts through a `createServerFn` (input-validated with Zod); success/error states localized.

---

## 11) `/auth` and `/_authenticated/admin*` — Auth & Admin

- Supabase auth via `@/integrations/supabase/client`; Google provider enabled by default.
- `_authenticated/route.tsx` gate redirects unauthenticated users to `/auth`.
- Admin posts CRUD backed by `posts.functions.ts` (`createServerFn` + `requireSupabaseAuth`); roles enforced through a separate `user_roles` table + `has_role()` SECURITY DEFINER.
- Admin UI bilingual.

---

## 12) Shared Chrome — Header / Footer / PageShell

- `Header`: logo (color on light, white on dark), nav items in Title Case EN, language toggle, mobile menu.
- `Footer`: org blurb, contact block (`+249 112 560 828`), social links, "shareholders" phrasing only.
- `PageShell` + `PageHeader`: consistent gradient banner overlay, eyebrow / title / description slot, respects RTL logical properties (`insetInlineStart`).
- `sitemap.xml.ts`, `robots.txt`, `llms.txt` present and current.
