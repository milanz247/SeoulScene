import "server-only";
import { cacheLife } from "next/cache";
import { articles, visibleArticles } from "./editorial";
export async function getArticles() {
  "use cache";
  cacheLife("hours");
  return visibleArticles(articles, new Date());
}
