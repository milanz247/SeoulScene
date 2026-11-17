import type { Metadata } from "next";
const configured = process.env.SITE_URL || "http://localhost:3000";
const origin = new URL(configured);
if (!["http:", "https:"].includes(origin.protocol))
  throw new Error("SITE_URL must be an HTTP(S) origin");
export const siteUrl = origin.origin;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "SeoulScene",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          alt: "SeoulScene original Korean-inspired landscape",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
