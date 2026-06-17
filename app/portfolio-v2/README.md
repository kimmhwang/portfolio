# Portfolio v2

Revamped single-page portfolio built from the design handoff (`Portfolio revamp discussion.zip`).
**This is the default site, served at `/`** (via `app/page.jsx`). The previous design is
archived at **`/portfolio-v1`** (`app/portfolio-v1/page.jsx`).

## Files
| File | What it holds |
|------|----------------|
| `content.js` | **All editable content** — copy, links, cards, stats, images — plus the `SECTIONS` visibility/order config and `SITE_META`. |
| `styles.js` | Theme tokens (Light / Dark / High-contrast) and all layout, hover, and responsive CSS. Injected once via a `<style>` tag. |
| `PortfolioV2.jsx` | Presentational section components + the page shell (nav, mobile rail, scroll-spy, theme cycle, project modal). Rendered by `app/page.jsx`. |

## Editing content (no layout code)
Open `content.js` and edit the `CONTENT` object. Every title, paragraph, button, card, stat, list item, and image slot is a field. To add a photo to a work project, drop the file in `public/files/images/` and set `image: "/files/images/your.jpg"` and `gallery: ["...", "...", "..."]`; empty slots render a styled placeholder.

## Showing / hiding & reordering sections
Edit the `SECTIONS` array in `content.js`:
- `visible: false` → the section is removed from the page **and** from the nav, mobile rail, and scroll-spy.
- `order` → controls vertical position.
- `inNav` / `inRail` → whether it appears in the desktop top nav / mobile section rail.

The page renders only visible sections in `order`, and the alternating warm band rhythm is computed **after** filtering so it never doubles up two bands.

## Theming
Three themes cycle via the nav toggle (Light → Dark → High-contrast). The choice persists in `localStorage` and the initial value respects `prefers-color-scheme`.

## Assets
All images live in the shared `public/files/images/` folder (the same assets the archived v1 used):
- `public/files/images/hero.jpg` — portrait
- `public/files/images/logo.png` — logo (available if needed; nav currently uses the name wordmark)
- Reference them as `/files/images/<file>`. All work-card / gallery / mentor images are owner-supplied placeholders until set.

Fonts (Newsreader, Hanken Grotesk, IBM Plex Mono) load from Google Fonts.
