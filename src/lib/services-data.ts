export type ServiceCategory =
  | "Web Design"
  | "Invitation"
  | "Portfolio"
  | "SaaS UMKM"
  | "Education"
  | "Finance"
  | "Home Tools"
  | "Consultation"
  | "Algorithmic Trade"
  | "Utility Converter";

export const categories: ServiceCategory[] = [
  "Web Design",
  "Invitation",
  "Portfolio",
  "SaaS UMKM",
  "Education",
  "Finance",
  "Home Tools",
  "Consultation",
  "Algorithmic Trade",
  "Utility Converter",
];

export type Service = {
  title: string;
  category: ServiceCategory;
  description: string;
  price: string;
  tag?: string;
};

export const services: Service[] = [
  {
    title: "Thunder Landing Kit",
    category: "Web Design",
    description: "High-conversion landing pages with liquid-glass aesthetics.",
    price: "from $149",
    tag: "Popular",
  },
  {
    title: "Business Profile Site",
    category: "Web Design",
    description: "Multi-page company site, responsive and SEO-ready.",
    price: "from $299",
  },
  {
    title: "Digital Wedding Invitation",
    category: "Invitation",
    description: "Animated, shareable invitation with RSVP and gallery.",
    price: "from $39",
    tag: "Best value",
  },
  {
    title: "Event Invitation Pack",
    category: "Invitation",
    description: "Birthday, aqiqah, and corporate event invites.",
    price: "from $29",
  },
  {
    title: "Creative Portfolio",
    category: "Portfolio",
    description: "Showcase your work with interactive case studies.",
    price: "from $99",
  },
  {
    title: "UMKM Order System",
    category: "SaaS UMKM",
    description: "Catalog, cart, and WhatsApp checkout for small business.",
    price: "from $199",
  },
  {
    title: "Course Platform Starter",
    category: "Education",
    description: "Lessons, quizzes, and student progress tracking.",
    price: "from $349",
  },
  {
    title: "Finance Dashboard",
    category: "Finance",
    description: "Budget, cashflow, and reporting in one panel.",
    price: "from $249",
  },
  {
    title: "Smart Home Tools",
    category: "Home Tools",
    description: "Utility calculators and household management widgets.",
    price: "from $59",
  },
  {
    title: "Strategy Consultation",
    category: "Consultation",
    description: "1:1 session on branding, product, or go-to-market.",
    price: "$80/hr",
  },
  {
    title: "Algorithmic Trade Signals",
    category: "Algorithmic Trade",
    description: "Live cyan-black dashboard with confidence-scored signals.",
    price: "subscription",
    tag: "Member",
  },
  {
    title: "Media Converter Suite",
    category: "Utility Converter",
    description: "Image, video, and social media conversion tools.",
    price: "freemium",
  },
];

export const testimonials = [
  {
    name: "Dewi Lestari",
    role: "Founder, Kopi Senja",
    quote:
      "My UMKM order system paid for itself in a week. The lightning theme makes us stand out.",
  },
  {
    name: "Rama Pratama",
    role: "Freelance Designer",
    quote:
      "The portfolio build was fast and gorgeous. Clients keep asking who made it.",
  },
  {
    name: "Anita Wijaya",
    role: "Event Organizer",
    quote:
      "Digital invitations were a hit. The animations felt premium and on-brand.",
  },
];
