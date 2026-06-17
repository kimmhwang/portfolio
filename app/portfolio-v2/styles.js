/* Theme tokens (Light / Dark / High-contrast) + base, hover and responsive
   rules for Portfolio v2. Injected once via a <style> tag in page.jsx so the
   route stays self-contained (no global-CSS import needed). */
export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.pv2 { --serif:'Newsreader',Georgia,serif; --sans:'Hanken Grotesk',system-ui,sans-serif; --mono:'IBM Plex Mono',ui-monospace,monospace; }

.pv2[data-theme="light"]{
  --bg:#FBFAF7; --paper:#FFFFFF; --ink:#1C1A17; --ink-soft:#3A332B; --muted:#777067; --dim:#9A917F;
  --accent:#B86A4B; --accent-soft:#C2A98E; --line:#ECE7DF; --line-soft:#E2DACB;
  --band1:#F4F0E9; --band2:#F1ECE3; --btn-bg:#1C1A17; --btn-ink:#FBFAF7; --quote:#2A251E;
  --foot-bg:#C3B091; --foot-ink:#3A2C1A; --foot-ink2:#5A4A30; --foot-label:#6E5A3C; --foot-line:#B3996F; --foot-btn:#2A1E10; --foot-btn-ink:#F2E8D8;
  --nav-bg:rgba(251,250,247,0.86); --img-bg:#EFE8DC; --img-edge:rgba(120,90,50,0.12);
}
.pv2[data-theme="dark"]{
  --bg:#17130F; --paper:#211B16; --ink:#F1E9DC; --ink-soft:#CFC4B2; --muted:#A99D89; --dim:#857A68;
  --accent:#D98E63; --accent-soft:#7A6650; --line:#322B23; --line-soft:#3A322A;
  --band1:#1E1914; --band2:#231D17; --btn-bg:#D98E63; --btn-ink:#17130F; --quote:#ECE3D4;
  --foot-bg:#241E18; --foot-ink:#ECE0CE; --foot-ink2:#B6A88F; --foot-label:#8A7C64; --foot-line:#3A3128; --foot-btn:#D98E63; --foot-btn-ink:#17130F;
  --nav-bg:rgba(23,19,15,0.86); --img-bg:#1B1610; --img-edge:rgba(255,225,180,0.10);
}
.pv2[data-theme="contrast"]{
  --bg:#FFFFFF; --paper:#FFFFFF; --ink:#000000; --ink-soft:#111111; --muted:#1C1C1C; --dim:#333333;
  --accent:#9A3A10; --accent-soft:#9A3A10; --line:#000000; --line-soft:#000000;
  --band1:#EDEDED; --band2:#E2E2E2; --btn-bg:#000000; --btn-ink:#FFFFFF; --quote:#000000;
  --foot-bg:#1A1A1A; --foot-ink:#FFFFFF; --foot-ink2:#E4E4E4; --foot-label:#BDBDBD; --foot-line:#555555; --foot-btn:#FFFFFF; --foot-btn-ink:#000000;
  --nav-bg:rgba(255,255,255,0.92); --img-bg:#E6E6E6; --img-edge:rgba(0,0,0,0.45);
}

.pv2 { background:var(--bg); min-height:100vh; font-family:var(--sans); color:var(--ink); transition:background .25s, color .25s; }
.pv2 *{ box-sizing:border-box; }
.pv2 a.pd-link{ text-decoration:none; }
.pv2 .wrap{ max-width:1080px; margin:0 auto; padding:0 40px; }
.pv2 .mono{ font-family:var(--mono); }

@keyframes pv2fade{ from{opacity:0} to{opacity:1} }
@keyframes pv2pop{ from{opacity:0; transform:translateY(8px)} to{opacity:1; transform:translateY(0)} }

/* Nav */
.pv2 .nav{ position:sticky; top:0; z-index:50; background:var(--nav-bg); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
.pv2 .nav-inner{ max-width:1080px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; padding:18px 40px; }
.pv2 .nav-brand{ font-family:var(--serif); font-size:20px; font-weight:500; color:var(--ink); letter-spacing:.3px; }
.pv2 .nav-links{ display:flex; gap:26px; font-family:var(--mono); font-size:12px; letter-spacing:1px; text-transform:uppercase; }
.pv2 .nav-link{ color:var(--muted); padding-bottom:4px; border-bottom:2px solid transparent; transition:color .2s, border-color .2s; }
.pv2 .nav-link:hover{ color:var(--accent); }
.pv2 .nav-link.is-active{ color:var(--accent); border-bottom-color:var(--accent); }
.pv2 .theme-btn{ width:38px; height:38px; flex-shrink:0; border-radius:50%; border:1px solid var(--line-soft); background:transparent; cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center; color:var(--ink); transition:border-color .15s; }
.pv2 .theme-btn:hover{ border-color:var(--accent); }
.pv2 .resume-btn{ font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; background:var(--btn-bg); color:var(--btn-ink); padding:9px 16px; border-radius:6px; transition:background .18s; }
.pv2 .resume-btn:hover{ background:var(--accent); }

/* Section label / eyebrow */
.pv2 .eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--accent); }
.pv2 .sublabel{ font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--dim); }

/* Buttons */
.pv2 .btn{ font-family:var(--mono); font-size:12px; letter-spacing:1px; text-transform:uppercase; padding:14px 24px; border-radius:6px; transition:background .18s, border-color .18s; display:inline-block; }
.pv2 .btn-solid{ background:var(--btn-bg); color:var(--btn-ink); }
.pv2 .btn-solid:hover{ background:var(--accent); }
.pv2 .btn-outline{ background:transparent; color:var(--ink); border:1px solid var(--line-soft); }
.pv2 .btn-outline:hover{ border-color:var(--ink); }

/* Hero */
.pv2 .hero-grid{ padding-top:78px; padding-bottom:64px; display:grid; grid-template-columns:1.35fr 1fr; gap:56px; }
.pv2 .hero-head{ font-family:var(--serif); font-weight:400; font-size:60px; line-height:1.05; color:var(--ink); margin:0; letter-spacing:-.5px; }
.pv2 .hero-head .hl{ font-style:italic; color:var(--accent); }
.pv2 .hero-sub{ font-family:var(--serif); font-size:21px; line-height:1.6; color:var(--ink-soft); margin:30px 0 0; max-width:30em; }
.pv2 .hero-portrait{ position:relative; border-radius:14px; overflow:hidden; box-shadow:inset 0 0 0 1px var(--img-edge); }
.pv2 .hero-portrait img{ display:block; width:100%; aspect-ratio:1/1; object-fit:cover; filter:saturate(.9) contrast(1.02); }
.pv2 .hero-portrait .tint{ position:absolute; inset:0; pointer-events:none; mix-blend-mode:multiply; background:linear-gradient(155deg, rgba(184,106,75,.14), rgba(184,106,75,.02) 42%, rgba(40,28,18,.10)); }
.pv2 .hero-avatar{ display:none; }

/* Numbers */
.pv2 .numbers{ display:grid; grid-template-columns:repeat(4,1fr); }
.pv2 .stat-val{ font-family:var(--serif); font-size:36px; color:var(--ink); }
.pv2 .stat-cap{ font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--dim); margin-top:5px; }

/* Generic two-column / grids */
.pv2 .grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:0 52px; }
.pv2 .ruled{ border-top:1px solid var(--line-soft); }
.pv2 .serif-h{ font-family:var(--serif); color:var(--ink); }

/* Work cards */
.pv2 .work-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:16px; }
.pv2 .work-card{ cursor:pointer; background:var(--paper); border:1px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; transition:border-color .18s, transform .18s; text-align:left; padding:0; font:inherit; color:inherit; }
.pv2 .work-card:hover{ border-color:var(--accent); transform:translateY(-3px); }
.pv2 .imgslot{ position:relative; background:var(--img-bg); box-shadow:inset 0 0 0 1px var(--img-edge); }
.pv2 .imgslot .ph{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7px; color:var(--dim); opacity:.7; }
.pv2 .imgslot img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
.pv2 .badge{ font-family:var(--mono); font-size:10.5px; letter-spacing:1px; text-transform:uppercase; color:var(--accent); border:1px solid var(--accent-soft); border-radius:14px; padding:3px 10px; }
.pv2 .proj-desc{ font-size:13.5px; line-height:1.6; color:var(--muted); margin:0 0 16px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }

/* Mentorship CTA */
.pv2 .ghost-cta{ display:inline-block; font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--accent); border:1px solid var(--accent-soft); border-radius:8px; padding:11px 18px; transition:background .18s; }
.pv2 .ghost-cta:hover{ background:var(--band1); }

/* Pills */
.pv2 .pill{ font-size:12.5px; color:var(--ink-soft); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 13px; }
.pv2 .pill-mono{ font-family:var(--mono); font-size:11px; color:var(--muted); border:1px solid var(--line-soft); border-radius:6px; padding:4px 9px; }

/* Publication links */
.pv2 .pub{ display:block; padding:18px 0; border-top:1px solid var(--line); transition:opacity .18s; }
.pv2 .pub:hover{ opacity:.7; }

/* Footer */
.pv2 .foot{ color:var(--foot-ink); background:var(--foot-bg); border-top:1px solid var(--foot-line); scroll-margin-top:64px; }
.pv2 .foot-grid{ display:grid; grid-template-columns:1.3fr 1fr; gap:48px; align-items:center; }
.pv2 .foot-email{ display:inline-block; font-family:var(--mono); font-size:12.5px; letter-spacing:.5px; padding:12px 22px; background:var(--foot-btn); color:var(--foot-btn-ink); border-radius:6px; transition:opacity .18s; }
.pv2 .foot-email:hover{ opacity:.85; }
.pv2 .foot-link{ font-family:var(--mono); font-size:12.5px; letter-spacing:.5px; color:var(--foot-ink2); transition:color .18s; }
.pv2 .foot-link:hover{ color:var(--foot-ink); }
.pv2 .foot-social{ color:var(--foot-ink2); transition:color .18s; }
.pv2 .foot-social:hover{ color:var(--foot-ink); }

/* Modal */
.pv2 .scrim{ position:fixed; inset:0; z-index:200; background:rgba(20,15,10,.55); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; padding:20px; animation:pv2fade .18s ease; }
.pv2 .modal{ background:var(--paper); border:1px solid var(--line); border-radius:16px; max-width:600px; width:100%; max-height:85vh; overflow:auto; animation:pv2pop .2s ease; box-shadow:0 24px 60px -28px rgba(40,30,18,.4); }
.pv2 .modal-close{ flex-shrink:0; width:32px; height:32px; border-radius:8px; border:1px solid var(--line); background:transparent; color:var(--muted); cursor:pointer; font-size:15px; line-height:1; transition:border-color .15s, color .15s; }
.pv2 .modal-close:hover{ border-color:var(--accent); color:var(--accent); }
.pv2 .modal-link{ display:inline-flex; align-items:center; gap:8px; margin-top:22px; font-family:var(--mono); font-size:12px; letter-spacing:.5px; color:var(--accent); border:1px solid var(--accent-soft); border-radius:8px; padding:11px 18px; transition:background .18s; }
.pv2 .modal-link:hover{ background:var(--band1); }

/* Mobile vertical rail */
.pv2 .rail{ display:none; position:fixed; right:10px; top:50%; transform:translateY(-50%); z-index:60; transition:opacity .4s; background:var(--nav-bg); backdrop-filter:blur(10px); border:1px solid var(--line); border-radius:14px; padding:11px 13px; box-shadow:0 12px 32px -14px rgba(40,30,18,.4); cursor:pointer; }
.pv2 .rail-dot{ border-radius:50%; transition:all .2s; }

/* ── Responsive: mobile treatment ──────────────────────────────── */
@media (max-width:880px){
  .pv2 .nav-links{ display:none; }
  .pv2 .rail{ display:block; }
  .pv2 .wrap{ padding:0 20px; }
  .pv2 .hero-grid{ grid-template-columns:1fr; gap:30px; padding-top:40px; padding-bottom:44px; }
  .pv2 .hero-portrait{ display:none; }
  .pv2 .hero-avatar{ display:flex; align-items:center; gap:14px; margin-bottom:24px; }
  .pv2 .hero-head{ font-size:34px; }
  .pv2 .numbers{ grid-template-columns:1fr 1fr; row-gap:4px; }
  .pv2 .stack{ grid-template-columns:1fr !important; gap:30px !important; }
  .pv2 .grid-2{ grid-template-columns:1fr; gap:0; }
  .pv2 .work-grid{ grid-template-columns:1fr 1fr; gap:12px; }
  .pv2 .proj-desc{ display:none; }
  .pv2 .orgs-grid{ grid-template-columns:1fr 1fr !important; }
  .pv2 .exp-grid{ grid-template-columns:max-content 1fr !important; gap:0 16px !important; }
}
@media (max-width:560px){
  .pv2 .wrap{ padding:0 18px; }
  .pv2 .nav-inner{ padding:16px 18px; }
  .pv2 .hero-head{ font-size:30px; }
  /* work cards stay 2-up & compact on mobile (per handoff); tighten the gap */
  .pv2 .work-grid{ gap:10px; }
  .pv2 .work-card .badge{ font-size:9.5px; padding:2px 7px; }
  .pv2 .orgs-grid{ grid-template-columns:1fr !important; }
}
`;
