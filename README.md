# Kim Hwang Yeo — Portfolio Website

Modular, data-driven portfolio. All content editable from one file. Free hosting on Vercel.

## Quick Start
```bash
npm install && npm run dev    # http://localhost:3000
```
Edit: open `app/page.jsx` → modify SITE_CONFIG and DATA arrays at top.

---

## Design Criteria

1. **Single-file editability** — All content, config, colors, text in `app/page.jsx`. No CMS.
2. **Data-driven** — Add item to array → auto-populates across all relevant pages and filters.
3. **Professional + welcoming** — Dark charcoal base, warm greens/blues. Not cold, not casual.
4. **Mobile-first responsive** — Every component adapts. Hamburger menu on mobile.
5. **Accessible** — Color-blind safe toggle (blue/orange, no red/green). High contrast mode.
6. **Audience-aware** — Hiring managers see Experience first. Philosophy collapsible. Mentors/Orgs have distinct "network" styling.

---

## Config Structure (in app/page.jsx)

```
SITE_CONFIG
├── 1. IDENTITY — firstName, lastName, initials, email, resumeUrl
├── 2. PAGE CONTENT
│   ├── pages.home — tagline, headline[], bio, heroImage
│   ├── pages.about — headline, bio
│   ├── pages.work — headline
│   └── pages.insights — headline, bio, blogUrl, blogLabel, showPipeline
├── 3. CONNECT — tagline
├── 4. PHILOSOPHY — headline, subtitle, principles[]
├── 5. COLOR THEMES — colorThemes.default, colorThemes.accessible
├── 6. THEMATIC AREAS — pillars[], themes[]
├── 7. SOCIALS — { name, icon, url, showInMenu, showInFooter }
└── 8. NAVIGATION — showHomeInMenu
```

### Key Config Features
- **Social toggles**: `showInMenu: true/false`, `showInFooter: true/false` per link
- **Page headers**: All in `SITE_CONFIG.pages` — edit headlines and bios in one place
- **Pipeline toggle**: `pages.insights.showPipeline: false` hides coming-soon articles
- **Philosophy**: Collapsible section, starts closed. Edit principles in `SITE_CONFIG.philosophy`

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
| INSIGHTS | Insights page | `id, title, status, excerpt, tags[], url` |
| SOCIAL_POSTS | Gallery (Posts) | `id, title, url, date, source, excerpt` |

---

## Placeholder URLs Needed

| What | Where in config |
|------|----------------|
| GitHub URL | `socials[3].url` |
| Medium URL | `socials[4].url` + `pages.insights.blogUrl` |
| Resume PDF | `resumeUrl` → `/files/resume.pdf` |
| Hero image | `pages.home.heroImage` |
| LinkedIn posts (4) | `SOCIAL_POSTS[].url` |
| Publication PDFs (3) | `PUBLICATIONS[].pdfUrl` |
| Mosaic Consulting | `ORGANIZATIONS[4].url` |

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

---

## Post-Publication Checklist

### Must-Have
- [ ] Resume PDF → `resumeUrl`
- [ ] GitHub + Medium URLs
- [ ] LinkedIn post URLs in SOCIAL_POSTS
- [ ] Publication PDFs
- [ ] Favicon

### Should-Have
- [ ] Project images
- [ ] Mentor entries
- [ ] Blog/Writing entries
- [ ] Custom domain
- [ ] First published Insight article

---

## Deployment
```bash
npm install && npm run dev          # Local
git add . && git commit -m "msg" && git push  # Deploy (Vercel auto-builds)
```
