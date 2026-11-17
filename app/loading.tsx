export default function Loading() {
  return (
    <main id="main" className="wrap inner-page" aria-busy="true">
      <div className="page-heading skeleton">
        A new story is coming into view…
      </div>
      <div className="drama-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="poster skeleton" />
        ))}
      </div>
    </main>
  );
}
