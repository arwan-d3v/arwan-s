"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThunderBackground } from "@/components/thunder-background";
import { LoadingScreen } from "@/components/resume/loading-screen";
import {
  BottomNavMerged,
  MiniNavLeft,
} from "@/components/resume/resume-nav";
import { ResumeSections } from "@/components/resume/resume-sections";
import { sections } from "@/lib/resume-data";

export function ResumeExperience() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string>(sections[0].id);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    if (loading) return;

    const ids = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShowBottom(scrolled > 0.12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ThunderBackground />

      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {/* Special liquid-glass top navbar */}
      <header className="sticky top-0 z-30 px-4 pt-4">
        <div
          className="glass-strong mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-3"
          style={{
            borderRadius: "999px 999px 28px 28px",
            boxShadow:
              "0 8px 40px rgba(255,210,63,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <Logo />
          <div className="flex items-center gap-2">
            <button className="clay inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Exit
            </Link>
          </div>
        </div>
      </header>

      <MiniNavLeft active={active} />
      <BottomNavMerged active={active} visible={showBottom} />

      <ResumeSections />

      <div className="h-24" />
    </main>
  );
}
