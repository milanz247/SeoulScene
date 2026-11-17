import { notFound } from "next/navigation";
import { dramaSlug, dramaSource, findDrama } from "@/lib/dramas";
import { getArticles } from "@/lib/content";
import { slugify } from "@/lib/slug";
import {
  ArticleCard,
  Breadcrumbs,
  SectionHeader,
} from "@/components/editorial";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import Link from "next/link";
import { getDramas } from "@/lib/database";
const dramas = getDramas();
import { DramaCard, Icon, Photo, SaveButton } from "@/components/ui";
import { Blossom } from "@/components/art";
export function generateStaticParams() {
  return dramas.flatMap((d) => [{ id: String(d.id) }, { id: dramaSlug(d) }]);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drama = findDrama(dramas, id);
  if (!drama) notFound();
  return pageMetadata(
    drama.title,
    drama.overview,
    `/dramas/${dramaSlug(drama)}`,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const d = findDrama(dramas, id);
  if (!d) notFound();
  const source = dramaSource(d);
  const isTmdb = d.id > 0;
  const relatedArticles = (await getArticles()).filter(
    (a) => a.dramaId === d.id,
  );
  return (
    <main id="main">
      <section className="detail-hero">
        <Photo
          src={d.backdrop}
          alt={`${d.title} backdrop`}
          priority
          sizes="100vw"
        />
        <div className="detail-shade" />
        <div className="detail-content wrap">
          <div className="detail-poster">
            <Photo src={d.poster} alt={`${d.title} poster`} sizes="240px" />
          </div>
          <div>
            <Link href="/explore" className="eyebrow">
              ← BACK TO THE GALLERY
            </Link>
            <p className="detail-korean" lang="ko">
              {d.korean}
            </p>
            <h1>{d.title}</h1>
            <p>
              {d.year} · {d.episodes} episodes · {d.status}
              {typeof d.rating === "number" &&
                (isTmdb || d.ratingSource) &&
                ` · ${d.ratingSource || "TMDB"} ${d.rating.toFixed(1)}/10`}
            </p>
            <div className="tags">
              {d.genres.map((g) => (
                <Link href={`/explore?genre=${encodeURIComponent(g)}`} key={g}>
                  {g}
                </Link>
              ))}
            </div>
            <div className="detail-buttons">
              <SaveButton id={d.id} full />
              {isTmdb && (
                <a
                  className="button secondary"
                  href={`https://www.themoviedb.org/tv/${d.id}/videos`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ▷ Watch trailers
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="wrap detail-body">
        <Breadcrumbs
          items={[
            { label: "Dramas", href: "/dramas" },
            { label: d.title, href: `/dramas/${dramaSlug(d)}` },
          ]}
        />
        <dl className="drama-facts">
          <div>
            <dt>Source</dt>
            <dd>{isTmdb ? "TMDB catalog" : "Manually curated record"}</dd>
          </div>
          <div>
            <dt>Editorial score</dt>
            <dd>Not assigned</dd>
          </div>
          <div>
            <dt>Network & broadcast</dt>
            <dd>{d.broadcast || d.network || "Not verified in this record"}</dd>
          </div>
          <div>
            <dt>Director</dt>
            <dd>{d.director || "Not verified in this record"}</dd>
          </div>
        </dl>
        <section className="overview">
          <Blossom className="story-blossom" />
          <p className="eyebrow">THE STORY · 줄거리</p>
          <h2>A story worth your time.</h2>
          <p>{d.overview}</p>
          {source && (
            <a
              href={source}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {isTmdb
                ? "Cast, trailers & episode guide on TMDB"
                : "Verified record source"}{" "}
              <Icon name="arrow" />
            </a>
          )}
        </section>
        <section className="cast-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">배우 · THE PEOPLE IN THIS STORY</p>
              <h2>Faces you’ll remember.</h2>
            </div>
          </div>
          <div className="actor-grid">
            {d.cast.map((p) => (
              <Link
                className="actor-card"
                href={`/actors/${slugify(p.name)}`}
                key={p.name}
              >
                <div className="actor-image">
                  <Photo src={p.portrait} alt={p.name} />
                </div>
                <h3>{p.name}</h3>
                <p>{p.character}</p>
              </Link>
            ))}
          </div>
        </section>
        {isTmdb && (
          <section className="episode-section">
            <p className="eyebrow">에피소드 · THE CHAPTERS</p>
            <h2>{d.episodes} episodes. A world to fall into.</h2>
            <details>
              <summary>
                Explore the episode guide <span>＋</span>
              </summary>
              <p>
                Episode titles, season breakdowns, and availability can vary by
                region. Browse the source guide for the full verified listing.
              </p>
              <a
                className="text-link"
                href={`https://www.themoviedb.org/tv/${d.id}/seasons`}
                target="_blank"
                rel="noreferrer"
              >
                Open the episode guide on TMDB ↗
              </a>
            </details>
          </section>
        )}
        <section>
          <p className="eyebrow">A FRAME TO REMEMBER · 장면</p>
          <figure className="story-frame">
            <div className="gallery-image">
              <Photo
                src={d.backdrop}
                alt={`A scene from ${d.title}`}
                sizes="(max-width: 760px) 100vw, 80vw"
              />
            </div>
            <figcaption>
              {d.title} <span lang="ko">장면 속에 머물다</span>
            </figcaption>
          </figure>
        </section>
        {relatedArticles.length > 0 && (
          <section className="section">
            <SectionHeader
              title="Read between the scenes."
              kicker="RELATED EDITORIAL"
            />
            <div className="article-grid">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}
        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ONE MORE CHAPTER</p>
              <h2>If this feels like you…</h2>
            </div>
          </div>
          <div className="poster-row related">
            {dramas
              .filter(
                (x) =>
                  x.id !== d.id && x.genres.some((g) => d.genres.includes(g)),
              )
              .slice(0, 4)
              .map((x) => (
                <DramaCard key={x.id} drama={x} />
              ))}
          </div>
        </section>
      </div>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "TVSeries",
          name: d.title,
          alternateName: d.korean,
          description: d.overview,
          url: siteUrl + `/dramas/${dramaSlug(d)}`,
          genre: d.genres,
          numberOfEpisodes: d.episodes,
          sameAs: source,
        }}
      />
    </main>
  );
}
