"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { SITE_META, SECTIONS, CONTENT } from "./content";
import { STYLES } from "./styles";

/* ██████████████████████████████████████████████████████████████████████████████
   ██  PORTFOLIO V2                                                            ██
   ██  Section-list architecture: every section is a presentational component  ██
   ██  fed by CONTENT (./content.js) and listed/ordered/toggled by SECTIONS.   ██
   ██  Nav, mobile rail and scroll-spy all derive from the *visible* set.      ██
   ██████████████████████████████████████████████████████████████████████████████ */

const THEME_ORDER = ["light", "dark", "contrast"];
const THEME_LABEL = { light: "Light", dark: "Dark", contrast: "High contrast" };
const STORAGE_KEY = "pv2-theme";

/* ── Small inline icons ── */
const PhotoIcon = ({ s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M21 16l-5-5L5 20" />
  </svg>
);
function ThemeIcon({ theme }) {
  if (theme === "light")
    return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.6v2.3M12 19.1v2.3M2.6 12h2.3M19.1 12h2.3M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" /></svg>;
  if (theme === "dark")
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--ink)" stroke="none"><path d="M21 12.9A8.6 8.6 0 1 1 11.1 3a6.7 6.7 0 0 0 9.9 9.9z" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="var(--ink)" stroke="none" /></svg>;
}

/* Image slot that shows a styled placeholder until a real src is provided */
const ImgSlot = ({ src, alt, ratio, iconSize }) => (
  <div className="imgslot" style={{ aspectRatio: ratio, borderRadius: 8 }}>
    <div className="ph"><PhotoIcon s={iconSize} />{!iconSize && <span className="mono" style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" }}>Photo</span>}</div>
    {src ? <img src={src} alt={alt || ""} /> : null}
  </div>
);

/* ════════════════════ SECTION COMPONENTS ════════════════════ */

function HeroSection() {
  const c = CONTENT.hero;
  return (
    <div className="wrap hero-grid">
      <div style={{ alignSelf: "center" }}>
        {/* Mobile-only avatar + caption (desktop shows the large portrait at right) */}
        <div className="hero-avatar">
          <div style={{ position: "relative", width: 82, height: 82, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "inset 0 0 0 1px var(--img-edge)" }}>
            <img src={c.portrait.src} alt={c.portrait.alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.9) contrast(1.02)" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply", background: "linear-gradient(155deg, rgba(184,106,75,0.14), rgba(184,106,75,0.02) 42%, rgba(40,28,18,0.10))" }} />
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--dim)", lineHeight: 1.6 }}>{c.captionLeft}<br />{c.captionRight}</div>
        </div>
        <div className="mono" style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "var(--accent)", marginBottom: 26 }}>{c.eyebrow}</div>
        <h1 className="hero-head">{c.headlinePre}<span className="hl">{c.headlineHighlight}</span></h1>
        <p className="hero-sub">{c.subhead}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
          {c.ctas.map((b, i) => <a key={i} className={`pd-link btn ${b.variant === "solid" ? "btn-solid" : "btn-outline"}`} href={b.href}>{b.label}</a>)}
        </div>
      </div>
      <div style={{ alignSelf: "center" }}>
        <div className="hero-portrait">
          <img src={c.portrait.src} alt={c.portrait.alt} />
          <div className="tint" />
        </div>
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: 1, color: "var(--dim)", marginTop: 12, textTransform: "uppercase" }}>
          <span>{c.captionLeft}</span><span>{c.captionRight}</span>
        </div>
      </div>
    </div>
  );
}

function NumbersSection() {
  const { stats } = CONTENT.numbers;
  return (
    <div className="wrap numbers">
      {stats.map((s, i) => {
        const last = i === stats.length - 1;
        const pad = i === 0 ? "30px 24px 30px 0" : last ? "30px 0 30px 24px" : "30px 24px";
        return (
          <div key={i} style={{ padding: pad, borderRight: last ? "none" : "1px solid var(--line-soft)" }}>
            <div className="stat-val">{s.value}</div>
            <div className="stat-cap">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function AboutSection() {
  const c = CONTENT.about;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 28 }}>
      <div className="eyebrow" style={{ paddingTop: 6, whiteSpace: "pre-line" }}>{c.label}</div>
      <div style={{ maxWidth: 640 }}>
        <div style={{ fontFamily: "var(--serif)", color: "var(--ink-soft)" }}>
          <p style={{ margin: "0 0 22px", fontSize: 23, lineHeight: 1.6, color: "var(--quote)" }}>{c.lead}</p>
          {c.paragraphs.map((p, i) => <p key={i} style={{ margin: i === c.paragraphs.length - 1 ? 0 : "0 0 18px", fontSize: 18, lineHeight: 1.85 }}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}

function HowIWorkSection() {
  const c = CONTENT.howiwork;
  return (
    <div className="wrap">
      <div className="eyebrow" style={{ marginBottom: 30 }}>{c.label}</div>
      <div className="grid-2">
        {c.principles.map((p, i) => (
          <div key={i} className="ruled" style={{ display: "flex", gap: 18, padding: "22px 0" }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--accent-soft)" }}>{p.index}</span>
            <div>
              <div className="serif-h" style={{ fontSize: 21, marginBottom: 6 }}>{p.title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const c = CONTENT.experience;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 56 }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>{c.label}</div>
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "0 24px" }}>
          {c.items.map((e, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="mono" style={{ fontSize: 13, color: "var(--dim)", padding: "16px 0", borderTop: "1px solid var(--line)" }}>{e.year}</div>
              <div style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>{e.role}</span>
                <span style={{ color: "var(--dim)", fontSize: 14 }}> — {e.org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>{c.eduLabel}</div>
        {c.education.map((d, i) => (
          <div key={i} style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
            <div className="serif-h" style={{ fontSize: 17, lineHeight: 1.3 }}>{d.degree}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{d.school}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--dim)", marginTop: 4 }}>{d.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkSection({ onOpen }) {
  const c = CONTENT.work;
  return (
    <div className="wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 30, flexWrap: "wrap", gap: 10 }}>
        <div className="eyebrow">{c.label}</div>
        <div style={{ fontSize: 14, color: "var(--muted)", fontFamily: "var(--serif)", fontStyle: "italic" }}>{c.tagline}</div>
      </div>
      <div className="work-grid">
        {c.projects.map((p, i) => (
          <button key={i} className="work-card" onClick={() => onOpen(p)}>
            <div className="imgslot" style={{ aspectRatio: "16/10" }}>
              <div className="ph"><PhotoIcon /><span className="mono" style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" }}>Photo</span></div>
              {p.image ? <img src={p.image} alt={p.name} /> : null}
            </div>
            <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 13 }}>
                <span className="badge">{p.badge}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--dim)" }}>{p.year}</span>
              </div>
              <div className="serif-h" style={{ fontSize: 21, marginBottom: 8, letterSpacing: "-0.2px" }}>{p.name}</div>
              <p className="proj-desc">{p.description}</p>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.kind}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>View details →</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RecognitionSection() {
  const c = CONTENT.recognition;
  return (
    <div className="wrap">
      <div className="eyebrow" style={{ marginBottom: 30 }}>{c.label}</div>
      <div className="grid-2" style={{ marginBottom: 46 }}>
        {c.achievements.map((a, i) => (
          <div key={i} className="ruled" style={{ display: "flex", gap: 15, alignItems: "baseline", padding: "18px 0" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, transform: "translateY(-3px)" }} />
            <div>
              <div className="serif-h" style={{ fontSize: 19, lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{a.meta}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 52 }}>
        <div>
          <div className="sublabel" style={{ marginBottom: 14 }}>Certifications</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {c.certifications.map((x, i) => <span key={i} className="pill">{x}</span>)}
          </div>
        </div>
        <div>
          <div className="sublabel" style={{ marginBottom: 14 }}>Coursework</div>
          {c.coursework.map((cw, i) => (
            <div key={i} className="ruled" style={{ padding: "14px 0" }}>
              <div className="serif-h" style={{ fontSize: 16, marginBottom: 10 }}>{cw.institution}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {cw.courses.map((co, j) => <span key={j} className="pill-mono">{co}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MentorshipSection() {
  const c = CONTENT.mentorship;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56 }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 20 }}>{c.label}</div>
        <div className="serif-h" style={{ fontSize: 26, lineHeight: 1.32, letterSpacing: "-0.2px" }}>{c.statement}</div>
        <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.75, color: "var(--ink-soft)", margin: "16px 0 0" }}>{c.body}</p>
        <a className="pd-link ghost-cta" href={c.cta.href} style={{ marginTop: 22 }}>{c.cta.label}</a>
      </div>
      <div>
        <div className="sublabel" style={{ marginBottom: 6 }}>{c.menteesLabel}</div>
        {c.mentees.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 18, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid var(--line)" }}>
            <div style={{ flex: 1 }}>
              <div className="serif-h" style={{ fontSize: 18, lineHeight: 1.3 }}>{m.name}</div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.55, marginTop: 4 }}>{m.detail}</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--dim)", whiteSpace: "nowrap" }}>{m.period}</div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24, padding: "16px 18px", border: "1px dashed var(--line-soft)", borderRadius: 10 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--accent-soft)", borderRadius: 12, padding: "3px 9px", whiteSpace: "nowrap" }}>Mentors</span>
          <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{c.mentorsNote}</span>
        </div>
      </div>
    </div>
  );
}

function WritingSection() {
  const c = CONTENT.writing;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>{c.pubLabel}</div>
        {c.publications.map((pub, i) => (
          <a key={i} className="pd-link pub" href={pub.href} target={pub.href && pub.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
              <div className="serif-h" style={{ fontSize: 17, lineHeight: 1.35 }}>{pub.title}</div>
              <span className="mono" style={{ fontSize: 11, color: "var(--dim)", whiteSpace: "nowrap" }}>{pub.year}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{pub.venue} · {pub.kind}</div>
          </a>
        ))}
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <div className="eyebrow">{c.insightsLabel}</div>
          <a className="pd-link foot-link" href={c.mediumUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)" }}>Medium ↗</a>
        </div>
        {c.insights.map((ins, i) => (
          <div key={i} style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span className="mono" style={{ fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--dim)", border: "1px solid var(--line-soft)", borderRadius: 12, padding: "2px 8px", whiteSpace: "nowrap" }}>Soon</span>
              <div className="serif-h" style={{ fontSize: 17, lineHeight: 1.3 }}>{ins.title}</div>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, margin: "8px 0 0" }}>{ins.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrganizationsSection() {
  const c = CONTENT.organizations;
  return (
    <div className="wrap">
      <div className="eyebrow" style={{ marginBottom: 30 }}>{c.label}</div>
      <div className="orgs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
        {c.groups.map((g, i) => (
          <div key={i}>
            <div className="sublabel" style={{ paddingBottom: 12, marginBottom: 4, borderBottom: "1px solid var(--line-soft)" }}>{g.label}</div>
            {g.items.map((o, j) => (
              <div key={j} style={{ padding: "11px 0" }}>
                <div className="serif-h" style={{ fontSize: 16, lineHeight: 1.25 }}>{o.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{o.role}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 3 }}>{o.period}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConnectFooter() {
  const c = CONTENT.footer;
  return (
    <div className="wrap" style={{ padding: "44px 40px 24px" }}>
      <div className="foot-grid">
        <div style={{ maxWidth: "30em" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--foot-label)", marginBottom: 14 }}>{c.talkLabel}</div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: 28, lineHeight: 1.18, color: "var(--foot-ink)" }}>{c.headline}</div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 16.5, lineHeight: 1.62, color: "var(--foot-ink)", margin: "12px 0 0" }}>{c.invitation} <span style={{ fontStyle: "italic" }}>{c.signature}</span></p>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--foot-label)", marginBottom: 12 }}>{c.reachLabel}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <a className="pd-link foot-email" href={`mailto:${SITE_META.email}`}>{SITE_META.email}</a>
            <a className="pd-link foot-link" href={SITE_META.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé →</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginTop: 18 }}>
            {SITE_META.socials.map((s, i) => <a key={i} className="pd-link foot-social" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--foot-line)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, color: "var(--foot-label)" }}>
        <span>{c.colophonLeft}</span><span>{c.colophonRight}</span>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const gallery = project.gallery && project.gallery.length ? project.gallery : [null, null, null];
  return (
    <div className="scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={{ padding: "28px 30px 22px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="badge">{project.badge}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 0.5 }}>{project.kind} · {project.year}</span>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 28, color: "var(--ink)", margin: "16px 0 0", letterSpacing: "-0.3px" }}>{project.name}</h3>
        </div>
        <div style={{ padding: "24px 30px 28px" }}>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--ink-soft)", margin: "0 0 20px" }}>{project.description}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 11 }}>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--accent)" }}>Gallery</span>
            <span className="mono" style={{ fontSize: 10.5, color: "var(--dim)" }}>Snapshots from the work</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 22 }}>
            {gallery.map((src, i) => <ImgSlot key={i} src={src} alt={project.name} ratio="4/3" iconSize={20} />)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map((t, i) => <span key={i} className="mono" style={{ fontSize: 11, color: "var(--muted)", border: "1px solid var(--line-soft)", borderRadius: 16, padding: "5px 12px" }}>{t}</span>)}
          </div>
          {project.link && (
            <a className="pd-link modal-link" href={project.link.href} target="_blank" rel="noopener noreferrer">↗ {project.link.label}</a>
          )}
        </div>
      </div>
    </div>
  );
}

/* Map a section id → its rendered body */
function renderSectionBody(id, { onOpen }) {
  switch (id) {
    case "hero": return <HeroSection />;
    case "numbers": return <NumbersSection />;
    case "about": return <AboutSection />;
    case "howiwork": return <HowIWorkSection />;
    case "experience": return <ExperienceSection />;
    case "work": return <WorkSection onOpen={onOpen} />;
    case "recognition": return <RecognitionSection />;
    case "mentorship": return <MentorshipSection />;
    case "writing": return <WritingSection />;
    case "organizations": return <OrganizationsSection />;
    case "connect": return <ConnectFooter />;
    default: return null;
  }
}

/* ════════════════════ PAGE ════════════════════ */
export default function PortfolioV2() {
  const [theme, setTheme] = useState(SITE_META.defaultTheme);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState("");
  const [railVisible, setRailVisible] = useState(false);
  const hideTimer = useRef(null);

  // visible, ordered sections — the single source of truth (Req. 1)
  const visible = SECTIONS.filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const navItems = visible.filter((s) => s.inNav);
  const railItems = visible.filter((s) => s.inRail);
  const spyIds = visible.filter((s) => s.inNav || s.inRail).map((s) => s.id);

  // alternating warm band, computed over the visible set so it never doubles up
  const tones = {};
  let bandCount = 0;
  visible.forEach((s) => {
    if (s.id === "connect") { tones[s.id] = "foot"; return; }
    if (SITE_META.sectionTones && s.banded) { tones[s.id] = bandCount % 2 === 0 ? "var(--band1)" : "var(--band2)"; bandCount++; }
    else tones[s.id] = "var(--bg)";
  });

  // theme init: localStorage → prefers-color-scheme → default
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEME_ORDER.includes(saved)) { setTheme(saved); return; }
    } catch {}
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((t) => {
      const next = THEME_ORDER[(THEME_ORDER.indexOf(t) + 1) % THEME_ORDER.length];
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  // scroll-spy over the visible nav/rail sections (sticky-nav offset of 130px)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        let cur = "";
        for (const id of spyIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 130) cur = id;
        }
        setActive((prev) => (prev !== cur ? cur : prev));
        // brighten the mobile rail on scroll, then fade
        setRailVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setRailVisible(false), 1700);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [spyIds.join(",")]);

  // modal: Esc to close + body scroll lock
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [selected]);

  return (
    <div className="pv2" data-theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Sticky nav */}
      <div className="nav">
        <div className="nav-inner">
          <a className="pd-link nav-brand" href="#top">{SITE_META.name}</a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div className="nav-links">
              {navItems.map((s) => (
                <a key={s.id} className={`pd-link nav-link${active === s.id ? " is-active" : ""}`} href={`#${s.id}`}>{s.label}</a>
              ))}
            </div>
            <button className="theme-btn" onClick={cycleTheme} title={`${THEME_LABEL[theme]} appearance — click to switch`} aria-label="Switch theme">
              <ThemeIcon theme={theme} />
            </button>
            <a className="pd-link resume-btn" href={SITE_META.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé ↓</a>
          </div>
        </div>
      </div>

      <span id="top" />

      {/* Mobile vertical section rail — derived from visible inRail sections */}
      <div className="rail" style={{ opacity: railVisible ? 1 : 0.42 }} onClick={() => setRailVisible(true)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          {railItems.map((s) => {
            const on = active === s.id;
            return (
              <a key={s.id} className="pd-link" href={`#${s.id}`} style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: "flex-end" }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: on ? "var(--ink)" : "var(--muted)", whiteSpace: "nowrap" }}>{s.label}</span>
                <span className="rail-dot" style={{ width: on ? 9 : 6, height: on ? 9 : 6, background: on ? "var(--accent)" : "var(--line-soft)" }} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Sections — only visible ones, in order, with computed tone */}
      {visible.map((s) => {
        if (s.id === "connect") {
          return (
            <div key={s.id} id={s.id} className="foot">
              {renderSectionBody(s.id, { onOpen: setSelected })}
            </div>
          );
        }
        const banded = tones[s.id] !== "var(--bg)";
        return (
          <section
            key={s.id}
            id={s.id}
            style={{
              background: tones[s.id],
              borderTop: banded ? "1px solid var(--line)" : "none",
              borderBottom: banded ? "1px solid var(--line)" : "none",
              scrollMarginTop: 72,
              padding: s.id === "numbers" ? "0" : "60px 0",
            }}
          >
            {renderSectionBody(s.id, { onOpen: setSelected })}
          </section>
        );
      })}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
