// Lucian UX/UI Prompt #373 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#373
import Link from "next/link";
export function Footer() {
  return (
    <footer className="korean-footer">
      <div className="footer-content wrap">
        <div className="footer-brand">
          <Link className="brand" href="/">
            SeoulScene <span className="stamp">서울씬</span>
          </Link>
          <p>
            Every drama has a story.
            <br />
            Find yours.
          </p>
          <span className="eyebrow">MADE WITH LOVE, INSPIRED BY KOREA</span>
        </div>
        {[
          {
            title: "Explore",
            links: [
              ["All dramas", "/dramas"],
              ["Recommendations", "/recommendations"],
              ["Editor’s picks", "/explore?sort=curated"],
              ["Upcoming", "/upcoming"],
              ["Actors", "/actors"],
            ],
          },
          {
            title: "Discover",
            links: [
              ["K-Culture", "/culture"],
              ["The journal", "/journal"],
              ["Reviews", "/reviews"],
              ["Industry news", "/news"],
              ["Airing calendar", "/calendar"],
              ["My watchlist", "/watchlist"],
            ],
          },
          {
            title: "The fine print",
            links: [
              ["About us", "/about"],
              ["Contact", "/about#contact"],
              ["Credits", "/credits"],
              ["Privacy", "/privacy"],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h3>{col.title}</h3>
            {col.links.map(([t, h]) => (
              <Link className="footer-underline" key={t} href={h}>
                {t}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom wrap">
        <span>© 2026 SeoulScene. A little closer to Korea.</span>
        <span>서울에서 시작되는 이야기 · Stories begin in Seoul</span>
      </div>
    </footer>
  );
}
