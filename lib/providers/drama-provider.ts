export type ProviderDrama = {
  provider: "tmdb" | "tvmaze";
  providerId: number;
  title: string;
  originalTitle?: string;
  overview?: string;
  year?: number;
  genres: string[];
  episodes?: number;
  status?: string;
  network?: string;
  rating?: number;
  poster?: string;
  backdrop?: string;
  source: string;
};
export interface DramaProvider {
  lookup(id: number): Promise<ProviderDrama | null>;
}
export function providerId(id: number) {
  if (!Number.isSafeInteger(id) || id <= 0)
    throw new Error("Provider ID must be a positive integer");
  return id;
}
export function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid provider metadata");
  return value as Record<string, unknown>;
}
export function optionalText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}
export function safeImage(value: unknown, host: string) {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === host
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
export function stripMarkup(value: unknown) {
  return optionalText(value)
    ?.replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
