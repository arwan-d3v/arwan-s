"use client";

import { useEffect, useRef, useState } from "react";

export function VideoBackground({ className = "z-0" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Force mute and play programmatically to bypass React hydration autoplay issues
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      
      // Attempt to play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay prevented, trying to play on user interaction or loading delayed:", err);
        });
      }
    }
  }, []);

  if (hasVideoError) {
    return null;
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none bg-background ${className}`}>
      {/* Semi-transparent dark overlay to keep layout text readable */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10" />

      <video
        ref={videoRef}
        src="/zenitsu-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        onError={() => {
          console.error("Failed to load background video /zenitsu-bg.mp4");
          setHasVideoError(true);
        }}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 transition-opacity duration-1000"
      />
    </div>
  );
}
