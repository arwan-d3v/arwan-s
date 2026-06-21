/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState } from "react";
import { Image, Video, Download, DollarSign, UploadCloud, RefreshCw, Settings } from "lucide-react";

export default function UtilityConverterPage() {
  const [activeTab, setActiveTab] = useState<"image" | "video" | "social" | "currency">("image");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!selectedFile && activeTab === "image") {
      setResult("Please select a file first.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      if (activeTab === "image") {
        const formData = new FormData();
        formData.append("file", selectedFile as Blob);

        const res = await fetch("/api/utility/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          setResult(`Upload successful! File available at: ${data.url}`);
        } else {
          setResult(`Error: ${data.error}`);
        }
      } else {
        // Mock other tabs for now
        setTimeout(() => {
          setIsProcessing(false);
          setResult(`Conversion completed for ${activeTab}! (Mock result)`);
        }, 1500);
        return; // Don't flip isProcessing twice
      }
    } catch (error) {
      console.error(error);
      setResult("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-display text-2xl font-bold">Utility Converter</h1>
        <p className="text-sm text-muted-foreground">Your daily toolkit for quick conversions and downloads.</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
         {[
           { id: "image", name: "Image Tools", icon: Image },
           { id: "video", name: "Video Tools", icon: Video },
           { id: "social", name: "Social Downloader", icon: Download },
           { id: "currency", name: "Currency Rates", icon: DollarSign }
         ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as "image" | "video" | "social" | "currency"); setResult(null); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-black shadow-[0_0_15px_rgba(255,215,0,0.2)]' : 'bg-black/20 border border-[var(--card-border)] text-muted-foreground hover:bg-white/5'}`}
            >
              <tab.icon className="h-4 w-4" /> {tab.name}
            </button>
         ))}
      </div>

      {/* Main Content Area */}
      <div className="glass-strong rounded-2xl p-6 md:p-8 min-h-[400px]">
        {activeTab === "image" && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium flex items-center gap-2"><Image className="text-primary h-5 w-5" aria-hidden="true" /> Image Uploader to R2</h2>
            <label className="block border-2 border-dashed border-[var(--card-border)] rounded-2xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer">
               <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
               <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
               <p className="font-medium">{selectedFile ? selectedFile.name : "Click to select image"}</p>
               <p className="text-sm text-muted-foreground mt-1">Supports PNG, JPG, WebP (Max 5MB)</p>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Action</label>
                <select className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none">
                  <option>Upload to Cloudflare R2</option>
                </select>
              </div>
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className="w-full py-3 bg-primary text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors glow-gold">
              {isProcessing ? <RefreshCw className="animate-spin h-5 w-5" /> : <Settings className="h-5 w-5" />}
              {isProcessing ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        )}

        {activeTab === "video" && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium flex items-center gap-2"><Video className="text-primary h-5 w-5" /> Video Compressor</h2>
            <div className="border-2 border-dashed border-[var(--card-border)] rounded-2xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer">
               <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
               <p className="font-medium">Upload Video File</p>
               <p className="text-sm text-muted-foreground mt-1">MP4, WebM (Max 50MB)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compression Level</label>
              <select className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none">
                <option>Balanced (Good quality, smaller size)</option>
                <option>High (Max compression, lower quality)</option>
                <option>Low (Preserve quality)</option>
              </select>
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className="w-full py-3 bg-primary/20 text-primary rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/30 transition-colors">
              {isProcessing ? <RefreshCw className="animate-spin h-5 w-5" /> : <Settings className="h-5 w-5" />}
              {isProcessing ? "Compressing..." : "Compress Video"}
            </button>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium flex items-center gap-2"><Download className="text-primary h-5 w-5" /> Social Media Downloader</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Paste Video/Post URL</label>
              <div className="flex gap-2">
                <input placeholder="https://tiktok.com/... or https://instagram.com/..." className="flex-1 rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none" />
                <button onClick={handleProcess} disabled={isProcessing} className="px-6 bg-primary/20 text-primary rounded-xl font-medium hover:bg-primary/30 transition-colors">
                   {isProcessing ? "Fetching..." : "Fetch"}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Supports TikTok (no watermark), Instagram Reels, and YouTube Shorts.</p>
            </div>
          </div>
        )}

        {activeTab === "currency" && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium flex items-center gap-2"><DollarSign className="text-primary h-5 w-5" /> Currency Converter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
               <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <input type="number" defaultValue={100} className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <select className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>IDR - Indonesian Rupiah</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <select className="w-full rounded-xl border border-[var(--card-border)] bg-muted py-3 px-4 text-sm outline-none">
                    <option>IDR - Indonesian Rupiah</option>
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                  </select>
               </div>
            </div>
            <button onClick={handleProcess} disabled={isProcessing} className="w-full py-3 bg-primary/20 text-primary rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/30 transition-colors">
              {isProcessing ? <RefreshCw className="animate-spin h-5 w-5" /> : "Convert"}
            </button>

            {result && (
               <div className="p-6 bg-muted/50 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground mb-1">100 USD =</p>
                  <p className="text-4xl font-mono font-bold text-primary">1,624,500.00 IDR</p>
                  <p className="text-xs text-muted-foreground mt-2">Live rates updated 5 mins ago (Mock)</p>
               </div>
            )}
          </div>
        )}

        {result && activeTab !== "currency" && (
          <div className="mt-6 p-4 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 text-sm flex items-center justify-between">
            <span className="break-all mr-4">{result}</span>
            {result.includes("http") ? (
              <a href={result.split("at: ")[1]} target="_blank" rel="noreferrer" className="shrink-0 px-3 py-1 bg-green-500/20 rounded-lg font-medium hover:bg-green-500/30">
                View/Download
              </a>
            ) : (
              <button className="shrink-0 px-3 py-1 bg-green-500/20 rounded-lg font-medium hover:bg-green-500/30">Download</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
