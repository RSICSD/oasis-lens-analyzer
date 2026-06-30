# RSIC — Agent Guidelines

This project uses **Claude Code** for AI-assisted development.

## Conventions

- RTL-first: the UI is Arabic/RTL by default. All bilingual strings belong in `src/lib/site.ts` or `src/lib/content.ts`.
- Use `src/lib/supabase.ts` for all Supabase access — `supabase` for client-side, `createSupabaseServerClient` for server loaders.
- File-based routing via TanStack Router — add new pages under `src/routes/`.
- Components follow shadcn/ui patterns. Add new primitives to `src/components/ui/`.
- Tailwind CSS v4 — no `@apply` in component files; use utility classes directly.
- Avoid force-pushing or rewriting published git history.
