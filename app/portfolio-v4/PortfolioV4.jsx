"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SITE_META, SECTIONS, CONTENT } from "./content";
import { STYLES } from "./styles";

/* ██████████████████████████████████████████████████████████████████████████████
   ██  PORTFOLIO V4                                                            ██
   ██  Presentation-layer upgrade over v3. Same content model + SECTIONS       ██
   ██  visibility/order config; upgraded to current industry standards:        ██
   ██   · WCAG 2.2 — skip link, landmarks, focus-trapped dialog, focus rings   ██
   ██   · IntersectionObserver scroll-spy + scroll-reveal (reduced-motion safe)██
   ██   · Fluid clamp() type, scroll progress, JSON-LD structured data         ██
   ██   · Lightbox gallery, arrow-key project navigation, dismissible banner   ██
   ██████████████████████████████████████████████████████████████████████████████ */

const THEME_ORDER = ["light", "dark", "contrast"];
const THEME_LABEL = { light: "Light", dark: "Dark", contrast: "High contrast" };
const STORAGE_KEY = "pv4-theme";
const BANNER_KEY = "pv4-banner-dismissed";

/* ── Icons ── */
const PhotoIcon = ({ s = 26 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M21 16l-5-5L5 20" />
  </svg>
);
function ThemeIcon({ theme }) {
  if (theme === "light")
    return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.6v2.3M12 19.1v2.3M2.6 12h2.3M19.1 12h2.3M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" /></svg>;
  if (theme === "dark")
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--ink)" stroke="none" aria-hidden="true"><path d="M21 12.9A8.6 8.6 0 1 1 11.1 3a6.7 6.7 0 0 0 9.9 9.9z" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="var(--ink)" stroke="none" /></svg>;
}

/* Initials for a mentor avatar — strips a leading title (Dr./Prof./…) */
const mentorInitials = (name = "") =>
  name.replace(/^(Dr\.?|Prof\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/i, "").trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* Scroll-reveal: adds .in-view when the element enters the viewport (once).
   Fails OPEN — if IO is unavailable or never fires (tiny viewport, embeds,
   print), a fallback timer reveals the content anyway. Never hide content. */
function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("in-view");
    if (typeof IntersectionObserver === "undefined" || !window.innerHeight) { show(); return; }
    // A healthy IO always delivers an initial callback (even non-intersecting).
    // If none arrives, IO is broken in this context → reveal everything.
    const fallback = setTimeout(show, 1500);
    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(fallback);
        if (entry.isIntersecting) { show(); io.disconnect(); }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.08] }
    );
    io.observe(el);
    return () => { clearTimeout(fallback); io.disconnect(); };
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

/* ════════════════════ SECTION COMPONENTS ════════════════════ */

function HeroSection() {
  const c = CONTENT.hero;
  return (
    <div className="wrap hero-grid">
      <Reveal style={{ alignSelf: "center" }}>
        {/* Mobile-only avatar (desktop shows the large portrait at right) */}
        <div className="hero-avatar">
          <div style={{ position: "relative", width: 82, height: 82, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: "inset 0 0 0 1px var(--img-edge)" }}>
            {/* Zoom the full-torso source so the avatar circle frames the face */}
            <img src={c.portrait.src} alt={c.portrait.alt} fetchPriority="high" style={{ display: "block", width: "100%", height: "160%", objectFit: "cover", objectPosition: "50% 0%", filter: "saturate(0.9) contrast(1.02)" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply", background: "linear-gradient(155deg, rgba(184,106,75,0.14), rgba(184,106,75,0.02) 42%, rgba(40,28,18,0.10))" }} />
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--dim)", lineHeight: 1.6 }}>{c.captionLeft}<br />{c.captionRight}</div>
        </div>
        <p className="mono" style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "var(--accent-ink)", margin: "0 0 26px" }}>{c.eyebrow}</p>
        <h1 className="hero-head">{c.headlinePre}<span className="hl">{c.headlineHighlight}</span></h1>
        <p className="hero-sub">{c.subhead}</p>
        <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
          {c.ctas.map((b, i) => <a key={i} className={`btn ${b.variant === "solid" ? "btn-solid" : "btn-outline"}`} href={b.href}>{b.label}</a>)}
        </div>
        {c.proof && c.proof.length > 0 && (
          <ul className="hero-proof" aria-label="Credentials at a glance">
            {c.proof.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        )}
      </Reveal>
      <Reveal style={{ alignSelf: "center" }}>
        <div className="hero-portrait">
          <img src={c.portrait.src} alt={c.portrait.alt} fetchPriority="high" />
          <div className="tint" />
        </div>
        <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: 1, color: "var(--dim)", marginTop: 12, textTransform: "uppercase" }}>
          <span>{c.captionLeft}</span><span>{c.captionRight}</span>
        </div>
      </Reveal>
    </div>
  );
}

function NumbersSection() {
  const { highlights } = CONTENT.numbers;
  return (
    <div className="wrap numbers">
      {highlights.map((h, i) => {
        const last = i === highlights.length - 1;
        const pad = i === 0 ? "26px 22px 26px 0" : last ? "26px 0 26px 22px" : "26px 22px";
        return (
          <Reveal key={i} style={{ padding: pad, borderRight: last ? "none" : "1px solid var(--line-soft)", transitionDelay: `${i * 70}ms` }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent-ink)", marginBottom: 9 }}>{h.tag}</div>
            <div className="serif-h" style={{ fontSize: 21, lineHeight: 1.15, marginBottom: 6 }}>{h.value}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--muted)" }}>{h.cap}</div>
          </Reveal>
        );
      })}
    </div>
  );
}

function AboutSection() {
  const c = CONTENT.about;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 28 }}>
      <h2 className="eyebrow" style={{ paddingTop: 6, whiteSpace: "pre-line", margin: 0, fontWeight: 400 }}>{c.label}</h2>
      <Reveal style={{ maxWidth: 640 }}>
        <div style={{ fontFamily: "var(--serif)", color: "var(--ink-soft)" }}>
          <p style={{ margin: "0 0 22px", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--quote)", textWrap: "pretty" }}>{c.lead}</p>
          {c.paragraphs.map((p, i) => <p key={i} style={{ margin: i === c.paragraphs.length - 1 ? 0 : "0 0 18px", fontSize: "var(--fs-body)", lineHeight: 1.85 }}>{p}</p>)}
        </div>
      </Reveal>
    </div>
  );
}

function HowIWorkSection() {
  const c = CONTENT.howiwork;
  return (
    <div className="wrap">
      <h2 className="eyebrow" style={{ margin: "0 0 30px", fontWeight: 400 }}>{c.label}</h2>
      <div className="grid-2">
        {c.principles.map((p, i) => (
          <Reveal key={i} className="ruled" style={{ display: "flex", gap: 18, padding: "22px 0", transitionDelay: `${(i % 2) * 80}ms` }}>
            <span aria-hidden="true" style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--accent-soft)" }}>{p.index}</span>
            <div>
              <h3 className="serif-h" style={{ fontSize: 21, margin: "0 0 6px", fontWeight: 400 }}>{p.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{p.body}</p>
            </div>
          </Reveal>
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
        <h2 className="eyebrow" style={{ margin: "0 0 24px", fontWeight: 400 }}>{c.label}</h2>
        <Reveal className="exp-grid" style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "0 24px" }}>
          {c.items.map((e, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="mono" style={{ fontSize: 13, color: "var(--dim)", padding: "16px 0", borderTop: "1px solid var(--line)" }}>{e.year}</div>
              <div style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)" }}>{e.role}</span>
                <span style={{ color: "var(--dim)", fontSize: 14 }}> — {e.org}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
      <div>
        <h2 className="eyebrow" style={{ margin: "0 0 24px", fontWeight: 400 }}>{c.eduLabel}</h2>
        <Reveal>
          {c.education.map((d, i) => (
            <div key={i} style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
              <div className="serif-h" style={{ fontSize: 17, lineHeight: 1.3 }}>{d.degree}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{d.school}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--dim)", marginTop: 4 }}>{d.year}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

function WorkSection({ onOpen }) {
  const c = CONTENT.work;
  return (
    <div className="wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 30, flexWrap: "wrap", gap: 10 }}>
        <h2 className="eyebrow" style={{ margin: 0, fontWeight: 400 }}>{c.label}</h2>
        <p style={{ fontSize: 14, color: "var(--muted)", fontFamily: "var(--serif)", fontStyle: "italic", margin: 0 }}>{c.tagline}</p>
      </div>
      <div className="work-grid">
        {c.projects.map((p, i) => (
          /* <article> with a real <button> inside the <h3>, stretched over the
             card via ::after — buttons can't contain headings/flow content,
             and this keeps the five project titles in AT heading navigation. */
          <Reveal as="article" key={i} className="work-card" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
            <div className="imgslot" style={{ aspectRatio: "16/10" }}>
              <div className="ph"><PhotoIcon /><span className="mono" style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" }}>Photo</span></div>
              {p.image ? <img src={p.image} alt="" loading="lazy" decoding="async" /> : null}
            </div>
            <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 13 }}>
                <span className="badge">{p.badge}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--dim)" }}>{p.year}</span>
              </div>
              <h3 className="serif-h" style={{ fontSize: 21, margin: "0 0 8px", letterSpacing: "-0.2px", fontWeight: 400 }}>
                <button type="button" className="card-btn" onClick={() => onOpen(i)} aria-haspopup="dialog">{p.name}</button>
              </h3>
              <p className="proj-desc">{p.description}</p>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 0.5 }}>{p.kind}</span>
                <span className="card-cta">View details <span className="arr">→</span></span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function RecognitionSection() {
  const c = CONTENT.recognition;
  return (
    <div className="wrap">
      <h2 className="eyebrow" style={{ margin: "0 0 30px", fontWeight: 400 }}>{c.label}</h2>
      <div className="grid-2" style={{ marginBottom: 46 }}>
        {c.achievements.map((a, i) => (
          <Reveal key={i} className="ruled" style={{ display: "flex", gap: 15, alignItems: "baseline", padding: "18px 0", transitionDelay: `${(i % 2) * 60}ms` }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, transform: "translateY(-3px)" }} />
            <div>
              <div className="serif-h" style={{ fontSize: 19, lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>{a.meta}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 52 }}>
        <Reveal>
          <h3 className="sublabel" style={{ margin: "0 0 14px", fontWeight: 400 }}>Certifications</h3>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
            {c.certifications.map((x, i) => <li key={i} className="pill">{x}</li>)}
          </ul>
        </Reveal>
        <Reveal>
          <h3 className="sublabel" style={{ margin: "0 0 14px", fontWeight: 400 }}>Coursework</h3>
          {c.coursework.map((cw, i) => (
            <div key={i} className="ruled" style={{ padding: "14px 0" }}>
              <div className="serif-h" style={{ fontSize: 16, marginBottom: 10 }}>{cw.institution}</div>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: 7, listStyle: "none", margin: 0, padding: 0 }}>
                {cw.courses.map((co, j) => <li key={j} className="pill-mono">{co}</li>)}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

function MentorshipSection() {
  const c = CONTENT.mentorship;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56 }}>
      <Reveal>
        <h2 className="eyebrow" style={{ margin: "0 0 20px", fontWeight: 400 }}>{c.label}</h2>
        <p className="serif-h" style={{ fontSize: 26, lineHeight: 1.32, letterSpacing: "-0.2px", margin: 0, textWrap: "balance" }}>{c.statement}</p>
        <p style={{ fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.75, color: "var(--ink-soft)", margin: "16px 0 0" }}>{c.body}</p>
        <a className="ghost-cta" href={c.cta.href} style={{ marginTop: 22 }}>{c.cta.label}</a>
      </Reveal>
      <Reveal>
        <h3 className="sublabel" style={{ margin: "0 0 6px", fontWeight: 400 }}>{c.menteesLabel}</h3>
        {c.mentees.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 18, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid var(--line)" }}>
            <div style={{ flex: 1 }}>
              <div className="serif-h" style={{ fontSize: 18, lineHeight: 1.3 }}>{m.name}</div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.55, marginTop: 4 }}>{m.detail}</div>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--dim)", whiteSpace: "nowrap" }}>{m.period}</div>
          </div>
        ))}
        <div style={{ marginTop: 24, padding: "16px 18px", border: "1px solid var(--line-soft)", borderRadius: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: "var(--accent-ink)", border: "1px solid var(--accent-soft)", borderRadius: 12, padding: "3px 9px", whiteSpace: "nowrap" }}>Mentors</span>
            <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{c.mentorsNote}</span>
          </div>
          {c.mentors && c.mentors.length > 0 && (
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              {c.mentors.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span aria-hidden="true" style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: "var(--img-bg)", boxShadow: "inset 0 0 0 1px var(--img-edge)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 0.5, color: "var(--accent-ink)" }}>{mentorInitials(p.name)}</span>
                  <div>
                    <div className="serif-h" style={{ fontSize: 16, lineHeight: 1.25 }}>{p.name}</div>
                    {p.note && <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5, marginTop: 2 }}>{p.note}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

function WritingSection() {
  const c = CONTENT.writing;
  return (
    <div className="wrap stack" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56 }}>
      <Reveal>
        <h2 className="eyebrow" style={{ margin: "0 0 24px", fontWeight: 400 }}>{c.pubLabel}</h2>
        {c.publications.map((pub, i) => {
          const inner = (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
                <div className="serif-h" style={{ fontSize: 17, lineHeight: 1.35 }}>{pub.title}</div>
                <span className="mono" style={{ fontSize: 11, color: "var(--dim)", whiteSpace: "nowrap" }}>{pub.year}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{pub.venue} · {pub.kind}</div>
            </>
          );
          return pub.href
            ? <a key={i} className="pub" href={pub.href} target="_blank" rel="noopener noreferrer">{inner}</a>
            : <div key={i} className="pub" style={{ cursor: "default" }}>{inner}</div>;
        })}
      </Reveal>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <h2 className="eyebrow" style={{ margin: 0, fontWeight: 400 }}>{c.insightsLabel}</h2>
          <a className="foot-link" href={c.mediumUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 11 }}>Medium ↗</a>
        </div>
        {c.insights.map((ins, i) => (
          <a key={i} href={ins.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "16px 0", borderTop: "1px solid var(--line)", color: "inherit" }} className="pub">
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span className="mono" style={{ fontSize: 9.5, letterSpacing: 1, textTransform: "uppercase", color: "var(--dim)", border: "1px solid var(--line-soft)", borderRadius: 12, padding: "2px 8px", whiteSpace: "nowrap" }}>{ins.date}</span>
              <div className="serif-h" style={{ fontSize: 17, lineHeight: 1.3 }}>{ins.title}</div>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, margin: "8px 0 0" }}>{ins.excerpt}</p>
          </a>
        ))}
      </Reveal>
    </div>
  );
}

function OrganizationsSection() {
  const c = CONTENT.organizations;
  return (
    <div className="wrap">
      <h2 className="eyebrow" style={{ margin: "0 0 30px", fontWeight: 400 }}>{c.label}</h2>
      <div className="orgs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
        {c.groups.map((g, i) => (
          <Reveal key={i} style={{ transitionDelay: `${i * 70}ms` }}>
            <h3 className="sublabel" style={{ paddingBottom: 12, margin: "0 0 4px", borderBottom: "1px solid var(--line-soft)", fontWeight: 400 }}>{g.label}</h3>
            {g.items.map((o, j) => (
              <div key={j} style={{ padding: "11px 0" }}>
                <div className="serif-h" style={{ fontSize: 16, lineHeight: 1.25 }}>{o.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{o.role}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--dim)", marginTop: 3 }}>{o.period}</div>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ConnectFooter() {
  const c = CONTENT.footer;
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(SITE_META.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${SITE_META.email}`; }
  };
  return (
    <div className="wrap" style={{ padding: "44px 40px 24px" }}>
      <div className="foot-grid">
        <div style={{ maxWidth: "30em" }}>
          <h2 className="mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--foot-label)", margin: "0 0 14px", fontWeight: 400 }}>{c.talkLabel}</h2>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: 28, lineHeight: 1.18, color: "var(--foot-ink)", margin: 0, textWrap: "balance" }}>{c.headline}</p>
          <p style={{ fontFamily: "var(--serif)", fontSize: 16.5, lineHeight: 1.62, color: "var(--foot-ink)", margin: "12px 0 0" }}>{c.invitation} <span style={{ fontStyle: "italic" }}>{c.signature}</span></p>
        </div>
        <div>
          <h3 className="mono" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--foot-label)", margin: "0 0 12px", fontWeight: 400 }}>{c.reachLabel}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <a className="foot-email" href={`mailto:${SITE_META.email}`}>{SITE_META.email}</a>
            <button className="foot-email" onClick={copyEmail} aria-live="polite" title="Copy email address" style={{ padding: "12px 14px" }}>{copied ? "Copied ✓" : "Copy"}</button>
            <a className="foot-link" href={SITE_META.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé →</a>
          </div>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 18, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginTop: 18, listStyle: "none", padding: 0 }}>
            {SITE_META.socials.map((s, i) => <li key={i}><a className="foot-social" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--foot-line)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, color: "var(--foot-label)" }}>
        <span>{c.colophonLeft}</span><span>{c.colophonRight}</span>
      </div>
    </div>
  );
}

/* ── Accessible project dialog with lightbox gallery + prev/next ── */
function ProjectModal({ index, onClose, onNav }) {
  const projects = CONTENT.work.projects;
  const project = index != null ? projects[index] : null;
  const open = project != null;
  const [featured, setFeatured] = useState(0);
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => { setFeatured(0); }, [index]);

  // Open/close lifecycle only: capture the trigger, focus the dialog, lock
  // scroll; restore both on close. Keyed on `open` so switching projects via
  // ←/→ never tears this down (no focus flicker to the background card).
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const dlg = dialogRef.current;
    (dlg.querySelector("button, [href]") || dlg).focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Keyboard: Esc / arrows / Tab trap. onClose and onNav are stable
  // useCallbacks in the parent, so this attaches once per open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      const dlg = dialogRef.current;
      const focusables = () => dlg.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      const inThumbs = e.target instanceof Element && e.target.closest(".thumbs");
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && !inThumbs) onNav(1);
      else if (e.key === "ArrowLeft" && !inThumbs) onNav(-1);
      else if (e.key === "Tab") {
        const f = focusables(); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onNav]);

  if (!project) return null;
  const gallery = project.gallery && project.gallery.length ? project.gallery : [];
  // Clamp so navigating from a longer gallery to a shorter one can never
  // render an out-of-range frame before the reset effect runs.
  const shown = gallery.length ? Math.min(featured, gallery.length - 1) : 0;

  return (
    /* Close on mousedown ON the scrim itself — a text-selection drag that
       ends over the scrim must not dismiss the dialog. */
    <div className="scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="pv4-modal-title" tabIndex={-1}>
        <div style={{ padding: "28px 30px 22px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span className="badge">{project.badge}</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: 0.5 }}>{project.kind} · {project.year}</span>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close dialog">✕</button>
          </div>
          <h3 id="pv4-modal-title" style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 28, color: "var(--ink)", margin: "16px 0 0", letterSpacing: "-0.3px" }}>{project.name}</h3>
        </div>
        <div style={{ padding: "24px 30px 28px" }}>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--ink-soft)", margin: "0 0 20px" }}>{project.description}</p>
          {gallery.length > 0 ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 11 }}>
                <span className="mono" style={{ fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--accent-ink)" }}>Gallery</span>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--dim)" }}>{shown + 1} / {gallery.length}</span>
              </div>
              <div className="feature-img">
                <img src={gallery[shown]} alt={`${project.name} — image ${shown + 1}`} loading="lazy" decoding="async" />
              </div>
              <div className="thumbs" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(gallery.length, 4)},1fr)`, gap: 8, marginBottom: 22 }}>
                {gallery.map((src, i) => (
                  <button key={i} className={`thumb${i === shown ? " is-active" : ""}`} onClick={() => setFeatured(i)} aria-label={`Show image ${i + 1}`} aria-pressed={i === shown}>
                    <img src={src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 22 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="imgslot" style={{ aspectRatio: "4/3", borderRadius: 8 }}>
                  <div className="ph"><PhotoIcon s={20} /></div>
                </div>
              ))}
            </div>
          )}
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
            {project.tags.map((t, i) => <li key={i} className="mono" style={{ fontSize: 11, color: "var(--muted)", border: "1px solid var(--line-soft)", borderRadius: 16, padding: "5px 12px" }}>{t}</li>)}
          </ul>
          {project.link && (
            <a className="modal-link" href={project.link.href} target="_blank" rel="noopener noreferrer">↗ {project.link.label}</a>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
            <button className="modal-nav" onClick={() => onNav(-1)}>← Prev project</button>
            <button className="modal-nav" onClick={() => onNav(1)}>Next project →</button>
          </div>
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

/* ════════════════════ PAGE SHELL ════════════════════ */
export default function PortfolioV4() {
  const [theme, setTheme] = useState(SITE_META.defaultTheme);
  const [selected, setSelected] = useState(null); // project index or null
  const [active, setActive] = useState("");
  const [railVisible, setRailVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(!!SITE_META.banner);
  const [showTop, setShowTop] = useState(false);
  const progressRef = useRef(null);
  const hideTimer = useRef(null);

  // visible, ordered sections — single source of truth (Req. 1)
  const visible = useMemo(() => SECTIONS.filter((s) => s.visible).sort((a, b) => a.order - b.order), []);
  const navItems = visible.filter((s) => s.inNav);
  const railItems = visible.filter((s) => s.inRail);
  const spyIds = useMemo(() => visible.filter((s) => s.inNav || s.inRail).map((s) => s.id), [visible]);

  // alternating warm bands computed over the visible set (never doubles)
  const tones = useMemo(() => {
    const t = {}; let n = 0;
    visible.forEach((s) => {
      if (s.id === "connect") { t[s.id] = "foot"; return; }
      if (SITE_META.sectionTones && s.banded) { t[s.id] = n % 2 === 0 ? "var(--band1)" : "var(--band2)"; n++; }
      else t[s.id] = "var(--bg)";
    });
    return t;
  }, [visible]);

  // Theme CSS keys off html[data-pv4-theme], stamped pre-paint by the
  // blocking script in layout.js — so there is no light flash for returning
  // dark/contrast users. This effect only syncs React state (toggle icon)
  // to that attribute, and stamps it if the script didn't run.
  useEffect(() => {
    const booted = document.documentElement.getAttribute("data-pv4-theme");
    if (THEME_ORDER.includes(booted)) { setTheme(booted); return; }
    let t = SITE_META.defaultTheme;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (THEME_ORDER.includes(saved)) t = saved;
      else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) t = "dark";
    } catch {}
    document.documentElement.setAttribute("data-pv4-theme", t);
    setTheme(t);
  }, []);
  useEffect(() => {
    try { if (sessionStorage.getItem(BANNER_KEY) === "1") setShowBanner(false); } catch {}
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((t) => {
      const next = THEME_ORDER[(THEME_ORDER.indexOf(t) + 1) % THEME_ORDER.length];
      document.documentElement.setAttribute("data-pv4-theme", next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  const dismissBanner = useCallback(() => {
    setShowBanner(false);
    try { sessionStorage.setItem(BANNER_KEY, "1"); } catch {}
  }, []);

  // One rAF-throttled, CAPTURE-phase scroll handler drives spy + progress +
  // rail + back-to-top. Capture catches scroll from whatever element actually
  // scrolls (window in production, an inner wrapper inside embedded previews).
  useEffect(() => {
    let ticking = false;
    // rAF while visible; setTimeout fallback so state stays correct in hidden tabs
    const schedule = (cb) => (document.hidden ? setTimeout(cb, 16) : requestAnimationFrame(cb));
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      schedule(() => {
        ticking = false;
        // scroll-spy via viewport geometry (robust to any scroll container)
        let cur = "";
        for (const id of spyIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) cur = id;
        }
        setActive((prev) => (prev !== cur ? cur : prev));
        // progress + back-to-top from the real scrolling element
        const sc = document.scrollingElement || document.documentElement;
        const y = Math.max(window.scrollY || 0, sc.scrollTop || 0);
        const max = sc.scrollHeight - (window.innerHeight || sc.clientHeight);
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        setShowTop(y > 700);
        setRailVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setRailVisible(false), 1700);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [spyIds]);

  const openProject = useCallback((i) => setSelected(i), []);
  // Stable identity — an inline arrow here would re-run the modal's effects
  // on every parent re-render (e.g. scroll-driven state) while it's open.
  const closeProject = useCallback(() => setSelected(null), []);
  const navProject = useCallback((dir) => {
    setSelected((cur) => {
      const n = CONTENT.work.projects.length;
      return cur == null ? cur : (cur + dir + n) % n;
    });
  }, []);

  // JSON-LD Person schema for SEO
  const jsonLd = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_META.name,
    email: `mailto:${SITE_META.email}`,
    jobTitle: "Bioengineer — Healthcare Strategy & Medical Devices",
    alumniOf: ["Johns Hopkins University", "University of California, Berkeley"],
    sameAs: SITE_META.socials.map((s) => s.href),
  }), []);

  return (
    <div className="pv4" data-theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <a className="skip-link" href="#pv4-main">Skip to content</a>

      {/* Scroll progress */}
      <div className="progress" aria-hidden="true"><span ref={progressRef} /></div>

      {/* Work-in-progress banner (dismissible) */}
      {showBanner && (
        <div className="wip-banner" role="status">
          {SITE_META.banner}
          <button className="wip-close" onClick={dismissBanner} aria-label="Dismiss notice">✕</button>
        </div>
      )}

      {/* Sticky nav */}
      <header className="nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">{SITE_META.name}</a>
          <nav aria-label="Sections" style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div className="nav-links">
              {navItems.map((s) => (
                <a key={s.id} className={`nav-link${active === s.id ? " is-active" : ""}`} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>{s.label}</a>
              ))}
            </div>
            <button className="theme-btn" onClick={cycleTheme} title={`${THEME_LABEL[theme]} appearance — click to switch`} aria-label={`Switch theme (current: ${THEME_LABEL[theme]})`}>
              <ThemeIcon theme={theme} />
            </button>
            <a className="resume-btn" href={SITE_META.resumeUrl} target="_blank" rel="noopener noreferrer">Résumé ↓</a>
          </nav>
        </div>
      </header>

      <span id="top" />

      {/* Mobile vertical section rail */}
      <nav className="rail" aria-label="Section shortcuts" style={{ opacity: railVisible ? 1 : 0.42 }} onClick={() => setRailVisible(true)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          {railItems.map((s) => {
            const on = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: "flex-end" }} aria-current={on ? "true" : undefined}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: on ? "var(--ink)" : "var(--muted)", whiteSpace: "nowrap" }}>{s.label}</span>
                <span className="rail-dot" style={{ width: on ? 9 : 6, height: on ? 9 : 6, background: on ? "var(--accent)" : "var(--line-soft)" }} />
              </a>
            );
          })}
        </div>
      </nav>

      {/* Sections — only visible ones, in order, with computed tone */}
      <main id="pv4-main">
        {visible.map((s) => {
          if (s.id === "connect") {
            return (
              <footer key={s.id} id={s.id} className="foot">
                {renderSectionBody(s.id, { onOpen: openProject })}
              </footer>
            );
          }
          const banded = tones[s.id] !== "var(--bg)";
          return (
            <section
              key={s.id}
              id={s.id}
              aria-label={s.label}
              style={{
                background: tones[s.id],
                borderTop: banded ? "1px solid var(--line)" : "none",
                borderBottom: banded ? "1px solid var(--line)" : "none",
                scrollMarginTop: 72,
                padding: s.id === "numbers" ? 0 : "60px 0",
              }}
            >
              {renderSectionBody(s.id, { onOpen: openProject })}
            </section>
          );
        })}
      </main>

      {/* Back to top */}
      <button className={`to-top${showTop ? " show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} aria-label="Back to top">↑</button>

      <ProjectModal index={selected} onClose={closeProject} onNav={navProject} />
    </div>
  );
}
