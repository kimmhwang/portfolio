# Portfolio v4

Presentation-layer upgrade over v3 — same warm editorial brand, rebuilt to
current industry standards, with recruiter-focused copy and layout.
**This is the default site, served at `/`** (via `app/page.jsx`). v3 is
preserved as a component at `app/portfolio-v3/PortfolioV3.jsx`; the original
design is archived at `/portfolio-v1`.

## What v4 adds over v3

### Accessibility (WCAG 2.2)
- Skip-to-content link, semantic landmarks (`header/nav/main/section/footer`), real heading hierarchy (h1→h2→h3)
- Project dialog: focus trap, `role="dialog"` + `aria-modal` + `aria-labelledby`, focus restored on close, Esc to close
- `:focus-visible` rings on all interactive elements; `aria-current` on nav/rail; lists marked up as `<ul>`
- `prefers-reduced-motion` collapses all animation; `color-scheme` hints per theme

### Interaction & UX
- **Lightbox gallery** in the project dialog — featured image + thumbnails + counter (Ekyaalo ships with 4 real photos)
- **← / → arrow keys** (and buttons) move between projects inside the dialog
- Scroll-progress bar under the nav; back-to-top button after 700px
- **Dismissible** work-in-progress banner (remembered per session)
- Copy-email button with "Copied ✓" feedback (mailto fallback)
- Scroll-reveal on sections/cards — **fails open**: if IntersectionObserver never fires (embeds, odd viewports), content reveals anyway; never hidden

### Engineering
- Fluid `clamp()` type scale; `text-wrap: balance/pretty` on headlines
- Capture-phase, rAF-throttled scroll handler (works when an inner wrapper scrolls, e.g. embedded previews); `setTimeout` fallback in hidden tabs
- `loading="lazy"` + `decoding="async"` on gallery images; `fetchPriority="high"` on the hero portrait
- JSON-LD `Person` structured data for SEO
- Animated nav underline, card lift + image zoom micro-interactions

## Files
| File | Holds |
|---|---|
| `content.js` | All editable content + `SECTIONS` visibility/order config (same schema as v3 — copy edits port directly) |
| `styles.js` | Design tokens ×3 themes + all layout/interaction CSS (namespaced `.pv4`) |
| `PortfolioV4.jsx` | Section components + page shell (rendered by `app/page.jsx`) |

Content editing, section visibility (`visible`/`order`/`inNav`/`inRail`), theming,
and image slots all work exactly as documented in `app/portfolio-v2/README.md`.
