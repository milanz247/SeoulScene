import {
  optionalText,
  record,
  safeImage,
  stripMarkup,
  type ProviderDrama,
} from "./drama-provider.ts";
export function normalizeTmdb(value: unknown, id: number): ProviderDrama {
  const d = record(value);
  if (
    d.id !== id ||
    typeof d.name !== "string" ||
    !d.name.trim() ||
    !Array.isArray(d.genres)
  )
    throw new Error("Invalid TMDB metadata");
  const image = (path: unknown, size: string) =>
    typeof path === "string" && /^\/[a-zA-Z0-9._-]+$/.test(path)
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : undefined;
  return {
    provider: "tmdb",
    providerId: id,
    title: d.name,
    originalTitle: optionalText(d.original_name),
    overview: optionalText(d.overview),
    genres: d.genres.map((g) => {
      const item = record(g);
      if (typeof item.name !== "string") throw new Error("Invalid TMDB genre");
      return item.name;
    }),
    year:
      typeof d.first_air_date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(d.first_air_date)
        ? Number(d.first_air_date.slice(0, 4))
        : undefined,
    episodes:
      Number.isSafeInteger(d.number_of_episodes) &&
      Number(d.number_of_episodes) >= 0
        ? Number(d.number_of_episodes)
        : undefined,
    status: optionalText(d.status),
    network: Array.isArray(d.networks)
      ? optionalText(record(d.networks[0] || {}).name)
      : undefined,
    rating:
      typeof d.vote_average === "number" &&
      Number(d.vote_count) > 0 &&
      d.vote_average >= 0 &&
      d.vote_average <= 10
        ? d.vote_average
        : undefined,
    poster: image(d.poster_path, "w500"),
    backdrop: image(d.backdrop_path, "w1280"),
    source: `https://www.themoviedb.org/tv/${id}`,
  };
}
export function normalizeTvmaze(value: unknown, id: number): ProviderDrama {
  const d = record(value);
  if (
    d.id !== id ||
    typeof d.name !== "string" ||
    !d.name.trim() ||
    !Array.isArray(d.genres) ||
    !d.genres.every((g) => typeof g === "string")
  )
    throw new Error("Invalid TVmaze metadata");
  const network = d.network
    ? record(d.network)
    : d.webChannel
      ? record(d.webChannel)
      : {};
  const image = d.image ? record(d.image) : {};
  const rating = d.rating ? record(d.rating).average : undefined;
  return {
    provider: "tvmaze",
    providerId: id,
    title: d.name,
    overview: stripMarkup(d.summary),
    genres: d.genres,
    year:
      typeof d.premiered === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.premiered)
        ? Number(d.premiered.slice(0, 4))
        : undefined,
    status: optionalText(d.status),
    network: optionalText(network.name),
    rating:
      typeof rating === "number" && rating >= 0 && rating <= 10
        ? rating
        : undefined,
    poster: safeImage(image.original, "static.tvmaze.com"),
    source: `https://www.tvmaze.com/shows/${id}`,
  };
}
