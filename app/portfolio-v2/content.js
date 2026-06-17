/* ██████████████████████████████████████████████████████████████████████████████
   ██  PORTFOLIO V2 — CONTENT MODEL                                           ██
   ██                                                                          ██
   ██  Everything the site shows lives here as data. Edit copy, links, cards,  ██
   ██  stats and images without touching layout code (Req. 2 of the handoff).  ██
   ██  To add a photo to a project: drop the file in public/files/images/ and  ██
   ██  set `image: "/files/images/x.jpg"` (and `gallery: [...]` for the modal). ██
   ██  Empty slots render a styled placeholder.                                 ██
   ██████████████████████████████████████████████████████████████████████████████ */

export const SITE_META = {
  name: "Kim Hwang Yeo",
  resumeUrl: "/files/resume.pdf",
  email: "kimhwangyeo@gmail.com",
  githubUrl: "https://github.com/kimhwangyeo",
  defaultTheme: "light",      // "light" | "dark" | "contrast"
  sectionTones: true,         // alternating warm bands between sections
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
export const SECTIONS = [
  { id: "hero",          label: "Intro",        visible: true, order: 10, inNav: false, inRail: false, banded: false },
  { id: "numbers",       label: "By the numbers", visible: true, order: 20, inNav: false, inRail: false, banded: true },
  { id: "about",         label: "About",        visible: true, order: 30, inNav: true,  inRail: true,  banded: false },
  { id: "howiwork",      label: "How I work",   visible: true, order: 40, inNav: false, inRail: false, banded: true },
  { id: "experience",    label: "Experience",   visible: true, order: 50, inNav: false, inRail: false, banded: false },
  { id: "work",          label: "Work",         visible: true, order: 60, inNav: true,  inRail: true,  banded: true },
  { id: "recognition",   label: "Recognition",  visible: true, order: 70, inNav: false, inRail: true,  banded: false },
  { id: "mentorship",    label: "Mentorship",   visible: true, order: 80, inNav: false, inRail: true,  banded: true },
  { id: "writing",       label: "Writing",      visible: true, order: 90, inNav: true,  inRail: true,  banded: false },
  { id: "organizations", label: "Organizations", visible: true, order: 100, inNav: false, inRail: false, banded: true },
  { id: "connect",       label: "Connect",      visible: true, order: 110, inNav: true,  inRail: true,  banded: false }, // footer (own tone)
];

export const CONTENT = {
  hero: {
    eyebrow: "Bioengineer · Global Health · Medical Devices",
    headlinePre: "Building technology that reaches the ",
    headlineHighlight: "last mile.",
    subhead:
      "I build medical technology for the places it's hardest to reach — and I care just as much about the unglamorous work of getting a device through regulation and onto a clinic counter.",
    ctas: [
      { label: "Get in touch", href: "#connect", variant: "solid" },
      { label: "See my work", href: "#work", variant: "outline" },
    ],
    portrait: { src: "/files/images/hero.jpg", alt: "Kim Hwang Yeo" },
    captionLeft: "Singapore & USA",
    captionRight: "Open to MedTech roles",
  },

  numbers: {
    stats: [
      { value: "$265K", label: "Grants secured" },
      { value: "90%+", label: "Diagnostic accuracy" },
      { value: "3", label: "Countries worked" },
      { value: "4+", label: "Publications" },
    ],
  },

  about: {
    label: "The short\nversion",
    lead:
      "I'm a bioengineer who has spent the last few years moving between Baltimore, Berkeley, and rural Uganda — turning research into diagnostics that actually make it into clinicians' hands.",
    paragraphs: [
      "As Head of R&D at Ekyaalo Diagnostics, I led an AI-powered digital pathology platform for point-of-care breast cancer diagnosis in low-resource settings, secured $265K from the American Cancer Society, and prepared its FDA pre-submission.",
      "I work fluently across engineering, medicine and business — and I'm happiest where the three meet: a real problem, a workable device, and a path to the people who need it.",
    ],
  },

  howiwork: {
    label: "How I work",
    principles: [
      { index: "01", title: "Systems over symptoms", body: "Every problem is part of a larger system. I look for root causes and design at the leverage points, not where the symptom shows." },
      { index: "02", title: "Last-mile mindset", body: "Technology only matters if it reaches the people who need it most. I design for the hardest context, not the easiest." },
      { index: "03", title: "Build across boundaries", body: "The best solutions sit at the intersection of engineering, medicine and business. I operate fluently across all three." },
      { index: "04", title: "Ship, learn, iterate", body: "Perfection in the lab means nothing without impact in the field. I bias toward real-world testing and fast iteration." },
    ],
  },

  experience: {
    label: "Selected experience",
    eduLabel: "Education",
    items: [
      { year: "2025", role: "Global Health Advisor", org: "AIRS Oxygen Infrastructure Project, The Gambia" },
      { year: "2023–24", role: "Head of R&D", org: "Ekyaalo Diagnostics, Maryland" },
      { year: "2023", role: "Global Market Access Strategist", org: "Ocular Therapeutix, Boston" },
      { year: "2022–24", role: "Bioengineering Design Instructor", org: "Johns Hopkins University" },
      { year: "2022–23", role: "Women's Health Research Fellow", org: "JHU Center for Bioengineering Innovation & Design" },
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
    tagline: "Projects I've led, built, and mentored.",
    projects: [
      { badge: "Global Health", kind: "Lead", year: "2023–24", name: "Ekyaalo Diagnostics Platform", description: "An AI-powered digital pathology platform integrating smartphones, microscopes and machine learning for point-of-care breast cancer diagnosis in low-resource settings. Secured a USD 265K American Cancer Society grant, prepared FDA pre-submission, and reached 90%+ diagnostic accuracy.", image: "", gallery: [], tags: ["Computer Vision", "Medical Device", "Regulatory", "AI"], link: { label: "Read the CBID feature", href: "https://cbid.bme.jhu.edu/2024/01/08/ekyaalo-diagnostics-breast-cancer-equity-project-in-uganda-265k-grant/" } },
      { badge: "Regulatory", kind: "Lead", year: "2024", name: "FDA Pre-Submission Strategy", description: "Authored the regulatory documentation and strategy supporting FDA pre-submission for a novel Class II digital pathology device.", image: "", gallery: [], tags: ["Regulatory", "FDA", "Strategy"], link: null },
      { badge: "Innovation", kind: "Research", year: "2022", name: "Continuous Glucose Monitor", description: "A feasibility study for minimally-invasive continuous glucose monitoring using novel magnetic nanoparticles; characterized and published the nanoparticle properties.", image: "", gallery: [], tags: ["Nanotechnology", "Biosensors"], link: null },
      { badge: "Global Health", kind: "Design", year: "2021", name: "Surgical Sterilization Device", description: "Designed sterilization solutions for surgical equipment in partnership with Makerere University, Uganda.", image: "", gallery: [], tags: ["Design", "Low-Resource"], link: null },
      { badge: "Innovation", kind: "Engineering", year: "2022", name: "Diagnostic Hardware — Mosaic", description: "Improved manufacturing assembly efficiency by 20% through systematic testing, validation and optimization of diagnostic hardware prototypes.", image: "", gallery: [], tags: ["Hardware", "Manufacturing"], link: null },
      { badge: "Innovation", kind: "Mentored", year: "2022–24", name: "Pediatric Monitoring Systems", description: "Mentored Johns Hopkins student teams developing pediatric patient monitoring devices.", image: "", gallery: [], tags: ["Medical Device", "Mentorship"], link: null },
      { badge: "Innovation", kind: "Mentored", year: "2022–24", name: "Biopsy Instrumentation", description: "Guided the development of novel biopsy tools through JHU bioengineering design courses.", image: "", gallery: [], tags: ["Instrumentation", "Design"], link: null },
      { badge: "Global Health", kind: "Mentored", year: "2022–24", name: "Digital Pathology Student Projects", description: "Supervised student teams building digital pathology solutions at Johns Hopkins.", image: "", gallery: [], tags: ["Pathology", "AI", "Mentorship"], link: null },
    ],
  },

  recognition: {
    label: "Recognition & credentials",
    achievements: [
      { title: "USD 265K Grant — American Cancer Society", meta: "Ekyaalo Diagnostics · Competitive funding" },
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
    statement: "Teaching is how I think out loud.",
    body: "As a design instructor at Johns Hopkins I taught 50+ students and was named Most Outstanding Teaching Assistant. The teams I'm proudest of are below — and I'm always glad to talk with students finding their own way into biotech and global health.",
    cta: { label: "Reach out about mentorship →", href: "mailto:kimhwangyeo@gmail.com" },
    menteesLabel: "Teams I've mentored",
    mentees: [
      { name: "Pediatric Monitoring Teams", detail: "JHU student teams developing pediatric patient-monitoring devices.", period: "2022–24" },
      { name: "Digital Pathology Projects", detail: "Student teams building AI-driven digital pathology solutions.", period: "2022–24" },
      { name: "Biopsy Instrumentation", detail: "Novel biopsy tool development through bioengineering design courses.", period: "2022–24" },
    ],
    mentorsNote: "A note of thanks to the people who shaped my path — coming soon.",
  },

  writing: {
    pubLabel: "Publications",
    publications: [
      { title: "Navigating Breast Cancer Innovation in Uganda", venue: "IEEE Pulse", year: "2024", kind: "Paper", href: "#" },
      { title: "Uganda-based Survey of Challenges in Breast Cancer Detection in LMICs", venue: "JCTS · Translational Science", year: "2023", kind: "Paper", href: "#" },
      { title: "Magnetic Nanoparticle Characterization for Biosensing", venue: "Berkeley Imaging Systems Lab", year: "2022", kind: "Paper", href: "#" },
      { title: "Map the Systems 2024 — Systems Mapping", venue: "Global Competition · Winner", year: "2024", kind: "Poster", href: "#" },
    ],
    insightsLabel: "Ideas in progress",
    mediumUrl: "https://medium.com/@kimhwangyeo",
    insights: [
      { title: "Biotech as a Career — A Guide for Undergrads", excerpt: "Navigating the path from bench science to the biotech industry." },
      { title: "The Healthcare System in the US", excerpt: "A practitioner's perspective on strengths, gaps and opportunities." },
      { title: "Healthcare Systems Around the World", excerpt: "What the US, Singapore, Uganda and others can learn from each other." },
      { title: "Global Health — What Is It, Really?", excerpt: "Defining global health beyond the buzzword." },
    ],
  },

  organizations: {
    label: "Where I've worked & studied",
    groups: [
      { label: "Employers", items: [
        { name: "Ekyaalo Diagnostics", role: "Head of R&D", period: "2023–24" },
        { name: "Ocular Therapeutix", role: "Market Access Strategist", period: "2023" },
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
    colophonRight: "Open to MedTech & Global Health",
  },
};
