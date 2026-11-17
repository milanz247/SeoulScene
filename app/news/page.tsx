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
      description="A considered news desk. Our first edition revisits verified announcements, with source dates made clear. This is an archive selection, not a live breaking-news feed."
    />
  );
}
