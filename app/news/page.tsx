import { EditorialListing } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "News & industry notes",
  "Source-linked Korean entertainment news briefs, with original announcement dates and verification notes.",
  "/news",
);
export default function Page() {
  return (
    <EditorialListing
      kind="news"
      title="From the industry, with context."
      description="Korean drama announcements, release guides and industry stories, with original source dates and links. Updated with our November 2026 selection."
    />
  );
}
