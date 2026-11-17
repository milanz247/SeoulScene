import { Blossom, Cloud, Landscape } from "@/components/art";
export const metadata = { title: "A little piece of Korea" };
export default function Page() {
  return (
    <main id="main" className="wrap inner-page">
      <div className="page-heading">
        <p className="eyebrow">한국 문화 · BEYOND THE SCREEN</p>
        <h1>
          A little closer to <em>Korea.</em>
        </h1>
        <p>
          The places, words, and small everyday rituals that give our favorite
          stories their soul.
        </p>
      </div>
      <section className="culture-article" id="hanok">
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
        <div>
          <p className="eyebrow">한옥 · PLACES WITH A SOUL</p>
          <h2>
            Slow mornings.
            <br />
            Hanok rooftops.
          </h2>
          <p>
            A hanok is a traditional Korean home, shaped by the land and the
            changing seasons. Curved tiled eaves frame the sky; wooden doors
            open toward a courtyard. In a drama, a quiet moment here can say
            more than a page of dialogue.
          </p>
          <a
            className="text-link"
            href="https://english.visitkorea.or.kr/"
            target="_blank"
            rel="noreferrer"
          >
            Explore Korea with VisitKorea ↗
          </a>
        </div>
      </section>
      <section className="culture-article" id="language">
        <div className="culture-letter">
          <p className="korean-word" lang="ko">
            인연
          </p>
          <span>in-yeon · a meaningful connection</span>
          <Blossom className="inline-blossom" />
        </div>
        <div>
          <p className="eyebrow">말 · A WORD TO KEEP</p>
          <h2>
            Some people become
            <br />
            part of your story.
          </h2>
          <p>
            In-yeon speaks to a connection between people: sometimes fleeting,
            sometimes lifelong. It is a word that often echoes through Korean
            storytelling, where a chance encounter can change everything.
          </p>
          <p>
            Listen for it in your next drama. A word can open a whole new way of
            seeing a scene.
          </p>
        </div>
      </section>
      <section className="culture-article" id="food">
        <div className="culture-food">
          <div className="tea-art">
            <div className="tea-cup" />
            <span className="tea-steam">~</span>
            <div className="tea-leaf" />
          </div>
        </div>
        <div>
          <p className="eyebrow">한 잔의 여유 · A MOMENT OF WARMTH</p>
          <h2>One cup. A little pause.</h2>
          <p>
            From a warm cup of barley tea to a carefully poured green tea, a
            shared drink offers a moment to slow down. In our favorite scenes,
            the smallest gestures of care are often the ones we remember.
          </p>
          <p>
            Put the kettle on. Choose a story. Let the rest of the evening wait.
          </p>
        </div>
      </section>
    </main>
  );
}
