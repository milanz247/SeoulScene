import Link from "next/link";
import { getArticles } from "@/lib/content";
import { ArticleCard, Newsletter, SectionHeader } from "@/components/editorial";
import { articlePath, slugify } from "@/lib/editorial";
import { ActorPortrait } from "@/components/editorial-image";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Stories that stay with you",
  "Korean dramas, thoughtful editorial previews, source-linked entertainment news and culture. Find your next story.",
  "/",
);
import { getDramas } from "@/lib/database";
const dramas = getDramas();
import { Cloud } from "@/components/art";
import { KoreanOrnaments } from "@/components/korean-ornaments";
import { DramaCard, Icon, Photo } from "@/components/ui";
const moods = [
  ["Romance", "설레는 순간", "For the butterflies", "215720"],
  ["Historical", "시간을 넘어", "Escape to another era", "135157"],
  ["Fantasy", "상상 그 너머", "A little beyond reality", "67915"],
  ["Comedy", "웃음이 필요할 때", "Something to smile about", "154825"],
  ["Slice of Life", "우리의 일상", "Find beauty in the everyday", "129888"],
];
function SectionTitle({
  korean,
  title,
  link,
  label = "Explore all dramas",
}: {
  korean: string;
  title: string;
  link?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow" lang="ko">
          {korean}
        </p>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" href={link}>
          {label} <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}
export default async function Home() {
  const editorial = await getArticles();
  const news = editorial.filter((a) => a.kind === "news");
  const reviews = editorial.filter((a) => a.kind === "review");
  const journal = editorial.find((a) => a.kind === "feature");
  const spotlight = dramas.find((d) => d.id === 129888)!.cast[0];
  const airing = dramas.filter((d) => d.status === "Returning Series");
  const upcoming = dramas.filter(
    (d) => d.status === "In Production" || d.status === "Planned",
  );
  const picks = [215720, 129888, 94796, 67915, 154825].map((id) =>
    dramas.find((d) => d.id === id)!,
  );
  return (
    <main id="main">
      <section className="hero">
        <KoreanOrnaments variant="hero" />
        <div className="hero-grid wrap">
          <div className="hero-copy">
            <p className="eyebrow">
              <svg className="hero-plum" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 18C5 10 13 0 20 8C27 0 35 10 24 18C39 12 43 25 30 27C36 39 22 43 20 30C13 43 1 34 10 26C-3 23 3 10 16 18Z" fill="currentColor" />
                <circle cx="20" cy="22" r="3" fill="var(--paper)" />
              </svg>
              A LITTLE SEOUL. A LOT OF FEELING.
            </p>
            <h1>
              Every story
              <br />
              begins <em>in Seoul.</em>
            </h1>
            <p className="hero-korean" lang="ko">
              당신의 다음 이야기를 만나보세요
              <span className="hero-seal" aria-hidden="true">서울</span>
            </p>
            <p className="hero-description">
              Your beautiful little corner of the K-Drama universe. Find the
              stories, people and places you&apos;ll carry with you.
            </p>
            <div className="hero-buttons">
              <Link className="button" href="/explore">
                Find your next drama <Icon name="arrow" />
              </Link>
              <Link className="hero-secondary" href="#editors-pick">
                Explore the editor&apos;s pick ↗
              </Link>
            </div>
          </div>
          <Link className="hero-feature" href="/culture">
            <span className="hero-feature-image">
              <Photo
                src="/images/culture-hanok.webp"
                alt="A peaceful Korean hanok courtyard framed by traditional tiled rooftops"
                priority
                sizes="(max-width: 760px) calc(100vw - 48px), 400px"
              />
            </span>
            <span className="hero-feature-copy">
              <span className="eyebrow">BEYOND THE SCREEN · 한국의 아름다움</span>
              <strong>A little closer to Korea.</strong>
              <span>Places, people, and the stories between.</span>
              <span className="hero-feature-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        </div>
      </section>
      <section className="section wrap editorial-edition">
        <SectionHeader
          title="The stories around the stories."
          kicker="THE JOURNAL · FIRST EDITION"
          href="/journal"
        />
        <div className="edition-layout">
          {journal && <ArticleCard article={journal} lead />}
          <div className="news-desk">
            <p className="eyebrow">FROM THE NEWS DESK</p>
            {news.map((a, i) => (
              <article key={a.slug}>
                <span className="brief-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow">{a.category} · ARCHIVE BRIEF</p>
                  <h3>
                    <Link href={articlePath(a)}>{a.title}</Link>
                  </h3>
                  <p>{a.description}</p>
                </div>
              </article>
            ))}
            <Link className="text-link" href="/news">
              All industry notes <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section wrap reveal" id="trending">
        <SectionTitle
          korean="지금, 우리가 사랑하는 이야기"
          title="The stories we keep coming back to."
          link="/explore"
        />
        <div className="poster-row">
          {picks.map((d, i) => (
            <DramaCard key={d.id} drama={d} index={i} />
          ))}
        </div>
        <p className="curation-note">
          THE SEOULSCENE EDIT <span>A few favorites, chosen with feeling.</span>
        </p>
      </section>
      <section className="featured wrap reveal" id="editors-pick">
        <div className="featured-photo">
          <Photo
            src="/images/129888-backdrop.jpg"
            alt="Twenty Five Twenty One — a nostalgic story of youth"
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span className="photo-label">THE EDITOR’S PICK · 01</span>
        </div>
        <div className="featured-copy">
          <Cloud />
          <p className="eyebrow">SOME SUMMERS NEVER LEAVE YOU</p>
          <p className="featured-ko" lang="ko">
            스물다섯 스물하나
          </p>
          <h2>
            To being young.
            <br />
            To feeling <em>everything.</em>
          </h2>
          <p>
            A first love. An impossible dream. A moment you wish you could live
            in forever. Twenty Five Twenty One is a beautiful reminder of the
            people we were—and the ones who made us.
          </p>
          <div className="tags">
            <span>Coming of age</span>
            <span>Romance</span>
            <span>2022</span>
          </div>
          <Link className="button" href="/dramas/129888">
            Discover the story <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="section wrap">
        <SectionHeader
          title="A closer look, without the spoilers."
          kicker="REVIEWS & FIRST IMPRESSIONS"
          href="/reviews"
          label="Read the previews"
        />
        <div className="article-grid review-grid">
          {reviews.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <section className="actor-spotlight wrap">
        <ActorPortrait
          src={spotlight.portrait}
          alt={spotlight.name}
          sizes="(max-width: 650px) 45vw, 25vw"
        />
        <div>
          <p className="eyebrow">ACTOR SPOTLIGHT · FROM OUR COLLECTION</p>
          <h2>{spotlight.name}</h2>
          <p>
            Meet the performer behind {spotlight.character} in Twenty Five
            Twenty One. Explore the roles and stories recorded in our
            collection.
          </p>
          <Link
            className="text-link"
            href={`/actors/${slugify(spotlight.name)}`}
          >
            Meet the actor <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="section moods wrap reveal">
        <SectionTitle
          korean="오늘은 어떤 기분인가요?"
          title="There’s a drama for that feeling."
        />
        <div className="mood-grid">
          {moods.map(([name, ko, desc, id], i) => (
            <Link
              href={`/explore?genre=${encodeURIComponent(name)}`}
              key={name}
              className={`mood mood-${i}`}
            >
              <Photo src={`/images/${id}-backdrop.jpg`} alt="" />
              <div>
                <span lang="ko">{ko}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
              <Icon name="arrow" />
            </Link>
          ))}
        </div>
      </section>
      <section className="airing-section wrap reveal">
        <SectionTitle
          korean="지금 방영 중 · ON KOREAN TIME"
          title="A weekly little ritual."
          link="/calendar"
          label="Airing calendar"
        />
        {airing.length ? (
          <div className="poster-row">
            {airing.slice(0, 5).map((d) => (
              <div key={d.id}>
                <DramaCard drama={d} />
                <p className="air-date">
                  {d.nextEpisode
                    ? `Next episode · ${d.nextEpisode}`
                    : "Next episode date not announced"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="airing-empty">
            <span>◷</span>
            <p>
              No currently airing titles are verified in our collection.
              <br />
              <strong>
                In the meantime, a finished favorite is always a good idea.
              </strong>
            </p>
            <Link href="/explore" className="text-link">
              Find a complete story <Icon name="arrow" />
            </Link>
          </div>
        )}
      </section>
      <section className="culture-section" id="culture">
        <div className="wrap reveal">
          <SectionTitle
            korean="드라마 너머의 한국"
            title="A little piece of Korea."
            link="/culture"
            label="Wander a little"
          />
          <div className="culture-grid">
            <Link className="culture-art" href="/culture#hanok">
              <div className="culture-landscape">
                <Photo
                  src="/images/culture-hanok.webp"
                  alt="Traditional Korean hanok courtyard and tiled rooftops"
                  sizes="(max-width: 760px) 100vw, 40vw"
                />
              </div>
              <span className="eyebrow">PLACES WITH A SOUL</span>
              <h3>Slow mornings. Hanok rooftops.</h3>
              <p>
                Step into the quiet beauty of a traditional Korean home.{" "}
                <span>↗</span>
              </p>
            </Link>
            <div className="culture-letter">
              <span className="eyebrow">A WORD TO KEEP</span>
              <p className="korean-word" lang="ko">
                인연
              </p>
              <span>in-yeon · noun</span>
              <h3>
                Some connections
                <br />
                are written in the stars.
              </h3>
              <p>
                The Korean idea of a meaningful connection. The invisible thread
                that brings two lives together.
              </p>
              <Link className="text-link" href="/culture#language">
                Between the lines <Icon name="arrow" />
              </Link>
            </div>
            <Link className="culture-food" href="/culture#food">
              <div className="culture-food-image">
                <Photo
                  src="/images/culture-tea.webp"
                  alt="Korean tea served beside a hanok window"
                  sizes="(max-width: 760px) 100vw, 25vw"
                />
              </div>
              <span className="eyebrow">AT THE KOREAN TABLE</span>
              <h3>
                A little warmth,
                <br />
                one cup at a time.
              </h3>
              <p>The comforting rituals behind your favorite scenes. ↗</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="section wrap reveal">
        <SectionTitle
          korean="새로운 이야기를 기다리며"
          title="The next chapter."
          link="/calendar"
          label="Visit the calendar"
        />
        {upcoming.length ? (
          <div className="poster-row">
            {upcoming.slice(0, 5).map((d) => (
              <DramaCard key={d.id} drama={d} />
            ))}
          </div>
        ) : (
          <div className="schedule-note">
            <span className="schedule-mark">◷</span>
            <div>
              <h3>Good things are worth waiting for.</h3>
              <p>
                Our airing calendar and upcoming releases use verified
                schedules. There are no confirmed dates in this collection yet.
              </p>
            </div>
            <Link className="text-link" href="/explore">
              Discover a finished favorite <Icon name="arrow" />
            </Link>
          </div>
        )}
      </section>
      <Newsletter />
      <section className="closing closing-editorial wrap">
        <div className="closing-copy">
        <p className="eyebrow">EVERY DRAMA HAS A STORY. FIND YOURS.</p>
        <h2>
          Your next favorite story
          <br />
          is <em>waiting.</em>
        </h2>
        <Link href="/explore" className="button">
          Let’s find it <Icon name="arrow" />
        </Link>
        </div>
        <div className="closing-scene">
          <Photo src="/images/seoul-evening.webp" alt="An illustrated Seoul street at twilight, with warm lantern light and distant mountains" sizes="(max-width: 760px) 100vw, 50vw" />
          <span lang="ko">이야기가 시작되는 곳, 서울</span>
        </div>
      </section>
    </main>
  );
}
