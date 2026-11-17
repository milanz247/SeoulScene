import { Blossom, Cloud } from "./art";

export function KoreanOrnaments({ variant = "edges" }: { variant?: "edges" | "hero" | "footer" }) {
  return <div className={`korean-ornaments ornaments-${variant}`} aria-hidden="true">
    <Blossom className="ornament-branch" />
    <Cloud className="ornament-cloud" />
    <span className="ornament-moon" />
  </div>;
}
