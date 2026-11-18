import Link from "next/link";
import { Explore } from "@/components/explore";
import { getDramas } from "@/lib/database";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Latest Korean dramas · 2025–2026",
  "Browse recently premiered Korean dramas with synopses, cast, episode guides and source-linked metadata.",
  "/latest",
);
export default function Page() {
  const dramas = getDramas().filter(
    (d) => d.premiereDate && d.checkedAt && d.premiereDate <= d.checkedAt,
  );
  return (
    <main id="main" className="wrap inner-page">
      <div className="page-heading">
        <p className="eyebrow">NEW CHAPTERS · 2025–2026</p>
        <h1>
          Your next story starts <em>here.</em>
        </h1>
        <p>
          Recently premiered dramas, ordered by their first broadcast date. Each
          profile includes the available synopsis, cast, artwork and episode
          details.
        </p>
      </div>
      <nav className="category-nav" aria-label="Browse drama years">
        <Link href="/dramas?year=2026&sort=latest">2026 dramas</Link>
        <Link href="/dramas?year=2025&sort=latest">2025 dramas</Link>
        <Link href="/upcoming">Coming soon</Link>
      </nav>
      <Explore
        items={dramas.map((drama) => ({ ...drama, episodeGuide: undefined }))}
        initialSort="latest"
      />
    </main>
  );
}
