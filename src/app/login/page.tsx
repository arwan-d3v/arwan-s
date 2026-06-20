import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { ThunderBackground } from "@/components/thunder-background";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Sign In — Arwan'space",
  description: "Access your Arwan'space member dashboard and ecosystem.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <ThunderBackground />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to gateway
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="glass-strong w-full max-w-md rounded-3xl p-8 sm:p-10">
          <div className="mb-7 text-center">
            <span className="clay mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </span>
            <h1 className="font-display text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your member dashboard
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Arwan&apos;space?{" "}
            <Link href="/explore" className="text-primary hover:underline">
              Explore the ecosystem
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
