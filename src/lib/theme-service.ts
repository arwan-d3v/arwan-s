import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { themes, ThemeConfig } from "./themes";

const CONFIG_FILE_PATH = path.join(process.cwd(), "src/lib/theme-config.json");

export async function getActiveTheme(): Promise<ThemeConfig> {
  let themeId = "zenitsu"; // default

  // 1. Try Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      
      if (supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "active_theme")
          .single();
          
        if (error) {
          console.warn("Supabase query error reading active_theme:", error.message);
        }
          
        if (data?.value && themes[data.value]) {
          themeId = data.value;
          
          // Sync to local file cache
          try {
            const dir = path.dirname(CONFIG_FILE_PATH);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify({ activeTheme: themeId }, null, 2), "utf8");
          } catch {
            // Ignore write caching errors
          }
          
          return themes[themeId];
        }
      }
    } catch (err) {
      console.warn("Supabase settings read failed, falling back to local file:", err);
    }
  }

  // 2. Try Local File fallback
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, "utf8");
      const parsed = JSON.parse(fileData);
      if (parsed.activeTheme && themes[parsed.activeTheme]) {
        themeId = parsed.activeTheme;
      }
    }
  } catch (err) {
    console.error("Failed to read local theme config:", err);
  }

  return themes[themeId] || themes.zenitsu;
}

export async function setActiveTheme(themeId: string): Promise<boolean> {
  if (!themes[themeId]) return false;

  // 1. Save to Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      
      if (supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase
          .from("site_settings")
          .upsert({ key: "active_theme", value: themeId, updated_at: new Date().toISOString() }, { onConflict: "key" });
          
        if (error) {
          console.error("Failed to upsert theme in Supabase:", error.message);
        }
      }
    } catch (err) {
      console.error("Failed to save theme to Supabase:", err);
    }
  }

  // 2. Save to Local File
  try {
    const dir = path.dirname(CONFIG_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify({ activeTheme: themeId }, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to write local theme config:", err);
    return false;
  }
}
