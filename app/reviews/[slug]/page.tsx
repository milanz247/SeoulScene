import { notFound } from "next/navigation";
import { getArticles } from "@/lib/content";
import { ArticlePage, articleMetadata } from "@/components/editorial";
async function findArticle(slug: string) {
  return (await getArticles()).find(
    (a) =>
      a.slug === slug && (a.kind === "review" || a.kind === "episode-review"),
  );
}
export async function generateStaticParams() {
  return (await getArticles())
    .filter((a) => a.kind === "review" || a.kind === "episode-review")
    .map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await findArticle((await params).slug);
  if (!article) notFound();
  return articleMetadata(article);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await findArticle((await params).slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
