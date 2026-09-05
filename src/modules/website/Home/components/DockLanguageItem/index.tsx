import { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/common/lib/utils";

const NEXT_LANG: Record<string, { code: string; label: string }> = {
  es: { code: "en", label: "EN" },
  en: { code: "es", label: "ES" },
};

const CLIP_RECT =
  "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%)";
const CLIP_BEVEL_OUTER =
  "polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)";
const CLIP_BEVEL_INNER =
  "polygon(7px 0%, 100% 0%, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0% 100%, 0% 7px)";

interface DockLanguageItemProps {
  compact?: boolean;
}

export function DockLanguageItem({ compact = false }: DockLanguageItemProps) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "es").slice(0, 2);
  const next = NEXT_LANG[current] ?? NEXT_LANG["es"];
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isHighlighted = isHovered || isFocused;

  const toggle = () => {
    i18n.changeLanguage(next.code);
    localStorage.setItem("lang", next.code);
  };

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
        aria-label={`Switch to ${next.label}`}
        onClick={toggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "relative z-10 font-mono tracking-widest uppercase cursor-pointer transition-colors duration-200 focus-visible:outline-none",
          compact ? "text-[10px] px-3 py-1.5" : "text-xs px-5 py-2",
          isHighlighted ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {isHovered ? next.label : current.toUpperCase()}
      </button>
    </div>
  );
}
