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
  image: { src: string; alt: string; credit?: string };
  category: string;
  tags: string[];
  state: PublicationState;
  publishedAt: string;
  featured?: boolean;
  checkedAt?: string;
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
    slug: "tantara-december-2026-release-guide",
    kind: "news",
    state: "published",
    title: "Tantara sets its sights on December.",
    description:
      "Song Hye-kyo and Gong Yoo lead Netflix’s forthcoming entertainment-industry drama. Here is the announced three-part release plan.",
    category: "Release news",
    tags: ["Tantara", "Netflix", "2026"],
    publishedAt: "2026-11-18T08:00:00Z",
    checkedAt: "2026-11-18T00:00:00Z",
    image: {
      src: "/images/news-tantara.webp",
      alt: "Official Tantara teaser thumbnail from Netflix",
      credit: "Netflix · Official teaser artwork",
    },
    sources: [
      {
        title: "Netflix — Tantara teaser trailer and release announcement",
        url: "https://about.netflix.com/en/news/tantara-teaser-trailer",
        date: "2026-11-13T00:00:00Z",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Netflix has announced a December 11 premiere for Tantara. The period series follows people pursuing success in Korea’s entertainment business between the 1960s and 1980s.",
      },
      { type: "heading", text: "Three Fridays, one unfolding story" },
      {
        type: "list",
        items: [
          "December 11 — episodes 1–8.",
          "December 18 — episodes 9–15.",
          "December 25 — episodes 16–22.",
        ],
      },
      {
        type: "paragraph",
        text: "The cast includes Song Hye-kyo, Gong Yoo, Kim Seol-hyun and Cha Seung-won. Writer Noh Hee-gyoung and director Lee Yoon-jung are behind the production. Netflix’s November 13 announcement includes the teaser. Follow the source for the current schedule and regional availability.",
      },
    ],
  },
  {
    slug: "november-2026-korean-drama-watchlist",
    kind: "news",
    state: "published",
    title: "November’s next stories are taking shape.",
    description:
      "A source-linked look at November’s fantasy, comedy and historical drama premieres, with more releases still ahead.",
    category: "Monthly guide",
    tags: ["November 2026", "Upcoming", "Premieres"],
    dramaId: -90035,
    publishedAt: "2026-11-18T07:00:00Z",
    checkedAt: "2026-11-18T00:00:00Z",
    image: {
      src: "/images/catalog/90035-backdrop.webp",
      alt: "The Remarried Empress promotional artwork",
      credit:
        "Promotional artwork via TVmaze · Rights belong to the respective owners",
    },
    sources: [
      {
        title: "Soompi — November 2026 Korean drama premiere guide",
        url: "https://www.soompi.com/article/1883792wpp/14-new-k-dramas-to-watch-in-november-2026",
        date: "2026-11-03T00:00:00Z",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Soompi’s November guide brings together a broad selection of Korean premieres. The Remarried Empress introduces a fantasy-romance setting, while Francesca Next Door brings vampire comedy to the lineup.",
      },
      { type: "heading", text: "Different moods for the month" },
      {
        type: "paragraph",
        text: "Happy Anding follows struggling comedians. Sword & Silence turns toward the history of Silla. Later in the month, the guide lists The Blue Road and Good Partner 2 for November 20, followed by Nine to Six on November 25.",
      },
      {
        type: "paragraph",
        text: "These are dates reported in the November 3 guide. Check the linked publisher or broadcaster before planning a watch, as release timing and streaming access can vary.",
      },
    ],
  },
  {
    slug: "netflix-korea-ten-years-creators-2026",
    kind: "news",
    state: "published",
    title: "Ten years of Korean stories, and the creators behind them.",
    description:
      "Netflix’s October celebration in Seoul put Korean filmmakers, production teams and the next wave of stories in focus.",
    category: "Industry",
    tags: ["Korean creators", "Netflix", "2026"],
    publishedAt: "2026-11-18T06:00:00Z",
    checkedAt: "2026-11-18T00:00:00Z",
    image: {
      src: "/images/news-creators.webp",
      alt: "Korean creators and Netflix representatives on stage at the October 2026 anniversary event",
      credit: "Netflix · Official event photography",
    },
    sources: [
      {
        title: "Netflix — A decade built with Korean creators",
        url: "https://about.netflix.com/en/news/netflix-korea-10th-anniversary",
        date: "2026-10-24T00:00:00Z",
      },
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Netflix marked ten years in Korea with a Seoul fan event held on October 24 and 25. Its official account highlighted the writers, directors and production specialists behind Korean series, alongside previews of forthcoming work.",
      },
      { type: "heading", text: "The work beyond the cast" },
      {
        type: "paragraph",
        text: "The announcement discusses opportunities for first-time directors and writers, as well as the contribution of lighting, color, localization and accessibility teams. It also names Tantara and All of Us Are Dead Season 2 among projects previewed at the celebration.",
      },
      {
        type: "paragraph",
        text: "For viewers, the event offers a look at the people shaping what reaches the screen. The linked Netflix report contains the company’s figures and statements in their original context.",
      },
    ],
  },
  {
    slug: "queen-of-tears-a-love-already-lived",
    image: {
      src: "/images/215720-backdrop.jpg",
      alt: "Kim Soo-hyun and Kim Ji-won in Queen of Tears",
      credit: "Drama artwork via TMDB · Rights belong to the respective owners",
    },
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
    image: {
      src: "/images/129888-backdrop.jpg",
      alt: "Kim Tae-ri and Nam Joo-hyuk in Twenty Five Twenty One",
      credit: "Drama artwork via TMDB · Rights belong to the respective owners",
    },
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
    image: {
      src: "/images/busan-cinema.webp",
      alt: "An illustrated cinema glowing beside a rain-soaked street overlooking Busan harbor",
      credit: "AI-generated editorial illustration for SeoulScene",
    },
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
    image: { src: "/images/article-film.jpg", alt: "Film camera equipment" },
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
    image: {
      src: "/images/seoul-reading-window.webp",
      alt: "A reader sits at a hanok bookshop window overlooking Seoul at dusk",
      credit: "AI-generated editorial illustration for SeoulScene",
    },
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
    image: {
      src: "/images/seoul-soundtrack.webp",
      alt: "A vinyl record spins beside an apartment window overlooking Seoul at sunset",
      credit: "AI-generated editorial illustration for SeoulScene",
    },
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
