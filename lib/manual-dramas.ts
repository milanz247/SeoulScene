import type { Drama } from "./dramas";
import recentDramas from "./recent-dramas.json" with { type: "json" };
// TVmaze imports use negative IDs to preserve the existing TMDB URLs and watchlists.
export const manualDramas: Drama[] = recentDramas;
