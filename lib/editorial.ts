export type PublicationState = "draft" | "scheduled" | "published" | "archived";
export type ArticleKind =
  "review" | "episode-review" | "news" | "feature" | "soundtrack";
export type ContentBlock =
  | { type: "paragraph" | "heading" | "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; asset: "landscape"; alt: string; caption: string }
  | { type: "media"; title: string; url: string };
export type Article = {
  slug: string;
  kind: ArticleKind;
  title: string;
  description: string;
  category: string;
  tags: string[];
  state: PublicationState;
  publishedAt: string;
  featured?: boolean;
  dramaId?: number;
  disclosure?: string;
  sources?: { title: string; url: string; date?: string }[];
  pros?: string[];
  considerations?: string[];
  blocks: ContentBlock[];
};
export const editorialAuthor = {
  name: "SeoulScene Editorial",
  description:
    "The SeoulScene desk: drama discovery, cultural context, and clearly sourced reading notes. Opinions are identified separately from catalog facts.",
};
export const articles: Article[] = [
  {
    slug: "queen-of-tears-a-love-already-lived",
    kind: "review",
    state: "published",
    title: "A love already lived in.",
    description:
      "A spoiler-free look at the premise of Queen of Tears, where romance starts with a relationship already under strain.",
    category: "First impressions",
    tags: ["Romance", "Queen of Tears"],
    dramaId: 215720,
    publishedAt: "2026-11-17T00:00:00Z",
    featured: true,
    disclosure:
      "Premise-based editorial preview, not a scored review of the complete series. No plot outcomes or episode spoilers.",
    pros: [
      "An established relationship gives the romantic premise immediate history.",
      "A reversal of social expectations offers an interesting point of tension.",
    ],
    considerations: [
      "Marital conflict may feel heavier than a light romantic comedy.",
      "This preview does not assess the ending or the complete series.",
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Romance often begins at the first meeting. The premise of Queen of Tears offers a different invitation: enter a marriage when familiarity has become complicated, and ask what it might mean to choose each other again. That change in starting point is its most intriguing promise.",
      },
      { type: "heading", text: "The space between knowing and understanding" },
      {
        type: "paragraph",
        text: "The catalog synopsis places a department-store heiress and her husband at a moment of marital crisis. Wealth can organize the world around a couple without helping them understand one another. As a premise, that contrast creates room for both social comedy and a more intimate question: how much of the person beside us do we stop seeing?",
      },
      {
        type: "quote",
        text: "A second beginning asks something different of romance: attention, rather than discovery.",
      },
      {
        type: "paragraph",
        text: "Our interest here is in that framing, rather than a verdict on individual episodes. If you are looking for a relationship story that begins after the conventional happy ending, the premise offers a compelling place to start. If you want a gentle evening without emotional conflict, read the synopsis before making this your next watch.",
      },
      { type: "heading", text: "Before you press play" },
      {
        type: "list",
        items: [
          "This is a 2024 series in the current catalog.",
          "The collection lists 16 episodes.",
          "Community ratings on the drama page come from TMDB; this essay assigns no editorial score.",
        ],
      },
    ],
  },
  {
    slug: "twenty-five-twenty-one-the-shape-of-a-dream",
    kind: "review",
    state: "published",
    title: "The shape of a dream.",
    description:
      "Youth, ambition, and uncertainty: a spoiler-free reading of the premise behind Twenty Five Twenty One.",
    category: "First impressions",
    tags: ["Coming of age", "Romance"],
    dramaId: 129888,
    publishedAt: "2026-11-17T00:00:00Z",
    disclosure:
      "Premise-based editorial preview. We do not claim a complete-series screening or assign a review score.",
    pros: [
      "Sport gives personal ambition a concrete, everyday form.",
      "The coming-of-age premise connects private hopes with an uncertain world.",
    ],
    considerations: [
      "Youth and romance do not necessarily promise a comforting outcome.",
      "No ending, soundtrack credits, or episode-level judgments are evaluated here.",
    ],
    blocks: [
      {
        type: "paragraph",
        text: "There is something immediately legible about a young athlete's ambition. A dream becomes a practice, a timetable, a body learning the same movement again. Twenty Five Twenty One begins, in its synopsis, with a teen fencer pursuing that ambition when the world makes it feel out of reach.",
      },
      { type: "heading", text: "Growing up alongside uncertainty" },
      {
        type: "paragraph",
        text: "The other life in that synopsis belongs to a young man trying to rebuild. Put these two starting points together and the appeal becomes clear: a story can make room for hope without pretending that effort controls everything. Our editorial interest is in the relationship between those scales, the private dream and the larger circumstance.",
      },
      {
        type: "quote",
        text: "An ambition is also a way of imagining who you might become.",
      },
      {
        type: "paragraph",
        text: "For viewers choosing a first coming-of-age drama, this is a premise worth considering. We would approach it for the questions it opens about youth, work, and companionship, rather than treating nostalgia as a guarantee of an uncomplicated watch. This note deliberately stops at the premise; the episodes should be allowed to unfold on their own terms.",
      },
      {
        type: "paragraph",
        text: "The current collection lists the series as a 2022 release with 16 episodes. Follow the drama profile for cast names and source metadata, and use the related genre links to find other stories with a similar starting point.",
      },
    ],
  },
  {
    slug: "netflix-busan-2026-series-selection",
    kind: "news",
    state: "published",
    title: "From the archive: Korean series in Netflix’s Busan selection.",
    description:
      "A source-linked brief on Netflix’s September announcement for the 31st Busan International Film Festival.",
    category: "Industry",
    tags: ["Busan", "Industry"],
    publishedAt: "2026-11-17T00:00:00Z",
    featured: true,
    sources: [
      {
        title: "Netflix announcement: five titles at the 31st BIFF",
        url: "https://about.netflix.com/en/news/netflix-at-31st-busan-international-film-festival",
        date: "2026-09-02",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "In an announcement dated 2 September 2026, Netflix included Dead-End Job and The Blue Road in the On Screen section of its selection for the 31st Busan International Film Festival. The company’s five-title selection also included films.",
      },
      { type: "heading", text: "What the announcement establishes" },
      {
        type: "paragraph",
        text: "The announcement describes Dead-End Job as a mystery, fantasy and horror series, and The Blue Road as a cross-border crime thriller. This brief records that festival announcement; it does not infer streaming availability or a release date from a festival selection.",
      },
      {
        type: "paragraph",
        text: "Read the original source below for the complete selection. This is an archive brief compiled by SeoulScene, not live festival coverage or an independent review of the selected titles.",
      },
    ],
  },
  {
    slug: "reading-netflix-korea-2026-slate",
    kind: "news",
    state: "published",
    title: "A reading guide to Netflix Korea’s 2026 slate announcement.",
    description:
      "What the January announcement says—and why an announced title is not the same as a confirmed release date.",
    category: "Announcements",
    tags: ["Industry", "Netflix"],
    publishedAt: "2026-11-17T00:00:00Z",
    sources: [
      {
        title: "Netflix Korea 2026 slate announcement",
        url: "https://about.netflix.com/en/news/next-on-netflix-korea-2026",
        date: "2026-01-21",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Netflix published its Korean slate announcement on 21 January 2026, organizing the selection around a range of emotional experiences. The announcement spans series, films and unscripted programs, rather than offering a drama-only release calendar.",
      },
      { type: "heading", text: "A slate is an introduction" },
      {
        type: "paragraph",
        text: "The source introduces romantic, suspenseful and character-led stories. An announcement can explain a project’s premise without establishing a release date for every region. We therefore keep this archive brief separate from SeoulScene’s verified upcoming-drama list.",
      },
      {
        type: "paragraph",
        text: "For the full list and the provider’s descriptions, consult the original announcement. Availability and later updates should be checked with the provider; this brief does not present the January slate as breaking news.",
      },
    ],
  },
  {
    slug: "a-little-space-between-episodes",
    kind: "feature",
    state: "published",
    title: "A little space between episodes.",
    description:
      "An editorial invitation to slow down, notice a frame, and make a small ritual of the stories we keep.",
    category: "The journal",
    tags: ["Culture", "Viewing rituals"],
    publishedAt: "2026-11-17T00:00:00Z",
    blocks: [
      {
        type: "paragraph",
        text: "An episode ends, and the next one is already waiting. Sometimes the loveliest response is to let it wait a little longer. Give a scene time to settle. Notice the shape of a doorway, a cup left on a table, the light across an empty room.",
      },
      {
        type: "image",
        asset: "landscape",
        alt: "Original Korean-inspired mountain landscape with blossoms and a hanok pavilion",
        caption:
          "Original SeoulScene landscape illustration; an interpretation, not a historical painting or drama still.",
      },
      { type: "heading", text: "Make room for the frame" },
      {
        type: "paragraph",
        text: "A viewing ritual needs no elaborate rules. Tea, a quieter room, and a moment without a second screen are enough. The point is not to watch correctly. It is to leave yourself a little space to feel what a story is doing.",
      },
      { type: "quote", text: "Not every meaningful moment announces itself." },
      {
        type: "paragraph",
        text: "Our culture journal starts with that kind of attention. When a drama makes you curious about a word, a place, or an everyday practice, follow the curiosity to a good source. A fictional scene can be an invitation to learn, without being a complete explanation of a culture.",
      },
    ],
  },
  {
    slug: "listening-to-a-scene",
    kind: "soundtrack",
    state: "published",
    title: "Listening to a scene.",
    description:
      "A short editorial note on soundtracks, memory, and finding the official credits behind a song.",
    category: "Sound & story",
    tags: ["OST", "Culture"],
    publishedAt: "2026-11-17T00:00:00Z",
    blocks: [
      {
        type: "paragraph",
        text: "A melody can become a shortcut to a fictional place. Long after a scene has ended, a few notes can bring back its atmosphere. That is one reason to pay attention to a drama’s soundtrack as part of its storytelling, rather than simply as background.",
      },
      { type: "heading", text: "Follow the credits" },
      {
        type: "list",
        items: [
          "Look for the official soundtrack release or the episode’s music credits.",
          "Distinguish an original soundtrack recording from a cover or an unofficial upload.",
          "Use an authorized listening service and check the artist and label information.",
          "A song link is not permission to host its audio, lyrics, or cover artwork.",
        ],
      },
      {
        type: "paragraph",
        text: "This journal does not invent track credits or embed unlicensed audio. Future soundtrack profiles will identify the official release, performers and source before offering song-specific commentary.",
      },
    ],
  },
];
export function visibleArticles(items: Article[], now: Date) {
  return items
    .filter(
      (a) =>
        (a.state === "published" || a.state === "scheduled") &&
        Number.isFinite(Date.parse(a.publishedAt)) &&
        Date.parse(a.publishedAt) <= now.getTime(),
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
export function articlePath(article: Pick<Article, "kind" | "slug">) {
  return `/${article.kind === "review" || article.kind === "episode-review" ? "reviews" : article.kind === "news" ? "news" : "journal"}/${article.slug}`;
}
export function readingMinutes(article: Article) {
  const words = article.blocks
    .map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : ""))
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
export { slugify } from "./slug.ts";
