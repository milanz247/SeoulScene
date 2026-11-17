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
import { Blossom, Cloud, Landscape } from "@/components/art";
import { DramaCard, Icon, Photo } from "@/components/ui";
const moods = [
  ["Romance", "설레는 순간", "For the butterflies", "215720"],
  ["Historical", "시간을 넘어", "Escape to another era", "135157"],
  ["Fantasy", "상상 그 너머", "A little beyond reality", "67915"],
  ["Comedy", "웃음이 필요할 때", "Something to smile about", "154825"],
  ["Slice of Life", "우리의 일상", "Find beauty in the everyday", "129888"],
];
export function SectionTitle({
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
  const queen = dramas.find((d) => d.id === 215720)!;
  const picks = [215720, 129888, 94796, 67915, 154825].map((id) =>
    dramas.find((d) => d.id === id)!,
  );
  return (
    <main id="main">
      <section className="hero u216">
        <Blossom className="hero-blossom" />
        <Cloud className="hero-cloud" />
        <div className="hero-grid wrap">
          <div className="hero-copy">
            <p
              className="eyebrow"
              data-s
              style={{ "--d": 180 } as React.CSSProperties}
            >
              <span className="tiny-flower">✳</span> A LITTLE SEOUL. A LOT OF
              FEELING.
            </p>
            <h1>
              <span className="u216-w">
                <span style={{ "--d": 300 } as React.CSSProperties}>Some</span>
              </span>{" "}
              <span className="u216-w">
                <span style={{ "--d": 370 } as React.CSSProperties}>
                  stories
                </span>
              </span>
              <br />
              <span className="u216-w">
                <span style={{ "--d": 440 } as React.CSSProperties}>stay</span>
              </span>{" "}
              <em className="u216-w">
                <span style={{ "--d": 510 } as React.CSSProperties}>
                  with you.
                </span>
              </em>
            </h1>
            <p
              className="hero-korean"
              lang="ko"
              data-s
              style={{ "--d": 550 } as React.CSSProperties}
            >
              당신의 마음에 머무는 이야기
            </p>
            <p
              className="hero-description"
              data-s
              style={{ "--d": 620 } as React.CSSProperties}
            >
              Fall in love with stories from Seoul.
              <br />
              Your beautiful little corner of the K-Drama universe.
            </p>
            <div
              className="hero-buttons"
              data-s
              style={{ "--d": 760 } as React.CSSProperties}
            >
              <Link className="button" href="/explore">
                Find your next drama <Icon name="arrow" />
              </Link>
              <Link className="soft-link" href="#editors-pick">
                <span className="play-small">▷</span> The editor’s pick
              </Link>
            </div>
            <div
              className="hero-note"
              data-s
              style={{ "--d": 900 } as React.CSSProperties}
            >
              <span className="drawn-heart">♡</span>
              <span>
                For the late-night watchers.
                <br />
                The daydreamers. The just-one-more-episode people.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <Photo
                src={queen.backdrop}
                alt="Kim Soo-hyun and Kim Ji-won in Queen of Tears"
                priority
                sizes="(max-width: 650px) calc(100vw - 70px), (max-width: 1150px) calc(52.4vw - 60px), (max-width: 1340px) calc(52.4vw - 90px), 612px"
              />
              <div className="hero-image-shade" />
              <span className="vertical-note">오늘도, 드라마처럼</span>
              <div className="hero-film-caption">
                <span className="eyebrow">IN THE SPOTLIGHT</span>
                <h2>Queen of Tears</h2>
                <p>
                  눈물의 여왕 <span>2024 · Romance</span>
                </p>
                <Link
                  href={`/dramas/${queen.id}`}
                  className="round-link"
                  aria-label="Discover Queen of Tears"
                >
                  <Icon name="arrow" />
                </Link>
              </div>
            </div>
            <span className="editor-stamp">
              A STORY
              <br />
              WORTH
              <br />
              <em>feeling.</em>
            </span>
            <span className="hero-image-foot">
              01 — A LOVE THAT FINDS ITS WAY BACK
            </span>
            <Link className="hero-issue" href={`/dramas/${queen.id}`}>
              THE SPOTLIGHT ↗
            </Link>
          </div>
        </div>
        <Landscape />
        <span className="hero-bottom-label">YOUR NEXT CHAPTER STARTS HERE</span>
      </section>
      <div className="editorial-strip wrap">
        <span>좋은 이야기는 오래 남으니까</span>
        <p>Good stories linger. Let’s find one that feels like you.</p>
        <span className="strip-flower">✳</span>
      </div>
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
                <Landscape />
                <Cloud />
                <span className="moon-disc" />
                <div className="hanok">
                  <span />
                  <i />
                  <i />
                  <i />
                </div>
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
              <span className="eyebrow">AT THE KOREAN TABLE</span>
              <div className="tea-art">
                <div className="tea-cup" />
                <span className="tea-steam">~</span>
                <div className="tea-leaf" />
              </div>
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
      <section className="closing">
        <Cloud className="closing-cloud" />
        <span className="moon-disc" />
        <p className="eyebrow">EVERY DRAMA HAS A STORY. FIND YOURS.</p>
        <h2>
          Your next favorite story
          <br />
          is <em>waiting.</em>
        </h2>
        <Link href="/explore" className="button">
          Let’s find it <Icon name="arrow" />
        </Link>
        <Landscape />
      </section>
    </main>
  );
}
