import type { Metadata } from "next";
import { Nav, Preferences } from "@/components/ui";
import { Footer } from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "SeoulScene — Stories that stay with you",
    template: "%s | SeoulScene",
  },
  description:
    "Every drama has a story. Find yours. A thoughtfully curated corner of Korean drama, culture, and everything in between.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Preferences>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Nav />
          {children}
          <Footer />
        </Preferences>
      </body>
    </html>
  );
}
