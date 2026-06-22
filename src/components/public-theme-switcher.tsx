"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Palette, X } from "lucide-react";

export function PublicThemeSwitcher() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [currentPreview, setCurrentPreview] = useState<string>("default");

  useEffect(() => {
    // Read current cookie if any
    const cookies = document.cookie.split("; ");
    const themeCookie = cookies.find((row) => row.startsWith("client_theme_preview="));
    if (themeCookie) {
      setCurrentPreview(themeCookie.split("=")[1]);
    }
  }, []);

  const changeTheme = (themeId: string) => {
    if (themeId === "default") {
      // Remove cookie
      document.cookie = "client_theme_preview=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } else {
      // Set cookie for 1 hour
      const d = new Date();
      d.setTime(d.getTime() + 1 * 60 * 60 * 1000);
      document.cookie = `client_theme_preview=${themeId}; path=/; expires=${d.toUTCString()}`;
    }
    setCurrentPreview(themeId);
    router.refresh();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-sm text-primary flex items-center justify-between z-50 relative backdrop-blur-sm">
      <div className="flex items-center gap-2 max-w-6xl mx-auto w-full justify-center">
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">Curious? Preview our dynamic themes:</span>
        <span className="sm:hidden">Theme Preview:</span>
        <select
          value={currentPreview}
          onChange={(e) => changeTheme(e.target.value)}
          className="ml-2 bg-background/50 border border-primary/30 rounded px-2 py-0.5 text-primary text-xs focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="default">🌐 Default (Global)</option>
          <option value="zenitsu">⚡ Zenitsu (Yellow)</option>
          <option value="gojo">♾️ Gojo (Blue)</option>
          <option value="igris">🗡️ Igris (Purple)</option>
        </select>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto text-primary/70 hover:text-primary transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
