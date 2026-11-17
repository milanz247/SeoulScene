import "server-only";
import { providerId, type DramaProvider } from "./drama-provider";
import { normalizeTmdb } from "./normalize";
export const tmdbProvider: DramaProvider = {
  async lookup(id) {
    providerId(id);
    const token = process.env.TMDB_READ_ACCESS_TOKEN;
    if (!token)
      throw new Error("TMDB_READ_ACCESS_TOKEN is required for TMDB lookups");
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(10000),
        next: { revalidate: 3600 },
      },
    );
    if (response.status === 404) return null;
    if (!response.ok)
      throw new Error(`TMDB request failed (${response.status})`);
    return normalizeTmdb(await response.json(), id);
  },
};
