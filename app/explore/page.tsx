import { Suspense } from "react";
import { Explore } from "@/components/explore";
import { Cloud } from "@/components/art";
import { getDramas } from "@/lib/database";
const dramas = getDramas();
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Explore dramas", "Search the SeoulScene drama collection by title, genre, year and status.", "/dramas");
async function Results({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; sort?: string }>;
}) {
  const params = await searchParams;
  return <Explore key={`${params.genre}-${params.sort}`} items={dramas} initialGenre={typeof params.genre === "string" ? params.genre : ""} initialSort={["title", "year"].includes(params.sort || "") ? params.sort : "curated"} />;
}
export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; sort?: string }>;
}) {
  return (
    <main id="main" className="wrap inner-page">
      <div className="page-heading">
        <Cloud />
        <p className="eyebrow">이야기를 찾아서 · THE DRAMA GALLERY</p>
        <h1>
          Find your kind of <em>story.</em>
        </h1>
        <p>
          A first love, a faraway world, a familiar feeling. Your next chapter
          starts here.
        </p>
      </div>
      <Suspense
        fallback={<div className="skeleton">Finding your next story…</div>}
      >
        <Results searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
