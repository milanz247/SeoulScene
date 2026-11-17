# Content architecture and CMS decision

## Decision

Use typed, version-controlled editorial records first. Existing SQLite remains the drama cache; no schema migration, admin authentication or external publishing account is implied. Articles render structured blocks through React, never arbitrary HTML. Content changes are reviewed as source changes and published by rebuilding/deploying the application.

## Model

Articles support review, episode review, news, editorial feature and soundtrack categories; reusable author, category, tag and related-drama fields; title, description, slug, publication timestamp, SEO and rich blocks. Blocks support headings, paragraphs, lists, quotes, captioned images and authorized external media links. Review opinions and optional editorial scores are distinct from community ratings. No score is invented merely to fill a UI slot.

Workflow states: draft, scheduled, published, archived. Only published records or scheduled records whose publication time has arrived may appear in listings, detail pages, metadata or sitemap. Featured is a separate flag. Preview/admin UI is not implemented. The cached server reader evaluates publication time and revalidates on the Next.js hours profile (one-hour revalidation). Scheduled items become eligible after cache revalidation on a request; exact-time publication requires an external scheduled rebuild/revalidation job. No background scheduler is installed.

Actor pages derive their verified names and collection appearances from existing cast records; filmographies are explicitly limited to this collection. Biographies and Korean names remain absent unless verified. Upcoming listings use source status/date fields and honest empty states.

## CMS next step (not integrated)

A hosted structured CMS such as Sanity is a reasonable option when multiple editors need login, revision history and a rich editing UI. Before integration, choose account ownership, budget, media licensing workflow, roles and webhook authentication. Keep the rendering model/provider boundary stable; add an adapter and signed revalidation webhook instead of coupling page JSX to the vendor.

Newsletter: configure an HTTPS signup URL from a real email provider to enable subscription. Without one, show an honest not-open-yet state, collect no address and store no personal data. Never simulate successful subscription.

Manual drama records live in `lib/manual-dramas.ts` with unique negative integer IDs. They merge with the existing SQLite catalog for page reads and stay outside the seven-title TMDB synchronization seed. Duplicate/nonlocal manual IDs fail explicitly; no manual sample is presented as a real drama.

With Next.js Cache Components enabled, an unknown slug may receive a streamed HTTP 200 followed by the not-found UI and a `noindex` directive, as documented by Next.js. Tests verify the rendered not-found/robots behavior. A strict pre-stream 404 gateway is not installed; drafts/future articles still never render their content or enter the sitemap.
