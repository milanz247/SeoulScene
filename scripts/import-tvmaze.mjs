import assert from "node:assert/strict";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  renameSync,
} from "node:fs";
import { normalizeTvmaze } from "../lib/providers/normalize.ts";
import { stripMarkup } from "../lib/providers/drama-provider.ts";
import sharp from "sharp";

// Resume this catalog by default, or pass a public TVmaze index JSON file.
const seeds = JSON.parse(
  readFileSync(
    process.argv[2] || new URL("../lib/recent-dramas.json", import.meta.url),
    "utf8",
  ),
);
assert(Array.isArray(seeds), "Expected a TVmaze show index");
const input = seeds.map((seed) =>
  seed.id < 0
    ? {
        id: -seed.id,
        premiered: seed.premiereDate,
        image: seed.poster,
        summary: seed.overview,
        weight: 0,
      }
    : seed,
);
const cache = "/tmp/seoulscene-tvmaze-details";
mkdirSync(cache, { recursive: true });
mkdirSync("public/images/catalog", { recursive: true });
async function request(url) {
  const parsed = new URL(url);
  assert(
    parsed.protocol === "https:" &&
      ["api.tvmaze.com", "static.tvmaze.com"].includes(parsed.hostname),
    "Unexpected source host",
  );
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok)
        throw new Error(`${response.status}: ${parsed.pathname}`);
      return response;
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 3000 * (attempt + 1)));
    }
  }
}
const imageJobs = new Map();
function image(url, name, width) {
  if (!imageJobs.has(name))
    imageJobs.set(name, downloadImage(url, name, width));
  return imageJobs.get(name);
}
async function downloadImage(url, name, width) {
  const file = `public/images/catalog/${name}.webp`;
  if (!existsSync(file)) {
    const bytes = Buffer.from(await (await request(url)).arrayBuffer());
    await sharp(bytes)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(file + ".tmp");
    renameSync(file + ".tmp", file);
  }
  return "/" + file.slice("public/".length);
}
async function importShow(seed) {
  const file = `${cache}/${seed.id}.json`;
  const data = existsSync(file)
    ? JSON.parse(readFileSync(file, "utf8"))
    : await (
        await request(
          `https://api.tvmaze.com/shows/${seed.id}?embed[]=cast&embed[]=episodes&embed[]=images&embed[]=akas`,
        )
      ).json();
  if (!existsSync(file)) writeFileSync(file, JSON.stringify(data));
  const normalized = normalizeTvmaze(data, seed.id);
  assert(data.language === "Korean" && data.type === "Scripted");
  assert(
    [2025, 2026].includes(normalized.year) &&
      normalized.overview &&
      normalized.poster,
  );
  const embedded = data._embedded || {};
  const episodes = (embedded.episodes || []).filter(
    (e) => Number.isSafeInteger(e.number) && e.number > 0,
  );
  const gallery = embedded.images || [];
  const backdrop =
    gallery.find((i) => i.type === "background")?.resolutions?.original?.url ||
    normalized.poster;
  const posterPath = await image(normalized.poster, `${data.id}-poster`, 500);
  const backdropPath = await image(backdrop, `${data.id}-backdrop`, 1280);
  const cast = [];
  for (const entry of embedded.cast || []) {
    if (!entry.person?.name || !entry.character?.name) continue;
    const url = entry.person.image?.original;
    let portrait = "/images/fallback.svg";
    if (url) {
      try {
        portrait = await image(url, `person-${entry.person.id}`, 400);
      } catch {
        console.log("Portrait unavailable:", entry.person.name);
      }
    }
    cast.push({
      name: entry.person.name,
      character: entry.character.name,
      portrait,
      source: url || entry.person.url,
    });
  }
  const next = episodes.find((e) => e.airdate && e.airdate >= "2026-11-18");
  return {
    id: -data.id,
    title: normalized.title,
    korean: embedded.akas?.find((a) => /[가-힣]/.test(a.name))?.name || "",
    overview: normalized.overview,
    year: normalized.year,
    genres: normalized.genres.length ? normalized.genres : ["Drama"],
    episodes: episodes.length,
    status:
      data.premiered > "2026-11-18"
        ? "Planned"
        : data.status === "Ended"
          ? "Ended"
          : data.status === "In Development"
            ? "In Production"
            : "Returning Series",
    poster: posterPath,
    backdrop: backdropPath,
    cast,
    network: normalized.network,
    rating: normalized.rating,
    ratingSource: normalized.rating === undefined ? undefined : "TVmaze",
    sourceUrl: normalized.source,
    premiereDate: data.premiered,
    nextEpisode: next?.airdate,
    officialSite: data.officialSite,
    broadcast: [
      normalized.network,
      data.schedule.days.join(", "),
      data.schedule.time,
    ]
      .filter(Boolean)
      .join(" · "),
    episodeGuide: episodes.map((e) => ({
      season: e.season,
      number: e.number,
      title: e.name,
      airdate: e.airdate || undefined,
      summary: stripMarkup(e.summary) || undefined,
    })),
    artworkSource: { poster: normalized.poster, backdrop },
    checkedAt: "2026-11-18",
  };
}
const result = [];
for (const year of [2025, 2026]) {
  const candidates = input
    .filter(
      (s) => s.premiered?.startsWith(String(year)) && s.image && s.summary,
    )
    .sort(
      (a, b) => b.weight - a.weight || b.premiered.localeCompare(a.premiered),
    );
  let count = 0;
  let cursor = 0;
  async function worker() {
    while (count < 100 && cursor < candidates.length) {
      const seed = candidates[cursor++];
      try {
        const drama = await importShow(seed);
        if (count < 100) {
          result.push(drama);
          count++;
          console.log(year, count, seed.name);
        }
      } catch (error) {
        console.log("Skipped", seed.name, error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, 750));
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  assert.equal(
    count,
    100,
    `Need 100 verified records for ${year}; existing catalog preserved`,
  );
}
assert.equal(new Set(result.map((d) => d.id)).size, 200);
writeFileSync(
  "lib/recent-dramas.json.tmp",
  JSON.stringify(result, null, 2) + "\n",
);
renameSync("lib/recent-dramas.json.tmp", "lib/recent-dramas.json");
console.log("Imported 200 source-linked dramas with local artwork.");
