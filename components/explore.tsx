"use client";
import { useState } from "react";
import { DramaCard, Icon } from "./ui";
import { filterDramas, type Drama } from "@/lib/dramas";
export function Explore({
  items,
  initialGenre = "",
  initialSort = "curated",
  initialYear = "",
}: {
  items: Drama[];
  initialGenre?: string;
  initialSort?: string;
  initialYear?: string;
}) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(initialGenre);
  const [year, setYear] = useState(initialYear);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState(initialSort);
  const [limit, setLimit] = useState(12);
  const filtered = filterDramas(items, query, genre, year, status, sort);
  return (
    <>
      <div className="filter-panel">
        <label className="search-field">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="A title, a feeling, a new beginning…"
            aria-label="Search dramas"
          />
        </label>
        <div className="filter-row">
          <label>
            Genre
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Every feeling</option>
              {Array.from(new Set(items.flatMap((d) => d.genres)))
                .sort()
                .map((g) => (
                  <option key={g}>{g}</option>
                ))}
            </select>
          </label>
          <label>
            Year
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Any year</option>
              {Array.from(new Set(items.map((d) => d.year)))
                .sort((a, b) => b - a)
                .map((y) => (
                  <option key={y}>{y}</option>
                ))}
            </select>
          </label>
          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All stories</option>
              <option>Ended</option>
              <option>Returning Series</option>
              <option>In Production</option>
              <option>Planned</option>
            </select>
          </label>
          <label>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="curated">The curated edit</option>
              <option value="latest">Latest premiere</option>
              <option value="year">Newest year</option>
              <option value="title">Title A–Z</option>
            </select>
          </label>
        </div>
      </div>
      <div className="results-count" aria-live="polite">
        {filtered.length} stories to fall into{" "}
        <button
          onClick={() => {
            setQuery("");
            setGenre("");
            setYear("");
            setStatus("");
            setSort("curated");
          }}
        >
          Reset filters ↺
        </button>
      </div>
      {filtered.length ? (
        <div className="drama-grid">
          {filtered.slice(0, limit).map((d) => (
            <DramaCard key={d.id} drama={d} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>A different story is waiting.</h2>
          <p>
            No dramas match these filters. Try another title or a different
            feeling.
          </p>
        </div>
      )}
      {filtered.length > limit && (
        <button
          className="button load-more"
          onClick={() => setLimit(limit + 12)}
        >
          More stories <Icon name="arrow" />
        </button>
      )}
    </>
  );
}
