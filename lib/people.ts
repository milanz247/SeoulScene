import type { Drama } from "./dramas";
import { slugify } from "./editorial.ts";
export function getPeople(dramas: Drama[]) {
  return [
    ...new Map(
      dramas
        .flatMap((d) => d.cast)
        .map((p) => [slugify(p.name), { ...p, slug: slugify(p.name) }]),
    ).values(),
  ].map((person) => ({
    ...person,
    appearances: dramas.filter((d) =>
      d.cast.some((p) => slugify(p.name) === person.slug),
    ),
  }));
}
