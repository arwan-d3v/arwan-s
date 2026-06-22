"use client";

import { useEffect, useState } from "react";
import { Check, RefreshCw, AlertTriangle } from "lucide-react";

const themeCards = [
  {
    id: "zenitsu",
    name: "Zenitsu Agatsuma",
    label: "Thunder Breathing · Zenitsu Edition",
    color: "#ffd23f",
    colorClass: "bg-[#ffd23f]",
    glowClass: "shadow-[0_0_15px_rgba(255,210,63,0.4)]",
    accentColor: "#e23636",
    accentName: "Crimson Red",
    desc: "Lightning fast yellow accents, golden drifting sparks, and Zenitsu crouching video loop.",
  },
  {
    id: "gojo",
    name: "Satoru Gojo",
    label: "Limitless Void · Gojo Edition",
    color: "#00a3ff",
    colorClass: "bg-[#00a3ff]",
    glowClass: "shadow-[0_0_15px_rgba(0,163,255,0.4)]",
    accentColor: "#d946ef",
    accentName: "Hollow Purple",
    desc: "Infinite electric blue accents, matching drifting blue particles, Satoru Gojo video background, and Hollow Purple highlights.",
  },
  {
    id: "igris",
    name: "Shadow Commander Igris",
    label: "Shadow Commander · Igris Edition",
    color: "#a855f7",
    colorClass: "bg-[#a855f7]",
    glowClass: "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    accentColor: "#ef4444",
    accentName: "Bloody Crimson",
    desc: "Majestic royal purple theme accents, floating dark purple sparks, Shadow Commander Igris video, and bloody red highlight outlines.",
  },
];

export default function AdminSettingsPage() {
  const [activeThemeId, setActiveThemeId] = useState<string>("zenitsu");
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Fetch current theme on mount
  useEffect(() => {
    async function fetchTheme() {
      try {
        const res = await fetch("/api/settings/theme");
        const data = await res.json();
        if (data.theme?.id) {
          setActiveThemeId(data.theme.id);
          // Apply theme to document element immediately
          document.documentElement.setAttribute("data-theme", data.theme.id);
        }
      } catch (err) {
        console.error("Failed to load active theme:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTheme();
  }, []);

  // Update theme handler
  const handleSelectTheme = async (themeId: string) => {
    if (themeId === activeThemeId) return;

    setUpdatingId(themeId);
    setMessage(null);

    try {
      const res = await fetch("/api/settings/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ themeId }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActiveThemeId(themeId);
        // Instant visual update for the admin layout itself!
        document.documentElement.setAttribute("data-theme", themeId);
        setMessage({
          text: `System theme successfully updated to "${data.theme.name}"!`,
          type: "success",
        });
      } else {
        setMessage({
          text: data.error || "Failed to update theme.",
          type: "error",
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "A network error occurred.";
      setMessage({
        text: errorMessage,
        type: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title block */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Theme Settings</h1>
        <p className="text-white/50 text-sm">
          Select and customize the global branding, layout colors, interactive floating particles, and video backgrounds for the public gateway.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Notification message */}
          {message && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                message.type === "success"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              <div className="flex-1 text-sm font-medium">{message.text}</div>
            </div>
          )}

          {/* Theme Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {themeCards.map((theme) => {
              const isActive = theme.id === activeThemeId;
              const isUpdating = theme.id === updatingId;

              return (
                <div
                  key={theme.id}
                  onClick={() => !isUpdating && handleSelectTheme(theme.id)}
                  className={`relative flex flex-col justify-between rounded-2xl border bg-black/60 p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                    isActive
                      ? `border-primary shadow-[0_0_20px_rgba(255,210,63,0.1)] ring-1 ring-primary`
                      : "border-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Selected Indicator */}
                  {isActive && (
                    <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black">
                      <Check className="h-4 w-4 stroke-[3px]" />
                    </span>
                  )}

                  <div className="space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{theme.name}</h3>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-primary/70">
                        {theme.id === "zenitsu" ? "Electric Gold" : theme.id === "gojo" ? "Limitless Blue" : "Shadow Purple"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-white/50 leading-relaxed">{theme.desc}</p>

                    {/* Color pills / accents */}
                    <div className="flex items-center gap-4 py-2 border-y border-white/5 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${theme.colorClass} ${theme.glowClass}`} />
                        <span className="text-white/60">Primary</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor: theme.accentColor,
                            boxShadow: `0 0 10px ${theme.accentColor}50`,
                          }}
                        />
                        <span className="text-white/60">Accent</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions button */}
                  <button
                    disabled={isActive || isUpdating}
                    className={`w-full mt-6 py-2 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20 cursor-default"
                        : isUpdating
                        ? "bg-white/5 text-white/50 border border-white/5 cursor-wait"
                        : "bg-white text-black hover:bg-white/90"
                    }`}
                  >
                    {isUpdating ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin mx-auto" />
                    ) : isActive ? (
                      "Active Theme"
                    ) : (
                      "Apply Theme"
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sync advisory */}
          <div className="p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] flex gap-3 text-xs text-yellow-500/70">
            <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500" />
            <div>
              <p className="font-semibold mb-1">Database & Config Synchronization</p>
              <p className="leading-relaxed">
                Applying a new theme will immediately update the live configuration cache. If Supabase keys are configured in your environment, this setting is stored in the database and synchronized across all user sessions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
