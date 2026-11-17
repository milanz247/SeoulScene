import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow">A SMALL PLOT TWIST · 404</p>
      <h1>This chapter hasn’t been written.</h1>
      <Link className="button" href="/explore">
        Find another story →
      </Link>
    </main>
  );
}
