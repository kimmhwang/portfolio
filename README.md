# Kim Hwang Yeo — Portfolio Website

A modular, data-driven personal portfolio built with React. All content is editable from a single file. Designed for free hosting on Vercel or GitHub Pages.

---

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start at http://localhost:3000
```

To edit content: open `app/page.jsx` and modify the data at the top of the file.

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css             ← Global styles (scrollbar, selection, reset)
│   ├── layout.js               ← HTML shell, metadata, SEO tags
│   └── page.jsx                ← THE MAIN FILE (all content + config here)
├── public/
│   ├── favicon.ico             ← Replace with your favicon
│   └── files/
│       ├── resume.pdf          ← Your downloadable CV
│       ├── publications/       ← Paper & poster PDFs
│       │   ├── paper1.pdf
│       │   └── poster1.pdf
│       └── images/             ← Hero image, project photos, headshot
│           ├── hero.jpg
│           ├── logo.png
│           └── project-ekyaalo-1.jpg
├── package.json
├── next.config.js              ← Deployment config (Vercel vs GitHub Pages)
├── .gitignore
└── README.md
```

**Key principle:** All content editing happens in `app/page.jsx`. You never need to touch other files unless changing metadata (`layout.js`) or global styles (`globals.css`).

---

## Configuration Reference

### SITE_CONFIG — Branding, Theme & Navigation

| Field | What it controls | Example |
|-------|-----------------|---------|
| `name` | Full name (footer, meta) | `"Kim Hwang Yeo"` |
| `firstName` | Nav display (lighter weight) | `"Kim Hwang"` |
| `lastName` | Nav display (bold) | `"Yeo"` |
| `initials` | Letters in nav logo square | `"KH"` |
| `showHomeInMenu` | Show "Home" in nav links | `false` = name is home button |
| `tagline` | Hero subtitle | `"Bioengineering · Global Health"` |
| `heroHeadline` | `[line1, bolded line2]` | `["Building tech that", "reaches the last mile."]` |
| `heroBio` | Hero paragraph | String (full name auto-bolded) |
| `heroImage` | Background image URL | `"/files/images/hero.jpg"` or `""` |
| `email` | Contact email | `"you@email.com"` |
| `resumeUrl` | CV download path | `"/files/resume.pdf"` |
| `colors` | Full color theme | `{ primary, secondary, accent, bg, surface, ... }` |
| `socials` | Social links everywhere | `[{ name, icon, url }]` |
| `themes` | Thematic areas | `[{ label, icon, color, desc }]` |
| `pillars` | Convergence formula | `[{ label, color }]` |
| `blogUrl` | External blog link | `"https://medium.com/@you"` |

### DATA Arrays

| Array | Auto-appears in | Key fields |
|-------|----------------|------------|
| `PROJECTS` | Gallery, Work > Projects, Work > Links | `id, name, theme, type, desc, images[], tags[], links[]` |
| `MENTORS` | Gallery, About > Mentors | `id, name, role, org, url` |
| `ORGANIZATIONS` | About > Organizations | `id, name, group, role, period, logo, url` |
| `BLOG_POSTS` | Gallery (Blog filter) | `id, title, url, date, excerpt` |
| `SOCIAL_POSTS` | Gallery (Posts filter) | `id, title, url, date, source, excerpt` |
| `PUBLICATIONS` | Work > Publications | `id, title, venue, type, year, pdfUrl` |
| `EXPERIENCE` | About > Experience | `role, org, period, showOnResume, bullets[]` |
| `ACHIEVEMENTS` | About > Achievements | `title, org, detail` |
| `EDUCATION` | About > Education | `degree, school, year, detail` |
| `COURSEWORK` | About > Credentials | `institution, courses[]` |
| `CERTIFICATIONS` | About > Credentials | `name` |
| `MANUAL_UPDATES` | Home > Latest Updates | `date, text, tag` |

---

## Common Tasks

### Change name display
Edit `firstName` and `lastName`. Nav shows: *Kim Hwang* **Yeo**

### Toggle Home in menu
`showHomeInMenu: false` → name/logo is the home button (recommended). Set `true` to show explicit "Home" link.

### Change nav logo
Replace the gradient `<div>` with: `<img src="/files/images/logo.png" style={{width:28,height:28,borderRadius:6}} />`

### Add a project
```js
{ id: "x", name: "Name", theme: "Global Health", type: "own", desc: "...",
  images: ["/files/images/x.jpg"], tags: ["Tag"], links: [{ label: "Link", url: "https://...", showInLinksTab: true }],
  galleryEmoji: "🔬", showInUpdates: true, updateDate: "2024-06" }
```

### Add a publication PDF
Put PDF in `/public/files/publications/` → set `pdfUrl: "/files/publications/paper.pdf"`

### Add a mentor
```js
{ id: "m1", name: "Dr. Smith", role: "Professor", org: "JHU", url: "https://..." }
```

### Add an organization
```js
{ id: "o15", name: "Company", group: "employer", role: "Title", period: "2024", logo: "🏢", url: "https://..." }
```

### Add a theme
```js
{ label: "AI & Data", icon: "🤖", color: "#06b6d4", desc: "..." }
```

---

## Placeholder URLs — Action Required

| Location | What to add |
|----------|-------------|
| `SITE_CONFIG.socials` → GitHub | Your GitHub profile URL |
| `SITE_CONFIG.socials` → Medium | Your Medium profile URL |
| `SITE_CONFIG.blogUrl` | Medium profile URL |
| `SITE_CONFIG.resumeUrl` | Path to resume PDF |
| `SITE_CONFIG.heroImage` | Hero image path or `""` |
| `SOCIAL_POSTS` (all 4 entries) | Actual LinkedIn post URLs |
| `PUBLICATIONS` (all 3 entries) | PDF file paths or URLs |
| `ORGANIZATIONS.o5` (Mosaic) | Website URL if available |

---

## Site Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│  NAV: [KH] Kim Hwang Yeo | About | My Work | Blog ↗ | [socials] | ↓ CV │
├──────────────────────────────────────────────────────────────────┤
│  HOME                                                            │
│  ├─ Hero (headline, bio, image, About / Work / Let's Connect)    │
│  ├─ Philosophy (convergence formula + theme cards)                │
│  ├─ Latest Updates (auto + manual entries)                        │
│  ├─ Gallery (filterable, clickable: navigate or open in new tab)  │
│  └─ ✦ Let's Connect (centered, email + socials)                  │
│                                                                  │
│  ABOUT (continuous scroll with sticky section index)              │
│  ├─ Let's Connect quick bar                                      │
│  ├─ [sticky] Exp | Achv | Edu | Cred | Mentors✦ | Orgs✦ | ↓ CV  │
│  ├─ Experience (Resume / All toggle, timeline)                    │
│  ├─ Achievements (2-column grid)                                  │
│  ├─ Education (cards)                                             │
│  ├─ Credentials (certs + coursework by institution)               │
│  ├─ Mentors (purple theme, hyperlinked cards)                     │
│  ├─ Organizations (amber theme, hyperlinked cards, grouped)       │
│  └─ ✦ Let's Connect                                              │
│                                                                  │
│  MY WORK                                                         │
│  ├─ GitHub + Publications (elevated dark zone, side by side)      │
│  ├─ Publication cards (↓ PDF buttons)                             │
│  ├─ [tabs] Projects | Links                                      │
│  ├─ Projects (filter by type + theme → click opens modal)         │
│  ├─ Links (aggregated from projects, grouped by theme)            │
│  └─ ✦ Let's Connect                                              │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER: © Kim Hwang Yeo · Singapore & USA | Social links        │
└──────────────────────────────────────────────────────────────────┘
```

---

## Gallery Navigation

| Card type | Click behavior | Card style |
|-----------|---------------|------------|
| Project | → Work page, auto-opens modal | Vertical, emoji header, gradient |
| Mentor | → About page, scrolls to Mentors | Vertical, emoji header, gradient |
| Blog | Opens Medium URL in new tab | Horizontal, green left-border, ↗ icon |
| Social Post | Opens LinkedIn URL in new tab | Horizontal, amber left-border, ↗ icon |

---

## Design Specifications History

### v1 — Initial Prototype
- Three-page SPA: Home, About, My Work
- Sticky nav with social icons, email, CV download
- Dark theme (`#0a0a0a` background, green/blue brand)
- Homepage: Hero → Philosophy → Updates → Gallery → Connect

### v2 — Modularity & Dynamic Data
- All content moved to top-level data arrays
- `SITE_CONFIG` object for branding, colors, socials
- Gallery auto-populates from all data arrays with type filters
- About: continuous scroll replaces tab clicking
- Section order: Experience → Achievements → Education → Mentors
- Experience toggle: `showOnResume` boolean per entry
- Work: GitHub + Publications elevated zone; Projects tab + Links tab
- Project cards open in modal overlay (replacing inline expand)
- Blog tab removed from Work (linked externally)

### v3 — Organizations, Credentials, Fixes
- Organizations section added (4 groups: Employers, Academic, Partners, Affiliations)
- Credentials section added (Certifications + Coursework by institution)
- Scroll observer improved with multiple thresholds
- Resume download moved to sticky index bar (flush right)
- Section order: Experience → Achievements → Education → Credentials → Mentors → Organizations

### v4 — Cross-Page Navigation & Hero Image
- Gallery cards navigate: projects → Work modal, mentors → About scroll, blog/posts → new tab
- Cross-page routing via `navParams` state object
- Hero image support (`heroImage` in config)
- `ProjectCard` extracted as component (fixed React hooks-in-map crash)
- Menu restructured: logo+name+pages left-grouped, socials right
- Find Me button + section added

### v5 — Let's Connect & Hyperlinks
- "Find Me" renamed to "Let's Connect" everywhere
- `ConnectSection` component added to bottom of every page
- All location references: "Singapore and the USA"
- Organizations hyperlinked (13/14 with real URLs found via research)
- Mentors support `url` field for hyperlinking
- Blog/Post gallery cards: distinct horizontal style with left-border accent

### v6 — Config & Nav Overhaul
- `firstName` / `lastName` split for nav display styling
- `showHomeInMenu` toggle (default false — name IS the home button)
- ConnectSection first attempt with custom DOM events (unreliable in sandboxed environments)
- Scroll-based section detection replaces IntersectionObserver
- ConnectSection centered layout with ✦ divider

### v7 — Flash Fix, Nav Polish, Final Audit
- **ConnectSection flash fixed properly**: Replaced unreliable custom DOM events with React `flashTrigger` prop (counter). Parent increments counter → ConnectSection detects change via `useRef` comparison → triggers 2.2s glow animation. Works reliably in all environments.
- **Nav name as obvious home button**: Green-tinted hover background + border glow on hover. When on home page, shows subtle active border. `showHomeInMenu: false` filters "Home" from nav links.
- **Name styling**: `firstName` (light #aaa) · `lastName` (bold white). Dot separator between. Both editable in SITE_CONFIG.
- **ConnectSection page-closer styling**: Centered layout, "connect" label divider above, generous padding, location note below. Border thickens and turns green on flash.
- **Full codebase audit**: Zero DOM event hacks, all state managed through React props, all hooks at component level, all placeholder URLs documented.

---

## Post-Publication Checklist

### Must-Have
- [ ] Upload resume PDF → `resumeUrl: "/files/resume.pdf"`
- [ ] Set GitHub URL in `SITE_CONFIG.socials`
- [ ] Set Medium URL in `SITE_CONFIG.socials` + `blogUrl`
- [ ] Replace `#` URLs in `SOCIAL_POSTS` with LinkedIn post URLs
- [ ] Upload publication PDFs → set `pdfUrl` on each
- [ ] Add hero image or headshot
- [ ] Replace favicon

### Should-Have
- [ ] Add 2–3 images per project (`images[]`)
- [ ] Add 2–5 mentor entries with URLs
- [ ] Add Medium blog post entries to `BLOG_POSTS`
- [ ] Find Mosaic Consulting URL
- [ ] Set up custom domain
- [ ] Review coursework against transcripts

### Nice-to-Have
- [ ] More project links for Links tab
- [ ] Personal timeline items (`showOnResume: false`)
- [ ] Vercel Analytics or Plausible
- [ ] Serverless Medium RSS fetcher
- [ ] Case study blog posts

---

## Deployment

### Option A: Vercel (Recommended — 2 minutes)

1. Create a GitHub repository and push this project:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click **"Add New Project"** → import your repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site is live at `https://your-repo.vercel.app`
6. Every `git push` to `main` auto-deploys

**Custom domain:** In Vercel dashboard → Settings → Domains → add your domain and update DNS.

### Option B: GitHub Pages (Free, static export)

1. In `next.config.js`, uncomment: `output: 'export'`
2. If hosting at `username.github.io/repo-name`, also uncomment and set: `basePath: '/repo-name'`
3. Build: `npm run build` (creates `out/` folder)
4. Push the `out/` folder to a `gh-pages` branch, or use GitHub Actions

### Local Development

```bash
npm install        # Install dependencies (first time only)
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build (verifies everything compiles)
```

### Editing Content After Deployment

1. Open `app/page.jsx`
2. Edit any data in `SITE_CONFIG` or the DATA arrays at the top
3. Commit and push → Vercel auto-deploys in ~30 seconds

To add files (resume, images, PDFs):
1. Place them in `public/files/`
2. Reference as `/files/resume.pdf` in the config
3. Commit and push
