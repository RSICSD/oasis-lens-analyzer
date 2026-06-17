
# RSIC Website — Build Plan

## Important stack note (read first)

Your brief specifies **Next.js 15 App Router**. This Lovable project runs on **TanStack Start (React 19 + Vite 7 + Tailwind v4)** — Lovable does not support Next.js. The good news: every architectural requirement in your brief maps cleanly onto this stack with no loss of capability.

| Your brief | What we'll use here | Same outcome? |
|---|---|---|
| Next.js 15 App Router (SSR) | TanStack Start file-based routing + SSR | ✅ |
| Tailwind CSS v4 | Tailwind v4 (already configured) | ✅ |
| Headless CMS (Sanity/Strapi) | **Sanity** (Lovable has a first-class connector) | ✅ |
| Type-safe, modular | TypeScript strict, `src/lib`, `src/components`, `src/routes` | ✅ |
| Secure forms, validation | Zod + TanStack server functions | ✅ |
| Image optimization, lazy loading | Native `loading="lazy"`, AVIF/WebP via Sanity image pipeline | ✅ |
| Donation flow with payments | **Stripe** via Lovable's built-in payments (test → live) | ✅ |
| SEO best practices, RTL Arabic | Per-route `head()`, JSON-LD, `dir="rtl"`, Arabic fonts | ✅ |
| Deploy to Vercel | Published on Lovable's edge runtime (Cloudflare Workers) | ✅ (equivalent) |

If Next.js is a hard requirement for you (e.g. you want to take the code to Vercel), Lovable is not the right tool and we should stop here. Otherwise this plan delivers an equivalent production-ready Arabic RTL site.

---

## Goals

1. Production-ready, fully Arabic (RTL) website for the **Rural Social Industrial Complexes (RSIC)** initiative.
2. Content managed in Sanity so non-developers can update copy, projects, team, blog, and impact figures without touching code.
3. Secure donation flow with test + live modes.
4. Modern, trustworthy "industrial growth" aesthetic distinct from the source site.

---

## Site map & routes

```text
/                       الرئيسية (Home)
/about                  عن المشروع (About RSIC)
/story                  قصتنا (Our Story)
/projects               مشاريعنا الخيرية (Projects index)
/projects/$slug         تفاصيل المشروع (Project detail)
/impact                 الأثر المتوقع (Expected Impact)
/governance             الحوكمة والتمويل (Governance & Funding)
/blog                   المدونة / الأخبار (Blog index)
/blog/$slug             مقال (Article detail)
/contact                تواصل معنا (Contact)
/donate                 صفحة التبرع (Donation landing)
/donate/checkout        Stripe Checkout redirect
/donate/success         شكراً لك (Thank-you page)
/sitemap.xml            Dynamic sitemap (server route)
/api/public/stripe-webhook   Stripe webhook (verified)
```

Each route has its own `head()` with unique Arabic `title`, `description`, `og:title`, `og:description`, and (where a hero image exists) `og:image`. Root holds sitewide defaults + Organization JSON-LD.

---

## Content model (Sanity)

Schemas to define in Sanity Studio:

- **siteSettings** (singleton): org name, tagline, logo, social, phone, email, donation CTA copy, footer content.
- **project**: title, slug, summary, body (Portable Text), hero image, gallery, status (planning / active / completed), category (agriculture / industry / knowledge / infrastructure), location, progress %, funding goal, funded amount, KPIs.
- **post** (blog/news): title, slug, excerpt, body, hero image, author ref, publishedAt, tags.
- **author**: name, role, photo, bio.
- **impactMetric**: label, value, unit, icon, scope (local/national/ummah).
- **teamMember**: name, role, photo, bio.
- **faq**: question, answer, category.
- **pillar** (the 4 strategic pillars): title, description, icon, order.

All schemas typed in `src/lib/sanity/types.ts` — no `any`.

---

## Page composition

**Home** — hero with mission statement + primary donate CTA, 4 strategic pillars, featured projects (3), impact counters (animated on scroll), testimonials/partners, latest news (3), final donate CTA + newsletter.

**Projects index** — filterable grid (category, status), card with progress bar, funded/goal amounts. Project detail page: hero, KPIs, body, gallery, "Donate to this project" CTA that pre-selects the project on `/donate`.

**Donate page** — preset amounts (EGP/USD toggle), custom amount, optional project selector, one-time / monthly toggle, donor name/email/phone (Zod-validated), proceed to Stripe Checkout.

**Blog** — paginated index, tag filter, article detail with TOC, related posts, share buttons.

**Impact** — 3-column layout: Economic / Social / Geographic, animated counters, source citations.

**Governance** — org chart, blended-finance diagram, community return model, downloadable PDF reports.

**Contact** — form (Zod + server function + email via Resend connector or similar), map, phone, email, office hours.

---

## Design direction

Distinct from Palm Oasis. Industrial-growth aesthetic:

- **Palette**: deep forest green `#1B4332` (primary), warm terracotta `#C7522A` (CTAs/accent), warm sand `#F4E9D8` (surfaces), graphite `#1A1A1A` (text), success gold `#D4A574` (impact metrics). Defined as semantic tokens in `src/styles.css`.
- **Typography**: **Tajawal** for body (highly readable Arabic), **IBM Plex Sans Arabic** for display headings. Loaded via `<link>` in `__root.tsx` (Tailwind v4 doesn't allow remote `@import` in CSS).
- **Layout language**: asymmetric grids, generous negative space, thick dividers, numbered section markers in Arabic-Indic digits, subtle grain texture on dark surfaces.
- **Motion**: Motion for React — scroll-triggered counter animations on Impact section, soft fade-up on project cards, sticky donate CTA appearing after hero scrolls out.
- **RTL**: `dir="rtl"` on `<html>`, all flex/grid orderings mirror correctly, icons that imply direction (arrows) flipped.

---

## Technical architecture

**Stack**
- TanStack Start (React 19, Vite 7, file-based routing in `src/routes/`)
- Tailwind v4 (CSS-first config in `src/styles.css`, `@theme` tokens)
- Sanity (`@sanity/client` + `@sanity/image-url`) — connected via the Lovable Sanity connector
- TanStack Query for data fetching (loader → `ensureQueryData` → `useSuspenseQuery`)
- Stripe via Lovable's built-in payments (`enable_stripe_payments`)
- Zod for all input validation (forms + server function input validators)
- Motion for React for animations

**Folder layout**
```text
src/
  routes/                  # file-based routes
    api/public/            # Stripe webhook
  components/
    layout/                # Header, Footer, MobileNav, StickyDonate
    home/                  # Hero, Pillars, FeaturedProjects, ImpactCounters
    projects/              # ProjectCard, ProjectGrid, ProgressBar
    donate/                # AmountPicker, DonorForm, ProjectSelector
    ui/                    # shadcn primitives (already present)
  lib/
    sanity/                # client, queries, types, image builder
    stripe/                # checkout session creation (server fn)
    validation/            # zod schemas
  styles.css               # @theme tokens, fonts, custom utilities
```

**Data flow**
- Sanity reads happen client-side via `@sanity/client` with `useCdn: true` for cacheable public content.
- Donation checkout: client submits validated form → TanStack server function creates Stripe Checkout Session → redirect.
- Webhook at `/api/public/stripe-webhook` verifies signature, records donation in Lovable Cloud, sends receipt email.

**Security**
- All forms validated with Zod on client AND inside server function `inputValidator`.
- Webhook signature verified with `timingSafeEqual`.
- No service-role keys in browser. Sanity reads use public dataset; writes (if any) go through server functions.
- Donor PII stored only in Lovable Cloud with RLS; never returned to anonymous clients.

**Performance**
- Sanity image URLs with `width/quality/auto('format')` per breakpoint.
- Route-level code splitting (automatic with TanStack Router).
- `loading="lazy"` on all below-fold images.
- Fonts preloaded via `<link rel="preload">` in root head.

**SEO**
- Per-route `head()` with unique Arabic metadata.
- Dynamic `sitemap.xml` server route pulling project + post slugs from Sanity.
- `robots.txt` allowing all.
- JSON-LD: Organization (root), Article (blog), BreadcrumbList (deep routes), FAQPage (where applicable).
- `<html lang="ar" dir="rtl">`.

---

## Build phases

1. **Foundation** — Tailwind tokens, Arabic fonts, RTL setup, root layout, header/footer shell, design-system tokens. Placeholder home page.
2. **Sanity wiring** — connect Sanity MCP, define schemas, seed sample content (3 projects, 2 posts, 4 pillars, 6 impact metrics, team).
3. **Static pages** — Home, About, Story, Impact, Governance, Contact (with form).
4. **Dynamic content** — Projects index + detail, Blog index + detail, dynamic sitemap.
5. **Donation flow** — enable Stripe payments, donate page, checkout server function, webhook, success page, donor records in Lovable Cloud.
6. **Polish** — animations, sticky donate bar, accessibility audit (contrast, keyboard nav, ARIA in RTL), Lighthouse pass, OG image generation.

I'll execute phases 1–2 first and check in before continuing, since Sanity schema decisions and the visual direction set the shape of everything after.

---

## Things I need from you before building

1. **Confirm the Next.js → TanStack Start substitution is acceptable.** If not, stop here.
2. **Logo + brand assets** (or approval to design a wordmark).
3. **Real copy for the homepage hero and "About"** (Arabic) — or approval to write placeholder Arabic copy you'll replace later.
4. **Stripe seller country** + whether donations are EGP, USD, or both.
5. **Approval to enable** the Sanity connector and Lovable's Stripe payments when we reach those phases (each triggers a one-time consent prompt).
