# SeoulScene · 서울씬

A Korean drama discovery journal built with Next.js 16 App Router, TypeScript, Tailwind CSS, and SQLite. The original starter had no Prisma schema, API integration, or synchronization service, so this implementation uses the installed SQLite driver directly and preserves the existing Prisma packages.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build && npm start`.

## What works

- Editorial homepage with original Korean vector artwork and an AI-generated landscape
- Seven real TMDB-sourced dramas with locally cached posters, backdrops, and cast portraits
- Search in English/Korean, genre/year/status filters, sorting, and load more
- Drama detail pages with cast, gallery, related stories, and verified external trailer/episode guides
- Browser-local watchlists, persistent theme selection, and responsive mobile navigation
- Actors, Korean culture, calendar, about, credits, and privacy pages
- Accessible focus states, skip navigation, reduced-motion support, and image fallbacks

## Data

The first server render seeds `.data/seoulscene.sqlite` from `lib/catalog.json` without overwriting existing records. `.data` is ignored by Git and must live on persistent writable storage in production. Public metadata is stored server-side; personal watchlists stay in browser local storage.

The included collection is curated, not a live trending feed. No future episode dates or ratings are invented. The calendar shows honest empty states until appropriate metadata exists. Trailers and detailed episode guides link to TMDB rather than embedding unavailable media.

To refresh the curated titles from TMDB, create a local `.env` containing `TMDB_READ_ACCESS_TOKEN=your_read_access_token`, then run:

```sh
npm run sync
npm run build
```

The sync fetches every title before writing all updates in one SQLite transaction. Network errors and invalid responses leave existing records unchanged. The sync only refreshes the seven curated IDs; add licensed, verified entries to the collection to expand it. Rebuild/restart after syncing because pages are prerendered. No credentials ship to the browser.

## Checks

```sh
npm test
npm run lint
npx tsc --noEmit
npm run build
```

## Assets & credits

See `/credits` for TMDB attribution and Google Fonts. The approved TMDB logo is cached locally. All poster/backdrop/portrait sources are TMDB; artwork remains the property of the respective rights holders. No streaming video is hosted.

Original decorative SVGs live in `components/art.tsx`. The AI-generated panorama is `public/images/korean-landscape.png` (original) and `public/images/korean-landscape.webp` (web version), produced with the built-in OpenAI image generation tool. Prompt: “Premium Korean minhwa-inspired panoramic landscape on warm ivory hanji paper; layered sage/jade mountains, fine ink lines, burgundy plum blossom branch at left, traditional hanok pavilion at right, pink sun and outlined Korean clouds; spacious center; no text or watermark.”

Fonts are hosted locally with their open font licenses. A compact Korean subset covers the included copy, with the complete Korean font as a fallback for future metadata. No analytics, contact backend, newsletter service, authentication, or separate backend framework is included.
