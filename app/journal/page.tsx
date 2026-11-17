import { EditorialListing } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "The SeoulScene journal",
  "Korean culture, viewing rituals, soundtrack notes and stories beyond the screen.",
  "/journal",
);
export default function Page() {
  return (
    <EditorialListing
      kind="journal"
      title="Beyond the final frame."
      description="Words, places, sounds, and small rituals. A journal for the things a story makes us notice."
    />
  );
}
