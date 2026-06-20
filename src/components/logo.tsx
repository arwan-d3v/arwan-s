import Link from "next/link";
import { Zap } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Arwan'space home"
    >
      <span className="clay flex h-10 w-10 items-center justify-center rounded-xl">
        <Zap
          className="h-5 w-5 fill-primary text-primary transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.5}
        />
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Arwan
        <span className="text-primary text-glow">&apos;space</span>
      </span>
    </Link>
  );
}
