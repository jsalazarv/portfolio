import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";

import { useTheme } from "@/common/hooks/useTheme";
import { cn } from "@/common/lib/utils";

type Theme = "light" | "dark";

const CYCLE: Theme[] = ["light", "dark"];

const THEME_META: Record<Theme, { label: string; icon: typeof Sun01Icon }> = {
  light: { label: "Light", icon: Sun01Icon },
  dark: { label: "Dark", icon: Moon01Icon },
};

const CLIP_RECT =
  "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)";
const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

interface DockThemeItemProps {
  compact?: boolean;
}

export function DockThemeItem({ compact = false }: DockThemeItemProps) {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isHighlighted = isHovered || isFocused;

  const currentIndex = CYCLE.indexOf(theme as Theme);
  const next = CYCLE[(currentIndex + 1) % CYCLE.length];
  const current = THEME_META[theme as Theme] ?? THEME_META.light;
  const nextMeta = THEME_META[next];

  const toggle = () => setTheme(next);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <span
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-200",
          isHighlighted ? "opacity-100" : "opacity-0",
        )}
      >
        <span
          className="absolute inset-0 transition-all duration-300"
          style={{
            clipPath: isHighlighted ? CLIP_BEVEL_OUTER : CLIP_RECT,
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

      <button
        data-dock-button
        aria-label={`Switch to ${nextMeta.label}`}
        onClick={toggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative z-10 font-mono tracking-widest uppercase cursor-pointer transition-colors duration-200 focus-visible:outline-none",
          compact ? "text-[10px] px-3 py-1.5" : "text-xs px-5 py-2",
          isHighlighted ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <span className="relative inline-flex justify-center">
          {/* Spacer invisible que reserva el ancho del label más largo */}
          <span className="invisible select-none" aria-hidden>
            {current.label.length >= nextMeta.label.length ? current.label : nextMeta.label}
          </span>
          <span className={cn("absolute inset-0 flex justify-center transition-opacity duration-200", isHovered ? "opacity-0" : "opacity-100")}>{current.label}</span>
          <span className={cn("absolute inset-0 flex justify-center transition-opacity duration-200", isHovered ? "opacity-100" : "opacity-0")}>{nextMeta.label}</span>
        </span>
      </button>
    </div>
  );
}
