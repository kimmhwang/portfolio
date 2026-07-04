/* ██████████████████████████████████████████████████████████████████████████████
   ██  PORTFOLIO V4 — CONTENT MODEL                                           ██
   ██                                                                          ██
   ██  Everything the site shows lives here as data. Edit copy, links, cards,  ██
   ██  stats and images without touching layout code (Req. 2 of the handoff).  ██
   ██  To add a photo to a project: drop the file in public/files/images/ and  ██
   ██  set `image: "/files/images/x.jpg"` (and `gallery: [...]` for the modal). ██
   ██  Empty slots render a styled placeholder.                                 ██
   ██  Content is identical to v3 — v4 upgrades the presentation layer only.   ██
   ██████████████████████████████████████████████████████████████████████████████ */

export const SITE_META = {
  name: "Kim Hwang Yeo",
  resumeUrl: "/files/resume.pdf",
  email: "kimhwangyeo@gmail.com",
  githubUrl: "https://github.com/kimhwangyeo",
  defaultTheme: "light",      // "light" | "dark" | "contrast"
  sectionTones: true,         // alternating warm bands between sections
  banner: "Work in progress — this site is still being updated.",  // top notice; set "" to hide
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/kimhwang" },
    { label: "ResearchGate", href: "https://www.researchgate.net/profile/Kim-Hwang-Yeo/research" },
    { label: "ORCID", href: "https://orcid.org/0000-0001-8849-1534" },
    { label: "Medium", href: "https://medium.com/@kimhwangyeo" },
    { label: "GitHub", href: "https://github.com/kimhwangyeo" },
  ],
};

/* ═══ SECTIONS CONFIG (Req. 1 — per-section visibility + order) ═══
   The page renders only sections with `visible: true`, in `order`.
   Nav, mobile rail and scroll-spy all derive from this filtered set.
     • inNav   → appears in the desktop top navigation
     • inRail  → appears in the mobile vertical section rail
     • banded  → gets a warm alternating band background (computed live)        */
/* Recruiter-first order: identity → proof → narrative → evidence
   (experience, work, recognition) → working style → community → writing. */
export const SECTIONS = [
  { id: "hero",          label: "Intro",        visible: true, order: 10, inNav: false, inRail: false, banded: false },
  { id: "numbers",       label: "By the numbers", visible: true, order: 20, inNav: false, inRail: false, banded: true },
  { id: "about",         label: "About",        visible: true, order: 30, inNav: true,  inRail: true,  banded: false },
  { id: "experience",    label: "Experience",   visible: true, order: 40, inNav: true,  inRail: true,  banded: true },
  { id: "work",          label: "Work",         visible: true, order: 50, inNav: true,  inRail: true,  banded: false },
  { id: "recognition",   label: "Recognition",  visible: true, order: 60, inNav: false, inRail: true,  banded: true },
  { id: "howiwork",      label: "How I work",   visible: true, order: 70, inNav: false, inRail: false, banded: false },
  { id: "mentorship",    label: "Mentorship",   visible: true, order: 80, inNav: false, inRail: true,  banded: true },
  { id: "writing",       label: "Writing",      visible: true, order: 90, inNav: true,  inRail: true,  banded: false },
  { id: "organizations", label: "Organizations", visible: true, order: 100, inNav: false, inRail: false, banded: true },
  { id: "connect",       label: "Connect",      visible: true, order: 110, inNav: true,  inRail: true,  banded: false }, // footer (own tone)
];

export const CONTENT = {
  hero: {
    eyebrow: "Healthcare Strategy · MedTech · Global Health",
    headlinePre: "Moving medical innovation from lab to ",
    headlineHighlight: "last mile.",
    subhead:
      "Bioengineer with founder range: I've secured $265K in competitive funding, authored an FDA pre-submission, and run a three-site clinical study in Uganda — turning early medical technology into the strategy, evidence, and partnerships that reach patients.",
    ctas: [
      { label: "Get in touch", href: "#connect", variant: "solid" },
      { label: "See my work", href: "#work", variant: "outline" },
    ],
    // Scannable credibility markers — brand names + outcomes a recruiter
    // pattern-matches in the first seconds. Order: institutions, then proof.
    proof: ["Johns Hopkins M.S.E.", "UC Berkeley B.S.", "Co-founder, Ekyaalo Dx", "$265K raised", "FDA pre-sub authored"],
    portrait: { src: "/files/images/hero.jpg", alt: "Portrait of Kim Hwang Yeo" },
    captionLeft: "Singapore & USA",
    captionRight: "Strategy · BD · Market Access · VC",
  },

  numbers: {
    highlights: [
      { tag: "Fundraising", value: "$265K secured", cap: "Lead author on the American Cancer Society grant, plus a VentureWell E-Team award." },
      { tag: "Regulatory", value: "FDA pre-submission", cap: "Authored the Class II regulatory strategy for a novel digital-pathology device." },
      { tag: "Clinical research", value: "3-site Uganda study", cap: "Ran a multi-site usability study end-to-end — IRBs, data agreements, partners." },
      { tag: "Strategy", value: "Map the Systems winner", cap: "Johns Hopkins' inaugural systems-analysis champion, 2024." },
    ],
  },

  about: {
    label: "The short\nversion",
    lead:
      "I'm a bioengineer who has spent the last few years between Baltimore, Berkeley, and rural Uganda — turning research into diagnostics, and working out the strategy, funding, and regulatory path to get them into clinicians' hands.",
    paragraphs: [
      "As co-founder and Head of R&D at Ekyaalo Diagnostics, I led an AI-powered digital pathology platform for point-of-care breast cancer diagnosis — securing $265K from the American Cancer Society, authoring the FDA pre-submission, and building the clinical partnerships and field study across three Ugandan institutions.",
      "What I bring is range — engineering, clinical reality, regulatory, and the business case — and the instinct to connect them into a path forward. I'm happiest where getting the strategy right is what turns a good idea into one that reaches people.",
    ],
  },

  howiwork: {
    label: "How I work",
    principles: [
      { index: "01", title: "Systems over symptoms", body: "Every problem sits inside a larger system. I map the whole picture and act on the root cause and the highest-leverage points — not wherever the symptom happens to show." },
      { index: "02", title: "Last-mile mindset", body: "An idea only matters if it reaches the people who need it most. I design and strategize for the hardest context, not the easiest." },
      { index: "03", title: "Fluent across disciplines", body: "The best work sits where engineering, clinical medicine, and business overlap — and where the people in each of those rooms actually talk to each other. I translate fluently across all three." },
      { index: "04", title: "Evidence into action", body: "I would rather pressure-test a real assumption than polish a perfect plan. I decide from data and field reality, then move — and adjust as I learn." },
    ],
  },

  experience: {
    label: "Selected experience",
    eduLabel: "Education",
    items: [
      { year: "2025", role: "Global Health Advisor", org: "AIRS Oxygen Infrastructure Project, The Gambia" },
      { year: "2023–24", role: "Co-Founder & Head of R&D", org: "Ekyaalo Diagnostics, Maryland" },
      { year: "2023", role: "Global Market Access Strategist", org: "Ocular Therapeutix, Boston" },
      { year: "2022–24", role: "Bioengineering Design Instructor", org: "Johns Hopkins University" },
      { year: "2022–23", role: "Women's Health Research Fellow", org: "JHU Center for Bioengineering Innovation & Design" },
      { year: "2022", role: "Hardware Systems Engineer", org: "Mosaic Consulting" },
      { year: "2021–22", role: "Nanoparticle Research Engineer", org: "Berkeley Imaging Systems Lab" },
      { year: "2016–17", role: "Lieutenant, Guards", org: "Singapore Armed Forces" },
    ],
    education: [
      { degree: "M.S.E. Bioengineering Innovation & Design", school: "Johns Hopkins University", year: "2024" },
      { degree: "B.S. Bioengineering, High Honors", school: "UC Berkeley", year: "2022" },
      { degree: "A.A. + A.S. Mathematics, Highest Honors", school: "Santa Monica College", year: "2020" },
      { degree: "A-Levels", school: "Hwa Chong Institution, Singapore", year: "" },
    ],
  },

  work: {
    label: "Selected work",
    tagline: "Projects I've led across R&D, regulatory strategy, and global-health delivery.",
    projects: [
      { badge: "Global Health", kind: "Lead", year: "2023–24", name: "Ekyaalo Diagnostics Platform", description: "An AI-powered digital pathology platform integrating smartphones, microscopes and machine learning for point-of-care breast cancer diagnosis in low-resource settings. Secured a $265K American Cancer Society grant, prepared FDA pre-submission, and reached 90%+ diagnostic accuracy.", image: "/files/images/ekyaalo-slide.jpg", gallery: ["/files/images/ekyaalo-slide.jpg", "/files/images/ekyaalo-app.jpg", "/files/images/ekyaalo-team.jpg", "/files/images/ekyaalo-field.jpg"], tags: ["Computer Vision", "Medical Device", "Regulatory", "AI"], link: { label: "Read the CBID feature", href: "https://cbid.bme.jhu.edu/2024/01/08/ekyaalo-diagnostics-breast-cancer-equity-project-in-uganda-265k-grant/" } },
      { badge: "Regulatory", kind: "Lead", year: "2024", name: "FDA Pre-Submission Strategy", description: "Authored the regulatory documentation and strategy supporting FDA pre-submission for a novel Class II digital pathology device.", image: "", gallery: [], tags: ["Regulatory", "FDA", "Strategy"], link: null },
      { badge: "Innovation", kind: "Research", year: "2022", name: "Continuous Glucose Monitor", description: "A feasibility study for minimally-invasive continuous glucose monitoring using novel magnetic nanoparticles; characterized and published the nanoparticle properties.", image: "", gallery: [], tags: ["Nanotechnology", "Biosensors"], link: { label: "Read the IJMPI paper", href: "https://www.journal.iwmpi.org/index.php/iwmpi/article/view/412" } },
      { badge: "Market Access", kind: "Strategy", year: "2023", name: "Healthcare Market Access — Ocular Therapeutix", description: "Built the emerging-market commercial thesis for an ophthalmic drug-delivery product — competitive landscape and pricing strategy across 5+ markets — and opened a C-suite partnership conversation with Aravind Eye Hospital.", image: "", gallery: [], tags: ["Market Access", "Commercial Strategy", "Pricing"], link: null },
      { badge: "Strategy", kind: "Analysis", year: "2024", name: "Map the Systems — Breast Cancer in Uganda", description: "A systems-level analysis of why breast cancer remains a death sentence for many Ugandan women — winner of Johns Hopkins' inaugural Map the Systems competition.", image: "", gallery: [], tags: ["Systems Thinking", "Global Health", "Strategy"], link: { label: "See the JHU announcement", href: "https://imagine.jhu.edu/blog/2024/05/16/inaugural-champions-of-map-the-system-hopkins-announced/" } },
    ],
  },

  recognition: {
    label: "Recognition & credentials",
    achievements: [
      { title: "$265K Grant — American Cancer Society", meta: "Ekyaalo Diagnostics · Competitive funding" },
      { title: "VentureWell E-Team Grant — $5K", meta: "Ekyaalo Diagnostics · Pioneer cohort, Spring 2024" },
      { title: "Bioengineering Departmental Citation", meta: "UC Berkeley · Top Graduate" },
      { title: "Most Outstanding Teaching Assistant", meta: "Johns Hopkins University" },
      { title: "Map the Systems 2024 — Winner", meta: "Global systems-mapping competition" },
      { title: "Abell Foundation Fellowship", meta: "Johns Hopkins University" },
      { title: "Tau Beta Pi", meta: "National Engineering Honor Society" },
      { title: "Alpha Gamma Sigma", meta: "Permanent Member · Scholarship, Leadership & Service" },
    ],
    certifications: ["Professional Scrum Master I", "Google Project Management", "Business Analytics with Excel", "Lean Startup for the Social Sector", "Epidemiology in Public Health", "Nonprofit Fundraising Essentials", "Business Models for Social Enterprise", "Systems Thinking in Public Health"],
    coursework: [
      { institution: "Johns Hopkins", courses: ["Biomedical Data Science", "Medical Device Design", "Precision Medicine", "Global Health Innovation", "Strategic Management", "Entrepreneurial Finance", "Computer Vision", "Machine Learning"] },
      { institution: "UC Berkeley", courses: ["Tissue Engineering", "Cell Engineering", "Biomedical Imaging", "Physiology", "Bionanoscience", "Biotech Entrepreneurship", "Senior Design", "Honors Research"] },
      { institution: "Santa Monica College", courses: ["Organic Chemistry I & II", "Cell Biology", "Genetics", "Physics I–III", "Multivariable Calculus", "Linear Algebra", "Differential Equations", "C Programming"] },
    ],
  },

  mentorship: {
    label: "Mentorship",
    statement: "I do my clearest thinking with a team in the room.",
    body: "I've led and mentored multidisciplinary teams — engineers, clinicians, and designers — taking medical-device projects from a real clinical need through prototype and business case. What I care about is helping sharp people turn an idea into something that ships. The teams I'm proudest of are below, and I'm always glad to trade notes with anyone finding their way into biotech, medtech, and global health.",
    cta: { label: "Reach out about mentorship →", href: "mailto:kimhwangyeo@gmail.com" },
    menteesLabel: "Teams I've mentored",
    mentees: [
      { name: "Pediatric Monitoring Teams", detail: "JHU student teams developing pediatric patient-monitoring devices.", period: "2022–24" },
      { name: "Digital Pathology Projects", detail: "Student teams building AI-driven digital pathology solutions.", period: "2022–24" },
      { name: "Biopsy Instrumentation", detail: "Student team developing novel biopsy instrumentation.", period: "2022–24" },
    ],
    mentorsNote: "With gratitude to the people who shaped my path.",
    // People who mentored me. `note` is optional (role / affiliation / a line of thanks) — leave "" to show name only.
    mentors: [
      { name: "Dr. Samson Jarso", note: "" },
      { name: "Dr. Prashant Chandrasekharan", note: "" },
    ],
  },

  writing: {
    pubLabel: "Publications",
    publications: [
      { title: "Navigating Breast Cancer Innovation in Uganda", venue: "IEEE Pulse", year: "2024", kind: "Paper", href: "https://www.embs.org/pulse/articles/navigating-breast-cancer-innovation-in-uganda-within-and-without-the-textbook/" },
      { title: "Usability of the Ekyaalo Point-of-Care Digital Pathology Platform", venue: "JMIR Human Factors", year: "2024", kind: "Forthcoming", href: null },
      { title: "Uganda-based Survey of Challenges in Breast Cancer Detection in LMICs", venue: "JCTS · Translational Science", year: "2023", kind: "Paper", href: "https://www.cambridge.org/core/journals/journal-of-clinical-and-translational-science/article/233-ugandabased-survey-of-challenges-in-breast-cancer-detection-in-low-and-middle-income-countries/32DB1C2A18B4D9A07BF29E5BA855DFCE" },
      { title: "Characterizing the Performance of Commercial Magnetic Particles for Magnetic Particle Imaging", venue: "Int. J. Magnetic Particle Imaging", year: "2022", kind: "Paper", href: "https://www.journal.iwmpi.org/index.php/iwmpi/article/view/412" },
    ],
    insightsLabel: "Recent thinking",
    mediumUrl: "https://medium.com/@kimhwangyeo",
    insights: [
      { date: "Feb 2026", title: "What I Learned from Pursuing a Startup", excerpt: "Lessons on innovation and entrepreneurship from building a venture during my time at Johns Hopkins.", href: "https://medium.com/@kimhwangyeo/what-i-learned-from-pursuing-a-startup-and-other-lessons-from-my-time-at-johns-hopkins-fd7c38c08bc1" },
      { date: "May 2026", title: "Three Factors, One Cycle", excerpt: "A review of Alasdair Nairn's Engines That Move Markets — how technology cycles drive investment returns.", href: "https://medium.com/@kimhwangyeo/three-factors-one-cycle-6b7df086dd29" },
      { date: "Apr 2026", title: "Five Ideas That Changed How I See AI", excerpt: "A review of Ethem Alpaydin's Machine Learning, distilled into five core ideas.", href: "https://medium.com/@kimhwangyeo/five-ideas-that-changed-how-i-see-ai-bfa160622e1f" },
      { date: "Apr 2025", title: "Singapore Cannot Afford Naivety in a Changing World", excerpt: "An op-ed on Singapore's strategic position in a shifting global order.", href: "https://medium.com/@kimhwangyeo/singapore-cannot-afford-naivety-in-a-changing-world-10214fe96fe9" },
    ],
  },

  organizations: {
    label: "Where I've worked & studied",
    groups: [
      { label: "Employers", items: [
        { name: "Ekyaalo Diagnostics", role: "Co-Founder & Head of R&D", period: "2023–24" },
        { name: "Ocular Therapeutix", role: "Global Market Access Strategist", period: "2023" },
        { name: "Mosaic Consulting", role: "Hardware Systems Engineer", period: "2022" },
        { name: "Singapore Armed Forces", role: "Lieutenant — Guards", period: "2016–17" },
      ] },
      { label: "Academic", items: [
        { name: "Johns Hopkins University", role: "M.S.E. · Instructor · Fellow", period: "2022–24" },
        { name: "UC Berkeley", role: "B.S. Bioengineering", period: "2020–22" },
        { name: "Santa Monica College", role: "A.A. + A.S. · 4.00 GPA", period: "2018–20" },
        { name: "Hwa Chong Institution", role: "A-Levels · Singapore", period: "" },
      ] },
      { label: "Partners", items: [
        { name: "American Cancer Society", role: "USD 265K Grant", period: "2023" },
        { name: "Makerere University", role: "Field Research", period: "2021–23" },
        { name: "Aravind Eye Hospital", role: "Clinical Partnership", period: "2023" },
        { name: "AIRS · Direct Relief", role: "Global Health Advisory", period: "2025" },
      ] },
      { label: "Affiliations", items: [
        { name: "Engineering World Health", role: "Medical Device Design", period: "2021" },
        { name: "Tau Beta Pi", role: "Engineering Honor Society", period: "" },
        { name: "Alpha Gamma Sigma", role: "Permanent Member", period: "" },
      ] },
    ],
  },

  footer: {
    talkLabel: "Let's talk",
    headline: "Let's build something that reaches people.",
    invitation: "Whether it's a role, a collaboration, or just trading notes on global health — I'd genuinely love to hear from you.",
    signature: "— Kim",
    reachLabel: "Reach me",
    colophonLeft: "Kim Hwang Yeo · Singapore & USA",
    colophonRight: "Open to Strategy · BD · Market Access · VC",
  },
};
