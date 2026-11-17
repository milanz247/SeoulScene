# Development roadmap

## Phase 1 — Audit and resource research

Audit, design decisions, content architecture, API research and licensing resources documented before implementation. Existing working code and data are retained.

## Implementation scope

- Extend the established component and image system.
- Add drama listing/slugs, actor profiles, reviews, news, upcoming and curated recommendations.
- Add original editorial writing, source-linked news briefs, honest metadata gaps, publishing-state filtering and an optional real newsletter signup destination.
- Add server-only provider adapters without changing the existing synchronization pipeline.
- Add canonical/social metadata, sitemap/robots, organization/article/breadcrumb structured data and local development-safe configuration.

## External setup required for launch

Set SITE_URL to the real HTTPS origin; approve commercial metadata/image rights; configure TMDB_READ_ACCESS_TOKEN for explicit TMDB provider calls; optionally supply NEWSLETTER_SIGNUP_URL from the selected email provider. No external CMS or mail service is silently provisioned. Deployment must preserve writable SQLite storage and rebuild after catalog/content updates.

## Not claimed as implemented

Multi-user CMS/admin roles, automatic scheduled publication, provider ingestion UI, verified ratings written by humans, original actor biographies, unsourced upcoming dates, a live popularity feed, full filmographies and newsletter delivery infrastructure.

## Final verification

Passed in this implementation pass:

- ESLint and strict TypeScript (`npx tsc --noEmit`).
- `npm test`: existing catalog/sync safety checks plus publication-state filtering, article path uniqueness, readable/numeric drama aliases, 34 actor profiles, manual ID/source isolation, provider normalization and image-host validation.
- Production build: 80 pages generated; App Router, Cache Components and partial prerendering retained. No static export.
- Browser: 60 sitemap URLs, 69 internal paths, 66 representative route/theme/viewport combinations at 1440/768/375px; no horizontal overflow, broken loaded images, client exceptions or axe violations on the audited pages.
- Search/sort, watchlist persistence, keyboard menu/Escape, canonical aliases, social image, reduced motion and not-found/noindex behavior.
- Updated homepage, article and actor screenshots at all three widths. No mobile/desktop redesign was necessary.

Lighthouse lab reports are recorded below after the final font-delivery run. Scores are local single-run measurements, not a field-performance guarantee. No credentialed live-provider calls, Safari or physical-device performance tests were performed.

### Final Lighthouse measurements

Production homepage, local Chromium lab run, 2026-11-17:

| Mode | Performance | Accessibility | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Mobile simulated throttling | 82 | 100 | 100 | 4.5 s | 120 ms | 0 |
| Desktop | 99 | 100 | 100 | 0.9 s | 0 ms | 0.004 |

The earlier expanded-platform mobile run scored 72 with the unrestricted complete Korean fallback; after script scoping, the intermediate score was 83. The final run adds lossless Latin WOFF2 and accurate hero sizes; single-run scores fluctuate. Do not treat 82 vs 83 as a statistically established change. The final network smoke test confirms current home/article/actor pages do not request the full Korean fallback and verifies real article-share URL copying.

Remaining performance work: mobile LCP under throttling (4.5 s), modest image-delivery savings and framework JavaScript noted by Lighthouse. Physical-device/field measurements are required before claiming mobile performance targets are met. Font conversion preserves glyph maps, naming/license metadata, metrics and layout tables.

Session review artifacts: `/tmp/seoulscene-platform/` contains homepage/article/actor screenshots at 1440, 768 and 375px, browser-results.json, font-delivery.json and Lighthouse HTML/JSON reports. QA dependencies were installed only in `/tmp/seoulscene-qa`, not added to the application. Lucide is the sole new application dependency requested by the design brief.

## Implementation file map

- Homepage and layout: `app/page.tsx`, `app/layout.tsx`, `app/editorial.css`; shared editorial pages/cards/source notes in `components/editorial.tsx` and sharing in `components/share-article.tsx`.
- Routes: `app/dramas/page.tsx`, retained `app/dramas/[id]/page.tsx` with slug aliases, `app/reviews/`, `app/news/`, `app/journal/`, `app/actors/[slug]/`, `app/upcoming/`, `app/recommendations/`. Existing actors, explore, calendar, culture and informational pages receive links/metadata rather than replacements.
- Images and icons: `components/editorial-image.tsx`, retained `components/ui.tsx` Photo/DramaCard/controls, `components/footer.tsx`, `lib/assets.ts`, `next.config.ts`; named Lucide imports replace hand-maintained control paths.
- Content and data: `lib/editorial.ts`, `lib/content.ts`, `lib/people.ts`, `lib/slug.ts`, `lib/manual-dramas.ts`, `lib/dramas.ts`, a manual-record merge in `lib/database.ts`, and `lib/providers/`. SQLite schema/configuration and `scripts/sync-tmdb.mjs` are unchanged.
- SEO: `lib/seo.ts`, `components/structured-data.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, page metadata.
- Delivery/setup: `public/fonts/fonts.css`, matching WOFF2 files (old TTF sources retained), `.env.example`, `.gitignore`, `README.md`, `scripts/check.ts`, `package.json`/lock for Lucide.
- Required documents: PROJECT-AUDIT.md, DESIGN-SYSTEM.md, IMAGE-AND-DESIGN-RESOURCES.md, CONTENT-ARCHITECTURE.md, API-INTEGRATION.md and this roadmap.

Earlier visual and motion refinements remain in the working tree; this extension preserves them. No commit, deployment, database migration, authentication replacement or external mailing-list provisioning was performed.
