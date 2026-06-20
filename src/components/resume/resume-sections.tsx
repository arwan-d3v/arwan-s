"use client";

import { useState } from "react";
import {
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Link2,
  Loader,
  MapPin,
  Quote,
  Rocket,
  X,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  certifications,
  current,
  education,
  experience,
  hobbies,
  profile,
  projects,
  references,
  skills,
  socials,
} from "@/lib/resume-data";

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="clay flex h-10 w-10 items-center justify-center rounded-xl">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{children}</h2>
    </div>
  );
}

const wrap =
  "mx-auto w-full max-w-3xl scroll-mt-24 px-6 py-16 sm:py-20";

export function ResumeSections() {
  const [openProject, setOpenProject] = useState<number | null>(null);

  return (
    <>
      {/* Header */}
      <section id="header" className={wrap}>
        <Reveal>
          <div className="glass rounded-3xl p-8 sm:p-12">
            {profile.available && (
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-lime/10 px-3 py-1 text-xs font-medium text-lime">
                <span className="h-2 w-2 rounded-full bg-lime" /> Available for
                work
              </span>
            )}
            <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
              Hi, I&apos;m{" "}
              <span className="text-primary text-glow">{profile.name}</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-muted-foreground">
              {profile.title}
            </p>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {profile.location}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Experience */}
      <section id="experience" className={wrap}>
        <Reveal>
          <SectionTitle icon={Briefcase}>Experience</SectionTitle>
        </Reveal>
        <div className="space-y-4">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 80}>
              <article className="glass rounded-3xl p-6 transition-all duration-300 hover:ring-thunder">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {e.role}
                  </h3>
                  <span className="text-xs font-medium text-primary">
                    {e.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-accent">{e.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {e.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className={wrap}>
        <Reveal>
          <SectionTitle icon={GraduationCap}>Education</SectionTitle>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 80}>
              <article className="glass h-full rounded-3xl p-6">
                <h3 className="font-display font-semibold">{e.degree}</h3>
                <p className="mt-1 text-sm text-accent">{e.org}</p>
                <p className="mt-2 text-xs text-primary">{e.period}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills — horizontal bars */}
      <section id="skills" className={wrap}>
        <Reveal>
          <SectionTitle icon={Award}>Skills</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="glass space-y-5 rounded-3xl p-8">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-primary">{s.level}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-strong"
                    style={{
                      width: `${s.level}%`,
                      boxShadow: "0 0 12px rgba(255,210,63,0.5)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Certifications */}
      <section id="certifications" className={wrap}>
        <Reveal>
          <SectionTitle icon={Award}>Certifications</SectionTitle>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <article className="glass h-full rounded-3xl p-6 text-center">
                <Award className="mx-auto h-7 w-7 text-primary" />
                <h3 className="mt-3 font-display text-sm font-semibold">
                  {c.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.issuer} · {c.year}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects with lightbox */}
      <section id="projects" className={wrap}>
        <Reveal>
          <SectionTitle icon={Rocket}>Real Projects</SectionTitle>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <button
                onClick={() => setOpenProject(i)}
                className="glass group h-full w-full rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:ring-thunder"
              >
                <h3 className="font-display text-lg font-semibold">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-block text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open details →
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Current projects */}
      <section id="current" className={wrap}>
        <Reveal>
          <SectionTitle icon={Loader}>Current Projects</SectionTitle>
        </Reveal>
        <div className="space-y-4">
          {current.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article className="glass rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold">{c.title}</h3>
                  <span className="text-sm text-primary">{c.progress}%</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className={wrap}>
        <Reveal>
          <SectionTitle icon={Heart}>Hobbies</SectionTitle>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {hobbies.map((h) => (
              <span
                key={h}
                className="glass rounded-2xl px-5 py-3 text-sm font-medium"
              >
                {h}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* References */}
      <section id="references" className={wrap}>
        <Reveal>
          <SectionTitle icon={Quote}>References</SectionTitle>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {references.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <article className="glass h-full rounded-3xl p-6">
                <Quote className="h-6 w-6 text-primary/60" />
                <p className="mt-3 text-sm leading-relaxed">“{r.quote}”</p>
                <p className="mt-4 font-display text-sm font-semibold">
                  {r.name}
                </p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Social connect */}
      <section id="connect" className={wrap}>
        <Reveal>
          <div className="glass-strong rounded-3xl p-8 text-center sm:p-12">
            <SectionTitle icon={Link2}>
              <span className="sr-only">Social</span>
            </SectionTitle>
            <h2 className="-mt-6 font-display text-2xl font-bold sm:text-3xl">
              Let&apos;s connect
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Open to collaborations, freelance work, and full-time roles.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="clay rounded-2xl px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Lightbox modal */}
      {openProject !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={projects[openProject].title}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          onClick={() => setOpenProject(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="glass-strong relative z-10 w-full max-w-lg rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenProject(null)}
              aria-label="Close"
              className="clay absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-primary"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-5 flex aspect-video items-center justify-center rounded-2xl bg-muted">
              <Rocket className="h-12 w-12 text-primary/50" />
            </div>
            <h3 className="font-display text-2xl font-bold">
              {projects[openProject].title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {projects[openProject].summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {projects[openProject].tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
