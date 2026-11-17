import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { getDramas } from "@/lib/database";
import { DramaCard, Icon } from "@/components/ui";
export const metadata = pageMetadata('Airing calendar', 'Verified schedules from the SeoulScene collection, with unannounced dates clearly labeled.', "/calendar");
export default function Page() {
  const dramas = getDramas();
  const airing = dramas.filter((d) => d.status === "Returning Series");
  const upcoming = dramas.filter(
    (d) => d.status === "In Production" || d.status === "Planned",
  );
  return (
    <main id="main" className="wrap inner-page">
      <div className="page-heading">
        <p className="eyebrow">방영 일정 · ON KOREAN TIME</p>
        <h1>
          Something to look <em>forward to.</em>
        </h1>
        <p>
          A space for new episodes, fresh beginnings, and your next weekly
          ritual.
        </p>
      </div>
      <section>
        <div className="section-heading">
          <h2>Currently airing</h2>
        </div>
        {airing.length ? (
          <div className="drama-grid">
            {airing.map((d) => (
              <div key={d.id}>
                <DramaCard drama={d} />
                <p>
                  {d.nextEpisode
                    ? `Next episode: ${d.nextEpisode}`
                    : "Next episode date not announced"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>A quiet moment between stories.</h2>
            <p>
              No currently airing titles are verified in this collection. Our
              finished favorites are ready whenever you are.
            </p>
            <Link className="button" href="/explore">
              Explore the collection <Icon name="arrow" />
            </Link>
          </div>
        )}
      </section>
      <section className="section" id="upcoming">
        <div className="section-heading">
          <div>
            <p className="eyebrow">곧 공개</p>
            <h2>Coming into view.</h2>
          </div>
        </div>
        {upcoming.length ? (
          <div className="drama-grid">
            {upcoming.map((d) => (
              <DramaCard key={d.id} drama={d} />
            ))}
          </div>
        ) : (
          <p className="muted">
            No upcoming releases have been confirmed in this collection. Release
            dates will appear when available from the source.
          </p>
        )}
      </section>
    </main>
  );
}
