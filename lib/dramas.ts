import catalog from "./catalog.json" with { type: "json" };
export type Drama = (typeof catalog)[number] & {
  rating?: number;
  nextEpisode?: string;
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
    : sort === "year"
      ? results.sort((a, b) => b.year - a.year)
      : results;
}
