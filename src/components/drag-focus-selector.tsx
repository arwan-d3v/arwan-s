import { useState, useRef, MouseEvent } from "react";
import { Crosshair } from "lucide-react";

interface Props {
  x: number;
  y: number;
  onChange: (x: number, y: number) => void;
  videoSrc?: string;
}

export function DragFocusSelector({ x, y, onChange, videoSrc }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerUpdate = (e: React.MouseEvent | React.TouchEvent | MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    let newX = ((clientX - rect.left) / rect.width) * 100;
    let newY = ((clientY - rect.top) / rect.height) * 100;

    // Clamp values between 0 and 100
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));

    onChange(Math.round(newX), Math.round(newY));
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative w-full aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10 cursor-crosshair group touch-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          handlePointerUpdate(e);
        }}
        onMouseMove={(e) => {
          if (isDragging) handlePointerUpdate(e);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => {
          setIsDragging(true);
          handlePointerUpdate(e);
        }}
        onTouchMove={(e) => {
          if (isDragging) handlePointerUpdate(e);
        }}
        onTouchEnd={() => setIsDragging(false)}
      >
        {videoSrc ? (
          <video 
            src={videoSrc} 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            muted loop autoPlay playsInline
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs">No Video Selected</div>
        )}

        {/* Grid lines for reference */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white" />
          ))}
        </div>

        {/* The Draggable Target */}
        <div 
          className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(255,210,63,0.8)] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none transition-transform duration-75"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <Crosshair className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-white/50 font-mono bg-black/30 p-2 rounded-lg border border-white/5">
        <span>X: {x}%</span>
        <span>Y: {y}%</span>
      </div>
    </div>
  );
}
