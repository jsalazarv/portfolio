import { useState } from "react";

import { useClickSound } from "@/common/hooks/useClickSound";
import { useSoundEnabled } from "@/common/hooks/useSoundEnabled";
import { cn } from "@/common/lib/utils";

const CLIP_RECT =
  "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)";
const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

const LABELS = { on: "Sound", off: "Muted" };

interface DockSoundItemProps {
  compact?: boolean;
  stretch?: boolean;
}

export function DockSoundItem({
  compact = false,
  stretch = false,
}: DockSoundItemProps) {
  const { soundEnabled, setSoundEnabled } = useSoundEnabled();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isHighlighted = isHovered || isFocused;

  const current = soundEnabled ? LABELS.on : LABELS.off;
  const next = soundEnabled ? LABELS.off : LABELS.on;
  const { play } = useClickSound("/sounds/toggle-interface.mp3", true);

  const toggle = () => { play(); setSoundEnabled(!soundEnabled); };

  return (
    <div
      className={cn("relative", stretch && "w-full sm:w-auto")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-200",
          stretch || isHighlighted ? "opacity-100" : "opacity-0",
        )}
      >
        <span
          className="absolute inset-0 transition-all duration-300"
          style={{
            clipPath: stretch || isHighlighted ? CLIP_BEVEL_OUTER : CLIP_RECT,
            background:
              "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
          }}
        />
        <span
          className="absolute inset-[1px] bg-background transition-all duration-300"
          style={{
            clipPath: stretch || isHighlighted ? CLIP_BEVEL_INNER : CLIP_RECT,
          }}
        />
      </span>

      <button
        data-dock-button
        aria-label={`Switch to ${next}`}
        onClick={toggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative z-10 font-mono tracking-widest uppercase cursor-pointer transition-colors duration-200 focus-visible:outline-none",
          stretch && "w-full sm:w-auto justify-center sm:justify-start",
          compact ? "text-[10px] px-3 py-1.5" : "text-xs px-5 py-2",
          isHighlighted ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <span className="relative inline-flex justify-center">
          <span className="invisible select-none" aria-hidden>
            {current.length >= next.length ? current : next}
          </span>
          <span
            className={cn(
              "absolute inset-0 flex justify-center transition-opacity duration-200",
              isHovered ? "opacity-0" : "opacity-100",
            )}
          >
            {current}
          </span>
          <span
            className={cn(
              "absolute inset-0 flex justify-center transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            {next}
          </span>
        </span>
      </button>
    </div>
  );
}
