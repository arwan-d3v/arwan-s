"use client";

import { useState } from "react";
import { Check, ShieldCheck, Zap, Crown, CreditCard, ExternalLink } from "lucide-react";

export default function UpgradeSubscriptionPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const plans = [
    {
      id: "student",
      name: "Student",
      icon: ShieldCheck,
      price: billingCycle === "monthly" ? 3 : 29,
      period: billingCycle === "monthly" ? "/month" : "/year",
      color: "text-blue-400",
      bgHover: "hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]",
      buttonClass: "bg-blue-400/10 text-blue-400 hover:bg-blue-400/20",
      features: [
        "1 CV with standard themes",
        "10 Converter usages per day",
        "Basic Trading Dashboard",
        "Community support"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      icon: Zap,
      price: billingCycle === "monthly" ? 10 : 96,
      period: billingCycle === "monthly" ? "/month" : "/year",
      color: "text-[#00E5FF]",
      bgHover: "border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]",
      buttonClass: "bg-[#00E5FF] text-black hover:bg-[#00E5FF]/90",
      popular: true,
      features: [
        "3 CVs with ALL premium themes",
        "50 Converter usages per day",
        "Pro Trading Signals (Real-time)",
        "Priority Support",
        "No watermark on exports"
      ]
    },
    {
      id: "company",
      name: "Company",
      icon: Crown,
      price: billingCycle === "monthly" ? 30 : 288,
      period: billingCycle === "monthly" ? "/month" : "/year",
      color: "text-primary",
      bgHover: "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]",
      buttonClass: "bg-primary/10 text-primary hover:bg-primary/20",
      features: [
        "Unlimited CV creation",
        "Unlimited Converter usage",
        "API Access for trading data",
        "24/7 Dedicated Support",
        "Custom branding & domains"
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const processPayment = async (provider: 'midtrans' | 'stripe' | 'paypal') => {
    if (!selectedPlanId) return;
    setIsProcessing(true);

    try {
      const res = await fetch(`/api/payment/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: selectedPlanId, billing_cycle: billingCycle, user_email: "user@example.com" }),
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // Redirect to the gateway or mock URL
      if (data.redirect_url) window.location.href = data.redirect_url;
      else if (data.url) window.location.href = data.url;
      else if (data.approval_url) window.location.href = data.approval_url;
      else {
        alert("Payment URL not found in response.");
        setIsProcessing(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error initializing payment";
      alert(msg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Upgrade Your Ecosystem</h1>
        <p className="text-muted-foreground text-lg">Unlock the full potential of Arwan&apos;space. Choose a plan that fits your needs.</p>

        <div className="inline-flex items-center p-1 bg-black/40 rounded-xl border border-[var(--card-border)] mt-6">
           <button
             onClick={() => setBillingCycle("monthly")}
             className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${billingCycle === "monthly" ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}
           >
             Monthly
           </button>
           <button
             onClick={() => setBillingCycle("yearly")}
             className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === "yearly" ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`}
           >
             Yearly <span className="text-[10px] bg-primary text-black px-2 py-0.5 rounded-full font-bold">SAVE 20%</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
         {plans.map(plan => (
           <div key={plan.id} className={`relative glass-strong rounded-3xl p-8 border border-[var(--card-border)] transition-all duration-300 ${plan.bgHover} ${selectedPlanId === plan.id ? 'ring-2 ring-primary/50' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-black text-xs font-bold px-4 py-1 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                   MOST POPULAR
                </div>
              )}

              <plan.icon className={`w-12 h-12 mb-6 ${plan.color}`} />
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-6">
                 <span className="text-4xl font-bold font-mono">${plan.price}</span>
                 <span className="text-muted-foreground mb-1">{plan.period}</span>
              </div>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isProcessing}
                className={`w-full py-3 rounded-xl font-bold text-sm mb-4 transition-colors flex justify-center items-center ${plan.buttonClass}`}
              >
                {selectedPlanId === plan.id ? "Selected" : "Select Plan"}
              </button>

              {selectedPlanId === plan.id && (
                <div className="flex flex-col gap-2 mb-8 bg-black/40 p-3 rounded-xl border border-[var(--card-border)]">
                   <p className="text-xs text-center text-muted-foreground mb-1">Select Payment Method</p>
                   <button onClick={() => processPayment('midtrans')} disabled={isProcessing} className="w-full py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs rounded-lg flex items-center justify-center gap-2">
                     <CreditCard className="w-3 h-3" /> Midtrans <ExternalLink className="w-3 h-3 opacity-50" />
                   </button>
                   <button onClick={() => processPayment('stripe')} disabled={isProcessing} className="w-full py-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs rounded-lg flex items-center justify-center gap-2">
                     <CreditCard className="w-3 h-3" /> Stripe <ExternalLink className="w-3 h-3 opacity-50" />
                   </button>
                   <button onClick={() => processPayment('paypal')} disabled={isProcessing} className="w-full py-2 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs rounded-lg flex items-center justify-center gap-2">
                     <CreditCard className="w-3 h-3" /> PayPal <ExternalLink className="w-3 h-3 opacity-50" />
                   </button>
                </div>
              )}

              <div className="space-y-4">
                 {plan.features.map((feature, i) => (
                   <div key={i} className="flex items-start gap-3 text-sm">
                      <Check className={`w-5 h-5 shrink-0 ${plan.color}`} />
                      <span className="text-muted-foreground">{feature}</span>
                   </div>
                 ))}
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
