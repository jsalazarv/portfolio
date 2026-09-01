import { useState } from "react";

import { LanguageSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useTranslation } from "react-i18next";

import { cn } from "@/common/lib/utils";

const NEXT_LANG: Record<string, { code: string; label: string }> = {
  es: { code: "en", label: "EN" },
  en: { code: "es", label: "ES" },
};

interface DockLanguageItemProps {
  compact?: boolean;
}

export function DockLanguageItem({ compact = false }: DockLanguageItemProps) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "es").slice(0, 2);
  const next = NEXT_LANG[current] ?? NEXT_LANG["es"];
  const [isHovered, setIsHovered] = useState(false);

  const toggle = () => {
    i18n.changeLanguage(next.code);
    localStorage.setItem("lang", next.code);
  };

  return (
    <div
      className={cn(!compact && "flex flex-col items-center gap-3")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        data-dock-button
        aria-label={`Switch to ${next.label}`}
        onClick={toggle}
        className={cn(
          "rounded-full border border-border flex items-center transition-all duration-300 cursor-pointer focus-visible:outline-none",
          compact
            ? "bg-card h-9 px-3 gap-2 hover:scale-105 focus-visible:scale-105"
            : "w-14 h-14 md:w-16 md:h-16 justify-center bg-card/60 hover:scale-125 hover:bg-card focus-visible:scale-125 focus-visible:bg-card",
        )}
      >
        <HugeiconsIcon
          icon={LanguageSquareIcon}
          size={compact ? 16 : 24}
          strokeWidth={1.2}
          className="shrink-0 transition-all duration-300"
        />
        {compact && (
          <span className="whitespace-nowrap text-xs font-medium">
            {isHovered ? next.label : current.toUpperCase().slice(0, 2)}
          </span>
        )}
      </button>
      {!compact && (
        <span
          className={cn(
            "text-sm font-medium text-foreground transition-opacity duration-200",
            !isHovered && "md:opacity-0 md:pointer-events-none",
          )}
        >
          {next.label}
        </span>
      )}
    </div>
  );
}
