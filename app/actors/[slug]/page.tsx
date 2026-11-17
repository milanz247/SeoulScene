import { notFound } from "next/navigation";
import Link from "next/link";
import { getDramas } from "@/lib/database";
import { getPeople } from "@/lib/people";
import { getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import {
  ArticleCard,
  Breadcrumbs,
  SectionHeader,
} from "@/components/editorial";
import { ActorPortrait } from "@/components/editorial-image";
import { DramaCard } from "@/components/ui";
const people = getPeople(getDramas());
export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = people.find((p) => p.slug === slug);
  return p
    ? pageMetadata(
        p.name,
        `Explore ${p.name}’s roles in the verified SeoulScene collection.`,
        "/actors/" + p.slug,
      )
    : { title: "Actor not found" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = people.find((p) => p.slug === slug);
  if (!person) notFound();
  const related = (await getArticles()).filter((a) =>
    person.appearances.some((d) => d.id === a.dramaId),
  );
  return (
    <main id="main" className="wrap inner-page">
      <Breadcrumbs
        items={[
          { label: "Actors", href: "/actors" },
          { label: person.name, href: `/actors/${person.slug}` },
        ]}
      />
      <div className="actor-profile">
        <ActorPortrait
          src={person.portrait}
          alt={person.name}
          sizes="(max-width: 650px) 80vw, 30vw"
        />
        <div className="page-heading">
          <p className="eyebrow">THE PEOPLE BEHIND THE STORIES</p>
          <h1>{person.name}</h1>
          <p>
            Meet {person.name} through their roles in the SeoulScene collection.
            These credits come from the catalog; this is a selected collection
            filmography, not a complete career record.
          </p>
          <p className="profile-note">
            A verified biography and Korean name have not been added. We leave
            those details open rather than guessing.
          </p>
          <Link className="text-link" href="/credits">
            Metadata & image sources
          </Link>
        </div>
      </div>
      <section className="section">
        <SectionHeader
          title="In our collection."
          kicker="SELECTED APPEARANCES"
        />
        <div className="drama-grid">
          {person.appearances.map((d) => (
            <div key={d.id}>
              <DramaCard drama={d} />
              <p className="role-caption">
                As {d.cast.find((p) => p.name === person.name)?.character}
              </p>
            </div>
          ))}
        </div>
      </section>
      {related.length > 0 && (
        <section className="section">
          <SectionHeader
            title="On the reading list."
            kicker="RELATED EDITORIAL"
          />
          <div className="article-grid">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
