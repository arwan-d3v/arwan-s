"use client";

import { ShieldCheck, FileText, Zap, Trophy, Wrench, ArrowRight, Gift } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [claiming, setClaiming] = useState(false);

  // Using dummy data for metrics since we're in mock-first approach
  const metrics = {
    cvQuota: "1 / 3",
    subscription: { plan: "Public", daysLeft: "Forever" },
    thunderStreak: 5,
    breathPoints: 1250,
    loyaltyTier: "Apprentice",
    utilityQuota: "10 / 50"
  };

  const handleClaim = async () => {
    setClaiming(true);
    try {
      const res = await fetch("/api/loyalty/daily-claim", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ user_id: "mock-user-id" })
      });
      const data = await res.json();
      alert(`🎉 Gift Claimed: ${data.gift.name}`);
    } catch {
      alert("Failed to claim gift");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Welcome back, Traveler</h1>
          <p className="text-sm text-muted-foreground">Here is an overview of your ecosystem activity today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/cv" className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors border border-primary/20">
            <FileText className="h-4 w-4" />
            Buat CV Baru
          </Link>
          <Link href="/dashboard/trading" className="inline-flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors border border-accent/20">
            <Zap className="h-4 w-4" />
            Lihat Sinyal Trading
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Metric Cards */}
        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <FileText className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-muted-foreground">CV Dibuat</h3>
          </div>
          <div className="text-3xl font-display font-bold">{metrics.cvQuota}</div>
          <div className="mt-2 text-sm text-muted-foreground">Max quota limits by your role</div>
        </div>

        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <ShieldCheck className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-muted-foreground">Subscription</h3>
          </div>
          <div className="text-3xl font-display font-bold">{metrics.subscription.plan}</div>
          <div className="mt-2 text-sm text-muted-foreground">{metrics.subscription.daysLeft}</div>
        </div>

        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Zap className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-muted-foreground">Thunder Streak</h3>
          </div>
          <div className="text-3xl font-display font-bold">{metrics.thunderStreak} Days</div>
          <div className="mt-2 text-sm text-muted-foreground">Log in tomorrow to keep the streak alive!</div>
        </div>

        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
               <Trophy className="w-16 h-16 text-accent" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium text-muted-foreground">Breath Points</h3>
            </div>
            <div className="text-3xl font-display font-bold">{metrics.breathPoints}</div>
            <div className="mt-1 text-sm text-accent font-medium">Tier: {metrics.loyaltyTier}</div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
             <button
               onClick={handleClaim}
               disabled={claiming}
               className="w-full flex items-center justify-center gap-2 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
             >
                <Gift className="h-4 w-4" />
                {claiming ? "Claiming..." : "Klaim Thunder Gift"}
             </button>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group sm:col-span-2 lg:col-span-2">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Wrench className="w-24 h-24 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-muted-foreground">Utility Converter Quota</h3>
          </div>
          <div className="text-3xl font-display font-bold">{metrics.utilityQuota}</div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
             Resets at midnight <ArrowRight className="h-3 w-3 inline" />
          </div>
        </div>
      </div>
    </div>
  );
}
