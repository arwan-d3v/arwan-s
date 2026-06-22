"use client";

import { useEffect, useMemo, useState } from "react";

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
};

/**
 * Slow-drifting golden lightning particles for public pages.
 * Decorative only — hidden from assistive tech.
 */
export function ThunderBackground({ className = "-z-10" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 999.13) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 22 }, (_, i) => ({
      left: `${seeded(i + 1) * 100}%`,
      top: `${seeded(i + 50) * 100}%`,
      size: 2 + seeded(i + 100) * 4,
      delay: `${seeded(i + 150) * 9}s`,
      duration: `${7 + seeded(i + 200) * 8}s`,
    }));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
    >
      {/* ambient glow */}
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px]" />

      {/* lightning flicker overlay */}
      <div className="animate-flicker absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

      {/* drifting particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-drift absolute rounded-full bg-primary"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: "0 0 12px 2px rgba(255,210,63,0.6)",
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}
