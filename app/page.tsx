import Link from "next/link";
import { getArticles } from "@/lib/content";
import { getDramas } from "@/lib/database";
import { ArticleCard, Newsletter, SectionHeader } from "@/components/editorial";
import { articlePath } from "@/lib/editorial";
import { pageMetadata } from "@/lib/seo";
import { DramaCard, Icon, Photo } from "@/components/ui";
import { getPeople } from "@/lib/people";
import { Blossom, Cloud } from "@/components/art";

export const metadata = pageMetadata(
  "Stories that stay with you",
  "Korean dramas, thoughtful editorial previews, source-linked entertainment news and culture. Find your next story.",
  "/",
);

const moods = [
  ["Romance", "설레는 순간", "A little flutter, a lasting feeling.", "215720"],
  ["Historical", "시간을 넘어", "Step into a different time.", "135157"],
  ["Fantasy", "상상 그 너머", "For a world beyond the ordinary.", "67915"],
  ["Comedy", "웃음이 필요할 때", "Make room for a little laughter.", "154825"],
  [
    "Slice of Life",
    "우리의 일상",
    "Find the extraordinary in the everyday.",
    "129888",
  ],
];

export default async function Home() {
  const dramas = getDramas();
  const editorial = await getArticles();
  const news = editorial.filter((a) => a.kind === "news");
  const reviews = editorial.filter((a) => a.kind === "review");
  const journal = editorial.find((a) => a.kind === "feature");
  const allPeople = getPeople(dramas);
  const people = [215720, 129888, 135157, 94796].flatMap((id) => {
    const name = dramas.find((drama) => drama.id === id)?.cast[0]?.name;
    return allPeople.filter((person) => person.name === name);
  });
  const picks = [215720, 129888, 94796, 67915, 154825].flatMap((id) =>
    dramas.filter((drama) => drama.id === id),
  );

  return (
    <main id="main" className="home-editorial">
      <section className="opening-spread wrap" aria-labelledby="cover-title">
        <div className="opening-masthead">
          <h1 id="cover-title">The SeoulScene edit</h1>
          <Link href="/journal" className="text-link">
            All stories <Icon name="arrow" />
          </Link>
        </div>
        <div className="opening-grid">
          <article className="opening-lead">
            <Link href={journal ? articlePath(journal) : "/journal"}>
              <div className="opening-art">
                <Photo
                  src="/images/seoul-reading-window.webp"
                  alt="Illustration of a reader at an open hanok bookshop window above Seoul at dusk"
                  priority
                  sizes="(max-width: 700px) 100vw, 60vw"
                />
              </div>
              <div className="opening-caption">
                <p className="eyebrow">Journal · 에세이</p>
                <h2>{journal?.title || "The SeoulScene journal"}</h2>
                {journal && <p>{journal.description}</p>}
                <span className="opening-read">
                  Read the essay <Icon name="arrow" />
                </span>
              </div>
            </Link>
          </article>
          <div className="opening-side">
            <article>
              <Link href="/dramas/94796">
                <div className="opening-thumb">
                  <Photo
                    src="/images/94796-backdrop.jpg"
                    alt="Cast of Crash Landing on You"
                    sizes="(max-width: 700px) 35vw, 18vw"
                  />
                </div>
                <p className="eyebrow">Drama pick · 로맨스</p>
                <h2>Crash Landing on You</h2>
              </Link>
            </article>
            {news[0] && (
              <article>
                <Link href={articlePath(news[0])}>
                  <div className="opening-thumb">
                    <Photo
                      src={news[0].image.src}
                      alt={news[0].image.alt}
                      sizes="(max-width: 700px) 35vw, 18vw"
                    />
                  </div>
                  <p className="eyebrow">Industry news · Archive</p>
                  <h2>{news[0].title}</h2>
                </Link>
              </article>
            )}
          </div>
        </div>
      </section>

      <section
        className="section wrap home-picks"
        aria-labelledby="picks-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE SEOULSCENE EDIT · 우리의 선택</p>
            <h2 id="picks-title">Your next “just one more episode.”</h2>
          </div>
          <Link href="/dramas" className="text-link">
            Browse the collection <Icon name="arrow" />
          </Link>
        </div>
        <div className="poster-row">
          {picks.map((drama, index) => (
            <DramaCard key={drama.id} drama={drama} index={index} />
          ))}
        </div>
      </section>

      <section className="feeling-section wrap" aria-labelledby="feeling-title">
        <div className="feeling-intro">
          <div>
            <p className="eyebrow">THE MOOD EDIT · 오늘의 기분</p>
            <h2 id="feeling-title">Find your kind of story.</h2>
          </div>
          <p>
            Some days call for butterflies.
            <br />
            Others, a whole new world.
          </p>
        </div>
        <div className="feeling-layout">
          <div className="feeling-illustration">
            <span className="eyebrow">A STORY FOR EVERY FEELING</span>
            <span className="feeling-calligraphy" lang="ko">
              오늘은,
              <br />
              어떤 이야기?
            </span>
            <Cloud />
          </div>
          <div className="feeling-list">
            {moods.map(([name, korean, description, image]) => (
              <Link
                href={`/explore?genre=${encodeURIComponent(name)}`}
                key={name}
                className="feeling-link"
              >
                <div className="feeling-image">
                  <Photo
                    src={`/images/${image}-backdrop.jpg`}
                    alt=""
                    sizes="(max-width: 650px) 80px, 110px"
                  />
                </div>
                <div className="feeling-copy">
                  <div>
                    <h3>{name}</h3>
                    <span lang="ko">{korean}</span>
                  </div>
                  <p>{description}</p>
                </div>
                <span className="feeling-arrow">
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap editorial-edition">
        <SectionHeader
          title="The stories around the stories."
          kicker="FROM THE JOURNAL"
          href="/journal"
        />
        <div className="edition-layout">
          {journal && <ArticleCard article={journal} lead />}
          <div className="news-desk">
            <p className="eyebrow">INDUSTRY NOTES · FROM THE ARCHIVE</p>
            {news.map((article, index) => (
              <article key={article.slug}>
                <span className="brief-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow">{article.category} · ARCHIVE BRIEF</p>
                  <h3>
                    <Link href={articlePath(article)}>{article.title}</Link>
                  </h3>
                  <p>{article.description}</p>
                </div>
              </article>
            ))}
            <Link href="/news" className="text-link">
              All industry notes <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap home-reviews">
        <SectionHeader
          title="A closer look. No spoilers."
          kicker="REVIEWS & FIRST IMPRESSIONS"
          href="/reviews"
          label="Read the previews"
        />
        <div className="article-grid review-grid">
          {reviews.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="people-edit wrap section">
        <SectionHeader
          title="The faces behind the feeling."
          kicker="IN THE SPOTLIGHT · 배우"
          href="/actors"
          label="Meet the actors"
        />
        <div className="people-edit-grid">
          {people.map((person) => (
            <Link
              className="people-edit-card"
              href={`/actors/${person.slug}`}
              key={person.slug}
            >
              <div className="people-edit-image">
                <Photo
                  src={person.portrait}
                  alt={person.name}
                  sizes="(max-width: 650px) 45vw, 25vw"
                />
                <span>
                  <Icon name="arrow" />
                </span>
              </div>
              <p className="eyebrow">{person.appearances[0].title}</p>
              <h3>{person.name}</h3>
              <p>Explore the roles. Remember the moments.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="culture-cover wrap" aria-labelledby="culture-title">
        <Link className="culture-cover-image" href="/culture">
          <Photo
            src="/images/culture-hanok.webp"
            alt="A traditional Korean hanok courtyard beneath tiled rooftops"
            sizes="(max-width: 760px) calc(100vw - 40px), 50vw"
          />
        </Link>
        <div className="culture-cover-copy">
          <p className="eyebrow">BEYOND THE SCREEN · 한국의 아름다움</p>
          <span className="culture-cover-korean" lang="ko">
            천천히, 서울
          </span>
          <h2 id="culture-title">
            A little closer
            <br />
            to Korea.
          </h2>
          <p>
            Quiet courtyards. A warm cup of tea. The words that mean more than
            their translation. There’s a whole world behind your favorite
            scenes.
          </p>
          <Link href="/culture" className="text-link">
            Wander a little <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="illustrated-letter">
        <div className="illustrated-letter-art" aria-hidden="true" />
        <Blossom className="letter-blossom" />
        <Cloud className="letter-cloud" />
        <div className="wrap">
          <p className="eyebrow">서울씬 · A LITTLE SEOUL, WHEREVER YOU ARE</p>
          <h2>
            More than a drama.
            <br />
            <em>A world to fall into.</em>
          </h2>
          <p>For the stories we finish, and the feelings we keep.</p>
          <Link className="button" href="/about">
            This is SeoulScene <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
