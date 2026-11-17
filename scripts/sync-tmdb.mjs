import "dotenv/config";
import Database from "better-sqlite3";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const token = process.env.TMDB_READ_ACCESS_TOKEN;
if (!token) {
  console.error(
    "Set TMDB_READ_ACCESS_TOKEN in .env before syncing. Existing catalog is unchanged.",
  );
  process.exit(1);
}
const catalog = JSON.parse(
  readFileSync(new URL("../lib/catalog.json", import.meta.url), "utf8"),
);
async function request(path) {
  const response = await fetch(`https://api.themoviedb.org/3/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok)
    throw new Error(`TMDB returned ${response.status} for ${path}`);
  return response.json();
}
function image(path, fallback, size = "w780") {
  return typeof path === "string" && /^\/[a-zA-Z0-9._-]+$/.test(path)
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : fallback;
}
try {
  const updates = [];
  for (const seed of catalog) {
    const data = await request(
      `tv/${seed.id}?append_to_response=credits&language=en-US`,
    );
    if (
      data.id !== seed.id ||
      typeof data.name !== "string" ||
      !Array.isArray(data.genres) ||
      !Array.isArray(data.credits?.cast) ||
      !data.genres.every((g) => typeof g.name === "string") ||
      !data.credits.cast.every(
        (p) => typeof p.name === "string" && typeof p.character === "string",
      ) ||
      !Number.isSafeInteger(data.number_of_episodes) ||
      data.number_of_episodes < 0 ||
      typeof data.status !== "string"
    )
      throw new Error(`Invalid metadata for ${seed.id}`);
    updates.push({
      ...seed,
      title: data.name,
      korean: data.original_name || seed.korean,
      overview: data.overview || seed.overview,
      year: Number(data.first_air_date?.slice(0, 4)) || seed.year,
      genres: data.genres.map((g) => g.name),
      episodes: data.number_of_episodes || seed.episodes,
      status: data.status || seed.status,
      rating:
        typeof data.vote_average === "number" && data.vote_count > 0
          ? data.vote_average
          : undefined,
      nextEpisode: data.next_episode_to_air?.air_date || undefined,
      poster: image(data.poster_path, seed.poster, "w500"),
      backdrop: image(data.backdrop_path, seed.backdrop),
      cast: data.credits.cast
        .slice(0, 5)
        .map((p) => ({
          name: p.name,
          character: p.character,
          portrait: image(p.profile_path, "/images/fallback.svg", "w342"),
          source: `https://www.themoviedb.org/person/${p.id}`,
        })),
    });
  }
  mkdirSync(join(process.cwd(), ".data"), { recursive: true });
  const db = new Database(".data/seoulscene.sqlite");
  db.pragma("journal_mode = WAL");
  db.exec(
    "CREATE TABLE IF NOT EXISTS dramas (id INTEGER PRIMARY KEY,data TEXT NOT NULL)",
  );
  const upsert = db.prepare(
    "INSERT INTO dramas (id,data) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
  );
  db.transaction(() =>
    updates.forEach((d) => upsert.run(d.id, JSON.stringify(d))),
  )();
  db.close();
  console.log(
    `Updated ${updates.length} dramas. Rebuild the site to publish refreshed metadata.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : "TMDB sync failed.");
  process.exitCode = 1;
}
