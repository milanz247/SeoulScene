import { Blossom, Cloud } from "./art";

export function KoreanOrnaments({ variant = "edges" }: { variant?: "edges" | "hero" | "footer" }) {
  if (variant === "hero") return <div className="korean-ornaments ornaments-hero" aria-hidden="true">
    <svg className="ornament-mountains" viewBox="0 0 1440 180" fill="none" preserveAspectRatio="none">
      <path d="M0 150Q100 140 180 90L250 120 360 35 470 115 540 95Q650 160 760 135L890 65 970 110 1080 25 1200 105 1280 80 1440 145" />
      <path d="M0 175 160 140 260 160 420 110 590 165 750 155 910 125 1060 150 1210 110 1440 170" />
    </svg>
  </div>;
  return <div className={`korean-ornaments ornaments-${variant}`} aria-hidden="true">
    <Blossom className="ornament-branch" />
    <Cloud className="ornament-cloud" />
    <span className="ornament-moon" />
  </div>;
}
