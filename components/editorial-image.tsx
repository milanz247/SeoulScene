import type { ComponentProps } from "react";
import { Photo } from "./ui";
import { Blossom, Cloud, Landscape } from "./art";
type ImageProps = ComponentProps<typeof Photo> & {
  caption?: string;
  credit?: string;
};
export function EditorialImage({
  caption,
  credit,
  kind = "article",
  ...props
}: ImageProps & { kind?: "hero" | "poster" | "article" | "portrait" }) {
  return (
    <figure className={`editorial-image image-${kind}`}>
      <div className="editorial-image-frame">
        <Photo {...props} />
      </div>
      {(caption || credit) && (
        <figcaption>
          {caption}
          {credit && <span>{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
export function DramaPoster(props: ImageProps) {
  return <EditorialImage {...props} kind="poster" />;
}
export function ArticleThumbnail(props: ImageProps) {
  return <EditorialImage {...props} kind="article" />;
}
export function HeroImage(props: ImageProps) {
  return <EditorialImage {...props} kind="hero" />;
}
export function ActorPortrait(props: ImageProps) {
  return <EditorialImage {...props} kind="portrait" />;
}
export function IllustrationAsset({
  name = "landscape",
}: {
  name?: "landscape" | "cloud" | "blossom";
}) {
  const Art = { landscape: Landscape, cloud: Cloud, blossom: Blossom }[name];
  return (
    <div className={`editorial-art art-${name}`} aria-hidden="true">
      <Art />
    </div>
  );
}
