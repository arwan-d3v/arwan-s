"use client";

import { useState } from "react";
import { THEME_CONFIGS } from "@/lib/theme_configs";
import { Save, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CVBuilderPage() {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState(THEME_CONFIGS[0].id);
  const [slug, setSlug] = useState("");

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">CV Builder Wizard</h1>
        <div className="text-sm text-muted-foreground">Step {step} of 6</div>
      </div>

      <div className="glass-strong rounded-2xl p-8">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">1. Personal Info</h2>
            <div className="grid gap-4">
              <input placeholder="Full Name" className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none" />
              <input placeholder="Professional Title" className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none" />
              <textarea placeholder="Summary" className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none min-h-[100px]" />
              <input placeholder="Contact Email / Phone" className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">2. Experience</h2>
            <div className="p-4 border border-[var(--card-border)] rounded-xl space-y-3">
               <input placeholder="Job Title" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <input placeholder="Company" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <input placeholder="Year (e.g. 2020 - 2023)" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <textarea placeholder="Description" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
            </div>
            <button className="text-sm text-primary">+ Add another experience</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">3. Education</h2>
            <div className="p-4 border border-[var(--card-border)] rounded-xl space-y-3">
               <input placeholder="Degree" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <input placeholder="Institution" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <input placeholder="Year" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">4. Skills</h2>
            <div className="flex gap-2">
               <input placeholder="Skill Name" className="flex-1 rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <input placeholder="Percentage (0-100)" type="number" className="w-24 rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
               <span className="px-3 py-1 bg-muted rounded-full text-xs">React JS (90%)</span>
               <span className="px-3 py-1 bg-muted rounded-full text-xs">TypeScript (85%)</span>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">5. Projects & Social Links</h2>
            <div className="space-y-3">
               <h3 className="text-sm text-muted-foreground">Projects</h3>
               <div className="p-4 border border-[var(--card-border)] rounded-xl space-y-3">
                 <input placeholder="Project Title" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
                 <input placeholder="Project URL" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               </div>
            </div>
            <div className="space-y-3 mt-6">
               <h3 className="text-sm text-muted-foreground">Social Links</h3>
               <input placeholder="LinkedIn URL" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
               <input placeholder="GitHub URL" className="w-full rounded-lg border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none" />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium mb-4">6. Theme & Publish</h2>

            <div>
              <h3 className="text-sm font-medium mb-3">Select Theme (1 of 27)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-1">
                {THEME_CONFIGS.slice(0, 8).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all ${theme === t.id ? 'border-primary ring-1 ring-primary/50' : 'border-[var(--card-border)] hover:border-muted-foreground'}`}
                  >
                     <div className="w-full h-8 rounded-md flex overflow-hidden">
                       <div className="flex-1" style={{ backgroundColor: t.palette.primary }}></div>
                       <div className="flex-1" style={{ backgroundColor: t.palette.secondary }}></div>
                       <div className="flex-1" style={{ backgroundColor: t.palette.accent }}></div>
                     </div>
                     <span className="text-xs truncate">{t.name}</span>
                  </button>
                ))}
                <div className="p-3 rounded-xl border border-dashed border-[var(--card-border)] flex items-center justify-center text-xs text-muted-foreground">
                  +19 More Themes
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--card-border)]">
              <label className="block text-sm font-medium mb-2">Public URL Slug</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[var(--card-border)] bg-muted text-muted-foreground text-sm">
                  arwan.space/r/
                </span>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="your-name"
                  className="flex-1 rounded-r-xl border border-[var(--card-border)] bg-muted py-2 px-3 text-sm outline-none"
                />
              </div>
            </div>

            {slug && (
               <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center">
                 <div>
                   <p className="text-sm font-medium text-primary">Ready to publish!</p>
                   <p className="text-xs text-muted-foreground">Your CV will be available at arwan.space/r/{slug}</p>
                 </div>
                 <Link href={`/r/${slug}`} target="_blank" className="px-4 py-2 bg-primary text-black text-sm font-medium rounded-lg hover:bg-primary/90">
                   View Live
                 </Link>
               </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between items-center pt-6 border-t border-[var(--card-border)]">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 6 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 bg-primary/20 text-primary rounded-xl text-sm font-medium hover:bg-primary/30 transition-colors"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-black rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              <Save className="w-4 h-4" /> Save & Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
