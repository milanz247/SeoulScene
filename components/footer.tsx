import Link from "next/link";
export function Footer() {
  return (
    <footer className="compact-footer">
      <div className="wrap">
        <div className="footer-signature">
          <Link className="brand" href="/">
            SeoulScene <span className="stamp">서울씬</span>
          </Link>
          <p>A little Seoul. A lot of feeling.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {[
            ["About", "/about"],
            ["The journal", "/journal"],
            ["K-Culture", "/culture"],
            ["Calendar", "/calendar"],
            ["Recommendations", "/recommendations"],
            ["Upcoming", "/upcoming"],
            ["Watchlist", "/watchlist"],
            ["Credits", "/credits"],
            ["Privacy", "/privacy"],
            ["Contact", "/about#contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="footer-colophon">
          <span>
            © 2026 SeoulScene · An independent drama & culture journal.
          </span>
          <span lang="ko">이야기가 머무는 곳, 서울씬</span>
        </div>
      </div>
    </footer>
  );
}
