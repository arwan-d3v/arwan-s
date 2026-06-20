import Link from "next/link";
import { forwardRef } from "react";

type Variant = "gold" | "clay" | "ghost" | "accent";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-primary text-primary-foreground glow-gold hover:bg-primary-strong hover:scale-[1.02]",
  clay: "clay text-primary hover:text-primary-foreground hover:bg-primary",
  accent:
    "bg-accent text-accent-foreground hover:brightness-110 hover:scale-[1.02]",
  ghost:
    "border border-[var(--card-border)] text-foreground hover:border-primary hover:text-primary",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function ClayLink({
  href,
  variant = "clay",
  className = "",
  children,
  ...rest
}: CommonProps & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export const ClayButton = forwardRef<
  HTMLButtonElement,
  CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function ClayButton(
  { variant = "clay", className = "", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
