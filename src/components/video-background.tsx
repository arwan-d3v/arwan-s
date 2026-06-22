"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  className?: string;
  src?: string;
  srcPortrait?: string;
  focalPoint?: string;
}

export function VideoBackground({ 
  className = "z-0", 
  src = "/zenitsu-bg.mp4",
  srcPortrait,
  focalPoint = "50% 50%"
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  // Detect orientation for hybrid video support
  useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait)");
    setIsPortrait(mql.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsPortrait(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const activeSrc = (isPortrait && srcPortrait) ? srcPortrait : src;

  // Force mute and play programmatically whenever src changes to bypass React hydration autoplay issues
  useEffect(() => {
    const video = videoRef.current;
    if (video && activeSrc) {
      video.muted = true;
      video.defaultMuted = true;
      video.load(); // Force browser to load the new video source
      
      // Attempt to play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay prevented, trying to play on user interaction or loading delayed:", err);
        });
      }
    }
  }, [activeSrc]);

  if (hasVideoError || !activeSrc) {
    return null;
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none bg-background ${className}`}>
      {/* Semi-transparent dark overlay to keep layout text readable */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10" />

      <video
        ref={videoRef}
        src={activeSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{ objectPosition: focalPoint }}
        onError={() => {
          console.error(`Failed to load background video ${activeSrc}`);
          setHasVideoError(true);
        }}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 transition-opacity duration-1000"
      />
    </div>
  );
}
