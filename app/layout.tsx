import localFont from "next/font/local";
import { siteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import type { Metadata } from "next";
import { Nav, Preferences } from "@/components/ui";
import { Footer } from "@/components/footer";
import { SceneMotion } from "@/components/scene-motion";
import "./globals.css";
import "./motion.css";
import "./editorial.css";
import "./korean-design.css";
import { KoreanOrnaments } from "@/components/korean-ornaments";

const sans = localFont({
  src: [
    { path: "../public/fonts/latin-0.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/latin-1.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/latin-2.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/latin-3.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});
const serif = localFont({
  src: [
    { path: "../public/fonts/latin-5.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/latin-6.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/latin-4.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});
const korean = localFont({
  src: "../public/fonts/gowun-subset.woff2",
  weight: "400",
  variable: "--font-korean",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: "SeoulScene",
    type: "website",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
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
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${korean.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Preferences>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Nav />
          <div className="illustrated-pages"><KoreanOrnaments />{children}</div>
          <Footer />
          <SceneMotion />
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SeoulScene",
              url: siteUrl,
              description:
                "An independent Korean drama and culture editorial journal.",
            }}
          />
        </Preferences>
      </body>
    </html>
  );
}
