import type { MetadataRoute } from "next";
import { getDramas } from "@/lib/database";
import { dramaSlug } from "@/lib/dramas";
import { getPeople } from "@/lib/people";
import { getArticles } from "@/lib/content";
import { articlePath } from "@/lib/editorial";
import { siteUrl } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dramas = getDramas();
  return [
    "/",
    "/dramas",
    "/reviews",
    "/news",
    "/journal",
    "/actors",
    "/upcoming",
    "/recommendations",
    "/calendar",
    "/culture",
    "/about",
    "/credits",
    "/privacy",
    ...dramas.map((d) => `/dramas/${dramaSlug(d)}`),
    ...getPeople(dramas).map((p) => `/actors/${p.slug}`),
    ...(await getArticles()).map(articlePath),
  ].map((path) => ({ url: siteUrl + path }));
}
