"use client";
import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

/* ██████████████████████████████████████████████████████████████████████████████
   ██  SITE CONFIGURATION                                                     ██
   ██  Organized by: Identity → Pages → Philosophy → Themes → Socials → Nav   ██
   ██████████████████████████████████████████████████████████████████████████████ */

const SITE_CONFIG = {

  /* ═══ 1. IDENTITY ═══ */
  firstName: "Kim Hwang",
  lastName: "Yeo",
  initials: "KH",
  email: "kimhwangyeo@gmail.com",
  resumeUrl: "#",   // "/files/resume.pdf"

  /* ═══ 2. PAGE CONTENT — Edit all page headers and text here ═══ */
  pages: {
    home: {
      tagline: "Bioengineering · Global Health · Innovation",
      headline: ["Building technology that", "reaches the last mile."],
      bio: `I'm Kim Hwang Yeo — a bioengineering professional working at the intersection of medical technology, healthcare innovation, and systems-level thinking. Based in Singapore and the USA, with experience spanning China and East Africa.`,
      heroImage: "",  // "/files/images/hero.jpg" or ""
    },
    about: {
      headline: "About",
      bio: "Interdisciplinary bioengineering professional. Medical technology, healthcare innovation, regulatory strategy. Singapore, the USA, China, and East Africa.",
    },
    work: {
      headline: "My Work",
    },
    insights: {
      headline: "Insights",
      bio: "Perspectives on bioengineering, global health, healthcare systems, and building a career at the intersection of technology and medicine.",
      blogLabel: "Read on Medium",  // Label for blog card
      blogUrl: "#",                 // Medium profile URL
      showPipeline: false,          // true = show "Coming Soon" articles; false = hide
    },
  },
  connect: {
    tagline: "Open to opportunities in MedTech, Global Health, and Innovation",
  },

  /* ═══ 3. PHILOSOPHY — Shown in About page (collapsible) ═══ */
  philosophy: {
    headline: "How I Work",
    subtitle: "Principles that guide my work and worldview",
    principles: [
      { title: "Systems over symptoms", desc: "Every problem is part of a larger system. I seek root causes and design interventions at leverage points, not just where symptoms appear." },
      { title: "Last-mile mindset", desc: "Technology only matters if it reaches the people who need it most. I design for deployment in the hardest contexts, not just the easiest." },
      { title: "Build across boundaries", desc: "The best solutions emerge at the intersection of engineering, medicine, and business. I operate fluently across all three." },
      { title: "Ship, learn, iterate", desc: "Perfection in the lab means nothing without impact in the field. I bias toward real-world testing and rapid iteration." },
    ],
  },

  /* ═══ 4. THEMES & COLORS ═══ */
  colorThemes: {
    default: {
      label: "Default",
      primary: "#10b981", secondary: "#3b82f6", accent: "#a78bfa",
      bg: "#1a1a1e", surface: "#222228", surfaceHover: "#2a2a30",
      border: "#32323a", text: "#f0f0f0", textMuted: "#9ca3af", textDim: "#6b7280",
    },
    accessible: {
      label: "High Contrast",
      primary: "#f59e0b", secondary: "#60a5fa", accent: "#fb923c",
      bg: "#111114", surface: "#1a1a1e", surfaceHover: "#222226",
      border: "#333340", text: "#ffffff", textMuted: "#d4d4d8", textDim: "#a1a1aa",
    },
  },

  /* ═══ 5. THEMATIC AREAS (filters, philosophy cards, convergence formula) ═══ */
  pillars: [
    { label: "Business & Finance", color: "#f59e0b" },
    { label: "Medicine", color: "#ef4444" },
    { label: "Engineering", color: "#3b82f6" },
  ],
  themes: [
    { label: "Global Health", icon: "🌍", color: "#10b981", desc: "Advancing health equity through technology and systems thinking across low-resource settings." },
    { label: "Innovation", icon: "⚡", color: "#3b82f6", desc: "Building novel diagnostic platforms and medical devices from concept through deployment." },
    { label: "Entrepreneurship", icon: "🚀", color: "#a78bfa", desc: "Translating research into impact — funding, regulatory pathways, and scaling solutions." },
  ],

  /* ═══ 6. SOCIAL LINKS ═══
     showInMenu: appears in top nav bar (desktop)
     showInFooter: appears in page footer
     Both always appear in Let's Connect section and mobile menu */
  socials: [
    { name: "LinkedIn", icon: "in", url: "https://linkedin.com/in/kimhwang", showInMenu: true, showInFooter: true },
    { name: "ResearchGate", icon: "RG", url: "https://www.researchgate.net/profile/Kim-Hwang-Yeo/research", showInMenu: true, showInFooter: true },
    { name: "ORCID", icon: "ID", url: "https://orcid.org/0000-0001-8849-1534", showInMenu: false, showInFooter: true },
    { name: "GitHub", icon: "GH", url: "#", showInMenu: true, showInFooter: true },
    { name: "Medium", icon: "M", url: "#", showInMenu: false, showInFooter: true },
  ],

  /* ═══ 7. NAVIGATION ═══ */
  showHomeInMenu: false,  // false = name/logo is the home button
};

/* ═══ Shorthand access ═══ */
const S = SITE_CONFIG;
const getTC = (label, C) => S.themes.find(t => t.label === label)?.color || C.textMuted;


/* ██████████████████████████████████████████████████████████████████████████████
   ██  DATA                                                                   ██
   ██████████████████████████████████████████████████████████████████████████████ */

const PROJECTS = [
  { id: "ekyaalo", name: "Ekyaalo Diagnostics Platform", theme: "Global Health", type: "own", desc: "End-to-end digital pathology platform for breast cancer screening in low-resource settings. Secured USD 250K ACS grant. FDA pre-submission prepared.", images: [], tags: ["Computer Vision", "Medical Device", "Regulatory", "Global Health"], links: [{ label: "CBID Feature", url: "https://cbid.bme.jhu.edu/2024/01/08/ekyaalo-diagnostics-breast-cancer-equity-project-in-uganda-265k-grant/", showInLinksTab: true }], featured: true, galleryEmoji: "🔬", showInUpdates: true, updateDate: "2023-10" },
  { id: "cgm", name: "Continuous Glucose Monitor", theme: "Innovation", type: "own", desc: "Feasibility study for minimally invasive continuous glucose monitoring using novel magnetic nanoparticles.", images: [], tags: ["Nanotechnology", "Biosensors", "Research"], links: [], galleryEmoji: "🧪" },
  { id: "sterilization", name: "Surgical Sterilization Device", theme: "Global Health", type: "own", desc: "Designed sterilization solutions for surgical equipment with Makerere University, Uganda.", images: [], tags: ["Design", "Global Health", "Low-Resource"], links: [], galleryEmoji: "🏥" },
  { id: "mosaic", name: "Diagnostic Hardware — Mosaic", theme: "Innovation", type: "own", desc: "20% improvement in manufacturing assembly efficiency through testing and optimization.", images: [], tags: ["Hardware", "Manufacturing", "Diagnostics"], links: [], galleryEmoji: "⚙️" },
  { id: "fda", name: "FDA Pre-Submission Strategy", theme: "Innovation", type: "own", desc: "Regulatory documentation supporting FDA pre-submission for a novel digital pathology device.", images: [], tags: ["Regulatory", "FDA", "Strategy"], links: [], galleryEmoji: "📋" },
  { id: "pediatric", name: "Pediatric Monitoring Systems", theme: "Innovation", type: "mentored", desc: "Mentored JHU student teams developing pediatric patient monitoring devices.", images: [], tags: ["Medical Device", "Mentorship"], links: [], galleryEmoji: "👶" },
  { id: "biopsy", name: "Biopsy Instrumentation", theme: "Innovation", type: "mentored", desc: "Guided development of novel biopsy tools through JHU bioengineering design courses.", images: [], tags: ["Instrumentation", "Design"], links: [], galleryEmoji: "🔧" },
  { id: "digipath-students", name: "Digital Pathology Student Projects", theme: "Global Health", type: "mentored", desc: "Supervised teams building digital pathology solutions at Johns Hopkins.", images: [], tags: ["Pathology", "AI", "Mentorship"], links: [], galleryEmoji: "🎓" },
];

/* ── Writings: grants, reports, briefs, essays ──
   showInGallery: true = appears in Homepage Gallery with type "writing"
   type: "grant" | "report" | "brief" | "essay" | "other" */
const WRITINGS = [
  // { id: "w1", title: "ACS Grant Proposal", type: "grant", year: "2023", desc: "...", url: "#", theme: "Global Health", showInGallery: true, galleryEmoji: "📄" },
];

const MENTORS = [];
const ORGANIZATIONS = [
  { id: "o1", name: "Ekyaalo Diagnostics", group: "employer", role: "Head of R&D", period: "2023–2024", logo: "🔬", url: "https://www.linkedin.com/company/ekyaalo-diagnostics" },
  { id: "o2", name: "Johns Hopkins University", group: "academic", role: "M.S.E. · Instructor · Fellow", period: "2022–2024", logo: "🏛️", url: "https://cbid.bme.jhu.edu/" },
  { id: "o3", name: "UC Berkeley", group: "academic", role: "B.S. Bioengineering · IT", period: "2020–2022", logo: "🐻", url: "https://bioeng.berkeley.edu/" },
  { id: "o4", name: "Ocular Therapeutix", group: "employer", role: "Market Access Strategist", period: "2023", logo: "👁️", url: "https://www.ocutx.com/" },
  { id: "o5", name: "Mosaic Consulting", group: "employer", role: "Hardware Systems Engineer", period: "2022", logo: "🔩", url: "" },
  { id: "o6", name: "Aravind Eye Hospital", group: "partner", role: "Clinical Partnership", period: "2023", logo: "🏥", url: "https://aravind.org/" },
  { id: "o7", name: "Makerere University", group: "partner", role: "Field Research", period: "2021–2023", logo: "🌍", url: "https://www.mak.ac.ug/" },
  { id: "o8", name: "American Cancer Society", group: "partner", role: "USD 250K Grant", period: "2023", logo: "🎗️", url: "https://www.cancer.org/" },
  { id: "o9", name: "Engineering World Health", group: "affiliation", role: "Medical Device Design", period: "2021", logo: "⚕️", url: "https://www.ewh.org/" },
  { id: "o10", name: "Singapore Armed Forces", group: "employer", role: "Lieutenant — Guards", period: "2016–2017", logo: "🎖️", url: "https://www.mindef.gov.sg/web/portal/army/" },
  { id: "o11", name: "Hwa Chong Institution", group: "academic", role: "A-Levels", period: "", logo: "🏫", url: "https://www.hci.edu.sg/" },
  { id: "o12", name: "Santa Monica College", group: "academic", role: "A.A. + A.S. · 4.00", period: "2018–2020", logo: "📚", url: "https://www.smc.edu/" },
  { id: "o13", name: "Tau Beta Pi", group: "affiliation", role: "Engineering Honor Society", period: "", logo: "🏅", url: "https://www.tbp.org/" },
  { id: "o14", name: "Alpha Gamma Sigma", group: "affiliation", role: "Honor Society", period: "", logo: "🎓", url: "https://www.alphagammasigma.org/" },
];
const ORG_GROUPS = [
  { key: "employer", label: "Employers", icon: "💼" },
  { key: "academic", label: "Academic Institutions", icon: "🏛️" },
  { key: "partner", label: "Partners & Collaborators", icon: "🤝" },
  { key: "affiliation", label: "Affiliations & Societies", icon: "🏅" },
];
const BLOG_POSTS = [];
const SOCIAL_POSTS = [
  { id: "s1", title: "USD 250K Grant Win", url: "#", date: "2023-10-01", source: "LinkedIn", excerpt: "American Cancer Society competitive funding for Ekyaalo Diagnostics" },
  { id: "s2", title: "Uganda Field Research", url: "#", date: "2023-06-15", source: "LinkedIn", excerpt: "Multi-institutional usability study — clinical immersion" },
  { id: "s3", title: "Top Graduate — UC Berkeley", url: "#", date: "2022-05-13", source: "LinkedIn", excerpt: "Bioengineering Departmental Citation, High Honors" },
  { id: "s4", title: "Map the Systems 2024 Winner", url: "#", date: "2024-06-01", source: "LinkedIn", excerpt: "Systems Mapping competition — global winner" },
];
const PUBLICATIONS = [
  { id: "p1", title: "Women's Health Diagnostics — Multiple Publications", venue: "Johns Hopkins / CBID", type: "paper", year: "2022–2024", pdfUrl: "#" },
  { id: "p2", title: "Magnetic Nanoparticle Characterization for Biosensing", venue: "Berkeley Imaging Systems Lab", type: "paper", year: "2022", pdfUrl: "#" },
  { id: "p3", title: "Map the Systems 2024 — Systems Mapping", venue: "Global Competition", type: "poster", year: "2024", pdfUrl: "#" },
];
const EXPERIENCE = [
  { role: "Head of R&D", org: "Ekyaalo Diagnostics, Maryland", period: "Apr 2023 – Aug 2024", showOnResume: true, bullets: ["Led end-to-end development of digital pathology platform for low-resource healthcare environments", "Secured USD 250K in competitive funding from the American Cancer Society", "Prepared FDA pre-submission documentation for novel medical device"] },
  { role: "Bioengineering Design Instructor", org: "Johns Hopkins University", period: "Aug 2022 – May 2024", showOnResume: true, bullets: ["Delivered instruction across undergraduate, graduate, and professional courses", "Mentored teams on pediatric monitoring, digital pathology, and biopsy instrumentation", "Co-developed global health field curriculum — Uganda & Kenya"] },
  { role: "Global Market Access Strategist (Intern)", org: "Ocular Therapeutix, Boston", period: "Apr – Sep 2023", showOnResume: true, bullets: ["Initiated strategic engagement with Aravind Eye Hospital leadership"] },
  { role: "Women's Health Research Fellow", org: "JHU CBID, Baltimore", period: "Jun 2022 – May 2023", showOnResume: true, bullets: ["Multiple publications on women's health challenges", "Planned and executed multi-institutional usability study in Uganda"] },
  { role: "Nanoparticle Research Engineer", org: "Berkeley Imaging Systems Lab", period: "Aug 2021 – May 2022", showOnResume: true, bullets: ["Established feasibility of magnetic nanoparticles for continuous glucose monitoring"] },
  { role: "Hardware Systems Engineer", org: "Mosaic Consulting, Berkeley", period: "Mar – Jun 2022", showOnResume: true, bullets: ["Improved manufacturing assembly efficiency by 20%"] },
  { role: "Senior IT Consultant", org: "UC Berkeley", period: "Aug 2020 – Mar 2022", showOnResume: true, bullets: ["Delivered frontline technical support; increased operational efficiency by 20%"] },
  { role: "Medical Device Design Intern", org: "Engineering World Health", period: "Jun – Jul 2021", showOnResume: false, bullets: ["Designed sterilization solutions with Makerere University, Uganda"] },
  { role: "Co-founder & President", org: "SE Asian Cultural Club, SMC", period: "Aug – Dec 2019", showOnResume: false, bullets: ["Founded a Southeast Asian community — still active today"] },
  { role: "Lieutenant", org: "Singapore Armed Forces", period: "Feb 2016 – May 2017", showOnResume: true, bullets: ["Led and trained 40+ personnel in Guards formation; 100% graduation rate"] },
];
const ACHIEVEMENTS = [
  { title: "USD 250K Grant — American Cancer Society", org: "Ekyaalo Diagnostics", detail: "Competitive funding" },
  { title: "Bioengineering Departmental Citation", org: "UC Berkeley", detail: "Top Graduate" },
  { title: "Most Outstanding Teaching Assistant", org: "Johns Hopkins University" },
  { title: "Map the Systems 2024", org: "Systems Mapping Winner" },
  { title: "Abell Foundation Fellowship", org: "Johns Hopkins" },
  { title: "Tau Beta Pi", org: "National Engineering Honor Society" },
  { title: "Alpha Gamma Sigma", org: "Permanent Member", detail: "Scholarship, Leadership & Service" },
];
const EDUCATION = [
  { degree: "M.S.E. Bioengineering Innovation & Design", school: "Johns Hopkins University", year: "2024", detail: "Whiting School of Engineering" },
  { degree: "B.S. Bioengineering (High Honors)", school: "UC Berkeley", year: "2022", detail: "GPA 3.96 · Dean's List" },
  { degree: "A.A. + A.S. Mathematics", school: "Santa Monica College", year: "2020", detail: "GPA 4.00 · Highest Honors" },
  { degree: "A-Levels (85 RP)", school: "Hwa Chong Institution, Singapore", year: "", detail: "" },
];
const COURSEWORK = [
  { institution: "Johns Hopkins", courses: ["Biomedical Data Science", "Medical Device Design", "Precision Medicine Data Analysis", "Global Health Innovation", "Strategic Management", "Entrepreneurial Finance", "Computer Vision", "Machine Learning"] },
  { institution: "UC Berkeley", courses: ["Tissue Engineering", "Cell Engineering", "Biomedical Imaging", "Biomedical Physiology", "Bionanoscience", "Biotech Entrepreneurship", "Senior Design Project", "Honors Research"] },
  { institution: "Santa Monica College", courses: ["Organic Chemistry I & II", "Cell Biology", "Genetics", "Physics I–III", "Multivariable Calculus", "Linear Algebra", "Differential Equations", "C Programming"] },
];
const CERTIFICATIONS = [{ name: "Nonprofit Fundraising Essentials" }, { name: "Business Models for Social Enterprise" }, { name: "Systems Thinking in Public Health" }];

const INSIGHTS = [
  { id: "i1", title: "Biotech as a Career — A Guide for Undergrads", status: "coming", excerpt: "Navigating the path from bench science to biotech industry.", tags: ["Career", "Biotech"], url: "" },
  { id: "i2", title: "Healthcare System in the US", status: "coming", excerpt: "A practitioner's perspective on strengths, gaps, and opportunities.", tags: ["Healthcare", "Policy"], url: "" },
  { id: "i3", title: "Healthcare Systems Around the World", status: "coming", excerpt: "What the US, Singapore, Uganda, and others can learn from each other.", tags: ["Global Health"], url: "" },
  { id: "i4", title: "Global Health — What Is It?", status: "coming", excerpt: "Defining global health beyond the buzzword.", tags: ["Global Health", "Explainer"], url: "" },
];

const MANUAL_UPDATES = [
  { date: "2024-06", text: "Map the Systems 2024 — Winner", tag: "Award" },
  { date: "2024-05", text: "Based in Singapore & USA — open to opportunities", tag: "Update" },
  { date: "2024-05", text: "Completed M.S.E. at Johns Hopkins", tag: "Education" },
  { date: "2023-10", text: "Secured USD 250K ACS grant for Ekyaalo", tag: "Milestone" },
];

function buildUpdates() {
  const items = [...MANUAL_UPDATES];
  PROJECTS.filter(p => p.showInUpdates).forEach(p => { if (!items.find(u => u.text.includes(p.name))) items.push({ date: p.updateDate || "", text: p.name, tag: "Project" }); });
  return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
}
function buildGalleryItems() {
  const items = [];
  PROJECTS.forEach(p => items.push({ type: "project", title: p.name, subtitle: p.desc, theme: p.theme, emoji: p.galleryEmoji, id: p.id }));
  WRITINGS.filter(w => w.showInGallery).forEach(w => items.push({ type: "writing", title: w.title, subtitle: w.desc || `${w.type} · ${w.year}`, theme: w.theme || "", emoji: w.galleryEmoji || "📄", id: w.id }));
  MENTORS.forEach(m => items.push({ type: "mentor", title: m.name, subtitle: `${m.role} · ${m.org}`, emoji: "👤", id: m.id }));
  BLOG_POSTS.forEach(b => items.push({ type: "blog", title: b.title, subtitle: b.excerpt, emoji: "📝", url: b.url, source: "Medium", id: b.id }));
  SOCIAL_POSTS.forEach(s => items.push({ type: "social", title: s.title, subtitle: s.excerpt, emoji: "💼", url: s.url, source: s.source, id: s.id }));
  return items;
}


/* ██████████████████████████████████████████████████████████████████████████████
   ██  THEME CONTEXT + HOOKS                                                  ██
   ██████████████████████████████████████████████████████████████████████████████ */
const ThemeCtx = createContext(null);
function useTheme() { return useContext(ThemeCtx); }
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < 700); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return m;
}


/* ██████████████████████████████████████████████████████████████████████████████
   ██  SHARED COMPONENTS                                                      ██
   ██████████████████████████████████████████████████████████████████████████████ */
const Pill = ({ children, color, accent, small }) => { const C = useTheme(); return <span style={{ display: "inline-block", fontSize: small ? 10 : 11, padding: small ? "2px 8px" : "3px 10px", background: accent ? `${color || C.primary}15` : C.surface, color: accent ? (color || C.primary) : C.textMuted, border: `1px solid ${accent ? `${color || C.primary}30` : C.border}`, borderRadius: 20, whiteSpace: "nowrap" }}>{children}</span>; };
const SH = ({ children, sub }) => { const C = useTheme(); return <div style={{ marginBottom: 20 }}><h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: C.text }}>{children}</h2>{sub && <p style={{ fontSize: 13, color: C.textMuted, margin: "3px 0 0" }}>{sub}</p>}</div>; };

const GalleryCard = ({ item, onAction }) => {
  const C = useTheme(); const m = useIsMobile(); const [h, setH] = useState(false);
  const tc = { project: C.secondary, writing: C.accent, mentor: C.accent, blog: C.primary, social: "#f59e0b" }[item.type] || C.textMuted;
  const isSocial = item.type === "blog" || item.type === "social";
  const click = () => { if (onAction) onAction(item); else if (isSocial && item.url) window.open(item.url, "_blank"); };
  if (isSocial) return (
    <div onClick={click} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surfaceHover : C.surface, borderRadius: 10, border: `1px solid ${h ? `${tc}40` : C.border}`, borderLeft: `3px solid ${tc}`, cursor: "pointer", transition: "all 0.2s", transform: h && !m ? "translateY(-2px)" : "none" }}>
      <div style={{ padding: "12px 14px" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><div style={{ display: "flex", gap: 5 }}><Pill color={tc} accent small>{item.type === "blog" ? "Blog" : "Post"}</Pill>{item.source && <Pill small>{item.source}</Pill>}</div><span style={{ fontSize: 12, color: tc, opacity: h ? 1 : 0.4 }}>↗</span></div><div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 3 }}>{item.title}</div><div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.subtitle}</div></div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${tc}40, transparent)` }} />
    </div>
  );
  return (
    <div onClick={click} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surfaceHover : C.surface, borderRadius: 10, border: `1px solid ${h ? "#444" : C.border}`, overflow: "hidden", cursor: "pointer", transition: "all 0.2s", transform: h && !m ? "translateY(-3px)" : "none" }}>
      <div style={{ height: 72, background: `linear-gradient(135deg, ${tc}12, ${tc}05)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{item.emoji}</div>
      <div style={{ padding: "10px 12px 12px" }}><div style={{ display: "flex", gap: 5, marginBottom: 5 }}><Pill color={tc} accent small>{item.type}</Pill>{item.theme && <Pill small>{item.theme}</Pill>}</div><div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 2 }}>{item.title}</div><div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.subtitle}</div></div>
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => { const C = useTheme(); if (!project) return null; const tc = getTC(project.theme, C); return (
  <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <div onClick={e => e.stopPropagation()} style={{ background: C.surface, borderRadius: 16, border: `1px solid ${tc}40`, maxWidth: 680, width: "100%", maxHeight: "85vh", overflow: "auto" }}>
      <div style={{ padding: "24px 24px 16px", borderBottom: `1px solid ${C.border}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><div style={{ display: "flex", gap: 6, marginBottom: 8 }}><Pill color={tc} accent small>{project.theme}</Pill><Pill small>{project.type === "own" ? "Own" : "Mentored"}</Pill></div><h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>{project.name}</h3></div><button onClick={onClose} style={{ background: C.border, border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: C.textMuted, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button></div><p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, margin: "12px 0 0" }}>{project.desc}</p><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 12 }}>{project.tags.map((t, j) => <Pill key={j} small>{t}</Pill>)}</div></div>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}` }}>{project.images.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(project.images.length, 3)}, 1fr)`, gap: 8 }}>{project.images.map((img, j) => <div key={j} style={{ borderRadius: 8, overflow: "hidden", background: C.bg, aspectRatio: "16/10" }}><img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>)}</div> : <div style={{ fontSize: 11, color: C.textDim, fontStyle: "italic" }}>Add image URLs to images array.</div>}</div>
      <div style={{ padding: "16px 24px 20px" }}>{project.links.length > 0 ? project.links.map((l, j) => <a key={j} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: `${tc}08`, border: `1px solid ${tc}20`, borderRadius: 8, textDecoration: "none", fontSize: 13, color: tc, fontWeight: 500, marginBottom: 6 }}>↗ {l.label}</a>) : <div style={{ fontSize: 11, color: C.textDim, fontStyle: "italic" }}>Add link objects.</div>}</div>
    </div>
  </div>
); };

const ProjectCard = ({ project, onClick }) => { const C = useTheme(); const m = useIsMobile(); const [h, setH] = useState(false); const tc = getTC(project.theme, C); return (
  <div onClick={() => onClick(project)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: m ? 14 : 18, background: C.surface, borderRadius: 12, border: `1px solid ${h ? `${tc}40` : C.border}`, cursor: "pointer", transition: "all 0.2s", transform: h && !m ? "translateY(-2px)" : "none" }}>
    <div style={{ display: "flex", gap: 5, marginBottom: 6, flexWrap: "wrap" }}><Pill color={tc} accent small>{project.theme}</Pill><Pill small>{project.type === "own" ? "Own" : "Mentored"}</Pill></div>
    <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>{project.name}</div>
    <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.desc}</p>
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{project.tags.slice(0, 4).map((t, j) => <Pill key={j} small>{t}</Pill>)}</div>
    <div style={{ fontSize: 11, color: tc, marginTop: 10, fontWeight: 500 }}>View details →</div>
  </div>
); };

const ConnectSection = ({ flashTrigger = 0 }) => {
  const C = useTheme(); const m = useIsMobile(); const [flash, setFlash] = useState(false); const prev = useRef(0);
  useEffect(() => { if (flashTrigger > prev.current) { setFlash(true); const t = setTimeout(() => setFlash(false), 2200); prev.current = flashTrigger; return () => clearTimeout(t); } }, [flashTrigger]);
  return (
    <div style={{ marginTop: 48, paddingBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.primary}30)` }} /><span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.textDim }}>connect</span><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.primary}30, transparent)` }} /></div>
      <section id="connect-section" style={{ padding: m ? "28px 20px 24px" : "40px 32px 32px", borderRadius: 20, background: flash ? `linear-gradient(135deg, ${C.primary}30, ${C.secondary}18)` : `linear-gradient(135deg, ${C.primary}0a, ${C.secondary}05)`, border: `2px solid ${flash ? C.primary : C.border}`, transition: "all 0.4s", boxShadow: flash ? `0 0 50px ${C.primary}25` : "none", textAlign: "center" }}>
        <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 700, margin: 0, color: flash ? "#fff" : C.text }}>Let's Connect</h3>
        <p style={{ fontSize: 14, color: C.textMuted, margin: "10px 0 24px" }}>{S.connect.tagline}</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <a href={`mailto:${S.email}`} style={{ padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>✉ {S.email}</a>
          {S.socials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#ccc", textDecoration: "none" }}>{s.icon}</a>)}
        </div>
        <p style={{ fontSize: 11, color: C.textDim, marginTop: 20, marginBottom: 0 }}>Singapore & USA</p>
      </section>
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: HOME                                                             ██
   ██████████████████████████████████████████████████████████████████████████████ */
const HomePage = ({ setPage, onGalleryAction }) => {
  const C = useTheme(); const m = useIsMobile();
  const [activeTheme, setActiveTheme] = useState(0);
  const [galleryType, setGalleryType] = useState("all");
  const [connectFlash, setConnectFlash] = useState(0);
  const allGallery = buildGalleryItems(); const P = S.pages.home;
  const filtered = galleryType === "all" ? allGallery.slice(0, 12) : allGallery.filter(i => i.type === galleryType).slice(0, 12);
  const updates = buildUpdates();
  const handleGalleryClick = (item) => { if (item.type === "project" && onGalleryAction) onGalleryAction({ action: "openProject", projectId: item.id }); else if (item.type === "mentor" && onGalleryAction) onGalleryAction({ action: "scrollToMentors" }); else if ((item.type === "blog" || item.type === "social") && item.url) window.open(item.url, "_blank"); };
  const handleConnect = () => { const el = document.getElementById("connect-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => setConnectFlash(c => c + 1), 700); };

  return (
    <div>
      <section style={{ padding: m ? "40px 0 30px" : "56px 0 40px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: `radial-gradient(ellipse at 30% 0%, ${C.primary}44 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, ${C.secondary}22 0%, transparent 50%)`, opacity: 0.15, pointerEvents: "none" }} />
        {P.heroImage && <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 280, opacity: 0.12, backgroundImage: `url(${P.heroImage})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "0 0 0 40px", pointerEvents: "none" }} />}
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.textDim, marginBottom: 12 }}>{P.tagline}</div>
          {/* Hero headline — uses solid color instead of gradient text to avoid theme-switch disappearing */}
          <h1 style={{ fontSize: m ? 30 : 40, fontWeight: 300, margin: 0, lineHeight: 1.15, color: C.text }}>{P.headline[0]}<br /><span style={{ fontWeight: 700, color: C.primary }}>{P.headline[1]}</span></h1>
          <p style={{ fontSize: m ? 14 : 15, color: C.textMuted, marginTop: 14, maxWidth: 560, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: P.bio.replace(`${S.firstName} ${S.lastName}`, `<strong style="color:${C.text}">${S.firstName} ${S.lastName}</strong>`) }} />
          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <button onClick={() => setPage("about")} style={{ padding: "10px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>About Me</button>
            <button onClick={() => setPage("work")} style={{ padding: "10px 22px", background: "transparent", color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}>View My Work</button>
            <button onClick={handleConnect} style={{ padding: "10px 22px", background: "transparent", color: C.primary, border: `1px solid ${C.primary}44`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Let's Connect</button>
          </div>
        </div>
      </section>
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
        <SH sub="Where disciplines converge">Philosophy</SH>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>{S.pillars.map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ padding: "4px 12px", background: `${p.color}12`, border: `1px solid ${p.color}28`, borderRadius: 8, fontSize: 11, color: p.color, fontWeight: 600 }}>{p.label}</span>{i < S.pillars.length - 1 && <span style={{ color: C.textDim }}>+</span>}</div>)}<span style={{ color: C.textDim, margin: "0 2px" }}>=</span>{S.themes.map((t, i) => <span key={i} style={{ padding: "4px 10px", background: `${t.color}18`, border: `1px solid ${t.color}35`, borderRadius: 8, fontSize: 11, color: t.color, fontWeight: 700 }}>{t.icon} {t.label}</span>)}</div>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : `repeat(${S.themes.length}, 1fr)`, gap: 12 }}>{S.themes.map((t, i) => <div key={i} onClick={() => setActiveTheme(i)} style={{ padding: "16px 14px", background: activeTheme === i ? `${t.color}0a` : C.surface, border: `1px solid ${activeTheme === i ? `${t.color}35` : C.border}`, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}><div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div><div style={{ fontSize: 13, fontWeight: 600, color: t.color, marginBottom: 4 }}>{t.label}</div><p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, margin: 0 }}>{t.desc}</p></div>)}</div>
      </section>
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}><SH sub="Recent highlights">Latest Updates</SH><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{updates.map((u, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 16px", background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, flexWrap: m ? "wrap" : "nowrap" }}><div style={{ fontSize: 11, color: C.textDim, fontWeight: 600, minWidth: 44 }}>{u.date}</div>{!m && <div style={{ width: 1, height: 16, background: C.border }} />}<div style={{ flex: 1, fontSize: 13, color: C.text }}>{u.text}</div><Pill small>{u.tag}</Pill></div>)}</div></section>
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
        <SH sub="Projects, writing, and more">Gallery</SH>
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>{[{ k: "all", l: "All" }, { k: "project", l: "Projects" }, { k: "writing", l: "Writings" }, { k: "mentor", l: "Mentors" }, { k: "blog", l: "Blog" }, { k: "social", l: "Posts" }].map(f => <button key={f.k} onClick={() => setGalleryType(f.k)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, cursor: "pointer", background: galleryType === f.k ? C.text : C.surface, color: galleryType === f.k ? C.bg : C.textMuted, border: `1px solid ${galleryType === f.k ? C.text : C.border}`, fontWeight: galleryType === f.k ? 600 : 400 }}>{f.l}</button>)}</div>
        <div style={{ display: "grid", gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>{filtered.length > 0 ? filtered.map((item, i) => <GalleryCard key={item.id || i} item={item} onAction={handleGalleryClick} />) : <div style={{ gridColumn: "1 / -1", padding: 36, textAlign: "center", color: C.textDim, fontSize: 13 }}>No items yet.</div>}</div>
      </section>
      <ConnectSection flashTrigger={connectFlash} />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: ABOUT                                                            ██
   ██████████████████████████████████████████████████████████████████████████████ */
const AboutPage = ({ initialSection }) => {
  const C = useTheme(); const m = useIsMobile(); const P = S.pages.about;
  const [activeSection, setActiveSection] = useState(initialSection || "experience");
  const [expView, setExpView] = useState("resume");
  const [philOpen, setPhilOpen] = useState(false);
  const sectionRefs = useRef({}); const hasScrolledToInitial = useRef(false);
  const isPersonal = (s) => s === "mentors" || s === "organizations";

  const sections = ["experience", "achievements", "education", "credentials", "mentors", "organizations"];
  const sectionLabels = { experience: "Experience", achievements: "Achievements", education: "Education", credentials: "Credentials", mentors: "Mentors", organizations: "Organizations" };
  const registerRef = useCallback((key) => (el) => { if (el) sectionRefs.current[key] = el; }, []);
  const scrollToSection = (key) => { const el = sectionRefs.current[key]; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" }); };

  useEffect(() => { const detect = () => { const line = window.scrollY + window.innerHeight * 0.35; let active = sections[0]; for (const s of sections) { const el = sectionRefs.current[s]; if (el && el.getBoundingClientRect().top + window.scrollY <= line) active = s; } setActiveSection(active); }; window.addEventListener("scroll", detect, { passive: true }); detect(); return () => window.removeEventListener("scroll", detect); }, [expView]);
  useEffect(() => { if (initialSection && !hasScrolledToInitial.current) { hasScrolledToInitial.current = true; setTimeout(() => scrollToSection(initialSection), 150); } }, [initialSection]);
  const filteredExp = expView === "resume" ? EXPERIENCE.filter(e => e.showOnResume) : EXPERIENCE;

  return (
    <div style={{ paddingTop: 28, paddingBottom: 40 }}>
      <h1 style={{ fontSize: m ? 26 : 30, fontWeight: 300, margin: 0, color: "#fafafa" }}>{P.headline} <span style={{ fontWeight: 700 }}>{S.firstName} {S.lastName}</span></h1>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 8, maxWidth: 600, lineHeight: 1.7 }}>{P.bio}</p>

      {/* Let's Connect bar */}
      <div style={{ marginTop: 20, padding: m ? "12px 14px" : "14px 20px", background: `${C.primary}08`, borderRadius: 12, border: `1px solid ${C.primary}25`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Let's Connect</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><a href={`mailto:${S.email}`} style={{ padding: "6px 14px", background: C.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>✉ {S.email}</a>{!m && S.socials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} style={{ width: 30, height: 30, borderRadius: 7, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.textMuted, textDecoration: "none" }}>{s.icon}</a>)}</div>
      </div>

      {/* Philosophy — collapsible, less prominent */}
      <div style={{ marginTop: 20, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <button onClick={() => setPhilOpen(!philOpen)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: C.surface, border: "none", cursor: "pointer", color: C.text }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14 }}>💡</span><span style={{ fontSize: 14, fontWeight: 600 }}>{S.philosophy.headline}</span><span style={{ fontSize: 12, color: C.textDim }}>— {S.philosophy.subtitle}</span></div>
          <span style={{ fontSize: 12, color: C.textDim, transition: "transform 0.2s", transform: philOpen ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        {philOpen && (
          <div style={{ padding: m ? "16px" : "20px 24px", background: `${C.primary}04`, borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 12 }}>{S.philosophy.principles.map((p, i) => <div key={i} style={{ padding: 16, background: `${C.bg}cc`, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ fontSize: 14, fontWeight: 600, color: C.primary, marginBottom: 6 }}>{p.title}</div><p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{p.desc}</p></div>)}</div>
          </div>
        )}
      </div>

      {/* Sticky Index */}
      <div style={{ position: "sticky", top: 56, zIndex: 50, background: `${C.bg}f0`, backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.border}`, marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 0, overflowX: "auto", flex: 1 }}>{sections.map(s => { const isA = activeSection === s; const p = isPersonal(s); return <button key={s} onClick={() => scrollToSection(s)} style={{ padding: m ? "8px 10px" : "10px 14px", fontSize: m ? 11 : 12, cursor: "pointer", background: "transparent", border: "none", whiteSpace: "nowrap", color: isA ? (p ? "#d8b4fe" : "#fff") : (p ? "#6b5f80" : C.textDim), borderBottom: isA ? `2px solid ${p ? C.accent : C.primary}` : "2px solid transparent", fontWeight: isA ? 600 : 400 }}>{m ? sectionLabels[s].slice(0, 4) : sectionLabels[s]}</button>; })}</div>
        <a href={S.resumeUrl} download style={{ padding: "5px 13px", background: C.primary, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}>↓ Resume</a>
      </div>

      {/* EXPERIENCE */}
      <section ref={registerRef("experience")} style={{ paddingTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}><SH sub="Professional journey">Experience</SH><div style={{ display: "flex", background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>{[{ k: "resume", l: "Resume" }, { k: "all", l: "All" }].map(v => <button key={v.k} onClick={() => setExpView(v.k)} style={{ padding: "5px 13px", fontSize: 12, cursor: "pointer", border: "none", background: expView === v.k ? C.text : "transparent", color: expView === v.k ? C.bg : C.textMuted, fontWeight: expView === v.k ? 600 : 400 }}>{v.l}</button>)}</div></div>
        <div style={{ position: "relative", paddingLeft: 24 }}><div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: C.border }} />{filteredExp.map((e, i) => <div key={i} style={{ paddingBottom: 18, position: "relative" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: C.bg, border: `2px solid ${e.showOnResume ? C.primary : C.textDim}`, position: "absolute", left: -24, top: 3, zIndex: 1 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: e.showOnResume ? C.primary : C.textDim, margin: "3px" }} /></div><div style={{ paddingLeft: 4 }}><div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}><div><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{e.role}</div><div style={{ fontSize: 12, color: C.textMuted }}>{e.org}</div></div><div style={{ display: "flex", alignItems: "center", gap: 6 }}>{!e.showOnResume && <Pill small>Personal</Pill>}<div style={{ fontSize: 11, color: C.textDim }}>{e.period}</div></div></div><div style={{ marginTop: 5 }}>{e.bullets.map((b, j) => <div key={j} style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, paddingLeft: 10, position: "relative" }}><span style={{ position: "absolute", left: 0, color: C.textDim }}>·</span>{b}</div>)}</div></div></div>)}</div>
      </section>

      {/* ACHIEVEMENTS */}
      <section ref={registerRef("achievements")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}><SH sub="Recognition and honors">Achievements</SH><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 10 }}>{ACHIEVEMENTS.map((a, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ width: 30, height: 30, borderRadius: 7, background: `${C.primary}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🏅</div><div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{a.title}</div><div style={{ fontSize: 11, color: C.textMuted }}>{a.org}{a.detail ? ` · ${a.detail}` : ""}</div></div></div>)}</div></section>

      {/* EDUCATION */}
      <section ref={registerRef("education")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}><SH sub="Academic background">Education</SH><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{EDUCATION.map((e, i) => <div key={i} style={{ padding: 16, background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}><div><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{e.degree}</div><div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{e.school}</div>{e.detail && <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>{e.detail}</div>}</div>{e.year && <div style={{ fontSize: 12, color: C.textDim, fontWeight: 600 }}>{e.year}</div>}</div></div>)}</div></section>

      {/* CREDENTIALS */}
      <section ref={registerRef("credentials")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}><SH sub="Coursework and certifications">Credentials</SH>{CERTIFICATIONS.length > 0 && <div style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Certifications</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{CERTIFICATIONS.map((c, i) => <div key={i} style={{ padding: "8px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.text }}>{c.name}</div>)}</div></div>}<div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Coursework</div><div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{COURSEWORK.map((cw, i) => <div key={i} style={{ padding: 16, background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>{cw.institution}</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{cw.courses.map((c, j) => <span key={j} style={{ padding: "3px 10px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, color: C.textMuted }}>{c}</span>)}</div></div>)}</div></section>

      {/* MENTORS */}
      <section ref={registerRef("mentors")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}><div style={{ background: "linear-gradient(135deg, #1a1520, #15121e)", borderRadius: 16, border: "1px solid #2d2338", padding: m ? "20px 16px" : "28px 24px" }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><span style={{ fontSize: 20 }}>👥</span><h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#e2d9f0" }}>Mentors</h2></div><p style={{ fontSize: 13, color: "#8878a0", margin: "0 0 20px" }}>People who shaped my journey</p>{MENTORS.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 12 }}>{MENTORS.map((mt, i) => { const W = mt.url ? "a" : "div"; return <W key={i} href={mt.url || undefined} target={mt.url ? "_blank" : undefined} rel={mt.url ? "noopener noreferrer" : undefined} style={{ padding: 16, background: "#1e1828", borderRadius: 10, border: "1px solid #2d2338", display: "flex", gap: 14, alignItems: "center", textDecoration: "none" }}><div style={{ width: 44, height: 44, borderRadius: "50%", background: "#9333ea15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👤</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#e2d9f0" }}>{mt.name}</div><div style={{ fontSize: 12, color: "#8878a0" }}>{mt.role}</div><div style={{ fontSize: 11, color: "#6b5f80" }}>{mt.org}</div></div>{mt.url && <span style={{ color: "#8878a0" }}>↗</span>}</W>; })}</div> : <div style={{ padding: 28, background: "#1e1828", borderRadius: 12, border: "1px dashed #3d3050", textAlign: "center" }}><div style={{ fontSize: 13, color: "#8878a0" }}>Coming soon</div></div>}</div></section>

      {/* ORGANIZATIONS */}
      <section ref={registerRef("organizations")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}><div style={{ background: "linear-gradient(135deg, #1a1815, #1e1a12)", borderRadius: 16, border: "1px solid #33291e", padding: m ? "20px 16px" : "28px 24px" }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><span style={{ fontSize: 20 }}>🏛️</span><h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#f0e6d0" }}>Organizations</h2></div><p style={{ fontSize: 13, color: "#a09070", margin: "0 0 20px" }}>Affiliated, employed, and collaborated with</p>{ORG_GROUPS.map(g => { const orgs = ORGANIZATIONS.filter(o => o.group === g.key); if (!orgs.length) return null; return <div key={g.key} style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#a09070", marginBottom: 10 }}>{g.icon} {g.label}</div><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 8 }}>{orgs.map((o, i) => { const W = o.url ? "a" : "div"; return <W key={i} href={o.url || undefined} target={o.url ? "_blank" : undefined} rel={o.url ? "noopener noreferrer" : undefined} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#1e1b15", borderRadius: 8, border: "1px solid #33291e", textDecoration: "none" }}><div style={{ width: 32, height: 32, borderRadius: 7, background: "#28231a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{o.logo}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#f0e6d0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.name}</div><div style={{ fontSize: 11, color: "#887860", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.role}</div></div>{o.period && <div style={{ fontSize: 10, color: "#6b5f48", flexShrink: 0 }}>{o.period}</div>}{o.url && <span style={{ color: "#a09070", fontSize: 11 }}>↗</span>}</W>; })}</div></div>; })}</div></section>

      <ConnectSection />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: MY WORK                                                          ██
   ██████████████████████████████████████████████████████████████████████████████ */
const WorkPage = ({ initialProjectId }) => {
  const C = useTheme(); const m = useIsMobile();
  const [tab, setTab] = useState("projects"); const [projectFilter, setProjectFilter] = useState("all"); const [themeFilter, setThemeFilter] = useState("all"); const [modalProject, setModalProject] = useState(null);
  useEffect(() => { if (initialProjectId) { const p = PROJECTS.find(proj => proj.id === initialProjectId); if (p) setTimeout(() => setModalProject(p), 200); } }, [initialProjectId]);
  const filteredProjects = PROJECTS.filter(p => { if (projectFilter !== "all" && p.type !== projectFilter) return false; if (themeFilter !== "all" && p.theme !== themeFilter) return false; return true; });
  const allLinks = []; PROJECTS.forEach(p => p.links.forEach(l => { if (l.showInLinksTab) allLinks.push({ ...l, projectName: p.name, theme: p.theme }); }));
  const linksByTheme = {}; allLinks.forEach(l => { if (!linksByTheme[l.theme]) linksByTheme[l.theme] = []; linksByTheme[l.theme].push(l); });

  return (
    <div style={{ paddingTop: 28, paddingBottom: 40 }}>
      <h1 style={{ fontSize: m ? 26 : 30, fontWeight: 300, margin: 0, color: "#fafafa" }}><span style={{ fontWeight: 700 }}>{S.pages.work.headline}</span></h1>
      {/* GitHub + Pubs zone */}
      <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 12, marginTop: 24, padding: m ? 14 : 18, background: "linear-gradient(135deg, #0d1117, #111827)", borderRadius: 14, border: "1px solid #1e293b" }}>
        <a href={S.socials.find(s => s.name === "GitHub")?.url || "#"} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "#0d1117", borderRadius: 10, border: "1px solid #21262d", textDecoration: "none" }}><div style={{ width: 40, height: 40, borderRadius: 10, background: "#161b22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#58a6ff", flexShrink: 0 }}>GH</div><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>GitHub</div><div style={{ fontSize: 11, color: "#8b949e" }}>Repositories</div></div><span style={{ color: "#58a6ff" }}>→</span></a>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><a href="https://www.researchgate.net/profile/Kim-Hwang-Yeo/research" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "#0d1117", borderRadius: 10, border: "1px solid #21262d", textDecoration: "none", flex: 1 }}><div style={{ width: 32, height: 32, borderRadius: 7, background: "#00d0a110", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#00d0a1" }}>RG</div><div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#e6edf3" }}>ResearchGate</div><span style={{ fontSize: 12, color: "#00d0a1" }}>→</span></a><a href="https://orcid.org/0000-0001-8849-1534" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "#0d1117", borderRadius: 10, border: "1px solid #21262d", textDecoration: "none", flex: 1 }}><div style={{ width: 32, height: 32, borderRadius: 7, background: "#a6ce3910", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#a6ce39" }}>ID</div><div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#e6edf3" }}>ORCID</div><span style={{ fontSize: 12, color: "#a6ce39" }}>→</span></a></div>
      </div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>{PUBLICATIONS.map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "#0d111788", borderRadius: 8, border: "1px solid #1e293b", flexWrap: m ? "wrap" : "nowrap", gap: 8 }}><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#c9d1d9" }}>{p.title}</div><div style={{ fontSize: 11, color: "#8b949e", marginTop: 1 }}>{p.venue} · {p.year}</div></div><Pill color={p.type === "paper" ? "#58a6ff" : "#a78bfa"} accent small>{p.type}</Pill><a href={p.pdfUrl} style={{ padding: "4px 10px", background: "#161b22", border: "1px solid #30363d", borderRadius: 6, fontSize: 11, color: "#8b949e", textDecoration: "none" }}>↓ PDF</a></div>)}</div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginTop: 28, borderBottom: `1px solid ${C.border}`, overflowX: "auto" }}>{[{ k: "projects", l: "Projects" }, { k: "writings", l: "Writings" }, { k: "links", l: "Links" }].map(t => <button key={t.k} onClick={() => setTab(t.k)} style={{ padding: "10px 18px", fontSize: 13, cursor: "pointer", background: "transparent", border: "none", color: tab === t.k ? "#fff" : C.textDim, borderBottom: tab === t.k ? `2px solid ${C.secondary}` : "2px solid transparent", fontWeight: tab === t.k ? 600 : 400, whiteSpace: "nowrap" }}>{t.l}</button>)}</div>
      {tab === "projects" && <div style={{ paddingTop: 20 }}><div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>{[{ k: "all", l: "All" }, { k: "own", l: "My Projects" }, { k: "mentored", l: "Mentored" }].map(f => <button key={f.k} onClick={() => setProjectFilter(f.k)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, cursor: "pointer", background: projectFilter === f.k ? C.text : C.surface, color: projectFilter === f.k ? C.bg : C.textMuted, border: `1px solid ${projectFilter === f.k ? C.text : C.border}`, fontWeight: projectFilter === f.k ? 600 : 400 }}>{f.l}</button>)}<div style={{ width: 1, height: 22, background: C.border, alignSelf: "center" }} />{[{ k: "all", l: "All Themes" }, ...S.themes.map(t => ({ k: t.label, l: t.label }))].map(f => <button key={f.k} onClick={() => setThemeFilter(f.k)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, cursor: "pointer", background: themeFilter === f.k ? C.primary : C.surface, color: themeFilter === f.k ? "#fff" : C.textMuted, border: `1px solid ${themeFilter === f.k ? C.primary : C.border}`, fontWeight: themeFilter === f.k ? 600 : 400 }}>{f.l}</button>)}</div><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 12 }}>{filteredProjects.map(p => <ProjectCard key={p.id} project={p} onClick={setModalProject} />)}</div></div>}
      {tab === "writings" && <div style={{ paddingTop: 20 }}>{WRITINGS.length > 0 ? WRITINGS.map((w, i) => <div key={i} style={{ padding: 18, background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}><div><div style={{ display: "flex", gap: 5, marginBottom: 6 }}><Pill color={C.accent} accent small>{w.type}</Pill>{w.theme && <Pill small>{w.theme}</Pill>}</div><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{w.title}</div><div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{w.year}</div>{w.desc && <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, margin: "8px 0 0" }}>{w.desc}</p>}</div>{w.url && <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: C.primary, textDecoration: "none" }}>View ↗</a>}</div></div>) : <div style={{ padding: 36, textAlign: "center", color: C.textDim }}><div style={{ fontSize: 13 }}>No writings yet.</div><div style={{ fontSize: 12, marginTop: 4 }}>Add entries to WRITINGS: grants, reports, briefs, essays.</div></div>}</div>}
      {tab === "links" && <div style={{ paddingTop: 20 }}>{Object.keys(linksByTheme).length > 0 ? Object.entries(linksByTheme).map(([theme, links]) => { const tc = getTC(theme, C); return <div key={theme} style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 600, color: tc, marginBottom: 8 }}><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: tc, marginRight: 8, verticalAlign: "middle" }} />{theme}</div><div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 18 }}>{links.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, textDecoration: "none" }}><div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{l.label}</div><div style={{ fontSize: 11, color: C.textDim }}>{l.projectName}</div></div><span style={{ color: tc }}>↗</span></a>)}</div></div>; }) : <div style={{ padding: 36, textAlign: "center", color: C.textDim, fontSize: 13 }}>Set <code style={{ background: C.surface, padding: "2px 6px", borderRadius: 4 }}>showInLinksTab: true</code> on project links.</div>}</div>}
      <ConnectSection />
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: INSIGHTS                                                         ██
   ██████████████████████████████████████████████████████████████████████████████ */
const InsightsPage = () => {
  const C = useTheme(); const m = useIsMobile(); const P = S.pages.insights;
  const published = INSIGHTS.filter(i => i.status === "published");
  const coming = INSIGHTS.filter(i => i.status === "coming");

  return (
    <div style={{ paddingTop: 28, paddingBottom: 40 }}>
      <h1 style={{ fontSize: m ? 26 : 30, fontWeight: 300, margin: 0, color: "#fafafa" }}><span style={{ fontWeight: 700 }}>{P.headline}</span></h1>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 8, maxWidth: 600, lineHeight: 1.7 }}>{P.bio}</p>

      {/* Blog link card */}
      {P.blogUrl && P.blogUrl !== "#" && (
        <a href={P.blogUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24, padding: "18px 22px", background: `${C.primary}0a`, border: `1px solid ${C.primary}30`, borderRadius: 14, textDecoration: "none", transition: "border 0.2s" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.primary}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📝</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{P.blogLabel}</div><div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Read my blog posts and longer-form writing</div></div>
          <span style={{ fontSize: 14, color: C.primary }}>→</span>
        </a>
      )}
      {/* Show placeholder if blog URL not set */}
      {(!P.blogUrl || P.blogUrl === "#") && (
        <div style={{ marginTop: 24, padding: "18px 22px", background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 14, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.primary}08`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📝</div>
          <div><div style={{ fontSize: 16, fontWeight: 600, color: C.textMuted }}>{P.blogLabel}</div><div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>Set blogUrl in pages.insights config to activate</div></div>
        </div>
      )}

      {/* Published articles */}
      {published.length > 0 && <div style={{ marginTop: 32 }}><SH>Published</SH><div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap: 14 }}>{published.map((a, i) => <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" style={{ padding: 20, background: C.surface, borderRadius: 12, border: `1px solid ${C.border}`, textDecoration: "none" }}><div style={{ display: "flex", gap: 5, marginBottom: 8 }}>{a.tags.map((t, j) => <Pill key={j} small>{t}</Pill>)}</div><div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 6 }}>{a.title}</div><p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: 0 }}>{a.excerpt}</p><div style={{ fontSize: 12, color: C.primary, marginTop: 12, fontWeight: 500 }}>Read ↗</div></a>)}</div></div>}

      {/* Pipeline — hidden by default, toggle via config */}
      {P.showPipeline && coming.length > 0 && <div style={{ marginTop: 32 }}><SH sub="Articles in the pipeline">Coming Soon</SH><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{coming.map((a, i) => <div key={i} style={{ padding: "16px 20px", background: C.surface, borderRadius: 10, border: `1px dashed ${C.border}`, opacity: 0.7 }}><div style={{ display: "flex", gap: 5, marginBottom: 6 }}>{a.tags.map((t, j) => <Pill key={j} small>{t}</Pill>)}</div><div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{a.title}</div><p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, margin: "4px 0 0" }}>{a.excerpt}</p></div>)}</div></div>}

      <ConnectSection />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  MAIN APP                                                               ██
   ██████████████████████████████████████████████████████████████████████████████ */
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [navParams, setNavParams] = useState({});
  const [themeKey, setThemeKey] = useState("default");
  const [menuOpen, setMenuOpen] = useState(false);
  const m = useIsMobile();
  const C = S.colorThemes[themeKey];
  const isAccessible = themeKey === "accessible";
  const pages = [{ key: "home", label: "Home" }, { key: "about", label: "About" }, { key: "work", label: "My Work" }, { key: "insights", label: "Insights" }];

  const navigateTo = (key, params = {}) => { setNavParams(params); setPage(key); setMenuOpen(false); };
  const handleNavClick = (key) => { setNavParams({}); setPage(key); setMenuOpen(false); };
  const handleGalleryAction = ({ action, projectId }) => { if (action === "openProject") navigateTo("work", { initialProjectId: projectId }); else if (action === "scrollToMentors") navigateTo("about", { initialSection: "mentors" }); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

  const menuSocials = S.socials.filter(s => s.showInMenu);
  const footerSocials = S.socials.filter(s => s.showInFooter);

  return (
    <ThemeCtx.Provider value={C}>
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <nav style={{ position: "sticky", top: 0, zIndex: 100, background: `${C.bg}e0`, backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px", height: 56, display: "flex", alignItems: "center" }}>
            <button onClick={() => handleNavClick("home")} style={{ background: "none", border: `1px solid ${page === "home" ? `${C.primary}30` : "transparent"}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", borderRadius: 10, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = `${C.primary}15`} onMouseLeave={e => e.currentTarget.style.background = "none"}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{S.initials}</div>
              <span style={{ fontSize: 14 }}><span style={{ fontWeight: 400, color: C.textMuted }}>{S.firstName}</span><span style={{ color: C.textDim, margin: "0 2px" }}>·</span><span style={{ fontWeight: 700, color: "#fff" }}>{S.lastName}</span></span>
            </button>
            {!m && <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>{pages.filter(p => p.key !== "home" || S.showHomeInMenu).map(p => <button key={p.key} onClick={() => handleNavClick(p.key)} style={{ padding: "6px 12px", fontSize: 13, cursor: "pointer", background: page === p.key ? `${C.text}0d` : "transparent", color: page === p.key ? "#fff" : C.textMuted, border: "none", borderRadius: 6, fontWeight: page === p.key ? 600 : 400 }}>{p.label}</button>)}</div>}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              {/* Accessibility toggle — high-contrast styled when NOT active so users who need it can find it */}
              <button onClick={() => setThemeKey(k => k === "default" ? "accessible" : "default")} title={isAccessible ? "Switch to default theme" : "Switch to high contrast"} style={{
                padding: "3px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 700, transition: "all 0.2s",
                background: isAccessible ? C.surface : "#f59e0b22",
                border: isAccessible ? `1px solid ${C.border}` : "1px solid #f59e0b66",
                color: isAccessible ? C.textMuted : "#f59e0b",
              }}>{isAccessible ? "◑ Default" : "◐ A11y"}</button>
              {!m && <>
                {menuSocials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} style={{ width: 26, height: 26, borderRadius: 5, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: C.textMuted, textDecoration: "none" }}>{s.icon}</a>)}
                <div style={{ width: 1, height: 18, background: C.border, margin: "0 3px" }} />
                <a href={`mailto:${S.email}`} title="Email" style={{ width: 26, height: 26, borderRadius: 5, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.textMuted, textDecoration: "none" }}>@</a>
              </>}
              <a href={S.resumeUrl} download style={{ padding: "5px 11px", background: C.primary, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, textDecoration: "none" }}>↓ CV</a>
              {m && <button onClick={() => setMenuOpen(!menuOpen)} style={{ width: 32, height: 32, borderRadius: 6, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.text, fontSize: 16 }}>{menuOpen ? "✕" : "☰"}</button>}
            </div>
          </div>
          {m && menuOpen && <div style={{ padding: "8px 20px 16px", borderTop: `1px solid ${C.border}`, background: C.bg }}>{pages.filter(p => p.key !== "home" || S.showHomeInMenu).map(p => <button key={p.key} onClick={() => handleNavClick(p.key)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 14, background: "none", border: "none", color: page === p.key ? "#fff" : C.textMuted, fontWeight: page === p.key ? 600 : 400, cursor: "pointer", borderBottom: `1px solid ${C.border}` }}>{p.label}</button>)}<div style={{ display: "flex", gap: 8, marginTop: 12 }}>{S.socials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ width: 34, height: 34, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.textMuted, textDecoration: "none" }}>{s.icon}</a>)}</div></div>}
        </nav>
        <main style={{ maxWidth: 960, margin: "0 auto", padding: m ? "0 16px" : "0 32px" }}>
          {page === "home" && <HomePage setPage={handleNavClick} onGalleryAction={handleGalleryAction} />}
          {page === "about" && <AboutPage initialSection={navParams.initialSection} />}
          {page === "work" && <WorkPage initialProjectId={navParams.initialProjectId} />}
          {page === "insights" && <InsightsPage />}
        </main>
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: m ? "20px 16px" : "24px 32px", maxWidth: 960, margin: "0 auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}><div style={{ fontSize: 11, color: C.textDim }}>© 2026 {S.firstName} {S.lastName} · Singapore & USA</div><div style={{ display: "flex", gap: 12 }}>{footerSocials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.textDim, textDecoration: "none" }}>{s.name}</a>)}</div></div></footer>
      </div>
    </ThemeCtx.Provider>
  );
}
