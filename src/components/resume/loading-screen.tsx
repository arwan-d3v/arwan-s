"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="glass-strong fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 px-6">
      <div className="relative">
        <span
          className="clay flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{ boxShadow: "0 0 40px rgba(255,210,63,0.35)" }}
        >
          <Zap className="h-10 w-10 fill-primary text-primary" />
        </span>
      </div>

      <div className="w-full max-w-xs">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-display font-semibold text-foreground">
            Channeling Thunder
          </span>
          <span className="font-mono text-primary">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 16px rgba(255,210,63,0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
