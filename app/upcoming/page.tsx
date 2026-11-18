import Link from "next/link";
import { getDramas } from "@/lib/database";
import { DramaCard, Icon } from "@/components/ui";
import { Breadcrumbs } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Upcoming Korean dramas",
  "Upcoming entries from the verified collection. Unannounced dates remain clearly labeled.",
  "/upcoming",
);
export default function Page() {
  const titles = getDramas().filter(
    (d) => d.status === "In Production" || d.status === "Planned",
  );
  return (
    <main id="main" className="wrap inner-page">
      <Breadcrumbs items={[{ label: "Upcoming", href: "/upcoming" }]} />
      <div className="page-heading">
        <p className="eyebrow">THE NEXT CHAPTER</p>
        <h1>Good things are taking shape.</h1>
        <p>
          Confirmed upcoming records from our collection. A project announcement
          is not a release date, and dates can change.
        </p>
      </div>
      {titles.length ? (
        <div className="drama-grid">
          {titles.map((d) => (
            <div key={d.id}>
              <DramaCard drama={d} />
              <p className="role-caption">
                {d.premiereDate
                  ? `Listed premiere · ${d.premiereDate}`
                  : "Release date not announced"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>A little room for anticipation.</h2>
          <p>
            No upcoming titles are currently verified in this collection. Our
            source-linked news desk records announcements separately from
            release schedules.
          </p>
          <Link className="button" href="/news">
            Read the industry notes <Icon name="arrow" />
          </Link>
        </div>
      )}
      <p className="schedule-explainer">
        <Link className="text-link" href="/calendar">
          View the airing calendar <Icon name="arrow" />
        </Link>
      </p>
    </main>
  );
}
