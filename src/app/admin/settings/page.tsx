"use client";

import { useEffect, useState, useRef } from "react";
import { Check, RefreshCw, Plus, Edit2, Trash2, X, SlidersHorizontal, UploadCloud, Smartphone, Monitor } from "lucide-react";
import { ThemeConfig } from "@/lib/themes";
import { createBrowserClient } from "@supabase/ssr";
import { DragFocusSelector } from "@/components/drag-focus-selector";

export default function AdminSettingsPage() {
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ThemeConfig>>({});
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(50);
  
  // Upload State
  const [uploadingLandscape, setUploadingLandscape] = useState(false);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);

  // Preview State
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const fetchThemes = async () => {
    setLoading(true);
    try {
      const [resActive, resAll] = await Promise.all([
        fetch("/api/settings/theme"),
        fetch("/api/admin/themes")
      ]);
      const dataActive = await resActive.json();
      const dataAll = await resAll.json();

      if (dataActive.theme?.id) {
        setActiveThemeId(dataActive.theme.id);
        document.documentElement.setAttribute("data-theme", dataActive.theme.id);
      }
      
      if (dataAll.themes) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedThemes: ThemeConfig[] = dataAll.themes.map((t: any) => ({
          id: t.id,
          name: t.name,
          videoPath: t.video_background,
          videoPortraitPath: t.video_portrait,
          focalPoint: t.focal_point,
          editionLabel: t.edition_label,
          accentName: t.accent_name,
          palette: typeof t.palette === "string" ? JSON.parse(t.palette) : t.palette
        }));
        setThemes(mappedThemes);
      }
    } catch (err) {
      console.error("Failed to load themes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  const handleSelectTheme = async (themeId: string) => {
    if (themeId === activeThemeId) return;
    setUpdatingId(themeId);
    setMessage(null);

    try {
      const res = await fetch("/api/settings/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setActiveThemeId(themeId);
        document.documentElement.setAttribute("data-theme", themeId);
        setMessage({ text: `System theme successfully updated!`, type: "success" });
      } else {
        setMessage({ text: data.error || "Failed to update theme.", type: "error" });
      }
    } catch {
      setMessage({ text: "A network error occurred.", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  const openForm = (theme?: ThemeConfig) => {
    if (theme) {
      setEditForm(theme);
      if (theme.focalPoint && theme.focalPoint.includes("%")) {
        const parts = theme.focalPoint.split(" ");
        setFocalX(parseInt(parts[0]) || 50);
        setFocalY(parseInt(parts[1]) || 50);
      } else {
        setFocalX(50); setFocalY(50);
      }
    } else {
      setEditForm({
        id: "", name: "", videoPath: "", editionLabel: "", accentName: "",
        palette: { primary: "#ffffff", secondary: "#000000", background: "#000000", text: "#ffffff", accent: "#ff0000" }
      });
      setFocalX(50); setFocalY(50);
    }
    setIsEditing(true);
  };

  const saveForm = async () => {
    try {
      setUpdatingId("form");
      const payload = {
        ...editForm,
        focalPoint: `${focalX}% ${focalY}%`
      };

      const res = await fetch("/api/admin/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage({ text: "Theme saved successfully!", type: "success" });
        setIsEditing(false);
        fetchThemes();
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to save theme.", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error saving theme.", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteTheme = async (id: string) => {
    if (!confirm("Are you sure you want to delete this theme?")) return;
    try {
      const res = await fetch(`/api/admin/themes?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ text: "Theme deleted successfully!", type: "success" });
        fetchThemes();
      }
    } catch {
      setMessage({ text: "Network error deleting theme.", type: "error" });
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "landscape" | "portrait") => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    if (type === "landscape") setUploadingLandscape(true);
    else setUploadingPortrait(true);

    try {
      // Use SSR client since we might need auth cookies passed correctly
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const fileExt = file.name.split('.').pop();
      const fileName = `bg_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("theme-assets").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("theme-assets").getPublicUrl(filePath);
      
      if (type === "landscape") {
        setEditForm(prev => ({ ...prev, videoPath: data.publicUrl }));
      } else {
        setEditForm(prev => ({ ...prev, videoPortraitPath: data.publicUrl }));
      }
      
      setMessage({ text: "Video uploaded successfully!", type: "success" });
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setMessage({ text: `Upload failed: ${errorMessage}`, type: "error" });
    } finally {
      if (type === "landscape") setUploadingLandscape(false);
      else setUploadingPortrait(false);
    }
  };

  // Construct Preview URL dynamically when form changes
  const getPreviewUrl = () => {
    const previewData = { ...editForm, focalPoint: `${focalX}% ${focalY}%` };
    return `/?preview_theme_data=${encodeURIComponent(JSON.stringify(previewData))}`;
  };

  if (isEditing) {
    return (
      <div className="w-full flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-6rem)] gap-6">
        {/* Left Column: Form Editor */}
        <div className="w-full lg:w-1/2 flex flex-col bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 shrink-0">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="text-primary w-5 h-5" /> 
              {editForm.id ? "Edit Theme Builder" : "Create Theme Builder"}
            </h2>
            <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white p-2">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-8 flex-1">
            <div className="lg:hidden bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-4 rounded-xl text-sm font-medium flex gap-2 items-start">
              <Monitor className="w-5 h-5 shrink-0" />
              <p><strong>Saran Tampilan:</strong> Fitur Live Preview dan Editor ini sangat kompleks. Untuk pengalaman terbaik, disarankan menggunakan layar Desktop atau putar HP Anda ke mode Landscape.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-white/70 uppercase">Theme ID</label>
                <input 
                  value={editForm.id} 
                  disabled={!!editForm.id && editForm.id !== ""}
                  onChange={e => setEditForm({...editForm, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none disabled:opacity-50 text-sm" 
                  placeholder="e.g. naruto"
                />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-white/70 uppercase">Theme Name</label>
                <input 
                  value={editForm.name} 
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm" 
                  placeholder="e.g. Naruto Uzumaki"
                />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-white/70 uppercase">Edition Label</label>
                <input 
                  value={editForm.editionLabel} 
                  onChange={e => setEditForm({...editForm, editionLabel: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm" 
                  placeholder="e.g. Nine Tails Edition"
                />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-white/70 uppercase">Accent Name</label>
                <input 
                  value={editForm.accentName} 
                  onChange={e => setEditForm({...editForm, accentName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm" 
                  placeholder="e.g. Orange Chakra"
                />
              </div>
            </div>

            {/* Videos */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Video Assets</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-white/70">LANDSCAPE VIDEO (16:9)</label>
                  <div className="flex gap-2">
                    <input 
                      value={editForm.videoPath || ""} 
                      onChange={e => setEditForm({...editForm, videoPath: e.target.value})}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm" 
                      placeholder="URL or Path"
                    />
                    <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                      {uploadingLandscape ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                      Upload
                      <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={e => handleVideoUpload(e, "landscape")} disabled={uploadingLandscape} />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-white/70">PORTRAIT VIDEO (9:16) — OPTIONAL</label>
                  <div className="flex gap-2">
                    <input 
                      value={editForm.videoPortraitPath || ""} 
                      onChange={e => setEditForm({...editForm, videoPortraitPath: e.target.value})}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none text-sm" 
                      placeholder="URL or Path (leave blank to crop landscape)"
                    />
                    <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                      {uploadingPortrait ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                      Upload
                      <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={e => handleVideoUpload(e, "portrait")} disabled={uploadingPortrait} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Drag Focus */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">Drag to Focus Crop</h3>
              <p className="text-xs text-white/50 mb-4">Click and drag the ring to set the center point for mobile cropping.</p>
              
              <DragFocusSelector 
                x={focalX} y={focalY} 
                onChange={(newX, newY) => { setFocalX(newX); setFocalY(newY); }} 
                videoSrc={editForm.videoPath}
              />
            </div>
          </div>
          
          <div className="p-6 border-t border-white/10 bg-black/50 shrink-0">
            <button
              onClick={saveForm}
              disabled={updatingId === "form"}
              className="w-full bg-primary text-black font-bold py-3.5 rounded-xl hover:bg-primary-strong transition-colors"
            >
              {updatingId === "form" ? "Saving..." : "Save Theme Configuration"}
            </button>
          </div>
        </div>

        {/* Right Column: Live Preview iframe */}
        <div className="w-full lg:w-1/2 flex flex-col bg-black border border-white/10 rounded-2xl overflow-hidden relative min-h-[50vh] lg:min-h-0">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-1 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
            <button 
              onClick={() => setPreviewMode("desktop")}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors ${previewMode === "desktop" ? "bg-white/20 text-white" : "text-white/50 hover:text-white"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPreviewMode("mobile")}
              className={`p-2 rounded-lg flex items-center justify-center transition-colors ${previewMode === "mobile" ? "bg-white/20 text-white" : "text-white/50 hover:text-white"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 w-full h-full flex items-center justify-center bg-black/50">
             <iframe 
                ref={iframeRef}
                src={getPreviewUrl()} 
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border border-white/10 shadow-2xl bg-black ${
                  previewMode === "desktop" 
                    ? "w-full h-full rounded-none" 
                    : "w-[375px] h-[812px] rounded-[3rem]"
                }`}
                style={{
                  transform: previewMode === "mobile" ? "scale(0.85)" : "scale(1)",
                  transformOrigin: "center center"
                }}
             />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Theme Manager</h1>
          <p className="text-white/50 text-sm">Create, edit, and apply fully dynamic UI themes and video backgrounds.</p>
        </div>
        <button 
          onClick={() => openForm()}
          className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-4 py-2 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Theme
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="h-8 w-8 text-primary animate-spin" /></div>
      ) : (
        <div className="space-y-6">
          {message && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 ${message.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
              <div className="flex-1 text-sm font-medium">{message.text}</div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => {
              const isActive = theme.id === activeThemeId;
              const isUpdating = theme.id === updatingId;

              return (
                <div key={theme.id} className={`relative flex flex-col justify-between rounded-2xl border bg-black/60 p-6 transition-all duration-300 ${isActive ? 'border-primary shadow-[0_0_20px_rgba(255,210,63,0.1)] ring-1 ring-primary' : 'border-white/5 hover:border-white/20'}`}>
                  {isActive && <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black"><Check className="h-4 w-4 stroke-[3px]" /></span>}
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">{theme.name}</h3>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-primary/70">{theme.editionLabel}</span>
                    </div>
                    
                    <div className="text-xs text-white/50 space-y-1">
                      <p className="truncate">L: {theme.videoPath?.split('/').pop()}</p>
                      {theme.videoPortraitPath && <p className="truncate text-primary/70">P: {theme.videoPortraitPath.split('/').pop()}</p>}
                      <p>Focal Point: <span className="font-mono bg-white/10 px-1 rounded">{theme.focalPoint || '50% 50%'}</span></p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => !isUpdating && handleSelectTheme(theme.id)}
                      disabled={isActive || isUpdating}
                      className={`w-full py-2 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all ${isActive ? "bg-primary/10 text-primary border border-primary/20 cursor-default" : isUpdating ? "bg-white/5 text-white/50 border border-white/5 cursor-wait" : "bg-white text-black hover:bg-white/90"}`}
                    >
                      {isUpdating ? <RefreshCw className="h-3.5 w-3.5 animate-spin mx-auto" /> : isActive ? "Active Global Theme" : "Set Active"}
                    </button>
                    
                    <div className="flex gap-2">
                      <button onClick={() => openForm(theme)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 text-xs transition-colors"><Edit2 className="w-3 h-3" /> Edit</button>
                      
                      {!["zenitsu", "gojo", "igris"].includes(theme.id) && (
                        <button onClick={() => deleteTheme(theme.id)} disabled={isActive} className="flex items-center justify-center gap-1 px-3 rounded-xl border border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs transition-colors disabled:opacity-30 disabled:hover:bg-transparent" title={isActive ? "Cannot delete active theme" : "Delete custom theme"}>
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
