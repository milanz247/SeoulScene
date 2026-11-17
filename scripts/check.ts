import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { filterDramas, dramas } from "../lib/dramas.ts";
assert(dramas.length >= 7);
assert.equal(filterDramas(dramas, "queen")[0].id, 215720);
assert.equal(filterDramas(dramas, "눈물")[0].id, 215720);
assert(
  filterDramas(dramas, "", "Fantasy").every((d) =>
    d.genres.includes("Fantasy"),
  ),
);
assert(filterDramas(dramas, "", "", "2024").every((d) => d.year === 2024));
assert.equal(filterDramas(dramas, "", "", "", "Planned").length, 0);
assert.equal(filterDramas(dramas, "no such story").length, 0);
const sorted = filterDramas(dramas, "", "", "", "", "title");
assert.deepEqual(
  sorted.map((d) => d.title),
  dramas.map((d) => d.title).sort((a, b) => a.localeCompare(b)),
);
for (const d of dramas) {
  assert(Number.isSafeInteger(d.id));
  assert(d.episodes > 0);
  for (const asset of [
    d.poster,
    d.backdrop,
    ...d.cast.map((p) => p.portrait),
  ]) {
    assert(existsSync(`public${asset}`), asset);
    const data = readFileSync(`public${asset}`);
    assert(data.length > 1000, asset);
    assert.equal(data[0], 255, `${asset} must be a real JPEG`);
  }
}
console.log(
  `Catalog checks passed: ${dramas.length} titles, filters, Korean search, sort order, and local imagery.`,
);
