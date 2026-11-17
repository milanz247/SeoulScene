# API integration

Research date: 2026-11-17. Public page rendering continues to use the local SQLite cache. No secrets enter client props.

## Providers

| Provider | Authentication / limits | Rights / reliability / integration |
| --- | --- | --- |
| [TMDB FAQ](https://developer.themoviedb.org/docs/faq), [limits](https://developer.themoviedb.org/docs/rate-limiting), [images](https://developer.themoviedb.org/docs/image-basics) | Server bearer token in TMDB_READ_ACCESS_TOKEN. Legacy fixed limit removed; protective limits around 40 requests/second may change. Respect 429 and avoid burst imports. | Noncommercial developer use requires approved logo and notice in credits; commercial use requires a separate agreement. Images remain subject to rights-holder restrictions. Community metadata may be incomplete. |
| [TVmaze API](https://www.tvmaze.com/api) | Public show endpoints need no key; user-level premium API is separate. Documentation describes at least 20 calls/10 seconds/IP; respect 429. Responses may be cached up to 60 minutes. | API output uses CC BY-SA; provide a source link and evaluate share-alike obligations. Image copyright is separate. Country schedules omit some global streaming episodes; do not interpret absence as cancellation. |
| Manual catalog | No API account. Curators supply verified records and source links. | Typed manual records merge through lib/manual-dramas.ts, using negative IDs that never enter the existing TMDB sync. Verify facts and image rights before publication. No new import/admin UI is implied. |

## Contract

`lib/providers/drama-provider.ts` defines a normalized, separately namespaced metadata result and explicit lookup interface. TMDB/TVmaze adapters validate remote payloads, timeout, return null for 404 and throw on other provider failures. Their HTTP URLs are fixed; user input is restricted to positive numeric IDs. Requests are server-only with a bounded timeout and cached through Next's server fetch. No automatic fuzzy matching or cross-provider ID substitution.

Metadata fields not supplied by a provider stay absent. No director, network, release date, cast biography or rating is guessed. TMDB genres are retained as supplied; TVmaze scores are not relabeled as TMDB scores. Remote HTML summaries are normalized to plain text before React rendering; never render provider HTML with dangerouslySetInnerHTML.

## Existing sync remains authoritative

`scripts/sync-tmdb.mjs` still performs an explicit all-or-nothing update of the seven curated IDs. Missing credentials, malformed payloads and failures leave existing records unchanged. No scraping added, no API endpoints changed, no database schema altered. Adapters are available for future explicit ingestion but are not silently called from every page.

## Operational setup

`.env.example` documents token, SITE_URL, and optional NEWSLETTER_SIGNUP_URL without real secrets. Use HTTPS SITE_URL in production; local development defaults to localhost rather than an invented public domain. Catalog or editorial changes require rebuild/restart on this prerendered app. Configure persistent writable `.data` storage. A managed CMS and signed webhook are future work, not an installed service.

Manual records can supply verified network, broadcast, director, source URL and rating-source fields. Local entries never inherit TMDB trailer links, TMDB source labels or a TMDB rating attribution. Non-HTTPS manual source URLs are not linked.
