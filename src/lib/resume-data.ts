export const sections = [
  { id: "header", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "projects", label: "Projects" },
  { id: "current", label: "Current" },
  { id: "hobbies", label: "Hobbies" },
  { id: "references", label: "References" },
  { id: "connect", label: "Connect" },
] as const;

export const profile = {
  name: "Arwan",
  title: "Full-Stack Developer & Digital Creator",
  tagline:
    "Crafting fast, beautiful digital ecosystems with the precision of a single, perfect strike.",
  location: "Indonesia · Remote",
  available: true,
};

export const experience = [
  {
    role: "Founder & Lead Developer",
    org: "Arwan'space",
    period: "2023 — Present",
    desc: "Built a unified personal-branding and digital ecosystem platform with RBAC, AI companion, and trading dashboards.",
  },
  {
    role: "Frontend Engineer",
    org: "Nimbus Studio",
    period: "2021 — 2023",
    desc: "Delivered high-performance Next.js apps and design systems for SaaS and UMKM clients.",
  },
  {
    role: "Web Developer (Freelance)",
    org: "Independent",
    period: "2019 — 2021",
    desc: "Designed and shipped 40+ landing pages, portfolios, and digital invitations.",
  },
];

export const education = [
  {
    degree: "B.Sc. Informatics Engineering",
    org: "Universitas Teknologi",
    period: "2017 — 2021",
  },
  {
    degree: "Fullstack Web Development",
    org: "Dicoding Academy",
    period: "2020",
  },
];

export const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "UI / UX Design", level: 85 },
  { name: "Node.js / APIs", level: 80 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Supabase / SQL", level: 78 },
];

export const certifications = [
  { name: "Meta Front-End Developer", issuer: "Coursera", year: "2023" },
  { name: "Google UX Design", issuer: "Coursera", year: "2022" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2022" },
];

export const projects = [
  {
    title: "Arwan'space Platform",
    summary: "Personal branding & digital ecosystem with 5-level RBAC.",
    tags: ["Next.js", "Supabase", "AI"],
  },
  {
    title: "Thunder Invitations",
    summary: "Animated digital invitation builder with RSVP.",
    tags: ["React", "Framer Motion"],
  },
  {
    title: "UMKM Order System",
    summary: "Catalog + WhatsApp checkout SaaS for small business.",
    tags: ["Next.js", "Stripe"],
  },
  {
    title: "Algorithmic Trade Dashboard",
    summary: "Real-time signals with MT5 integration.",
    tags: ["Recharts", "WebSocket"],
  },
];

export const current = [
  {
    title: "AI Companion v2",
    progress: 70,
    desc: "Upgrading the Gemini-powered assistant with memory.",
  },
  {
    title: "Loyalty Gamification",
    progress: 45,
    desc: "Breath Points, Thunder Streak, and tier rewards.",
  },
];

export const hobbies = [
  "Trail running",
  "Sketching",
  "Mechanical keyboards",
  "Anime",
  "Coffee brewing",
  "Trading",
];

export const references = [
  {
    name: "Sari Indah",
    role: "CTO, Nimbus Studio",
    quote: "One of the most reliable and creative engineers I've worked with.",
  },
  {
    name: "Budi Santoso",
    role: "Product Lead, FinTech Co",
    quote: "Ships fast, with taste. Turns vague ideas into polished products.",
  },
];

export const socials = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Email", href: "#" },
];
