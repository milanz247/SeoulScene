import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { filterDramas, dramas } from "../lib/dramas.ts";
assert(dramas.length >= 7);
assert.equal(filterDramas(dramas, "queen")[0].id, 215720);
assert.equal(filterDramas(dramas, "눈물")[0].id, 215720);
assert(
  filterDramas(dramas, "", "Fantasy").every((d) =>
    d.genres.includes("Fantasy"),
  ),
);
assert(filterDramas(dramas, "", "", "2024").every((d) => d.year === 2024));
assert.equal(filterDramas(dramas, "", "", "", "Planned").length, 0);
assert.equal(filterDramas(dramas, "no such story").length, 0);
const sorted = filterDramas(dramas, "", "", "", "", "title");
assert.deepEqual(
  sorted.map((d) => d.title),
  dramas.map((d) => d.title).sort((a, b) => a.localeCompare(b)),
);
for (const d of dramas) {
  assert(Number.isSafeInteger(d.id));
  assert(d.episodes > 0);
  for (const asset of [
    d.poster,
    d.backdrop,
    ...d.cast.map((p) => p.portrait),
  ]) {
    assert(existsSync(`public${asset}`), asset);
    const data = readFileSync(`public${asset}`);
    assert(data.length > 1000, asset);
    assert.equal(data[0], 255, `${asset} must be a real JPEG`);
  }
}
console.log(
  `Catalog checks passed: ${dramas.length} titles, filters, Korean search, sort order, and local imagery.`,
);

const { articles, visibleArticles, articlePath, readingMinutes } =
  await import("../lib/editorial.ts");
const { slugify } = await import("../lib/slug.ts");
const { dramaSlug, findDrama } = await import("../lib/dramas.ts");
const { getPeople } = await import("../lib/people.ts");
const { normalizeTmdb, normalizeTvmaze } =
  await import("../lib/providers/normalize.ts");
const { providerId, safeImage } =
  await import("../lib/providers/drama-provider.ts");
const recentDramas = JSON.parse(readFileSync("lib/recent-dramas.json", "utf8"));
assert.equal(recentDramas.length, 200);
assert.equal(new Set(recentDramas.map((d: { id: number }) => d.id)).size, 200);
for (const year of [2025, 2026])
  assert.equal(
    recentDramas.filter((d: { year: number }) => d.year === year).length,
    100,
  );
for (const drama of recentDramas) {
  assert(drama.id < 0 && drama.overview && drama.premiereDate);
  assert(new URL(drama.sourceUrl).hostname === "www.tvmaze.com");
  assert(drama.episodeGuide.length === drama.episodes);
  for (const image of [
    drama.poster,
    drama.backdrop,
    ...drama.cast.map((p: { portrait: string }) => p.portrait),
  ])
    assert(existsSync(`public${image}`), image);
}
const allRecent = [...dramas, ...recentDramas];
assert.equal(filterDramas(allRecent, "", "", "2026").length, 100);
const latest = filterDramas(allRecent, "", "", "", "", "latest");
const dates = latest.map((d) => d.premiereDate || `${d.year}-01-01`);
assert.deepEqual(dates, [...dates].sort().reverse());
console.log(
  "Recent catalog checks passed: 200 unique source-linked dramas, year filters, episode guides and local artwork.",
);
const now = new Date("2026-11-17T12:00:00Z");
const sample = { ...articles[0], publishedAt: "2026-11-17T00:00:00Z" };
assert.deepEqual(
  visibleArticles(
    [
      { ...sample, slug: "draft", state: "draft" },
      { ...sample, slug: "archived", state: "archived" },
      {
        ...sample,
        slug: "future",
        state: "scheduled",
        publishedAt: "2027-01-01T00:00:00Z",
      },
      { ...sample, slug: "arrived", state: "scheduled" },
      { ...sample, slug: "invalid", publishedAt: "invalid" },
    ],
    now,
  ).map((a) => a.slug),
  ["arrived"],
);
assert.equal(
  new Set(articles.map((a) => articlePath(a))).size,
  articles.length,
);
for (const article of articles) {
  assert(article.blocks.length > 0);
  assert(readingMinutes(article) >= 1);
  assert(existsSync(`public${article.image.src}`), article.image.src);
  if (article.kind === "review" && article.dramaId) {
    assert.equal(
      article.image.src,
      dramas.find((d) => d.id === article.dramaId)?.backdrop,
    );
    assert(article.image.credit?.includes("TMDB"));
  }
  if (article.dramaId)
    assert([...dramas, ...recentDramas].some((d) => d.id === article.dramaId));
  if (article.kind === "news")
    assert(article.sources?.every((s) => new URL(s.url).protocol === "https:"));
}
assert.equal(slugify("Kim Tae-ri"), "kim-tae-ri");
for (const drama of dramas) {
  assert.equal(findDrama(dramas, dramaSlug(drama))?.id, drama.id);
  assert.equal(findDrama(dramas, String(drama.id))?.id, drama.id);
}
assert.equal(findDrama(dramas, "not-a-drama"), undefined);
const importedPeople = getPeople(allRecent);
assert.equal(
  new Set(importedPeople.map((p) => p.slug)).size,
  importedPeople.length,
);
for (const drama of recentDramas) {
  assert.equal(findDrama(allRecent, dramaSlug(drama))?.id, drama.id);
  assert.equal(findDrama(allRecent, String(drama.id))?.id, drama.id);
}
const people = getPeople(dramas);
assert.equal(new Set(people.map((p) => p.slug)).size, people.length);
assert(people.every((p) => p.appearances.length > 0));
assert.throws(() => providerId(-1));
assert.throws(() => providerId(1.1));
assert.equal(
  safeImage("https://evil.example/photo.jpg", "static.tvmaze.com"),
  undefined,
);
assert.equal(safeImage("javascript:alert(1)", "static.tvmaze.com"), undefined);
const tmdb = normalizeTmdb(
  {
    id: 1,
    name: "Verified title",
    genres: [{ name: "Drama" }],
    poster_path: "/abc.jpg",
    first_air_date: "2024-01-01",
    vote_average: 0,
    vote_count: 0,
  },
  1,
);
assert.equal(tmdb.poster, "https://image.tmdb.org/t/p/w500/abc.jpg");
assert.equal(tmdb.rating, undefined);
assert.throws(() => normalizeTmdb({ id: 2, name: "Mismatch", genres: [] }, 1));
assert.throws(() =>
  normalizeTmdb({ id: 1, name: "Bad genre", genres: [null] }, 1),
);
const tvmaze = normalizeTvmaze(
  {
    id: 7,
    name: "Verified show",
    genres: ["Drama"],
    summary: "<p>Hello &amp; goodbye</p>",
    image: { original: "https://evil.example/image.jpg" },
    rating: { average: 8 },
  },
  7,
);
assert.equal(tvmaze.provider, "tvmaze");
assert.equal(tvmaze.overview, "Hello & goodbye");
assert.equal(tvmaze.poster, undefined);
assert.equal(tvmaze.rating, 8);
assert.throws(() => normalizeTvmaze({ id: 7, name: "Bad", genres: [42] }, 7));
console.log(
  `Editorial checks passed: publishing states, ${articles.length} article routes, drama aliases, ${people.length} actor profiles, provider IDs, normalization and image host validation.`,
);
const { mergeManualDramas } = await import("../lib/dramas.ts");
const manual = { ...dramas[0], id: -1, title: "Manual test fixture" };
assert(mergeManualDramas(dramas, [manual]).some((d) => d.id === -1));
assert.equal(findDrama([manual], dramaSlug(manual))?.id, -1);
assert.throws(() => mergeManualDramas(dramas, [manual, manual]));
assert.throws(() =>
  mergeManualDramas(dramas, [{ ...manual, id: dramas[0].id }]),
);
console.log(
  "Manual catalog checks passed: stable local IDs, aliases, and duplicate rejection.",
);
const { dramaSource } = await import("../lib/dramas.ts");
assert.equal(dramaSource(manual), undefined);
assert.equal(
  dramaSource({ ...manual, sourceUrl: "javascript:alert(1)" }),
  undefined,
);
assert.equal(
  dramaSource({ ...manual, sourceUrl: "https://example.com/verified-record" }),
  "https://example.com/verified-record",
);
assert.equal(
  dramaSource(dramas[0]),
  `https://www.themoviedb.org/tv/${dramas[0].id}`,
);
for (const match of readFileSync("public/fonts/fonts.css", "utf8").matchAll(
  /url\(["']?(\/fonts\/[^)"']+)["']?\)/g,
)) {
  assert(existsSync(`public${match[1]}`), `Missing local font ${match[1]}`);
  if (match[1].endsWith(".woff2"))
    assert.equal(
      readFileSync(`public${match[1]}`).subarray(0, 4).toString(),
      "wOF2",
    );
}
console.log(
  "Font delivery checks passed: referenced local fonts exist and WOFF2 signatures are valid.",
);
assert.equal(
  normalizeTmdb(
    {
      id: 1,
      name: "Verified zero score",
      genres: [],
      vote_average: 0,
      vote_count: 1,
    },
    1,
  ).rating,
  0,
);
