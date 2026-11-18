import Link from "next/link";
import {
  articlePath,
  editorialAuthor,
  readingMinutes,
  type Article,
} from "@/lib/editorial";
import { editorialAssets } from "@/lib/assets";
import { siteUrl, pageMetadata } from "@/lib/seo";
import { getArticles } from "@/lib/content";
import { getDramas } from "@/lib/database";
import { Icon } from "./ui";
import { ArticleThumbnail, HeroImage, IllustrationAsset } from "./editorial-image";
import { StructuredData } from "./structured-data";
import { ShareArticle } from "./share-article";
export function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {items.map((item, i) => (
          <span key={item.href}>
            <span aria-hidden="true">/</span>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        ))}
      </nav>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { name: "Home", item: siteUrl },
            ...items.map((i) => ({ name: i.label, item: siteUrl + i.href })),
          ].map((i, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...i,
          })),
        }}
      />
    </>
  );
}
export function SectionHeader({
  title,
  kicker,
  href,
  label = "Read the journal",
}: {
  title: string;
  kicker: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}
export function ArticleCard({
  article,
  lead = false,
}: {
  article: Article;
  lead?: boolean;
}) {
  return (
    <article className={`article-card ${lead ? "article-lead" : ""}`}>
      <Link href={articlePath(article)} aria-label={article.title}>
        <ArticleThumbnail
          src={article.image.src}
          alt={article.image.alt}
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </Link>
      <div className="article-card-copy">
        <p className="eyebrow">{article.category}</p>
        <h3>
          <Link href={articlePath(article)}>{article.title}</Link>
        </h3>
        <p>{article.description}</p>
        <div className="article-byline">
          <span>{editorialAuthor.name}</span>
          <span>{readingMinutes(article)} min read</span>
        </div>
      </div>
    </article>
  );
}
export async function EditorialListing({
  kind,
  title,
  description,
}: {
  kind: "news" | "reviews" | "journal";
  title: string;
  description: string;
}) {
  const items = (await getArticles()).filter((a) =>
    kind === "news"
      ? a.kind === "news"
      : kind === "reviews"
        ? a.kind === "review" || a.kind === "episode-review"
        : a.kind === "feature" || a.kind === "soundtrack",
  );
  return (
    <main id="main" className="wrap inner-page">
      <Breadcrumbs items={[{ label: kind, href: `/${kind}` }]} />
      <div className="page-heading">
        <p className="eyebrow">THE SEOULSCENE JOURNAL</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {kind === "news" ? (
        <>
          <nav className="category-nav" aria-label="News categories">
            {Array.from(new Set(items.map((a) => a.category))).map(
              (category) => (
                <a
                  key={category}
                  href={`#category-${category.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {category}
                </a>
              ),
            )}
          </nav>
          {Array.from(new Set(items.map((a) => a.category))).map((category) => (
            <section
              className="section"
              id={`category-${category.toLowerCase().replaceAll(" ", "-")}`}
              key={category}
            >
              <SectionHeader title={category} kicker="FROM THE NEWS DESK" />
              <div className="article-grid">
                {items
                  .filter((a) => a.category === category)
                  .map((a) => (
                    <ArticleCard key={a.slug} article={a} lead />
                  ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        <div className="article-grid">
          {items.map((a, i) => (
            <ArticleCard key={a.slug} article={a} lead={i === 0} />
          ))}
        </div>
      )}
    </main>
  );
}
export function articleMetadata(article: Article) {
  const base = pageMetadata(
    article.title,
    article.description,
    articlePath(article),
  );
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article" as const,
      publishedTime: article.publishedAt,
      authors: [editorialAuthor.name],
    },
    authors: [{ name: editorialAuthor.name }],
    category: article.category,
  };
}
export async function ArticlePage({ article }: { article: Article }) {
  const drama = getDramas().find((d) => d.id === article.dramaId);
  const others = (await getArticles())
    .filter((a) => a.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.kind === article.kind) - Number(a.kind === article.kind),
    )
    .slice(0, 2);
  const section = articlePath(article).split("/")[1];
  return (
    <main id="main" className="wrap inner-page article-page">
      <Breadcrumbs
        items={[
          { label: section, href: `/${section}` },
          { label: article.title, href: articlePath(article) },
        ]}
      />
      <header className="article-heading">
        <p className="eyebrow">
          {article.category} ·{" "}
          {article.kind === "news" ? "SOURCED BRIEF" : "THE SEOULSCENE JOURNAL"}
        </p>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.description}</p>
        <div className="article-byline">
          <a href="#author">{editorialAuthor.name}</a>
          <time dateTime={article.publishedAt}>
            {dateLabel(article.publishedAt)}
          </time>
          <span>{readingMinutes(article)} min read</span>
        </div>
      </header>
      <HeroImage
        src={article.image.src}
        alt={article.image.alt}
        credit="Photo: Unsplash · Editorial mood photography"
        sizes="(max-width: 900px) 100vw, 1100px"
      />
      <div className="article-layout">
        <article className="article-content">
          {article.disclosure && (
            <aside className="editorial-disclosure">{article.disclosure}</aside>
          )}
          {article.blocks.map((block, i) => {
            if (block.type === "heading") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
            if (block.type === "quote")
              return <blockquote key={i}>{block.text}</blockquote>;
            if (block.type === "list")
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            if (block.type === "image")
              return (
                <HeroImage
                  key={i}
                  src={editorialAssets[block.asset].src}
                  alt={block.alt}
                  caption={block.caption}
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
              );
            if (block.type === "media")
              return /^https:\/\//.test(block.url) ? (
                <p key={i}>
                  <a href={block.url} rel="noreferrer" target="_blank">
                    {block.title} ↗
                  </a>
                </p>
              ) : null;
            return null;
          })}
          {article.pros && (
            <section className="review-notes">
              <h2>What draws us in</h2>
              <ul>
                {article.pros.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <h2>Before you choose it</h2>
              <ul>
                {article.considerations?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p>
                Editorial score: not assigned. Community scores are labeled
                separately on the drama profile.
              </p>
            </section>
          )}
          {article.sources && (
            <section className="article-sources">
              <h2>Sources & verification</h2>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title} ↗
                    </a>
                    {source.date && (
                      <span> · Source published {dateLabel(source.date)}</span>
                    )}
                  </li>
                ))}
              </ul>
              <p>
                Source-linked archive summary, checked 17 November 2026.
                Promotional artwork has not been reproduced.
              </p>
            </section>
          )}
          <ShareArticle title={article.title} />
          <section id="author" className="author-profile">
            <p className="eyebrow">ABOUT THE AUTHOR</p>
            <h2>{editorialAuthor.name}</h2>
            <p>{editorialAuthor.description}</p>
            <Link className="text-link" href="/about">
              Our editorial approach <Icon name="arrow" />
            </Link>
          </section>
        </article>
        <aside className="article-sidebar">
          <p className="eyebrow">KEEP EXPLORING</p>
          {drama ? (
            <>
              <h2>{drama.title}</h2>
              <p>
                {drama.year} · {drama.episodes} episodes
              </p>
              <Link className="text-link" href={`/dramas/${drama.id}`}>
                Explore the drama <Icon name="arrow" />
              </Link>
            </>
          ) : (
            <>
              <h2>Stories beyond the screen.</h2>
              <Link className="text-link" href="/culture">
                Explore Korean culture <Icon name="arrow" />
              </Link>
            </>
          )}
          <div className="tags">
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      </div>
      <section className="section">
        <SectionHeader
          title="A little more to linger over."
          kicker="RELATED STORIES"
        />
        <div className="article-grid related-articles">
          {others.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": article.kind === "news" ? "NewsArticle" : "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
          author: {
            "@type": "Organization",
            name: editorialAuthor.name,
            url: siteUrl + "/about",
          },
          publisher: {
            "@type": "Organization",
            name: "SeoulScene",
            url: siteUrl,
          },
          mainEntityOfPage: siteUrl + articlePath(article),
          image: siteUrl + article.image.src,
        }}
      />
    </main>
  );
}
export function Newsletter() {
  const raw = process.env.NEWSLETTER_SIGNUP_URL;
  let signup: string | undefined;
  try {
    if (raw && new URL(raw).protocol === "https:") signup = raw;
  } catch {}
  return (
    <section className="newsletter wrap">
      <IllustrationAsset name="cloud" />
      <div>
        <p className="eyebrow">LET THE NEXT STORY FIND YOU</p>
        <h2>A little Seoul in your inbox.</h2>
        <p>
          {signup
            ? "Join the SeoulScene letter through our newsletter provider. Subscription and privacy details are available there."
            : "Our editorial letter is taking shape. Subscriptions are not open yet; for now, read the journal at your own pace."}
        </p>
      </div>
      {signup ? (
        <a className="button" href={signup} target="_blank" rel="noreferrer">
          Subscribe to the letter <Icon name="arrow" />
        </a>
      ) : (
        <Link className="button" href="/journal">
          Read the journal <Icon name="arrow" />
        </Link>
      )}
    </section>
  );
}
