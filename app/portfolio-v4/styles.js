/* ██████████████████████████████████████████████████████████████████████████████
   ██  PORTFOLIO V4 — DESIGN SYSTEM                                            ██
   ██  Upgrades over v3: fluid clamp() type scale, scroll-reveal animations,   ██
   ██  scroll progress bar, :focus-visible rings, prefers-reduced-motion       ██
   ██  support, color-scheme hints, text-wrap:balance, refined micro-          ██
   ██  interactions. Same warm editorial brand + 3-theme token system.         ██
   ██████████████████████████████████████████████████████████████████████████████ */
export const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.pv4 {
  --serif:'Newsreader',Georgia,serif; --sans:'Hanken Grotesk',system-ui,sans-serif; --mono:'IBM Plex Mono',ui-monospace,monospace;
  /* Fluid type scale (clamps between 375px and 1200px viewports) */
  --fs-hero:clamp(34px, 2.2rem + 2.6vw, 62px);
  --fs-h2:clamp(22px, 1.2rem + 1.2vw, 30px);
  --fs-lead:clamp(19px, 1rem + .7vw, 23px);
  --fs-body:clamp(16px, .95rem + .25vw, 18px);
  --ease:cubic-bezier(.22,.61,.36,1);
}

.pv4, html[data-pv4-theme="light"] .pv4{
  color-scheme:light;
  --bg:#FBFAF7; --paper:#FFFFFF; --ink:#1C1A17; --ink-soft:#3A332B; --muted:#777067; --dim:#776C5B;
  --accent:#B86A4B; --accent-ink:#9C5535; --accent-soft:#C2A98E; --line:#ECE7DF; --line-soft:#E2DACB;
  --band1:#F4F0E9; --band2:#F1ECE3; --btn-bg:#1C1A17; --btn-ink:#FBFAF7; --quote:#2A251E;
  --foot-bg:#C3B091; --foot-ink:#3A2C1A; --foot-ink2:#4E3E26; --foot-label:#524126; --foot-line:#B3996F; --foot-btn:#2A1E10; --foot-btn-ink:#F2E8D8;
  --nav-bg:rgba(251,250,247,0.86); --img-bg:#EFE8DC; --img-edge:rgba(120,90,50,0.12);
}
html[data-pv4-theme="dark"] .pv4{
  color-scheme:dark;
  --bg:#17130F; --paper:#211B16; --ink:#F1E9DC; --ink-soft:#CFC4B2; --muted:#A99D89; --dim:#93876F;
  --accent:#D98E63; --accent-ink:#D98E63; --accent-soft:#7A6650; --line:#322B23; --line-soft:#3A322A;
  --band1:#1E1914; --band2:#231D17; --btn-bg:#D98E63; --btn-ink:#17130F; --quote:#ECE3D4;
  --foot-bg:#241E18; --foot-ink:#ECE0CE; --foot-ink2:#B6A88F; --foot-label:#8A7C64; --foot-line:#3A3128; --foot-btn:#D98E63; --foot-btn-ink:#17130F;
  --nav-bg:rgba(23,19,15,0.86); --img-bg:#1B1610; --img-edge:rgba(255,225,180,0.10);
}
html[data-pv4-theme="contrast"] .pv4{
  color-scheme:light;
  --bg:#FFFFFF; --paper:#FFFFFF; --ink:#000000; --ink-soft:#111111; --muted:#1C1C1C; --dim:#333333;
  --accent:#9A3A10; --accent-ink:#9A3A10; --accent-soft:#9A3A10; --line:#000000; --line-soft:#000000;
  --band1:#EDEDED; --band2:#E2E2E2; --btn-bg:#000000; --btn-ink:#FFFFFF; --quote:#000000;
  --foot-bg:#1A1A1A; --foot-ink:#FFFFFF; --foot-ink2:#E4E4E4; --foot-label:#BDBDBD; --foot-line:#555555; --foot-btn:#FFFFFF; --foot-btn-ink:#000000;
  --nav-bg:rgba(255,255,255,0.92); --img-bg:#E6E6E6; --img-edge:rgba(0,0,0,0.45);
}

.pv4 { background:var(--bg); min-height:100vh; font-family:var(--sans); color:var(--ink); transition:background .25s, color .25s; }
.pv4 *{ box-sizing:border-box; }
.pv4 a{ text-decoration:none; }
.pv4 .wrap{ max-width:1080px; margin:0 auto; padding:0 40px; }
.pv4 .mono{ font-family:var(--mono); }

/* ── Accessibility: visible focus rings + skip link ── */
.pv4 :is(a,button):focus-visible{ outline:2px solid var(--accent); outline-offset:3px; border-radius:4px; }
.pv4 .skip-link{ position:fixed; top:-100px; left:16px; z-index:300; background:var(--btn-bg); color:var(--btn-ink); font-family:var(--mono); font-size:12px; letter-spacing:1px; padding:12px 18px; border-radius:0 0 8px 8px; transition:top .2s; }
.pv4 .skip-link:focus{ top:0; }

@keyframes pv4fade{ from{opacity:0} to{opacity:1} }
@keyframes pv4pop{ from{opacity:0; transform:translateY(10px) scale(.985)} to{opacity:1; transform:translateY(0) scale(1)} }

/* ── Scroll-reveal (IO adds .in-view; motion removed under reduced-motion) ── */
.pv4 .reveal{ opacity:0; transform:translateY(22px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
.pv4 .reveal.in-view{ opacity:1; transform:none; }
@media (prefers-reduced-motion: reduce){
  .pv4 .reveal{ opacity:1; transform:none; transition:none; }
  .pv4 *{ animation-duration:.01ms !important; transition-duration:.01ms !important; scroll-behavior:auto !important; }
}

/* ── Scroll progress bar ── */
.pv4 .progress{ position:fixed; top:0; left:0; right:0; height:3px; z-index:120; background:transparent; pointer-events:none; }
.pv4 .progress > span{ display:block; height:100%; background:var(--accent); transform-origin:0 50%; transform:scaleX(0); }

/* ── WIP banner (dismissible) ── */
.pv4 .wip-banner{ background:var(--accent); color:var(--btn-ink); font-family:var(--mono); font-size:11px; letter-spacing:2px; text-transform:uppercase; text-align:center; padding:9px 44px; line-height:1.4; position:relative; }
.pv4 .wip-close{ position:absolute; right:10px; top:50%; transform:translateY(-50%); background:transparent; border:none; color:inherit; font-size:14px; cursor:pointer; padding:4px 8px; opacity:.8; }
.pv4 .wip-close:hover{ opacity:1; }

/* ── Nav ── */
.pv4 .nav{ position:sticky; top:0; z-index:100; background:var(--nav-bg); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:1px solid var(--line); }
.pv4 .nav-inner{ max-width:1080px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; padding:16px 40px; }
.pv4 .nav-brand{ font-family:var(--serif); font-size:20px; font-weight:500; color:var(--ink); letter-spacing:.3px; }
.pv4 .nav-links{ display:flex; gap:26px; font-family:var(--mono); font-size:12px; letter-spacing:1px; text-transform:uppercase; }
.pv4 .nav-link{ position:relative; color:var(--muted); padding-bottom:4px; transition:color .2s; }
.pv4 .nav-link::after{ content:""; position:absolute; left:0; right:100%; bottom:0; height:2px; background:var(--accent); transition:right .25s var(--ease); }
.pv4 .nav-link:hover{ color:var(--accent); }
.pv4 .nav-link.is-active{ color:var(--accent-ink); }
.pv4 .nav-link.is-active::after{ right:0; }
.pv4 .theme-btn{ width:38px; height:38px; flex-shrink:0; border-radius:50%; border:1px solid var(--line-soft); background:transparent; cursor:pointer; padding:0; display:flex; align-items:center; justify-content:center; color:var(--ink); transition:border-color .15s, transform .15s; }
.pv4 .theme-btn:hover{ border-color:var(--accent); transform:rotate(15deg); }
.pv4 .resume-btn{ font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; background:var(--btn-bg); color:var(--btn-ink); padding:9px 16px; border-radius:6px; transition:background .18s; }
.pv4 .resume-btn:hover{ background:var(--accent); }

/* ── Labels ── */
.pv4 .eyebrow{ font-family:var(--mono); font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--accent-ink); }
.pv4 .sublabel{ font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--dim); }

/* ── Buttons ── */
.pv4 .btn{ font-family:var(--mono); font-size:12px; letter-spacing:1px; text-transform:uppercase; padding:14px 24px; border-radius:6px; transition:background .18s, border-color .18s, transform .15s; display:inline-block; }
.pv4 .btn:active{ transform:translateY(1px); }
.pv4 .btn-solid{ background:var(--btn-bg); color:var(--btn-ink); }
.pv4 .btn-solid:hover{ background:var(--accent); }
.pv4 .btn-outline{ background:transparent; color:var(--ink); border:1px solid var(--line-soft); }
.pv4 .btn-outline:hover{ border-color:var(--ink); }

/* ── Hero ── */
.pv4 .hero-grid{ padding-top:clamp(44px,6vw,84px); padding-bottom:clamp(44px,5vw,64px); display:grid; grid-template-columns:1.35fr 1fr; gap:56px; }
.pv4 .hero-head{ font-family:var(--serif); font-weight:400; font-size:var(--fs-hero); line-height:1.05; color:var(--ink); margin:0; letter-spacing:-.5px; text-wrap:balance; }
.pv4 .hero-head .hl{ font-style:italic; color:var(--accent); }
.pv4 .hero-sub{ font-family:var(--serif); font-size:var(--fs-lead); line-height:1.6; color:var(--ink-soft); margin:30px 0 0; max-width:30em; text-wrap:pretty; }
.pv4 .hero-portrait{ position:relative; border-radius:14px; overflow:hidden; box-shadow:inset 0 0 0 1px var(--img-edge); aspect-ratio:1/1; }
/* Source photo is a full-torso square with the face in the upper fifth.
   Oversize the image inside the 1:1 frame and bias the crop toward the top
   so the face leads: shows head → chest, trims belt/hands. */
.pv4 .hero-portrait img{ display:block; width:100%; height:128%; object-fit:cover; object-position:50% 4%; filter:saturate(.9) contrast(1.02); }
.pv4 .hero-portrait .tint{ position:absolute; inset:0; pointer-events:none; mix-blend-mode:multiply; background:linear-gradient(155deg, rgba(184,106,75,.14), rgba(184,106,75,.02) 42%, rgba(40,28,18,.10)); }
.pv4 .hero-avatar{ display:none; }

/* Hero credibility chips — scannable proof under the CTAs */
.pv4 .hero-proof{ display:flex; flex-wrap:wrap; gap:8px; list-style:none; margin:26px 0 0; padding:0; }
.pv4 .hero-proof li{ font-family:var(--mono); font-size:10.5px; letter-spacing:.6px; text-transform:uppercase; color:var(--muted); border:1px solid var(--line-soft); border-radius:14px; padding:5px 11px; white-space:nowrap; }

/* ── Numbers ── */
.pv4 .numbers{ display:grid; grid-template-columns:repeat(4,1fr); }

/* ── Grids / rules ── */
.pv4 .grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:0 52px; }
.pv4 .ruled{ border-top:1px solid var(--line-soft); }
.pv4 .serif-h{ font-family:var(--serif); color:var(--ink); }

/* ── Work cards ── */
.pv4 .work-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:16px; }
.pv4 .work-card{ position:relative; cursor:pointer; background:var(--paper); border:1px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; transition:border-color .2s, transform .25s var(--ease), box-shadow .25s var(--ease); text-align:left; padding:0; font:inherit; color:inherit; }
.pv4 .work-card:hover{ border-color:var(--accent); transform:translateY(-4px); box-shadow:0 18px 40px -24px rgba(40,30,18,.35); }
/* Title button stretched over the whole card (valid HTML: no headings inside buttons) */
.pv4 .card-btn{ background:none; border:0; margin:0; padding:0; font:inherit; color:inherit; text-align:left; cursor:pointer; }
.pv4 .card-btn::after{ content:""; position:absolute; inset:0; }
.pv4 .work-card:has(.card-btn:focus-visible){ outline:2px solid var(--accent); outline-offset:3px; }
@supports selector(:has(*)){ .pv4 .card-btn:focus-visible{ outline:none; } }
.pv4 .imgslot{ position:relative; background:var(--img-bg); box-shadow:inset 0 0 0 1px var(--img-edge); overflow:hidden; }
.pv4 .imgslot .ph{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:7px; color:var(--dim); opacity:.7; }
.pv4 .imgslot img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s var(--ease); }
.pv4 .work-card:hover .imgslot img{ transform:scale(1.045); }
.pv4 .badge{ font-family:var(--mono); font-size:10.5px; letter-spacing:1px; text-transform:uppercase; color:var(--accent-ink); border:1px solid var(--accent-soft); border-radius:14px; padding:3px 10px; }
.pv4 .proj-desc{ font-size:13.5px; line-height:1.6; color:var(--muted); margin:0 0 16px; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
.pv4 .card-cta{ font-family:var(--mono); font-size:11px; color:var(--accent-ink); display:inline-flex; align-items:center; gap:5px; }
.pv4 .card-cta .arr{ display:inline-block; transition:transform .2s var(--ease); }
.pv4 .work-card:hover .card-cta .arr{ transform:translateX(4px); }

/* ── Mentorship / pills / publications ── */
.pv4 .ghost-cta{ display:inline-block; font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--accent-ink); border:1px solid var(--accent-soft); border-radius:8px; padding:11px 18px; transition:background .18s; }
.pv4 .ghost-cta:hover{ background:var(--band1); }
.pv4 .pill{ font-size:12.5px; color:var(--ink-soft); background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:7px 13px; }
.pv4 .pill-mono{ font-family:var(--mono); font-size:11px; color:var(--muted); border:1px solid var(--line-soft); border-radius:6px; padding:4px 9px; }
.pv4 .pub{ display:block; padding:18px 0; border-top:1px solid var(--line); transition:opacity .18s; }
.pv4 .pub:hover{ opacity:.72; }

/* ── Footer ── */
.pv4 .foot{ color:var(--foot-ink); background:var(--foot-bg); border-top:1px solid var(--foot-line); scroll-margin-top:64px; }
.pv4 .foot-grid{ display:grid; grid-template-columns:1.3fr 1fr; gap:48px; align-items:center; }
.pv4 .foot-email{ display:inline-flex; align-items:center; gap:10px; font-family:var(--mono); font-size:12.5px; letter-spacing:.5px; padding:12px 22px; background:var(--foot-btn); color:var(--foot-btn-ink); border-radius:6px; transition:opacity .18s; border:none; cursor:pointer; }
.pv4 .foot-email:hover{ opacity:.85; }
.pv4 .foot-link{ font-family:var(--mono); font-size:12.5px; letter-spacing:.5px; color:var(--foot-ink2); transition:color .18s; }
.pv4 .foot-link:hover{ color:var(--foot-ink); }
.pv4 .foot-social{ color:var(--foot-ink2); transition:color .18s; }
.pv4 .foot-social:hover{ color:var(--foot-ink); }

/* ── Modal / lightbox ── */
.pv4 .scrim{ position:fixed; inset:0; z-index:200; background:rgba(20,15,10,.58); backdrop-filter:blur(5px); display:flex; align-items:center; justify-content:center; padding:20px; animation:pv4fade .18s ease; }
.pv4 .modal{ background:var(--paper); border:1px solid var(--line); border-radius:16px; max-width:640px; width:100%; max-height:88vh; overflow:auto; animation:pv4pop .22s var(--ease); box-shadow:0 24px 60px -28px rgba(40,30,18,.4); }
.pv4 .modal-close{ flex-shrink:0; width:34px; height:34px; border-radius:8px; border:1px solid var(--line); background:transparent; color:var(--muted); cursor:pointer; font-size:15px; line-height:1; transition:border-color .15s, color .15s; }
.pv4 .modal-close:hover{ border-color:var(--accent); color:var(--accent); }
.pv4 .modal-link{ display:inline-flex; align-items:center; gap:8px; margin-top:22px; font-family:var(--mono); font-size:12px; letter-spacing:.5px; color:var(--accent-ink); border:1px solid var(--accent-soft); border-radius:8px; padding:11px 18px; transition:background .18s; }
.pv4 .modal-link:hover{ background:var(--band1); }
.pv4 .feature-img{ position:relative; border-radius:10px; overflow:hidden; background:var(--img-bg); box-shadow:inset 0 0 0 1px var(--img-edge); aspect-ratio:16/10; margin-bottom:10px; }
.pv4 .feature-img img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.pv4 .thumb{ position:relative; aspect-ratio:4/3; border-radius:8px; overflow:hidden; background:var(--img-bg); box-shadow:inset 0 0 0 1px var(--img-edge); cursor:pointer; padding:0; border:2px solid transparent; transition:border-color .15s; }
.pv4 .thumb.is-active{ border-color:var(--accent); }
.pv4 .thumb img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.pv4 .modal-nav{ font-family:var(--mono); font-size:11px; letter-spacing:1px; text-transform:uppercase; color:var(--muted); background:transparent; border:1px solid var(--line); border-radius:8px; padding:9px 14px; cursor:pointer; transition:border-color .15s, color .15s; }
.pv4 .modal-nav:hover{ border-color:var(--accent); color:var(--accent); }

/* ── Back to top ── */
.pv4 .to-top{ position:fixed; right:22px; bottom:22px; z-index:90; width:42px; height:42px; border-radius:50%; border:1px solid var(--line-soft); background:var(--paper); color:var(--ink); cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 28px -14px rgba(40,30,18,.4); opacity:0; pointer-events:none; transform:translateY(8px); transition:opacity .25s, transform .25s; }
.pv4 .to-top.show{ opacity:1; pointer-events:auto; transform:none; }
.pv4 .to-top:hover{ border-color:var(--accent); color:var(--accent); }

/* ── Mobile rail ── */
.pv4 .rail{ display:none; position:fixed; right:10px; top:50%; transform:translateY(-50%); z-index:60; transition:opacity .4s; background:var(--nav-bg); backdrop-filter:blur(10px); border:1px solid var(--line); border-radius:14px; padding:11px 13px; box-shadow:0 12px 32px -14px rgba(40,30,18,.4); cursor:pointer; }
.pv4 .rail-dot{ border-radius:50%; transition:all .2s; }
.pv4 .rail a{ padding:5px 0; }

/* ── Responsive ── */
@media (max-width:880px){
  .pv4 .nav-links{ display:none; }
  .pv4 .rail{ display:block; }
  .pv4 .wrap{ padding:0 20px; }
  .pv4 .hero-grid{ grid-template-columns:1fr; gap:30px; }
  .pv4 .hero-portrait{ display:none; }
  .pv4 .hero-avatar{ display:flex; align-items:center; gap:14px; margin-bottom:24px; }
  .pv4 .numbers{ grid-template-columns:1fr 1fr; row-gap:4px; }
  .pv4 .stack{ grid-template-columns:1fr !important; gap:30px !important; }
  .pv4 .grid-2{ grid-template-columns:1fr; gap:0; }
  .pv4 .work-grid{ grid-template-columns:1fr 1fr; gap:12px; }
  .pv4 .proj-desc{ display:none; }
  .pv4 .orgs-grid{ grid-template-columns:1fr 1fr !important; }
  .pv4 .exp-grid{ grid-template-columns:max-content 1fr !important; gap:0 16px !important; }
  .pv4 .to-top{ right:14px; bottom:14px; }
}
@media (max-width:560px){
  .pv4 .wrap{ padding:0 18px; }
  .pv4 .nav-inner{ padding:14px 18px; }
  .pv4 .work-grid{ gap:10px; }
  .pv4 .work-card .badge{ font-size:9.5px; padding:2px 7px; }
  .pv4 .orgs-grid{ grid-template-columns:1fr !important; }
}
`;
