export const metadata = { title: "About SeoulScene" };
export default function Page() {
  return (
    <main id="main" className="wrap inner-page prose">
      <div className="page-heading">
        <p className="eyebrow">서울씬 · OUR LITTLE CORNER</p>
        <h1>
          For the stories that <em>stay.</em>
        </h1>
      </div>
      <p>
        SeoulScene is an independent discovery journal for Korean dramas and the
        culture that makes them special. We believe finding your next favorite
        story should feel as lovely as watching it.
      </p>
      <h2>A collection with feeling.</h2>
      <p>
        We pair a small, thoughtfully selected drama collection with glimpses of
        Korean words, places, and everyday rituals. Save a title, explore a new
        genre, or simply wander.
      </p>
      <h2 id="contact">Contact & corrections</h2>
      <p>
        Spotted something that needs a second look? Drama metadata comes from
        TMDB. You can suggest corrections on the linked TMDB drama page. This
        local project does not collect contact submissions.
      </p>
    </main>
  );
}
