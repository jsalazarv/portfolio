import { useState } from "react";

import type { IconSvgElement } from "@hugeicons/react";

import { cn } from "@/common/lib/utils";

interface DockItemProps {
  ref?: React.Ref<HTMLButtonElement>;
  icon: IconSvgElement;
  label: string;
  isActive: boolean;
  compact?: boolean;
  tabIndex?: number;
  onClick: () => void;
  avatarSrc?: string;
  avatarFallback?: string;
}

const CLIP_RECT =
  "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)";
const CLIP_BEVEL =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

export function DockItem({
  ref,
  label,
  isActive,
  compact = false,
  tabIndex = 0,
  onClick,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isHighlighted = isActive || isHovered || isFocused;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Bevel activo — relleno sólido naranja */}
      {isActive && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: CLIP_BEVEL, background: "var(--primary)" }}
        />
      )}

      {/* Bevel hover — borde con interior transparente */}
      {!isActive && (
        <span
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-200",
            isHighlighted ? "opacity-100" : "opacity-0",
          )}
        >
          <span
            className="absolute inset-0 transition-all duration-300"
            style={{
              clipPath: isHighlighted ? CLIP_BEVEL : CLIP_RECT,
              background:
                "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
            }}
          />
          <span
            className="absolute inset-[1px] bg-background transition-all duration-300"
            style={{
              clipPath: isHighlighted ? CLIP_BEVEL_INNER : CLIP_RECT,
            }}
          />
        </span>
      )}

      <button
        ref={ref}
        data-dock-button
        onClick={onClick}
        aria-label={label}
        tabIndex={tabIndex}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative z-10 font-mono tracking-widest uppercase cursor-pointer transition-colors duration-200 focus-visible:outline-none",
          compact ? "text-[10px] px-3 py-1.5" : "text-xs px-5 py-2",
          isActive
            ? "text-primary-foreground"
            : isHighlighted
              ? "text-foreground"
              : "text-muted-foreground",
        )}
      >
        {label}
      </button>
    </div>
  );
}
