# Design system

## Editorial redesign

Korean paper and ink, burgundy editorial accents, sage mountains, plum blossoms, hanok eaves and cinematic photography. Keep the established warm ivory (`--paper: #faf7f2`), burgundy (`--wine: #842b47`) and charcoal palette rather than repainting working pages to nearly identical suggested colors. Dark mode remains token-driven.

DM Sans is the interface face; Playfair Display headlines and Gowun Batang Korean accents remain locally hosted. Existing Latin faces use lossless WOFF2 versions with unchanged glyph coverage. The WOFF2 Korean subset includes current project copy; the complete font remains a CJK-script-limited fallback so unsupported ornaments cannot trigger a multi-megabyte request. Font license notices remain under public/fonts.

## Composition and components

- Existing `.wrap`, `.section-heading`, poster grids, tags, `.button`, `.text-link` and header remain canonical patterns. The footer uses a compact signature, wrapping navigation and one copyright line instead of tall link columns.
- The homepage opens with an illustrated paper cover, editorial headline, drama photograph and a small culture photo note. Mood discovery pairs a Korean landscape illustration with five thumbnail-led genre rows. Journal and review cards use wide photography; industry notes use a numbered news desk. Actor spotlights show performers from different dramas.
- Review images show the corresponding drama backdrop, with TMDB artwork credit carried through to the article. Keep image sources and credits aligned when changing article imagery.
- Image roles use `Photo`/Next Image with reserved aspect ratios: posters 2:3, article frames 16:9, cast portraits 4:5, and wide drama backdrops. The About page uses the existing landscape illustration with blossom and cloud artwork. Decorative SVGs remain hidden from assistive technology.
- One Lucide icon family is used for interface controls. Existing `Icon` callers keep their API. No emoji illustrations or generated official posters.

## Motion and accessibility

Use existing CSS easing and observer. Reveal once per page visit; pause illustration loops offscreen. Keep the hero image visible immediately for LCP. Interactive transitions are 200–350ms; entrances approximately 500–750ms; atmospheric loops 12–20s. Reduced motion must leave all content visible. Preserve focus rings, labels, keyboard navigation, semantic headings, and route-level loading/error states.

`app/korean-design.css` holds the shared editorial design layer, including the responsive collections, drama profiles, actor profiles, article reading layouts, culture and About pages. Maintain the same paper, ink and burgundy tokens in both themes. On narrow phones the header keeps its action controls and simplifies the decorative brand details. Escape closes the mobile menu from both the toggle and navigation links.

## Asset admission

New photographs require an explicit source URL, creator, license, permitted use and attribution. License uncertainty is not approval. Original artwork is preferred for new articles until photography rights are recorded.

## UI refinement — November 2026

The existing three font families now use `next/font/local` in `app/layout.tsx`: DM Sans (400–700), Playfair Display (400, 600 and regular italic), and Gowun Batang (400 Korean subset). Retain the unicode-restricted full Korean fallback in `public/fonts/fonts.css`; no extra font family or download service is required. Preloading all eight static faces is disabled to avoid competing with the hero image. The font files and license notices are unchanged.

Shared CSS type tokens replace scattered small text sizes:

| Role | Scale |
| --- | --- |
| Hero | 44–80px fluid; 42–48px on phones |
| Page title | 34–56px fluid |
| Section heading | 26–36px fluid |
| Poster/cast title | 16–18px fluid |
| Body | 15–16px fluid |
| Metadata | 12–14px fluid |
| Controls | 14px; search/select fields 16px |
| Captions | 12px |

The small brand subtitle remains an 8–9px decorative signature; it does not contain essential navigation or content. Korean display artwork retains its original large proportions. Section padding uses a 48–64px token, grid gaps 16–24px, and card radii 4px. Existing specially composed illustration sections retain their own spacing.

At 651–900px, poster/cast/discovery grids use three columns, and the featured photograph spans the full panel width to avoid the previous narrow crop. At mobile widths cast grids use two columns, header icon targets are 44px, the footer uses two columns with a compact full-width legal group, and the actor spotlight leaves more width for copy. Reading columns are capped at 68ch. Detail heroes can grow with wrapped content rather than clip it. Existing art, image sources, route structure and motion remain intact.
