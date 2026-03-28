# Kim Hwang Yeo — Portfolio Website

Modular, data-driven portfolio. All content editable from one file. Free hosting on Vercel.

## Quick Start
```bash
npm install && npm run dev    # http://localhost:3000
```
Edit: open `app/page.jsx` → modify SITE_CONFIG and DATA arrays at top.

---

## Design Specifications

### Core Principles
1. **Single-file editability** — All content, config, colors, text in `app/page.jsx`. No CMS, no database.
2. **Data-driven rendering** — Add item to array → auto-populates across all relevant pages, filters, and gallery.
3. **Professional + welcoming** — Dark charcoal base (#1a1a1e), warm greens/blues. Not cold, not casual.
4. **Mobile-first responsive** — Every component adapts. Hamburger menu on mobile, adaptive grids on desktop.
5. **Accessible** — Color-blind safe toggle (blue/orange, no red/green). High contrast mode for both light and dark.
6. **Audience-aware** — Hiring managers see Experience first. Philosophy collapsible (starts closed). Mentors/Orgs have distinct "personal network" styling.

### Architecture
- **Framework**: Next.js 14 (App Router), React, single `app/page.jsx`
- **Styling**: Inline styles with React theme context (`ThemeCtx`), no CSS framework
- **State**: React `useState`/`useEffect`/`useContext` — no external state management
- **Theming**: 4 color themes (Default Dark, Light, High Contrast Dark, High Contrast Light), toggled independently via light/dark and accessibility buttons
- **Navigation**: SPA-style with `useState` for page routing, sticky nav, scroll-spy on About page

### Layout & Visual Design
- **Max width**: 1200px centered container
- **Nav**: Sticky top bar with logo/name (home button), page tabs, theme toggles, social icons, CV download
- **Name display**: `firstName` (light weight, muted) + `·` middot + `lastName` (bold, bright) — acts as home button
- **Hero**: Gradient radial overlay, optional hero image, two-line headline with primary color emphasis
- **Gallery**: Responsive grid (`auto-fill, minmax(220px, 1fr)`), filterable by type (Projects, Writings, Mentors, Blog, Posts)
- **ConnectSection**: Reusable footer component on every page — centered card with gradient, flash animation on trigger, email CTA + social icons
- **Philosophy**: Homepage shows convergence formula (pillars + themes) and Code of Ethics; About page has collapsible panel with principles + ethics

### Interaction Design
- **ConnectSection flash**: "Let's Connect" button scrolls to section and triggers a 2.2s glow animation (gradient bg, primary border, box-shadow) via React prop counter
- **Gallery navigation**: Clicking project cards opens Work page to that project; clicking mentor cards scrolls to Mentors section on About
- **Theme persistence**: Color mode and accessibility toggle stored in React state (resets on refresh)
- **About page scroll-spy**: Active section detected by scroll position, sticky section tabs

### Accessibility Features
- Independent light/dark toggle (☾/☀) and high-contrast toggle (◐)
- A11y toggle button itself styled in high-contrast orange (visible to those who need it)
- Four full theme definitions: every UI element respects the active theme
- No red/green color combinations for color-blind safety

---

## Config Structure (in app/page.jsx)

```
SITE_CONFIG
├── 1. IDENTITY — firstName, lastName, initials, logoIcon, logoImage, email, resumeUrl, location
├── 2. PAGE CONTENT
│   ├── pages.home — tagline, headline[], bio, heroImage
│   ├── pages.about — headline, bio
│   ├── pages.work — headline
│   └── pages.insights — headline, bio, blogUrl, blogLabel, showPipeline
├── 3. CONNECT — tagline
├── 4. PHILOSOPHY — headline, subtitle, principles[], ethics[]
├── 5. COLOR THEMES — colorThemes.default, .light, .accessible, .accessibleLight
├── 6. THEMATIC AREAS — pillars[], themes[]
├── 7. SOCIALS — { name, icon, url, showInMenu, showInFooter }
├── 8. NAVIGATION — showHomeInMenu
└── 9. ANNOUNCEMENT — announcement, announcementDismissible
```

### Key Config Features
- **Social toggles**: `showInMenu: true/false`, `showInFooter: true/false` per link
- **Page headers**: All in `SITE_CONFIG.pages` — edit headlines and bios in one place
- **Pipeline toggle**: `pages.insights.showPipeline: false` hides coming-soon articles
- **Philosophy**: Collapsible section, starts closed. Edit principles in `SITE_CONFIG.philosophy`
- **Code of Ethics**: `SITE_CONFIG.philosophy.ethics[]` — displayed on Homepage and About
- **Announcement banner**: Dismissible top banner, toggle with `announcementDismissible`
- **Location**: `SITE_CONFIG.location` — displayed in ConnectSection footer

---

## Data Arrays

| Array | Where it shows | Key fields |
|-------|---------------|------------|
| PROJECTS | Gallery, Work > Projects, Links | `id, name, theme, type, desc, images[], tags[], links[]` |
| WRITINGS | Gallery (if showInGallery), Work > Writings | `id, title, type, year, desc, url, theme, showInGallery` |
| MENTORS | Gallery, About > Mentors | `id, name, role, org, url` |
| ORGANIZATIONS | About > Organizations | `id, name, group, role, period, logo, url` |
| PUBLICATIONS | Work > Publications | `id, title, venue, type, year, pdfUrl` |
| EXPERIENCE | About > Experience | `role, org, period, showOnResume, bullets[]` |
| COURSEWORK | About > Education | `institution, courses[]` |
| CERTIFICATIONS | About > Credentials | `name` |
| INSIGHTS | Insights page | `id, title, status, excerpt, tags[], url` |
| SOCIAL_POSTS | Gallery (Posts) | `id, title, url, date, source, excerpt` |

---

## Post-Publication Checklist

### Must-Have (site incomplete without these)
- [ ] Resume PDF → upload to `/public/files/resume.pdf`
- [ ] Publication PDFs (4) → update `PUBLICATIONS[].pdfUrl` (currently `"#"`)
- [ ] AIRS / Direct Relief org URL → update `ORGANIZATIONS[14].url` (currently `""`)
- [ ] Favicon → add to `/public/`
- [x] GitHub + Medium URLs
- [x] LinkedIn post URLs in SOCIAL_POSTS

### Should-Have (enriches the site)
- [ ] Project images → add URLs to `PROJECTS[].images[]` (8 projects, all empty)
- [ ] Mentor entries → populate `MENTORS[]` array
- [ ] Writing entries → populate `WRITINGS[]` array
- [ ] Blog post entries → populate `BLOG_POSTS[]` array
- [ ] Hero image → set `pages.home.heroImage` path
- [ ] Custom domain
- [ ] First published Insight article (any of the 4 "coming soon" topics)
- [ ] Remove announcement banner when content is complete (`announcement: ""`)

---

## Version History

### v0.1–v0.7 (Beta)
- v0.1: Initial 3-page prototype, dark theme, sticky nav
- v0.2: Data arrays, SITE_CONFIG, dynamic gallery, continuous scroll About
- v0.3: Organizations, Credentials, scroll observer fixes
- v0.4: Cross-page gallery navigation, hero image, ProjectCard hooks fix
- v0.5: ConnectSection everywhere, org hyperlinks, social card styling
- v0.6: firstName/lastName, showHomeInMenu, ConnectSection divider
- v0.7: Flash via React props, nav hover states (checkpoint)

### v1.0 — Mobile & Accessibility
- Full mobile responsive (hamburger, adaptive grids, touch targets)
- Color-blind accessible theme (blue/orange, React context)
- Insights page (replaces Blog) with published + coming-soon
- Writings tab on Work page
- Philosophy section on About
- Warmer charcoal base color

### v1.1a — Light Mode & Wide Layout
- Light/dark mode toggle (☾/☀ button in nav bar), independent of A11y toggle
- Light theme: light grey background (#f0f0f0), white surfaces, darker text
- Three-theme system: Default (dark), Light, High Contrast (accessible)
- Desktop layout widened from 960px to 1200px maxWidth
- Gallery grid uses `auto-fill` for responsive column count on wider screens
- Project, achievement, and organization grids adapt to available width
- Hero headline bumped to 44px on desktop; bio/text maxWidths increased
- All hardcoded dark-mode colors replaced with theme-aware values (Mentors, Organizations, GitHub zone, Publications, ConnectSection)
- globals.css simplified for theme-agnostic scrollbar and base styles

### v1.1 — Config Reorg & Polish
- Config reorganized: Identity → Pages → Philosophy → Themes → Socials → Nav
- Page headers centralized in `SITE_CONFIG.pages`
- Social `showInMenu` / `showInFooter` toggles
- Dark gray background (#1a1a1e)
- Gradient text fix: solid color replaces CSS gradient (theme-switch disappearing bug)
- A11y toggle styled high-contrast itself (orange border) so visible to those who need it
- Philosophy collapsible (starts closed)
- Insights pipeline hidden by default (`showPipeline: false`)
- Blog card prominent on Insights page
- Writings with `showInGallery: true` appear in homepage Gallery
- Writings structured like Projects (type pill, theme, description)

### v1.2 — Content & Logo
- Updated bio, headline, and page content
- Logo image support (`logoImage` in SITE_CONFIG)
- AIRS / Direct Relief advisory role added to EXPERIENCE and ORGANIZATIONS
- Updated Ekyaalo project description (USD 265K grant, FDA pre-submission, 90%+ accuracy)
- Announcement banner system (`announcement`, `announcementDismissible`)
- High Contrast Light theme added (4 total color themes)

### v1.3 — Ethics, Modularity & Documentation
- Code of Ethics section: `SITE_CONFIG.philosophy.ethics[]` displayed on Homepage (accent card below theme cards) and About page (inside collapsible philosophy panel)
- `location` field added to SITE_CONFIG (was hardcoded in ConnectSection)
- README updated with full design specifications, architecture notes, and comprehensive post-publication checklist

---

## Deployment
```bash
npm install && npm run dev          # Local
git add . && git commit -m "msg" && git push  # Deploy (Vercel auto-builds)
```
