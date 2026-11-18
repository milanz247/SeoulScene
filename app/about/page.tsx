import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Blossom, Cloud } from "@/components/art";
import { Icon } from "@/components/ui";
export const metadata = pageMetadata(
  "About SeoulScene",
  "An independent Korean drama and culture journal with sourced metadata and transparent editorial notes.",
  "/about",
);
export default function Page() {
  return (
    <main id="main" className="about-page">
      <section className="about-cover wrap">
        <div className="page-heading">
          <p className="eyebrow">서울씬 · OUR LITTLE CORNER OF THE WORLD</p>
          <h1>
            For the stories
            <br />
            that <em>stay.</em>
          </h1>
          <p>
            A love letter to Korean drama, the people who bring it to life, and
            everything we discover along the way.
          </p>
        </div>
        <div className="about-art">
          <Blossom />
          <Cloud />
          <span lang="ko">
            이야기가
            <br />
            머무는 곳
          </span>
        </div>
      </section>
      <section className="about-intro wrap">
        <p className="eyebrow">A LITTLE SEOUL. A LOT OF FEELING.</p>
        <h2>
          Some stories end.
          <br />
          The good ones stay with us.
        </h2>
        <div>
          <p>
            SeoulScene is an independent discovery journal for Korean dramas and
            the culture that makes them special. We believe finding your next
            favorite story should feel as lovely as watching it.
          </p>
          <p>
            We pair a small, thoughtfully selected drama collection with
            editorial previews, source-linked industry notes, and glimpses of
            Korean words, places, and everyday rituals. Save a title, explore a
            new genre, or simply wander.
          </p>
        </div>
      </section>
      <section className="about-values wrap">
        <article className="about-value">
          <Icon name="drama" />
          <p className="eyebrow">01 · THE COLLECTION</p>
          <h2>Chosen with feeling.</h2>
          <p>
            A thoughtful starting point for your next watch, with stories across
            romance, fantasy, history, and everyday life.
          </p>
          <Link href="/dramas" className="text-link">
            Find your story <Icon name="arrow" />
          </Link>
        </article>
        <article className="about-value">
          <Icon name="journal" />
          <p className="eyebrow">02 · THE JOURNAL</p>
          <h2>A little more context.</h2>
          <p>
            Original features, clearly labeled premise previews, and archive
            news briefs that link back to their sources.
          </p>
          <Link href="/journal" className="text-link">
            Take a closer look <Icon name="arrow" />
          </Link>
        </article>
        <article className="about-value">
          <Icon name="culture" />
          <p className="eyebrow">03 · BEYOND THE SCREEN</p>
          <h2>Closer to Korea.</h2>
          <p>
            The places, words, and small moments that give our favorite scenes
            their soul. A quiet invitation to explore.
          </p>
          <Link href="/culture" className="text-link">
            Wander with us <Icon name="arrow" />
          </Link>
        </article>
      </section>
      <section className="about-contact wrap" id="contact">
        <div>
          <p className="eyebrow">KEEPING OUR STORIES HONEST</p>
          <h2>A note on our collection.</h2>
        </div>
        <div>
          <p>
            Drama metadata and cast credits come from TMDB. Community ratings
            are labeled, and unverified details are left open. This is a curated
            collection, with archive news clearly distinguished from current
            coverage.
          </p>
          <p>
            Spotted something that needs a second look? Suggest metadata
            corrections on the linked TMDB drama page. Contact submissions are
            not collected here.
          </p>
          <Link href="/credits" className="text-link">
            Our sources & credits <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </main>
  );
}
