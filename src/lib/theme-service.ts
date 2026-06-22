import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { themes, ThemeConfig } from "./themes";
import { cookies } from "next/headers";

const CONFIG_FILE_PATH = path.join(process.cwd(), "src/lib/theme-config.json");

export async function getActiveTheme(): Promise<ThemeConfig> {
  let themeId = "zenitsu"; // default

  // 0. Try Client Cookie Override (for public preview)
  try {
    const cookieStore = cookies();
    const previewCookie = cookieStore.get("client_theme_preview")?.value;
    if (previewCookie) {
      themeId = previewCookie;
      // We will try to fetch this preview theme from Supabase below, 
      // but if we are offline, it will fallback to hardcoded `themes`.
    }
  } catch (err) {
    // Ignore error if called outside request context (e.g. during build)
  }

  // 1. Try Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      
      if (supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        let targetThemeId = themeId;

        // If no preview cookie, read active theme from admin_config
        if (targetThemeId === "zenitsu") {
          const { data: settingData, error: settingError } = await supabase
            .from("admin_config")
            .select("value")
            .eq("key", "active_theme_id")
            .single();
            
          if (settingError) {
            console.warn("Supabase query error reading active_theme_id:", settingError.message);
          } else if (settingData?.value) {
            targetThemeId = settingData.value;
          }
        }

        // Fetch FULL theme from theme_configs
        const { data: configData, error: configError } = await supabase
          .from("theme_configs")
          .select("*")
          .eq("id", targetThemeId)
          .single();

        if (configData) {
          const dynamicTheme: ThemeConfig = {
            id: configData.id,
            name: configData.name,
            videoPath: configData.video_background || "/zenitsu-bg.mp4",
            videoPortraitPath: configData.video_portrait || undefined,
            focalPoint: configData.focal_point || "50% 50%",
            editionLabel: configData.edition_label || "Standard Edition",
            accentName: configData.accent_name || "Standard",
            palette: typeof configData.palette === "string" ? JSON.parse(configData.palette) : configData.palette
          };

          // Cache FULL theme to local JSON (only if it's the global active one, not a preview)
          if (targetThemeId === (await getGlobalActiveThemeId(supabase))) {
            try {
              const dir = path.dirname(CONFIG_FILE_PATH);
              if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
              fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify({ activeTheme: dynamicTheme }, null, 2), "utf8");
            } catch {
              // Ignore write errors
            }
          }

          return dynamicTheme;
        }
      }
    } catch (err) {
      console.warn("Supabase settings read failed, falling back to local file:", err);
    }
  }

  // 2. Try Local File fallback (which now stores full object)
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, "utf8");
      const parsed = JSON.parse(fileData);
      
      // If we are in preview mode, we just try to get it from hardcoded themes
      if (themeId !== "zenitsu" && themes[themeId]) {
        return themes[themeId];
      }

      if (parsed.activeTheme && typeof parsed.activeTheme === "object") {
        return parsed.activeTheme as ThemeConfig;
      }
    }
  } catch (err) {
    console.error("Failed to read local theme config:", err);
  }

  // 3. Ultimate Fallback (Hardcoded)
  return themes[themeId] || themes.zenitsu;
}

// Helper to check what the actual global theme is (bypassing preview)
async function getGlobalActiveThemeId(supabase: any) {
  const { data } = await supabase.from("admin_config").select("value").eq("key", "active_theme_id").single();
  return data?.value || "zenitsu";
}

export async function setActiveTheme(themeId: string): Promise<boolean> {
  // 1. Save to Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      
      if (supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase
          .from("admin_config")
          .upsert({ key: "active_theme_id", value: themeId, updated_at: new Date().toISOString() }, { onConflict: "key" });
          
        if (error) {
          console.error("Failed to upsert theme in Supabase:", error.message);
          return false;
        }

        // We should also update local cache by fetching the full theme
        const { data: configData } = await supabase.from("theme_configs").select("*").eq("id", themeId).single();
        if (configData) {
          const dynamicTheme: ThemeConfig = {
            id: configData.id,
            name: configData.name,
            videoPath: configData.video_background || "/zenitsu-bg.mp4",
            videoPortraitPath: configData.video_portrait || undefined,
            focalPoint: configData.focal_point || "50% 50%",
            editionLabel: configData.edition_label || "Standard Edition",
            accentName: configData.accent_name || "Standard",
            palette: typeof configData.palette === "string" ? JSON.parse(configData.palette) : configData.palette
          };
          const dir = path.dirname(CONFIG_FILE_PATH);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify({ activeTheme: dynamicTheme }, null, 2), "utf8");
        }

        return true;
      }
    } catch (err) {
      console.error("Failed to save theme to Supabase:", err);
    }
  }

  return false;
}
