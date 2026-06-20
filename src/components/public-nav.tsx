"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { ClayLink } from "@/components/ui/clay-button";

const links = [
  { href: "/resume", label: "Resume" },
  { href: "/services", label: "Services" },
  { href: "/explore", label: "Explore" },
];

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav className="glass-strong mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-5 py-3">
        <Logo />
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary text-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <ClayLink href="/login" variant="gold" className="px-5 py-2.5">
          Sign In
        </ClayLink>
      </nav>
    </header>
  );
}
