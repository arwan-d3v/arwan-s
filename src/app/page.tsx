import Link from "next/link";
import {
  ArrowRight,
  FileText,
  LogIn,
  Compass,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { VideoBackground } from "@/components/video-background";
import { ThunderBackground } from "@/components/thunder-background";
import { getActiveTheme } from "@/lib/theme-service";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";

export default async function GatewayPage() {
  const theme = await getActiveTheme();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <VideoBackground className="z-0" src={theme.videoPath} />
      <ThunderBackground className="z-5" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <Link
          href="/explore"
          className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
        >
          Looking Arwan&apos;space
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-10 pt-16 text-center sm:pt-24">
        <Reveal>
          <span className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {theme.editionLabel}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-7xl">
            Your Professional Hub
            <br />
            <span className="text-primary text-glow">
              &amp; Digital Ecosystem
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Interactive resume, services showcase, and a member ecosystem —
            crafted with the speed of lightning and the precision of a single,
            perfect strike.
          </p>
        </Reveal>

        {/* Dual CTA cards */}
        <Reveal delay={240} className="mt-12 w-full">
          <div className="grid gap-5 sm:grid-cols-2">
            <Link
              href="/resume"
              className="glass group flex flex-col items-start gap-4 rounded-3xl p-7 text-left transition-all duration-300 hover:ring-thunder hover:-translate-y-1"
            >
              <span className="clay flex h-12 w-12 items-center justify-center rounded-2xl">
                <FileText className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">
                  Continue Explore Resume
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Step into the interactive, animated resume experience.
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Enter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/login"
              className="glass group flex flex-col items-start gap-4 rounded-3xl p-7 text-left transition-all duration-300 hover:ring-thunder hover:-translate-y-1"
            >
              <span className="clay flex h-12 w-12 items-center justify-center rounded-2xl">
                <LogIn className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">
                  I&apos;m Member
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sign in to your dashboard, CV builder, and ecosystem.
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <Link
            href="/explore"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:hidden"
          >
            Looking Arwan&apos;space <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Quick modules strip */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "Services",
                desc: "Web, invitations, SaaS & more",
                href: "/services",
              },
              {
                icon: TrendingUp,
                title: "Algorithmic Trade",
                desc: "Live signals, futuristic dashboard",
                href: "/explore",
              },
              {
                icon: Wrench,
                title: "Utility Converter",
                desc: "Image, video & media tools",
                href: "/explore",
              },
            ].map((m) => (
              <Link
                key={m.title}
                href={m.href}
                className="glass flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-primary hover:-translate-y-0.5"
              >
                <m.icon className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="font-display text-sm font-semibold">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-[var(--card-border)] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} Arwan&apos;space · Zenitsu Edition</p>
        </div>
      </footer>
      </div>
    </main>
  );
}
