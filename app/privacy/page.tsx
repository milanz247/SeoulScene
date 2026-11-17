export const metadata = { title: "Privacy" };
export default function Page() {
  return (
    <main id="main" className="wrap inner-page prose">
      <div className="page-heading">
        <p className="eyebrow">YOUR LITTLE CORNER, YOUR CHOICE</p>
        <h1>
          A little <em>privacy.</em>
        </h1>
      </div>
      <p>
        Your watchlist and theme preference are stored in this browser’s local
        storage. No account is required. Clearing your browser’s site data
        removes these preferences.
      </p>
      <p>
        We do not add analytics, advertising trackers, or a mailing list.
        Typefaces and artwork are served locally. External links, including TMDB
        and VisitKorea, have their own privacy practices.
      </p>
      <p>
        The server stores public drama metadata in a local SQLite database. It
        does not store your watchlist or personal profile.
      </p>
    </main>
  );
}
