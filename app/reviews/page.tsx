import { EditorialListing } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Reviews & first impressions",
  "Spoiler-free, clearly labeled editorial previews. Opinions and community ratings are kept separate.",
  "/reviews",
);
export default function Page() {
  return (
    <EditorialListing
      kind="reviews"
      title="A closer look at the story."
      description="Spoiler-free first impressions and reading notes. Each piece explains what it evaluates; no editorial score is invented."
    />
  );
}
