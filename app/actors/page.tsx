import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { getDramas } from "@/lib/database";
import { slugify } from "@/lib/editorial";
import { Photo } from "@/components/ui";
export const metadata = pageMetadata(
  "The people behind the stories",
  "Explore cast members and their roles in the SeoulScene collection.",
  "/actors",
);
export default function Page() {
  const people = [
    ...new Map(
      getDramas()
        .flatMap((d) =>
          d.cast.map((p) => ({ ...p, drama: d.title, dramaId: d.id })),
        )
        .map((p) => [p.name, p]),
    ).values(),
  ];
  return (
    <main id="main" className="wrap inner-page">
      <div className="page-heading">
        <p className="eyebrow">배우 · FAMILIAR FACES, UNFORGETTABLE STORIES</p>
        <h1>
          The people who make us <em>feel.</em>
        </h1>
        <p>Discover the faces behind your favorite moments.</p>
      </div>
      <div className="actor-grid">
        {people.map((p) => (
          <Link
            className="actor-card"
            href={`/actors/${slugify(p.name)}`}
            key={p.name}
          >
            <div className="actor-image">
              <Photo src={p.portrait} alt={p.name} />
            </div>
            <h2>{p.name}</h2>
            <p>{p.character}</p>
            <span>{p.drama} ↗</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
