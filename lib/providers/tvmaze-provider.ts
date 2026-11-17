import "server-only";
import { providerId, type DramaProvider } from "./drama-provider";
import { normalizeTvmaze } from "./normalize";
export const tvmazeProvider: DramaProvider = {
  async lookup(id) {
    providerId(id);
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (response.status === 404) return null;
    if (!response.ok)
      throw new Error(`TVmaze request failed (${response.status})`);
    return normalizeTvmaze(await response.json(), id);
  },
};
