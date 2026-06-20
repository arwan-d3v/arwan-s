"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/services-data";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <div className="glass relative rounded-3xl p-8 sm:p-10">
      <Quote className="h-8 w-8 text-primary/60" />
      <blockquote className="mt-4 text-balance text-lg leading-relaxed sm:text-xl">
        “{t.quote}”
      </blockquote>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-display font-semibold">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="clay flex h-10 w-10 items-center justify-center rounded-xl text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="clay flex h-10 w-10 items-center justify-center rounded-xl text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-5 flex gap-1.5">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
