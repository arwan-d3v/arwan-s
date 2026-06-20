"use client";

import { sections } from "@/lib/resume-data";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Vertical golden dot nav, hidden on small screens. */
export function MiniNavLeft({ active }: { active: string }) {
  return (
    <nav
      aria-label="Resume sections"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-2"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "scale-125 bg-primary glow-gold"
                  : "bg-muted-foreground/40 group-hover:bg-primary/70"
              }`}
            />
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "text-primary opacity-100"
                  : "opacity-0 group-hover:opacity-70"
              }`}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/** Horizontal merged glass bar that appears after deep scroll. */
export function BottomNavMerged({
  active,
  visible,
}: {
  active: string;
  visible: boolean;
}) {
  return (
    <nav
      aria-label="Resume quick navigation"
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="glass-strong flex max-w-[92vw] items-center gap-1 overflow-x-auto rounded-full px-2 py-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              active === s.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
