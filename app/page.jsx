"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ██████████████████████████████████████████████████████████████████████████████
   ██  SITE CONFIGURATION                                                     ██
   ██  Edit theme, branding, colors, socials, and content here.               ██
   ██  Changes apply site-wide automatically.                                 ██
   ██████████████████████████████████████████████████████████████████████████████ */
const SITE_CONFIG = {
  /* ── Identity ── */
  firstName: "Kim Hwang",      // Shown in nav (regular weight)
  lastName: "Yeo",             // Shown in nav (bold weight) — visually distinguishes family name
  initials: "KH",              // Shown inside the logo square. To use image: see nav comment.

  /* ── Navigation ── */
  showHomeInMenu: false,       // true: shows "Home" in menu tabs. false: name/logo is the home button.
  // When false, the name in the nav bar acts as the home link (styled as clickable).

  tagline: "Bioengineering · Global Health · Innovation",

  /* ── Hero Section ──
     heroHeadline: Two-line headline [line1, bolded line2]
     heroBio: Paragraph under the headline (supports <strong> tags)
     heroImage: URL to a background/side image for the hero. Set "" for none.
               Place image at /public/files/images/hero.jpg */
  heroHeadline: ["Building technology that", "reaches the last mile."],
  heroBio: `I'm Kim Hwang Yeo — a bioengineering professional working at the intersection of medical technology, healthcare innovation, and systems-level thinking. Based in Singapore and the USA, with experience spanning China and East Africa.`,
  heroImage: "",  // e.g. "/files/images/hero.jpg" or "https://..."

  email: "kimhwangyeo@gmail.com",

  /* ── Files & Assets ──
     When deploying (Vercel/GitHub Pages with Next.js or static):
     Put all files in /public/files/:
       /public/files/resume.pdf
       /public/files/publications/paper1.pdf
       /public/files/images/hero.jpg
     Reference as: "/files/resume.pdf", "/files/images/hero.jpg"
     Or use external URLs: "https://drive.google.com/..." */
  resumeUrl: "#",   // Path to downloadable resume PDF
  favicon: "🧬",    // Replace with favicon.ico in /public/

  /* ── Theme Colors ──
     Change these to restyle the entire site */
  colors: {
    primary: "#059669",
    secondary: "#2563eb",
    accent: "#9333ea",
    bg: "#0a0a0a",
    surface: "#111111",
    surfaceHover: "#1a1a1a",
    border: "#1e1e1e",
    text: "#e5e5e5",
    textMuted: "#888888",
    textDim: "#555555",
  },

  /* ── Social Links ──
     Edit URLs here — auto-updates nav, footer, homepage, and About > Let's Connect.
     To add: push a new { name, icon, url } object.
     To remove: delete the object. */
  socials: [
    { name: "LinkedIn", icon: "in", url: "https://linkedin.com/in/kimhwang" },
    { name: "ResearchGate", icon: "RG", url: "https://www.researchgate.net/profile/Kim-Hwang-Yeo/research" },
    { name: "ORCID", icon: "ID", url: "https://orcid.org/0000-0001-8849-1534" },
    // { name: "GitHub", icon: "GH", url: "#" },
    { name: "Medium", icon: "M", url: "https://medium.com/@kimhwangyeo" },
  ],

  /* ── Thematic Pillars (Homepage convergence formula) ── */
  pillars: [
    { label: "Business & Finance", color: "#f59e0b" },
    { label: "Medicine", color: "#ef4444" },
    { label: "Engineering", color: "#3b82f6" },
  ],

  /* ── Themes ──
     ADD/EDIT/REMOVE freely. Auto-populates: philosophy cards, gallery filters,
     project filters, links grouping.
     Example: { label: "AI & Data", icon: "🤖", color: "#06b6d4", desc: "..." } */
  themes: [
    { label: "Global Health", icon: "🌍", color: "#059669", desc: "Advancing health equity through technology and systems thinking across low-resource settings in East Africa and Southeast Asia." },
    { label: "Innovation", icon: "⚡", color: "#2563eb", desc: "Building novel diagnostic platforms and medical devices from concept through FDA strategy and clinical deployment." },
    { label: "Entrepreneurship", icon: "🚀", color: "#9333ea", desc: "Translating research into real-world impact — securing funding, navigating regulatory pathways, and scaling solutions." },
  ],

  blogUrl: "#", // External blog URL (Medium profile)

  /* ── Let's Connect Section ── */
  connectTagline: "Open to opportunities in MedTech, Global Health, and Innovation",
};

const C = SITE_CONFIG.colors;
const FULL_NAME = `${SITE_CONFIG.firstName} ${SITE_CONFIG.lastName}`;
const getThemeColor = (label) => SITE_CONFIG.themes.find(t => t.label === label)?.color || "#888";


/* ██████████████████████████████████████████████████████████████████████████████
   ██  DATA — Edit content below. Auto-updates across all pages.              ██
   ██████████████████████████████████████████████████████████████████████████████ */

const PROJECTS = [
  { id: "ekyaalo", name: "Ekyaalo Diagnostics Platform", theme: "Global Health", type: "own", desc: "End-to-end digital pathology platform for breast cancer screening in low-resource settings. Secured USD 250K ACS grant. FDA pre-submission prepared.", images: [], tags: ["Computer Vision", "Medical Device", "Regulatory", "Global Health"], links: [{ label: "CBID Feature", url: "https://cbid.bme.jhu.edu/2024/01/08/ekyaalo-diagnostics-breast-cancer-equity-project-in-uganda-265k-grant/", showInLinksTab: true }], featured: true, galleryEmoji: "🔬", showInUpdates: true, updateDate: "2023-10" },
  { id: "cgm", name: "Continuous Glucose Monitor", theme: "Innovation", type: "own", desc: "Feasibility study for minimally invasive continuous glucose monitoring using novel magnetic nanoparticles at Berkeley Imaging Systems Lab.", images: [], tags: ["Nanotechnology", "Biosensors", "Research"], links: [], galleryEmoji: "🧪" },
  { id: "sterilization", name: "Surgical Sterilization Device", theme: "Global Health", type: "own", desc: "Designed sterilization solutions for surgical equipment in collaboration with Makerere University, Kampala, Uganda.", images: [], tags: ["Design", "Global Health", "Low-Resource"], links: [], galleryEmoji: "🏥" },
  { id: "mosaic", name: "Diagnostic Hardware — Mosaic", theme: "Innovation", type: "own", desc: "Testing, validation, and optimization of diagnostic hardware prototypes. 20% improvement in manufacturing assembly efficiency.", images: [], tags: ["Hardware", "Manufacturing", "Diagnostics"], links: [], galleryEmoji: "⚙️" },
  { id: "fda", name: "FDA Pre-Submission Strategy", theme: "Innovation", type: "own", desc: "Prepared regulatory documentation supporting FDA pre-submission for a novel digital pathology medical device.", images: [], tags: ["Regulatory", "FDA", "Strategy"], links: [], galleryEmoji: "📋" },
  { id: "pediatric", name: "Pediatric Monitoring Systems", theme: "Innovation", type: "mentored", desc: "Mentored JHU student teams developing pediatric patient monitoring devices.", images: [], tags: ["Medical Device", "Mentorship", "Pediatrics"], links: [], galleryEmoji: "👶" },
  { id: "biopsy", name: "Biopsy Instrumentation", theme: "Innovation", type: "mentored", desc: "Guided development of novel biopsy tools through JHU bioengineering design courses.", images: [], tags: ["Instrumentation", "Design", "Mentorship"], links: [], galleryEmoji: "🔧" },
  { id: "digipath-students", name: "Digital Pathology Student Projects", theme: "Global Health", type: "mentored", desc: "Supervised teams building complementary digital pathology solutions at Johns Hopkins.", images: [], tags: ["Pathology", "AI", "Mentorship"], links: [], galleryEmoji: "🎓" },
];

const MENTORS = [
  // { id: "m1", name: "Dr. Jane Smith", role: "Professor", org: "Johns Hopkins", url: "https://linkedin.com/in/..." },
  // url: link to their profile/website. Leave "" for no link. Cards become clickable when url is set.
];

const ORGANIZATIONS = [
  { id: "o1", name: "Ekyaalo Diagnostics", group: "employer", role: "Head of R&D", period: "2023–2024", logo: "🔬", url: "https://www.linkedin.com/company/ekyaalo-diagnostics" },
  { id: "o2", name: "Johns Hopkins University", group: "academic", role: "M.S.E. · Instructor · Research Fellow", period: "2022–2024", logo: "🏛️", url: "https://cbid.bme.jhu.edu/" },
  { id: "o3", name: "UC Berkeley", group: "academic", role: "B.S. Bioengineering · IT Consultant", period: "2020–2022", logo: "🐻", url: "https://bioeng.berkeley.edu/" },
  { id: "o4", name: "Ocular Therapeutix", group: "employer", role: "Global Market Access Strategist", period: "2023", logo: "👁️", url: "https://www.ocutx.com/" },
  { id: "o5", name: "Mosaic Consulting", group: "employer", role: "Hardware Systems Engineer", period: "2022", logo: "🔩", url: "https://www.linkedin.com/company/mosaic-design-labs/" },
  { id: "o6", name: "Aravind Eye Hospital", group: "partner", role: "Clinical Partnership", period: "2023", logo: "🏥", url: "https://aravind.org/" },
  { id: "o7", name: "Makerere University", group: "partner", role: "Field Research Collaboration", period: "2021–2023", logo: "🌍", url: "https://www.mak.ac.ug/" },
  { id: "o8", name: "American Cancer Society", group: "partner", role: "USD 250K Grant Funder", period: "2023", logo: "🎗️", url: "https://www.cancer.org/" },
  { id: "o9", name: "Engineering World Health", group: "affiliation", role: "Medical Device Design", period: "2021", logo: "⚕️", url: "https://www.ewh.org/" },
  { id: "o10", name: "Singapore Armed Forces", group: "employer", role: "Lieutenant — Guards Formation", period: "2016–2017", logo: "🎖️", url: "https://www.mindef.gov.sg/web/portal/army/" },
  { id: "o11", name: "Hwa Chong Institution", group: "academic", role: "A-Levels", period: "", logo: "🏫", url: "https://www.hci.edu.sg/" },
  { id: "o12", name: "Santa Monica College", group: "academic", role: "A.A. + A.S. · 4.00 GPA", period: "2018–2020", logo: "📚", url: "https://www.smc.edu/" },
  { id: "o13", name: "Tau Beta Pi", group: "affiliation", role: "National Engineering Honor Society", period: "", logo: "🏅", url: "https://www.tbp.org/" },
  { id: "o14", name: "Alpha Gamma Sigma", group: "affiliation", role: "Honor Society — Scholarship, Leadership & Service", period: "", logo: "🎓", url: "https://www.alphagammasigma.org/" },
  // Add more: { id, name, group, role, period, logo, url }
];

const ORG_GROUPS = [
  { key: "employer", label: "Employers", icon: "💼" },
  { key: "academic", label: "Academic Institutions", icon: "🏛️" },
  { key: "partner", label: "Partners & Collaborators", icon: "🤝" },
  { key: "affiliation", label: "Affiliations & Societies", icon: "🏅" },
];

const BLOG_POSTS = [
  // { id: "b1", title: "...", url: "https://medium.com/@...", date: "2024-03-15", excerpt: "..." },
];

const SOCIAL_POSTS = [
  { id: "s1", title: "USD 250K Grant Win", url: "#", date: "2023-10-01", source: "LinkedIn", excerpt: "American Cancer Society competitive funding for Ekyaalo Diagnostics" },
  { id: "s2", title: "Uganda Field Research", url: "#", date: "2023-06-15", source: "LinkedIn", excerpt: "Multi-institutional usability study — clinical immersion" },
  { id: "s3", title: "Top Graduate — UC Berkeley", url: "#", date: "2022-05-13", source: "LinkedIn", excerpt: "Bioengineering Departmental Citation, High Honors" },
  { id: "s4", title: "Map the Systems 2024 Winner", url: "#", date: "2024-06-01", source: "LinkedIn", excerpt: "Systems Mapping competition — global winner" },
];

/* pdfUrl: "/files/publications/paper.pdf" or external URL */
const PUBLICATIONS = [
  { id: "p1", title: "Women's Health Diagnostics — Multiple Publications", venue: "Johns Hopkins / CBID", type: "paper", year: "2022–2024", pdfUrl: "#" },
  { id: "p2", title: "Magnetic Nanoparticle Characterization for Biosensing", venue: "Berkeley Imaging Systems Lab", type: "paper", year: "2022", pdfUrl: "#" },
  { id: "p3", title: "Map the Systems 2024 — Systems Mapping", venue: "Global Competition", type: "poster", year: "2024", pdfUrl: "#" },
];

/* showOnResume: true → visible in "Resume" view; false → only in "All Experiences" */
const EXPERIENCE = [
  { role: "Head of R&D", org: "Ekyaalo Diagnostics, Maryland", period: "Apr 2023 – Aug 2024", showOnResume: true, bullets: ["Led end-to-end development of digital pathology platform for low-resource healthcare environments", "Secured USD 250K in competitive funding from the American Cancer Society", "Prepared FDA pre-submission documentation for novel medical device"] },
  { role: "Bioengineering Design Instructor", org: "Johns Hopkins University", period: "Aug 2022 – May 2024", showOnResume: true, bullets: ["Delivered instruction across undergraduate, graduate, and professional courses", "Mentored teams on pediatric monitoring, digital pathology, and biopsy instrumentation", "Co-developed global health field curriculum — Uganda & Kenya"] },
  { role: "Global Market Access Strategist (Intern)", org: "Ocular Therapeutix, Boston", period: "Apr – Sep 2023", showOnResume: true, bullets: ["Initiated strategic engagement with Aravind Eye Hospital leadership"] },
  { role: "Women's Health Research Fellow", org: "JHU CBID, Baltimore", period: "Jun 2022 – May 2023", showOnResume: true, bullets: ["Multiple publications on women's health challenges", "Planned and executed multi-institutional usability study in Uganda"] },
  { role: "Nanoparticle Research Engineer", org: "Berkeley Imaging Systems Lab", period: "Aug 2021 – May 2022", showOnResume: true, bullets: ["Established feasibility of magnetic nanoparticles for continuous glucose monitoring", "Characterized and published novel magnetic nanoparticle properties"] },
  { role: "Hardware Systems Engineer", org: "Mosaic Consulting, Berkeley", period: "Mar – Jun 2022", showOnResume: true, bullets: ["Improved manufacturing assembly efficiency by 20%"] },
  { role: "Senior IT Consultant", org: "UC Berkeley", period: "Aug 2020 – Mar 2022", showOnResume: true, bullets: ["Delivered frontline technical support across enterprise IT systems", "Increased team operational efficiency by 20%, leading to promotion"] },
  { role: "Medical Device Design Intern", org: "Engineering World Health, Berkeley", period: "Jun – Jul 2021", showOnResume: false, bullets: ["Designed sterilization solutions with Makerere University, Uganda"] },
  { role: "Co-founder & President", org: "Southeast Asian Cultural Club, SMC", period: "Aug – Dec 2019", showOnResume: false, bullets: ["Founded a Southeast Asian community — still active today"] },
  { role: "Lieutenant", org: "Singapore Armed Forces", period: "Feb 2016 – May 2017", showOnResume: true, bullets: ["Led and trained 40+ personnel in Guards formation", "Achieved 100% platoon graduation rate"] },
];

const ACHIEVEMENTS = [
  { title: "USD 250K Grant — American Cancer Society", org: "Ekyaalo Diagnostics", detail: "Competitive funding" },
  { title: "Bioengineering Departmental Citation", org: "UC Berkeley", detail: "Top Graduate" },
  { title: "Most Outstanding Teaching Assistant", org: "Johns Hopkins University" },
  { title: "Map the Systems 2024", org: "Systems Mapping Winner" },
  { title: "Abell Foundation Fellowship", org: "Johns Hopkins" },
  { title: "Tau Beta Pi", org: "National Engineering Honor Society" },
  { title: "Alpha Gamma Sigma Honor Society", org: "Permanent Member", detail: "Scholarship, Leadership & Service" },
];

const EDUCATION = [
  { degree: "M.S.E. Bioengineering Innovation & Design", school: "Johns Hopkins University", year: "2024", detail: "Whiting School of Engineering" },
  { degree: "B.S. Bioengineering (High Honors)", school: "UC Berkeley", year: "2022", detail: "GPA 3.96 · Dean's List · College of Engineering" },
  { degree: "A.A. General Science + A.S. Mathematics", school: "Santa Monica College", year: "2020", detail: "GPA 4.00 · Highest Honors" },
  { degree: "A-Levels (85 RP)", school: "Hwa Chong Institution, Singapore", year: "", detail: "" },
];

const COURSEWORK = [
  { institution: "Johns Hopkins", courses: ["Biomedical Data Science", "Medical Device Design & Innovation", "Biomedical Instrumentation", "Strategic Management", "Precision Medicine Data Analysis", "Evidence Generation for Med Dev Innovators", "Global Health Innovation & Design", "Computer Vision (Seminar)", "Machine Learning for Signal Processing (Audit)", "Entrepreneurial Finance", "Managing People & Resolving Conflicts"] },
  { institution: "UC Berkeley", courses: ["Tissue Engineering", "Cell Engineering", "Biomedical Imaging Systems", "Molecular & Cell Lab", "Biomedical Physiology for Engineers", "Bionanoscience & Bionanotechnology", "Ethics in Science & Engineering", "Biotechnology Entrepreneurship", "Senior Design Project", "Honors Undergraduate Research"] },
  { institution: "Santa Monica College", courses: ["Organic Chemistry I & II", "Cell Biology & Evolution", "Genetics & Molecular Biology", "Physics (Mechanics, E&M, Waves/Optics/Thermo)", "Multivariable Calculus", "Linear Algebra", "Differential Equations", "C Programming", "MATLAB Programming"] },
];

const CERTIFICATIONS = [
  { name: "Nonprofit Fundraising Essentials" },
  { name: "Business Models for Social Enterprise" },
  { name: "Systems Thinking in Public Health" },
];

const MANUAL_UPDATES = [
  { date: "2024-06", text: "Map the Systems 2024 — Systems Mapping Winner", tag: "Award" },
  { date: "2024-05", text: "Based in Singapore and the USA — open to MedTech & Global Health opportunities", tag: "Update" },
  { date: "2024-05", text: "Completed M.S.E. at Johns Hopkins", tag: "Education" },
  { date: "2023-10", text: "Secured USD 250K ACS grant for Ekyaalo Diagnostics", tag: "Milestone" },
];

function buildUpdates() {
  const items = [...MANUAL_UPDATES];
  PROJECTS.filter(p => p.showInUpdates).forEach(p => {
    if (!items.find(u => u.text.includes(p.name))) items.push({ date: p.updateDate || "", text: p.name, tag: "Project" });
  });
  return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
}

function buildGalleryItems() {
  const items = [];
  PROJECTS.forEach(p => items.push({ type: "project", title: p.name, subtitle: p.desc, theme: p.theme, emoji: p.galleryEmoji, id: p.id }));
  MENTORS.forEach(m => items.push({ type: "mentor", title: m.name, subtitle: `${m.role} · ${m.org}`, emoji: "👤", id: m.id }));
  BLOG_POSTS.forEach(b => items.push({ type: "blog", title: b.title, subtitle: b.excerpt, emoji: "📝", url: b.url, source: "Medium", id: b.id }));
  SOCIAL_POSTS.forEach(s => items.push({ type: "social", title: s.title, subtitle: s.excerpt, emoji: "💼", url: s.url, source: s.source, id: s.id }));
  return items;
}


/* ██████████████████████████████████████████████████████████████████████████████
   ██  SHARED COMPONENTS                                                      ██
   ██████████████████████████████████████████████████████████████████████████████ */

const Pill = ({ children, color = "#888", accent = false, small = false }) => (
  <span style={{ display: "inline-block", fontSize: small ? 10 : 11, padding: small ? "2px 8px" : "3px 10px", background: accent ? `${color}15` : C.surface, color: accent ? color : "#999", border: `1px solid ${accent ? `${color}30` : C.border}`, borderRadius: 20, whiteSpace: "nowrap" }}>{children}</span>
);

const SH = ({ children, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: C.text, letterSpacing: -0.5 }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: C.textMuted, margin: "3px 0 0" }}>{sub}</p>}
  </div>
);

/* Gallery card — social types (blog/post) have distinct horizontal style */
const GalleryCard = ({ item, onAction }) => {
  const [h, setH] = useState(false);
  const tc = { project: C.secondary, mentor: C.accent, blog: C.primary, social: "#f59e0b" }[item.type] || "#888";
  const isSocial = item.type === "blog" || item.type === "social";
  const click = () => { if (onAction) onAction(item); else if (isSocial && item.url) window.open(item.url, "_blank"); };

  if (isSocial) return (
    <div onClick={click} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surfaceHover : C.surface, borderRadius: 10, border: `1px solid ${h ? `${tc}40` : C.border}`, borderLeft: `3px solid ${tc}`, cursor: "pointer", transition: "all 0.2s", transform: h ? "translateY(-2px)" : "none", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 14px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 5 }}><Pill color={tc} accent small>{item.type === "blog" ? "Blog" : "Post"}</Pill>{item.source && <Pill small>{item.source}</Pill>}</div>
          <span style={{ fontSize: 12, color: tc, opacity: h ? 1 : 0.4, transition: "opacity 0.2s" }}>↗</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 3, lineHeight: 1.3 }}>{item.title}</div>
        <div style={{ fontSize: 11, color: "#666", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.subtitle}</div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${tc}40, transparent)` }} />
    </div>
  );

  return (
    <div onClick={click} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surfaceHover : C.surface, borderRadius: 10, border: `1px solid ${h ? "#333" : C.border}`, overflow: "hidden", cursor: "pointer", transition: "all 0.2s", transform: h ? "translateY(-3px)" : "none", boxShadow: h ? "0 8px 20px rgba(0,0,0,0.3)" : "none" }}>
      <div style={{ height: 80, background: `linear-gradient(135deg, ${tc}12, ${tc}05)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{item.emoji}</div>
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <div style={{ display: "flex", gap: 5 }}><Pill color={tc} accent small>{item.type}</Pill>{item.theme && <Pill small>{item.theme}</Pill>}</div>
          <span style={{ fontSize: 10, color: C.textDim, opacity: h ? 1 : 0 }}>View →</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 2 }}>{item.title}</div>
        <div style={{ fontSize: 11, color: "#666", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.subtitle}</div>
      </div>
    </div>
  );
};

/* Project modal overlay */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const tc = getThemeColor(project.theme);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#141414", borderRadius: 16, border: `1px solid ${tc}40`, maxWidth: 680, width: "100%", maxHeight: "85vh", overflow: "auto" }}>
        <div style={{ padding: "24px 28px 18px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}><Pill color={tc} accent small>{project.theme}</Pill><Pill small>{project.type === "own" ? "Own Project" : "Mentored"}</Pill></div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{project.name}</h3>
            </div>
            <button onClick={onClose} style={{ background: "#222", border: "1px solid #333", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#888", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, margin: "12px 0 0" }}>{project.desc}</p>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 12 }}>{project.tags.map((t, j) => <Pill key={j} small>{t}</Pill>)}</div>
        </div>
        <div style={{ padding: "18px 28px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: C.textDim, marginBottom: 10 }}>Gallery</div>
          {project.images.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(project.images.length, 3)}, 1fr)`, gap: 8 }}>
              {project.images.map((img, j) => <div key={j} style={{ borderRadius: 8, overflow: "hidden", background: "#1a1a1a", border: `1px solid ${C.border}`, aspectRatio: "16/10" }}><img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>)}
            </div>
          ) : <div style={{ fontSize: 11, color: C.textDim, fontStyle: "italic" }}>Add image URLs to the project's images array.</div>}
        </div>
        <div style={{ padding: "18px 28px 24px" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: C.textDim, marginBottom: 10 }}>Links</div>
          {project.links.length > 0 ? project.links.map((l, j) => (
            <a key={j} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: `${tc}08`, border: `1px solid ${tc}20`, borderRadius: 8, textDecoration: "none", fontSize: 13, color: tc, fontWeight: 500, marginBottom: 6 }}><span>↗</span> {l.label}</a>
          )) : <div style={{ fontSize: 11, color: C.textDim, fontStyle: "italic" }}>Add link objects to display here.</div>}
        </div>
      </div>
    </div>
  );
};

/* ProjectCard — separate component (hooks can't go in .map) */
const ProjectCard = ({ project, onClick }) => {
  const [h, setH] = useState(false);
  const tc = getThemeColor(project.theme);
  return (
    <div onClick={() => onClick(project)} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: "18px", background: C.surface, borderRadius: 12, border: `1px solid ${h ? `${tc}40` : C.border}`, cursor: "pointer", transition: "all 0.2s", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? `0 6px 20px ${tc}10` : "none" }}>
      <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
        <Pill color={tc} accent small>{project.theme}</Pill>
        <Pill small>{project.type === "own" ? "Own" : "Mentored"}</Pill>
        {project.images.length > 0 && <Pill small>📷 {project.images.length}</Pill>}
        {project.links.length > 0 && <Pill small>🔗 {project.links.length}</Pill>}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4 }}>{project.name}</div>
      <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.desc}</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{project.tags.slice(0, 4).map((t, j) => <Pill key={j} small>{t}</Pill>)}{project.tags.length > 4 && <Pill small>+{project.tags.length - 4}</Pill>}</div>
      <div style={{ fontSize: 11, color: tc, marginTop: 10, fontWeight: 500 }}>Click to view details →</div>
    </div>
  );
};

/* Let's Connect section — accepts flashTrigger (number) prop.
   Increment flashTrigger to trigger the glow animation. */
const ConnectSection = ({ flashTrigger = 0 }) => {
  const [flash, setFlash] = useState(false);
  const prevTrigger = useRef(0);

  useEffect(() => {
    if (flashTrigger > prevTrigger.current) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 2200);
      prevTrigger.current = flashTrigger;
      return () => clearTimeout(t);
    }
  }, [flashTrigger]);

  return (
    <section id="connect-section" style={{ marginTop: 56, paddingBottom: 20 }}>
      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${C.primary}30)` }} />
        <span style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.textDim }}>connect</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.primary}30, transparent)` }} />
      </div>
      {/* Card */}
      <div style={{
        padding: "40px 32px 32px", borderRadius: 20,
        background: flash
          ? `linear-gradient(135deg, ${C.primary}35, ${C.secondary}22)`
          : `linear-gradient(135deg, ${C.primary}0a, ${C.secondary}06)`,
        border: `2px solid ${flash ? C.primary : "#222"}`,
        transition: "all 0.4s ease",
        boxShadow: flash ? `0 0 50px ${C.primary}30, 0 0 100px ${C.primary}10` : "none",
        textAlign: "center",
      }}>
        <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: flash ? "#fff" : "#ddd", transition: "color 0.4s" }}>Let's Connect</h3>
        <p style={{ fontSize: 14, color: C.textMuted, margin: "10px 0 28px", lineHeight: 1.6 }}>{SITE_CONFIG.connectTagline}</p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <a href={`mailto:${SITE_CONFIG.email}`} style={{ padding: "11px 26px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>✉ {SITE_CONFIG.email}</a>
          {SITE_CONFIG.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} style={{
              width: 42, height: 42, borderRadius: 10,
              background: flash ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${flash ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#ccc", textDecoration: "none",
              transition: "all 0.4s",
            }}>{s.icon}</a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#444", marginTop: 24, marginBottom: 0 }}>Singapore & USA</p>
      </div>
    </section>
  );
};



/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: HOME                                                             ██
   ██████████████████████████████████████████████████████████████████████████████ */
const HomePage = ({ setPage, onGalleryAction }) => {
  const [activeTheme, setActiveTheme] = useState(0);
  const [galleryType, setGalleryType] = useState("all");
  const [connectFlash, setConnectFlash] = useState(0);
  const allGallery = buildGalleryItems();
  const filtered = galleryType === "all" ? allGallery.slice(0, 12) : allGallery.filter(i => i.type === galleryType).slice(0, 12);
  const updates = buildUpdates();
  const S = SITE_CONFIG;

  const handleGalleryClick = (item) => {
    if (item.type === "project" && onGalleryAction) onGalleryAction({ action: "openProject", projectId: item.id });
    else if (item.type === "mentor" && onGalleryAction) onGalleryAction({ action: "scrollToMentors" });
    else if ((item.type === "blog" || item.type === "social") && item.url) window.open(item.url, "_blank");
  };

  const handleConnectClick = () => {
    const el = document.getElementById("connect-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setConnectFlash(c => c + 1), 700);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "56px 0 40px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280, background: `radial-gradient(ellipse at 30% 0%, ${C.primary}55 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, ${C.secondary}22 0%, transparent 50%)`, opacity: 0.15, pointerEvents: "none" }} />
        {/* Hero image (if set) */}
        {S.heroImage && <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 280, opacity: 0.15, backgroundImage: `url(${S.heroImage})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "0 0 0 40px", pointerEvents: "none" }} />}
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: C.textDim, marginBottom: 12 }}>{S.tagline}</div>
          <h1 style={{ fontSize: 40, fontWeight: 300, margin: 0, lineHeight: 1.15, color: "#fafafa" }}>
            {S.heroHeadline[0]}<br />
            <span style={{ fontWeight: 700, background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{S.heroHeadline[1]}</span>
          </h1>
          <p style={{ fontSize: 15, color: C.textMuted, marginTop: 14, maxWidth: 560, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: S.heroBio.replace(new RegExp(`${S.firstName}\\s+${S.lastName}`), `<strong style="color:${C.text}">${FULL_NAME}</strong>`) }} />
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <button onClick={() => setPage("about")} style={{ padding: "10px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>About Me</button>
            <button onClick={() => setPage("work")} style={{ padding: "10px 22px", background: "transparent", color: "#ccc", border: "1px solid #333", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>View My Work</button>
            <button onClick={handleConnectClick} style={{ padding: "10px 22px", background: "transparent", color: C.primary, border: `1px solid ${C.primary}44`, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Let's Connect</button>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
        <SH sub="Where disciplines converge to create impact">Philosophy</SH>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {S.pillars.map((p, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ padding: "4px 12px", background: `${p.color}12`, border: `1px solid ${p.color}28`, borderRadius: 8, fontSize: 11, color: p.color, fontWeight: 600 }}>{p.label}</span>{i < S.pillars.length - 1 && <span style={{ color: "#333" }}>+</span>}</div>))}
          <span style={{ color: "#333", margin: "0 2px" }}>=</span>
          {S.themes.map((t, i) => (<span key={i} style={{ padding: "4px 10px", background: `${t.color}18`, border: `1px solid ${t.color}35`, borderRadius: 8, fontSize: 11, color: t.color, fontWeight: 700 }}>{t.icon} {t.label}</span>))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${S.themes.length}, 1fr)`, gap: 12 }}>
          {S.themes.map((t, i) => (<div key={i} onClick={() => setActiveTheme(i)} style={{ padding: "16px 14px", background: activeTheme === i ? `${t.color}0a` : C.surface, border: `1px solid ${activeTheme === i ? `${t.color}35` : C.border}`, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}><div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div><div style={{ fontSize: 13, fontWeight: 600, color: t.color, marginBottom: 4 }}>{t.label}</div><p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, margin: 0 }}>{t.desc}</p></div>))}
        </div>
      </section>

      {/* Updates */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
        <SH sub="Auto-populated from data + manual entries">Latest Updates</SH>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {updates.map((u, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 16px", background: C.surface, borderRadius: 8, border: `1px solid ${C.border}` }}><div style={{ fontSize: 11, color: C.textDim, fontWeight: 600, minWidth: 44 }}>{u.date}</div><div style={{ width: 1, height: 16, background: "#222" }} /><div style={{ flex: 1, fontSize: 13, color: "#ccc" }}>{u.text}</div><Pill small>{u.tag}</Pill></div>))}
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "40px 0", borderTop: `1px solid ${C.border}` }}>
        <SH sub="Projects, mentoring, writing, and more">Gallery</SH>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[{ k: "all", l: "All" }, { k: "project", l: "Projects" }, { k: "mentor", l: "Mentors" }, { k: "blog", l: "Blog" }, { k: "social", l: "Posts" }].map(f => (<button key={f.k} onClick={() => setGalleryType(f.k)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, cursor: "pointer", background: galleryType === f.k ? "#fff" : C.surface, color: galleryType === f.k ? "#000" : C.textMuted, border: `1px solid ${galleryType === f.k ? "#fff" : "#222"}`, fontWeight: galleryType === f.k ? 600 : 400 }}>{f.l}</button>))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {filtered.length > 0 ? filtered.map((item, i) => <GalleryCard key={item.id || i} item={item} onAction={handleGalleryClick} />) : <div style={{ gridColumn: "1 / -1", padding: "36px", textAlign: "center", color: C.textDim, fontSize: 13 }}>No items yet.</div>}
        </div>
      </section>

      {/* Let's Connect */}
      <ConnectSection flashTrigger={connectFlash} />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: ABOUT — Scroll-based section tracking (replaces IntersectionObserver)
   ██████████████████████████████████████████████████████████████████████████████ */
const AboutPage = ({ initialSection }) => {
  const [activeSection, setActiveSection] = useState(initialSection || "experience");
  const [expView, setExpView] = useState("resume");
  const sectionRefs = useRef({});
  const hasScrolledToInitial = useRef(false);
  const isPersonal = (s) => s === "mentors" || s === "organizations";

  const sections = ["experience", "achievements", "education", "credentials", "mentors", "organizations"];
  const sectionLabels = { experience: "Experience", achievements: "Achievements", education: "Education", credentials: "Credentials", mentors: "Mentors", organizations: "Organizations" };

  const registerRef = useCallback((key) => (el) => { if (el) sectionRefs.current[key] = el; }, []);

  const scrollToSection = (key) => {
    const el = sectionRefs.current[key];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
  };

  // Scroll-based active section detection — more reliable than IntersectionObserver
  useEffect(() => {
    const detect = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let active = sections[0];
      for (const s of sections) {
        const el = sectionRefs.current[s];
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) active = s;
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", detect, { passive: true });
    detect();
    return () => window.removeEventListener("scroll", detect);
  }, [expView]);

  useEffect(() => {
    if (initialSection && !hasScrolledToInitial.current) {
      hasScrolledToInitial.current = true;
      setTimeout(() => scrollToSection(initialSection), 150);
    }
  }, [initialSection]);

  const filteredExp = expView === "resume" ? EXPERIENCE.filter(e => e.showOnResume) : EXPERIENCE;

  return (
    <div style={{ paddingTop: 28, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, color: "#fafafa" }}>About <span style={{ fontWeight: 700 }}>{FULL_NAME}</span></h1>
      <p style={{ fontSize: 14, color: C.textMuted, marginTop: 8, maxWidth: 600, lineHeight: 1.7 }}>Interdisciplinary bioengineering professional. Medical technology, healthcare innovation, regulatory strategy. International experience across Singapore, the USA, China, and East Africa.</p>

      {/* Let's Connect quick bar */}
      <div style={{ marginTop: 20, padding: "14px 20px", background: `${C.primary}08`, borderRadius: 12, border: `1px solid ${C.primary}25`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Let's Connect</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={`mailto:${SITE_CONFIG.email}`} style={{ padding: "6px 14px", background: C.primary, color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>✉ {SITE_CONFIG.email}</a>
          {SITE_CONFIG.socials.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} style={{ width: 30, height: 30, borderRadius: 7, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#888", textDecoration: "none" }}>{s.icon}</a>
          ))}
        </div>
      </div>

      {/* Sticky Index Bar — Mentors & Organizations styled differently */}
      <div style={{ position: "sticky", top: 56, zIndex: 50, background: "rgba(10,10,10,0.94)", backdropFilter: "blur(14px)", borderBottom: "1px solid #222", marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {sections.map(s => {
            const isActive = activeSection === s;
            const personal = isPersonal(s);
            const activeColor = personal ? C.accent : C.primary;
            return (
              <button key={s} onClick={() => scrollToSection(s)} style={{
                padding: "10px 14px", fontSize: 12, cursor: "pointer", background: "transparent", border: "none", whiteSpace: "nowrap",
                color: isActive ? (personal ? "#d8b4fe" : "#fff") : (personal ? "#6b5f80" : "#555"),
                borderBottom: isActive ? `2px solid ${activeColor}` : "2px solid transparent",
                fontWeight: isActive ? 600 : 400,
                fontStyle: personal ? "italic" : "normal",
              }}>{personal ? `${sectionLabels[s]} ✦` : sectionLabels[s]}</button>
            );
          })}
        </div>
        <a href={SITE_CONFIG.resumeUrl} download style={{ padding: "5px 13px", background: C.primary, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, marginRight: 4, flexShrink: 0 }}>↓ Resume</a>
      </div>

      {/* EXPERIENCE */}
      <section ref={registerRef("experience")} style={{ paddingTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <SH sub="Professional journey">Experience</SH>
          <div style={{ display: "flex", background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden", flexShrink: 0 }}>
            {[{ k: "resume", l: "Resume" }, { k: "all", l: "All Experiences" }].map(v => (<button key={v.k} onClick={() => setExpView(v.k)} style={{ padding: "5px 13px", fontSize: 12, cursor: "pointer", border: "none", background: expView === v.k ? "#fff" : "transparent", color: expView === v.k ? "#000" : "#888", fontWeight: expView === v.k ? 600 : 400 }}>{v.l}</button>))}
          </div>
        </div>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "#1a1a1a" }} />
          {filteredExp.map((e, i) => (
            <div key={i} style={{ paddingBottom: 18, position: "relative" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.bg, border: `2px solid ${e.showOnResume ? C.primary : "#333"}`, position: "absolute", left: -24, top: 3, zIndex: 1 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: e.showOnResume ? C.primary : "#555", margin: "3px" }} /></div>
              <div style={{ paddingLeft: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{e.role}</div><div style={{ fontSize: 12, color: C.textMuted }}>{e.org}</div></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>{!e.showOnResume && <Pill small>Personal</Pill>}<div style={{ fontSize: 11, color: C.textDim }}>{e.period}</div></div>
                </div>
                <div style={{ marginTop: 5 }}>{e.bullets.map((b, j) => (<div key={j} style={{ fontSize: 12, color: "#777", lineHeight: 1.6, paddingLeft: 10, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#444" }}>·</span>{b}</div>))}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section ref={registerRef("achievements")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <SH sub="Recognition and honors">Achievements</SH>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {ACHIEVEMENTS.map((a, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ width: 30, height: 30, borderRadius: 7, background: `${C.primary}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🏅</div><div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{a.title}</div><div style={{ fontSize: 11, color: "#777" }}>{a.org}{a.detail ? ` · ${a.detail}` : ""}</div></div></div>))}
        </div>
      </section>

      {/* EDUCATION */}
      <section ref={registerRef("education")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <SH sub="Academic background">Education</SH>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {EDUCATION.map((e, i) => (<div key={i} style={{ padding: "16px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ display: "flex", justifyContent: "space-between" }}><div><div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{e.degree}</div><div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{e.school}</div>{e.detail && <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{e.detail}</div>}</div>{e.year && <div style={{ fontSize: 12, color: C.textDim, fontWeight: 600 }}>{e.year}</div>}</div></div>))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section ref={registerRef("credentials")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <SH sub="Coursework and professional certifications">Credentials</SH>
        {CERTIFICATIONS.length > 0 && <div style={{ marginBottom: 24 }}><div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Certifications</div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{CERTIFICATIONS.map((c, i) => (<div key={i} style={{ padding: "8px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.text }}>{c.name}</div>))}</div></div>}
        <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Relevant Coursework</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {COURSEWORK.map((cw, i) => (<div key={i} style={{ padding: "16px", background: C.surface, borderRadius: 10, border: `1px solid ${C.border}` }}><div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>{cw.institution}</div><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{cw.courses.map((c, j) => (<span key={j} style={{ padding: "3px 10px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, color: "#999" }}>{c}</span>))}</div></div>))}
        </div>
      </section>

      {/* MENTORS — distinct purple network style */}
      <section ref={registerRef("mentors")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <div style={{ background: "linear-gradient(135deg, #1a1520, #15121e)", borderRadius: 16, border: "1px solid #2d2338", padding: "28px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👥</div><h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#e2d9f0" }}>Mentors</h2></div>
          <p style={{ fontSize: 13, color: "#8878a0", margin: "0 0 20px" }}>People who shaped my journey</p>
          {MENTORS.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{MENTORS.map((m, i) => { const Wrap = m.url ? "a" : "div"; return (<Wrap key={i} href={m.url || undefined} target={m.url ? "_blank" : undefined} rel={m.url ? "noopener noreferrer" : undefined} style={{ padding: "16px", background: "#1e1828", borderRadius: 10, border: "1px solid #2d2338", display: "flex", gap: 14, alignItems: "center", textDecoration: "none", transition: "border 0.2s", cursor: m.url ? "pointer" : "default" }}><div style={{ width: 44, height: 44, borderRadius: "50%", background: `${C.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👤</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#e2d9f0" }}>{m.name}</div><div style={{ fontSize: 12, color: "#8878a0" }}>{m.role}</div><div style={{ fontSize: 11, color: "#6b5f80" }}>{m.org}</div></div>{m.url && <span style={{ fontSize: 12, color: "#8878a0" }}>↗</span>}</Wrap>); })}</div>
          ) : <div style={{ padding: "28px", background: "#1e1828", borderRadius: 12, border: "1px dashed #3d3050", textAlign: "center" }}><div style={{ fontSize: 13, color: "#8878a0" }}>Mentor profiles coming soon</div><div style={{ fontSize: 11, color: "#6b5f80", marginTop: 3 }}>Add entries to MENTORS array.</div></div>}
        </div>
      </section>

      {/* ORGANIZATIONS — distinct warm amber style */}
      <section ref={registerRef("organizations")} style={{ paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <div style={{ background: "linear-gradient(135deg, #1a1815, #1e1a12)", borderRadius: 16, border: "1px solid #33291e", padding: "28px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: "#f59e0b18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏛️</div><h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#f0e6d0" }}>Organizations</h2></div>
          <p style={{ fontSize: 13, color: "#a09070", margin: "0 0 20px" }}>Affiliated, employed, and collaborated with</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {ORG_GROUPS.map(g => {
              const orgs = ORGANIZATIONS.filter(o => o.group === g.key);
              if (!orgs.length) return null;
              return (<div key={g.key}><div style={{ fontSize: 12, fontWeight: 600, color: "#a09070", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><span>{g.icon}</span> {g.label}</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>{orgs.map((o, i) => { const Wrap = o.url ? "a" : "div"; return (<Wrap key={i} href={o.url || undefined} target={o.url ? "_blank" : undefined} rel={o.url ? "noopener noreferrer" : undefined} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#1e1b15", borderRadius: 8, border: "1px solid #33291e", textDecoration: "none", transition: "border 0.2s", cursor: o.url ? "pointer" : "default" }}><div style={{ width: 32, height: 32, borderRadius: 7, background: "#28231a", border: "1px solid #33291e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{o.logo}</div><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#f0e6d0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.name}</div><div style={{ fontSize: 11, color: "#887860", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.role}</div></div>{o.period && <div style={{ fontSize: 10, color: "#6b5f48", flexShrink: 0 }}>{o.period}</div>}{o.url && <span style={{ fontSize: 11, color: "#a09070" }}>↗</span>}</Wrap>); })}</div></div>);
            })}
          </div>
        </div>
      </section>

      {/* Let's Connect */}
      <ConnectSection />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  PAGE: MY WORK                                                          ██
   ██████████████████████████████████████████████████████████████████████████████ */
const WorkPage = ({ initialProjectId }) => {
  const [tab, setTab] = useState("projects");
  const [projectFilter, setProjectFilter] = useState("all");
  const [themeFilter, setThemeFilter] = useState("all");
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    if (initialProjectId) {
      const p = PROJECTS.find(proj => proj.id === initialProjectId);
      if (p) setTimeout(() => setModalProject(p), 200);
    }
  }, [initialProjectId]);

  const filteredProjects = PROJECTS.filter(p => {
    if (projectFilter !== "all" && p.type !== projectFilter) return false;
    if (themeFilter !== "all" && p.theme !== themeFilter) return false;
    return true;
  });

  const allLinks = [];
  PROJECTS.forEach(p => p.links.forEach(l => { if (l.showInLinksTab) allLinks.push({ ...l, projectName: p.name, theme: p.theme }); }));
  const linksByTheme = {};
  allLinks.forEach(l => { if (!linksByTheme[l.theme]) linksByTheme[l.theme] = []; linksByTheme[l.theme].push(l); });

  return (
    <div style={{ paddingTop: 28, paddingBottom: 80 }}>
      <h1 style={{ fontSize: 30, fontWeight: 300, margin: 0, color: "#fafafa" }}>My <span style={{ fontWeight: 700 }}>Work</span></h1>

      {/* GitHub + Publications Zone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24, padding: 18, background: "linear-gradient(135deg, #0d1117, #111827)", borderRadius: 14, border: "1px solid #1e293b" }}>
        <a href={SITE_CONFIG.socials.find(s => s.name === "GitHub")?.url || "#"} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "#0d1117", borderRadius: 10, border: "1px solid #21262d", textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#161b22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#58a6ff", flexShrink: 0 }}>GH</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>GitHub</div><div style={{ fontSize: 11, color: "#8b949e" }}>Repositories & technical projects</div></div>
          <span style={{ color: "#58a6ff" }}>→</span>
        </a>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="https://www.researchgate.net/profile/Kim-Hwang-Yeo/research" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "#0d1117", borderRadius: 10, border: "1px solid #21262d", textDecoration: "none", flex: 1 }}><div style={{ width: 32, height: 32, borderRadius: 7, background: "#00d0a110", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#00d0a1", flexShrink: 0 }}>RG</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3" }}>ResearchGate</div></div><span style={{ fontSize: 12, color: "#00d0a1" }}>→</span></a>
          <a href="https://orcid.org/0000-0001-8849-1534" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", background: "#0d1117", borderRadius: 10, border: "1px solid #21262d", textDecoration: "none", flex: 1 }}><div style={{ width: 32, height: 32, borderRadius: 7, background: "#a6ce3910", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#a6ce39", flexShrink: 0 }}>ID</div><div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3" }}>ORCID</div></div><span style={{ fontSize: 12, color: "#a6ce39" }}>→</span></a>
        </div>
      </div>

      {/* Pub cards */}
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {PUBLICATIONS.map((p, i) => (<div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: "#0d111788", borderRadius: 8, border: "1px solid #1e293b" }}><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: "#c9d1d9" }}>{p.title}</div><div style={{ fontSize: 11, color: "#8b949e", marginTop: 1 }}>{p.venue} · {p.year}</div></div><Pill color={p.type === "paper" ? "#58a6ff" : C.accent} accent small>{p.type}</Pill><a href={p.pdfUrl} style={{ marginLeft: 8, padding: "4px 10px", background: "#161b22", border: "1px solid #30363d", borderRadius: 6, fontSize: 11, color: "#8b949e", textDecoration: "none" }}>↓ PDF</a></div>))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginTop: 28, borderBottom: "1px solid #222" }}>
        {[{ k: "projects", l: "Projects" }, { k: "links", l: "Links" }].map(t => (<button key={t.k} onClick={() => setTab(t.k)} style={{ padding: "10px 18px", fontSize: 13, cursor: "pointer", background: "transparent", border: "none", color: tab === t.k ? "#fff" : "#666", borderBottom: tab === t.k ? `2px solid ${C.secondary}` : "2px solid transparent", fontWeight: tab === t.k ? 600 : 400 }}>{t.l}</button>))}
      </div>

      {tab === "projects" && (
        <div style={{ paddingTop: 20 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
            {[{ k: "all", l: "All" }, { k: "own", l: "My Projects" }, { k: "mentored", l: "Mentored" }].map(f => (<button key={f.k} onClick={() => setProjectFilter(f.k)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, cursor: "pointer", background: projectFilter === f.k ? "#fff" : C.surface, color: projectFilter === f.k ? "#000" : "#888", border: `1px solid ${projectFilter === f.k ? "#fff" : "#222"}`, fontWeight: projectFilter === f.k ? 600 : 400 }}>{f.l}</button>))}
            <div style={{ width: 1, height: 22, background: "#222", alignSelf: "center" }} />
            {[{ k: "all", l: "All Themes" }, ...SITE_CONFIG.themes.map(t => ({ k: t.label, l: t.label }))].map(f => (<button key={f.k} onClick={() => setThemeFilter(f.k)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 20, cursor: "pointer", background: themeFilter === f.k ? C.primary : C.surface, color: themeFilter === f.k ? "#fff" : "#888", border: `1px solid ${themeFilter === f.k ? C.primary : "#222"}`, fontWeight: themeFilter === f.k ? 600 : 400 }}>{f.l}</button>))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filteredProjects.map(p => <ProjectCard key={p.id} project={p} onClick={setModalProject} />)}
          </div>
        </div>
      )}

      {tab === "links" && (
        <div style={{ paddingTop: 20 }}>
          {Object.keys(linksByTheme).length > 0 ? Object.entries(linksByTheme).map(([theme, links]) => {
            const tc = getThemeColor(theme);
            return (<div key={theme} style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 600, color: tc, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: tc }} />{theme}</div><div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 18 }}>{links.map((l, i) => (<a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: C.surface, borderRadius: 8, border: `1px solid ${C.border}`, textDecoration: "none" }}><div><div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{l.label}</div><div style={{ fontSize: 11, color: C.textDim }}>{l.projectName}</div></div><span style={{ color: tc }}>↗</span></a>))}</div></div>);
          }) : <div style={{ padding: "36px", textAlign: "center", color: C.textDim }}><div style={{ fontSize: 13 }}>No links to display yet.</div><div style={{ fontSize: 12, marginTop: 4 }}>Set <code style={{ background: "#1a1a1a", padding: "2px 6px", borderRadius: 4 }}>showInLinksTab: true</code> on link objects in PROJECTS.</div></div>}
        </div>
      )}

      {/* Let's Connect */}
      <ConnectSection />

      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};


/* ██████████████████████████████████████████████████████████████████████████████
   ██  MAIN APP SHELL                                                         ██
   ██████████████████████████████████████████████████████████████████████████████ */
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const [navParams, setNavParams] = useState({});
  const S = SITE_CONFIG;
  const allPages = [{ key: "home", label: "Home" }, { key: "about", label: "About" }, { key: "work", label: "My Work" }];
  const pages = S.showHomeInMenu ? allPages : allPages.filter(p => p.key !== "home");

  const navigateTo = (key, params = {}) => { setNavParams(params); setPage(key); };
  const handleNavClick = (key) => { setNavParams({}); setPage(key); };
  const handleGalleryAction = ({ action, projectId }) => {
    if (action === "openProject") navigateTo("work", { initialProjectId: projectId });
    else if (action === "scrollToMentors") navigateTo("about", { initialSection: "mentors" });
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Nav — Logo + pages grouped left, socials right */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,10,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", height: 56, display: "flex", alignItems: "center" }}>
          {/* Logo + Name — the home button. Obvious hover effect. */}
          <button onClick={() => handleNavClick("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", marginRight: 4, borderRadius: 10, transition: "all 0.2s", border: page === "home" ? `1px solid ${C.primary}30` : "1px solid transparent" }} onMouseEnter={e => { e.currentTarget.style.background = `${C.primary}15`; e.currentTarget.style.borderColor = `${C.primary}40`; }} onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = page === "home" ? `${C.primary}30` : "transparent"; }}>
            {/* To use image logo: replace div below with <img src="/files/images/logo.png" style={{width:28,height:28,borderRadius:6}} /> */}
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{S.initials}</div>
            <span style={{ fontSize: 14, letterSpacing: -0.3 }}>
              <span style={{ fontWeight: 400, color: "#aaa" }}>{S.firstName}</span>
              <span style={{ fontWeight: 400, color: "#444", margin: "0 2px" }}>·</span>
              <span style={{ fontWeight: 700, color: "#fff" }}>{S.lastName}</span>
            </span>
          </button>
          {/* Nav links — Home filtered by showHomeInMenu */}
          <div style={{ display: "flex", gap: 2 }}>
            {pages.filter(p => p.key !== "home" || S.showHomeInMenu).map(p => (<button key={p.key} onClick={() => handleNavClick(p.key)} style={{ padding: "6px 12px", fontSize: 13, cursor: "pointer", background: page === p.key ? "#ffffff0d" : "transparent", color: page === p.key ? "#fff" : "#888", border: "none", borderRadius: 6, fontWeight: page === p.key ? 600 : 400 }}>{p.label}</button>))}
            <a href={S.blogUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 12px", fontSize: 13, color: "#888", textDecoration: "none", borderRadius: 6 }}>Blog ↗</a>
          </div>
          {/* Socials — pushed right */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
            {S.socials.slice(0, 4).map((s, i) => (<a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name} style={{ width: 26, height: 26, borderRadius: 5, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#777", textDecoration: "none" }}>{s.icon}</a>))}
            <div style={{ width: 1, height: 18, background: "#222", margin: "0 3px" }} />
            <a href={`mailto:${S.email}`} title="Email" style={{ width: 26, height: 26, borderRadius: 5, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#777", textDecoration: "none" }}>@</a>
            <a href={S.resumeUrl} download style={{ padding: "5px 11px", background: C.primary, color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>↓ CV</a>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px" }}>
        {page === "home" && <HomePage setPage={handleNavClick} onGalleryAction={handleGalleryAction} />}
        {page === "about" && <AboutPage initialSection={navParams.initialSection} />}
        {page === "work" && <WorkPage initialProjectId={navParams.initialProjectId} />}
      </main>

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "24px 32px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "#444" }}>© 2026 {FULL_NAME} · Singapore & USA</div>
          <div style={{ display: "flex", gap: 12 }}>{S.socials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.textDim, textDecoration: "none" }}>{s.name}</a>)}</div>
        </div>
      </footer>
    </div>
  );
}
