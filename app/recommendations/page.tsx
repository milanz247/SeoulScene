import Link from "next/link";
import { getDramas } from "@/lib/database";
import { DramaCard } from "@/components/ui";
import { Breadcrumbs, SectionHeader } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Drama recommendations",
  "Find a story by feeling: romance, thriller, historical, comedy, mystery, fantasy and slice of life.",
  "/recommendations",
);
const genres = [
  "Romance",
  "Thriller",
  "Historical",
  "Comedy",
  "Mystery",
  "Fantasy",
  "Slice of Life",
];
export default function Page() {
  const dramas = getDramas();
  return (
    <main id="main" className="wrap inner-page">
      <Breadcrumbs
        items={[{ label: "Recommendations", href: "/recommendations" }]}
      />
      <div className="page-heading">
        <p className="eyebrow">CHOSEN WITH FEELING</p>
        <h1>Find a story that feels like you.</h1>
        <p>
          A small, curated collection. Genre labels come from the catalog; these
          selections are editorial discovery, not a measured popularity chart.
        </p>
      </div>
      <nav className="category-nav" aria-label="Recommendation categories">
        {genres.map((g) => (
          <a key={g} href={`#${g.toLowerCase().replaceAll(" ", "-")}`}>
            {g}
          </a>
        ))}
        <a href="#top-rated">Top rated</a>
        <a href="#another-look">Another look</a>
      </nav>
      {genres.map((g) => {
        const items = dramas.filter((d) => d.genres.includes(g));
        return (
          <section
            className="section"
            id={g.toLowerCase().replaceAll(" ", "-")}
            key={g}
          >
            <SectionHeader
              title={g}
              kicker="A DIFFERENT KIND OF FEELING"
              href={`/dramas?genre=${encodeURIComponent(g)}`}
              label="Explore the genre"
            />
            {items.length ? (
              <div className="drama-grid">
                {items.map((d) => (
                  <DramaCard key={d.id} drama={d} />
                ))}
              </div>
            ) : (
              <p className="muted">
                No verified {g.toLowerCase()} titles in this collection yet.{" "}
                <Link href="/dramas">Explore the available stories.</Link>
              </p>
            )}
          </section>
        );
      })}
      <section className="section" id="top-rated">
        <SectionHeader
          title="Loved by the community."
          kicker="TMDB COMMUNITY RATINGS"
        />
        <p className="section-intro">
          Highest TMDB scores in this collection, not an all-time chart or
          SeoulScene editorial rating.
        </p>
        <div className="drama-grid">
          {dramas
            .filter((d) => typeof d.rating === "number")
            .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
            .slice(0, 4)
            .map((d) => (
              <DramaCard key={d.id} drama={d} />
            ))}
        </div>
      </section>
      <section className="section" id="another-look">
        <SectionHeader
          title="Worth another look."
          kicker="AN EDITORIAL INVITATION"
        />
        <p className="section-intro">
          Rather than claiming a title is underrated without audience data, we
          invite you to revisit a different corner of the collection.
        </p>
        <Link className="button" href="/dramas?sort=title">
          Browse the collection A–Z
        </Link>
      </section>
    </main>
  );
}
