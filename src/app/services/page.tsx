import { Calendar, Sparkles } from "lucide-react";
import { ThunderBackground } from "@/components/thunder-background";
import { PublicNav } from "@/components/public-nav";
import { Reveal } from "@/components/reveal";
import { ServicesGrid } from "@/components/services/services-grid";
import { AiCompanion } from "@/components/services/ai-companion";
import { TestimonialsCarousel } from "@/components/services/testimonials-carousel";

export const metadata = {
  title: "Services — Arwan'space",
  description:
    "Web design, invitations, portfolios, SaaS for UMKM, education, finance tools, consultation, and more.",
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <ThunderBackground />
      <PublicNav />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
        <Reveal>
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Services & Solutions
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
            Everything you need to{" "}
            <span className="text-primary text-glow">launch & grow</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            From lightning-fast landing pages to full digital ecosystems — pick
            a category and discover what we can forge together.
          </p>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal>
          <ServicesGrid />
        </Reveal>
      </section>

      {/* AI Companion + Booking */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold">
                Chat with our AI Companion
              </h2>
              <AiCompanion />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <h2 className="mb-4 font-display text-2xl font-bold">
                Hybrid Booking
              </h2>
              <div className="glass flex h-[28rem] flex-col rounded-3xl p-6">
                <div className="flex items-center gap-3 border-b border-[var(--card-border)] pb-4">
                  <span className="clay flex h-10 w-10 items-center justify-center rounded-2xl">
                    <Calendar className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold">
                      Book a session
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Calendly + internal form
                    </p>
                  </div>
                </div>
                <form className="mt-5 flex flex-1 flex-col gap-3">
                  <input
                    placeholder="Full name"
                    className="rounded-xl border border-[var(--card-border)] bg-muted px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-xl border border-[var(--card-border)] bg-muted px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />
                  <select className="rounded-xl border border-[var(--card-border)] bg-muted px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary">
                    <option>Web Design</option>
                    <option>Invitation</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your project…"
                    className="flex-1 resize-none rounded-xl border border-[var(--card-border)] bg-muted px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
                  />
                  <button
                    type="button"
                    className="rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground glow-gold"
                  >
                    Request booking
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <Reveal>
          <h2 className="mb-6 text-center font-display text-2xl font-bold">
            What clients say
          </h2>
          <TestimonialsCarousel />
        </Reveal>
      </section>
    </main>
  );
}
