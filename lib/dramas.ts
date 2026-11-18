import { slugify } from "./slug.ts";
import catalog from "./catalog.json" with { type: "json" };
export type Drama = Omit<(typeof catalog)[number], "rating"> & {
  rating?: number;
  premiereDate?: string;
  checkedAt?: string;
  officialSite?: string | null;
  episodeGuide?: {
    season: number;
    number: number;
    title: string;
    airdate?: string;
    summary?: string;
  }[];
  nextEpisode?: string;
  network?: string;
  director?: string;
  broadcast?: string;
  sourceUrl?: string;
  ratingSource?: string;
};
export const dramas: Drama[] = catalog.sort((a, b) => b.year - a.year);
export function filterDramas(
  items: Drama[],
  query = "",
  genre = "",
  year = "",
  status = "",
  sort = "curated",
) {
  const results = items.filter(
    (d) =>
      `${d.title} ${d.korean}`.toLowerCase().includes(query.toLowerCase()) &&
      (!genre || d.genres.includes(genre)) &&
      (!year || String(d.year) === year) &&
      (!status || d.status === status),
  );
  return sort === "title"
    ? results.sort((a, b) => a.title.localeCompare(b.title))
    : sort === "latest"
      ? results.sort(
          (a, b) =>
            (b.premiereDate || `${b.year}-01-01`).localeCompare(
              a.premiereDate || `${a.year}-01-01`,
            ) || a.title.localeCompare(b.title),
        )
      : sort === "year"
        ? results.sort((a, b) => b.year - a.year)
        : results;
}

export function dramaSlug(drama: Drama) {
  return `${slugify(drama.title)}-${drama.id < 0 ? `local-${Math.abs(drama.id)}` : drama.id}`;
}
export function findDrama(items: Drama[], route: string) {
  return items.find((d) => String(d.id) === route || dramaSlug(d) === route);
}

export function mergeManualDramas(items: Drama[], manual: Drama[]) {
  const ids = new Set(items.map((d) => d.id));
  for (const drama of manual) {
    if (!Number.isSafeInteger(drama.id) || drama.id >= 0 || ids.has(drama.id))
      throw new Error("Manual dramas require unique negative integer IDs");
    ids.add(drama.id);
  }
  return [...items, ...manual].sort((a, b) => b.year - a.year);
}

export function dramaSource(drama: Drama) {
  if (drama.id > 0) return `https://www.themoviedb.org/tv/${drama.id}`;
  try {
    const url = new URL(drama.sourceUrl || "");
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
