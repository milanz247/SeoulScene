# SeoulScene project audit

Inspected 2026-11-17. This is an extension of the existing application, not a replacement.

## Existing foundation

- Next.js 16.4.6 App Router, React 19.3.0, TypeScript strict mode, Tailwind 4.3.3. No installed shadcn, Motion, GSAP, or CMS despite earlier stack descriptions. Installed Prisma packages have no schema or active integration.
- Routes: home, explore, numeric drama details, actors, calendar, culture, about, credits, privacy, watchlist, loading and not-found states.
- Seven curated TMDB-derived dramas in SQLite, seeded without overwriting records. Existing explicit sync uses a transaction and retains records on failed imports. No authentication, newsletter service, admin interface, or API route currently exists.
- English/Korean search, genre/year/status filters, sorting/load-more, browser-local watchlists and themes, accessible navigation, image fallbacks, locally hosted fonts, original SVG art, original generated Korean panorama.
- Existing `Photo`, `DramaCard`, `Explore`, `Nav`, `Footer` and illustration components are the reuse points. CSS and one Intersection Observer provide motion without a library.

## Findings and decisions before implementation

1. Editorial publishing routes, article model, actor profiles and SEO infrastructure are missing. Extend existing design and shared data; retain `/explore`, `/calendar` and numeric drama links.
2. No verified editorial ratings, director/network metadata, biographies, current trending feed, or upcoming dates exist. Omit unsupported facts. Label recommendations as curated, community ratings as TMDB ratings, and creative opinion as opinion.
3. Existing promotional photos have provenance, not a recorded commercial rights grant. Retain existing catalog functionality; do not download additional promotional photography. Commercial launch requires owner rights review (see resource document).
4. Existing motion/accessibility QA uncovered missing mobile watchlist naming, an overly delayed hero photo, a large fallback-font request, and tablet artwork crowding. Corrections preserve the existing design.
5. Use version-controlled structured content for the first publishing implementation. It permits rich blocks and reviewable changes with no invented external CMS credentials. A managed CMS remains a documented next step, not a claim of an installed editor.
6. Extend drama detail lookup to accept readable slugs without removing numeric URLs. Keep the existing SQLite schema and sync interface.
7. Reuse the image implementation. Semantic image roles should share it instead of six duplicate loaders. Introduce a small registry for original editorial art and track provenance separately from licensing approval.
8. Add a server-only provider contract for explicit TMDB/TVmaze lookups. Do not silently mix identifiers, mutate SQLite during page requests, or replace the tested synchronization service.

## Verification baseline

Previous UI work passed lint, TypeScript, catalog/sync tests, production build, responsive layouts, keyboard navigation and reduced motion. These are baselines, not proof that this expansion has passed; final checks are recorded in DEVELOPMENT-ROADMAP.md.
