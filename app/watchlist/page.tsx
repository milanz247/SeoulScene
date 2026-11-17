import { Watchlist } from "@/components/ui";
import { getDramas } from "@/lib/database";
const dramas = getDramas();
export const metadata = { title: "My watchlist" };
export default function Page() {
  return (
    <main id="main" className="wrap inner-page">
      <div className="page-heading">
        <p className="eyebrow">나의 목록 · YOUR PERSONAL COLLECTION</p>
        <h1>
          Stories to keep <em>close.</em>
        </h1>
        <p>A little collection of your next late-night obsessions.</p>
      </div>
      <Watchlist dramas={dramas} />
    </main>
  );
}
