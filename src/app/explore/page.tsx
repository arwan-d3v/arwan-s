import Link from "next/link";
import {
  ArrowRight,
  FileText,
  TrendingUp,
  Wrench,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import { ThunderBackground } from "@/components/thunder-background";
import { PublicNav } from "@/components/public-nav";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Explore — Arwan'space",
  description:
    "Discover the Arwan'space ecosystem: Algorithmic Trade, CV Builder & Portfolio, and the Utility Converter.",
};

const modules = [
  {
    title: "Algorithmic Trade",
    desc: "Live, confidence-scored signals in a futuristic cyan-black dashboard. Connect to MT5 and track your edge.",
    icon: TrendingUp,
    accent: "cyan",
    href: "/login",
    cta: "View signals",
  },
  {
    title: "CV Builder & Portfolio",
    desc: "27 themes, 27 layouts, instant PDF export, and a public resume link. Build your brand in minutes.",
    icon: FileText,
    accent: "gold",
    href: "/resume",
    cta: "Open builder",
  },
  {
    title: "Utility Converter",
    desc: "Image, video, and social media tools. Convert, resize, and download — all in one black-and-red toolkit.",
    icon: Wrench,
    accent: "red",
    href: "/login",
    cta: "Try tools",
  },
];

const stats = [
  { label: "Active members", value: "2.4k+" },
  { label: "Resumes published", value: "8.1k+" },
  { label: "Themes & layouts", value: "27 × 27" },
  { label: "Signals delivered", value: "120k+" },
];

export default function ExplorePage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <ThunderBackground />
      <PublicNav />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
        <Reveal>
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary">
            <Zap className="h-3.5 w-3.5 fill-primary" /> The Ecosystem
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
            Looking <span className="text-primary text-glow">Arwan&apos;space</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Three pillars, one platform. Explore the modules that power personal
            branding and digital growth.
          </p>
        </Reveal>
      </section>

      {/* Module cards */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <Link
                href={m.href}
                className="glass group flex h-full flex-col gap-5 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:ring-thunder"
              >
                <span
                  className="clay flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    color:
                      m.accent === "cyan"
                        ? "var(--cyan)"
                        : m.accent === "red"
                          ? "var(--accent)"
                          : "var(--primary)",
                  }}
                >
                  <m.icon className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">
                    {m.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.desc}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {m.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-20 max-w-5xl px-6">
        <Reveal>
          <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary text-glow">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <Reveal>
          <div className="glass-strong flex flex-col items-center gap-6 rounded-3xl p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-balance sm:text-3xl">
              Ready to channel your Thunder Breathing?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Start with the interactive resume, or sign in to unlock the full
              member ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-gold transition-transform hover:scale-[1.02]"
              >
                <Globe className="h-4 w-4" /> Explore Resume
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--card-border)] px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Users className="h-4 w-4" /> Member Sign In
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
