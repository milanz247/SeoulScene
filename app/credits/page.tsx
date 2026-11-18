import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
export const metadata = pageMetadata(
  "Credits & sources",
  "Image provenance, metadata sources, licenses and credits for SeoulScene.",
  "/credits",
);
export default function Page() {
  return (
    <main id="main" className="wrap inner-page prose">
      <div className="page-heading">
        <p className="eyebrow">WITH GRATITUDE · 감사합니다</p>
        <h1>
          Behind the <em>scenes.</em>
        </h1>
      </div>
      <h2>Drama metadata & photography</h2>
      <a href="https://www.themoviedb.org/">
        <Image
          className="tmdb-logo"
          src="/images/tmdb.svg"
          width={154}
          height={20}
          alt="The Movie Database (TMDB)"
        />
      </a>
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <p>
        Drama synopses, titles, posters, backdrops, and actor portraits are
        sourced from{" "}
        <a href="https://www.themoviedb.org/">The Movie Database</a>. Images
        belong to their respective copyright holders. Local reference metadata
        was retrieved on November 17, 2026; this curated collection is not a
        live popularity chart.
      </p>
      <h2>2025–2026 catalog</h2>
      <p>
        The expanded catalog uses <a href="https://www.tvmaze.com/">TVmaze</a>{" "}
        metadata under{" "}
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          CC BY-SA 4.0
        </a>
        , retrieved 18 November 2026. Source links appear on every drama.
        Descriptions are retained from TVmaze, and episode counts represent
        listed episodes. Cached posters, backdrops and cast portraits belong to
        their respective rights holders. Missing backdrops use the title’s own
        poster.
      </p>
      <h2>Original illustration & design</h2>
      <p>
        The cloud, plum blossom, mountain, and architectural vector
        illustrations were created for SeoulScene. The panoramic Korean
        landscape was generated with OpenAI’s image generation tool for this
        project; it is an original interpretation rather than a reproduction of
        historical art.
      </p>
      <h2>Typography & inspiration</h2>
      <p>
        Navigation underline motion is adapted from{" "}
        <a href="https://lucianlabs.dev/uxui-prompt/#373">
          Lucian UX/UI Prompt #373 · Five underline hovers
        </a>{" "}
        by Seokwoooo, used under the MIT License.
      </p>
      <p>
        Hero and viewport entrances adapt{" "}
        <a href="https://lucianlabs.dev/uxui-prompt/#216">
          #216 Staggered hero entrance
        </a>{" "}
        and{" "}
        <a href="https://lucianlabs.dev/uxui-prompt/#251">
          #251 Staggered scroll-in feature cards
        </a>{" "}
        by Seokwoooo under the MIT License. Existing layouts are retained;
        viewport entrances play once and respect reduced motion.
      </p>
      <p>
        Playfair Display, DM Sans, and Gowun Batang are sourced from{" "}
        <a href="https://fonts.google.com/">Google Fonts</a> under their open
        font licenses. Cultural reference research included{" "}
        <a href="https://english.visitkorea.or.kr/">VisitKorea</a>,{" "}
        <a href="https://www.koreana.or.kr/koreana/na/ntt/selectNttInfo.do?bbsId=1114&nttSn=52800">
          Koreana’s writing on minhwa
        </a>
        , and Korean design work on{" "}
        <a href="https://dribbble.com/search/korean">Dribbble</a>. No reference
        artwork or website layout was copied.
      </p>
    </main>
  );
}
