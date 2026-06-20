"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import {
  categories,
  services,
  type ServiceCategory,
} from "@/lib/services-data";

export function ServicesGrid() {
  const [active, setActive] = useState<ServiceCategory | "All">("All");

  const filtered =
    active === "All"
      ? services
      : services.filter((s) => s.category === active);

  return (
    <div>
      {/* Category pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Pill
          label="All"
          active={active === "All"}
          onClick={() => setActive("All")}
        />
        {categories.map((c) => (
          <Pill
            key={c}
            label={c}
            active={active === c}
            onClick={() => setActive(c)}
          />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-3xl px-6 py-16 text-center">
          <Clock className="h-8 w-8 text-primary" />
          <p className="font-display text-lg font-semibold">Coming Soon</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            We&apos;re forging new offerings in this category. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.title}
              className="glass group flex flex-col gap-3 rounded-3xl p-6 transition-all duration-300 hover:ring-thunder hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {s.category}
                </span>
                {s.tag && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                    {s.tag}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-primary">
                  {s.price}
                </span>
                <button className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                  Request quote →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground glow-gold"
          : "glass text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
