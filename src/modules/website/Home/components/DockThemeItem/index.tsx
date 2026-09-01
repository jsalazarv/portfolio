import { useState } from "react";

import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useTheme } from "@/common/hooks/useTheme";
import { cn } from "@/common/lib/utils";

type Theme = "light" | "dark";

const CYCLE: Theme[] = ["light", "dark"];

const THEME_META: Record<Theme, { label: string; icon: typeof Sun01Icon }> = {
  light: { label: "Light", icon: Sun01Icon },
  dark: { label: "Dark", icon: Moon01Icon },
};

interface DockThemeItemProps {
  compact?: boolean;
}

export function DockThemeItem({ compact = false }: DockThemeItemProps) {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const currentIndex = CYCLE.indexOf(theme as Theme);
  const next = CYCLE[(currentIndex + 1) % CYCLE.length];
  const current = THEME_META[theme as Theme] ?? THEME_META.light;
  const nextMeta = THEME_META[next];

  const toggle = () => setTheme(next);

  return (
    <div
      className={cn(!compact && "flex flex-col items-center gap-3")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        data-dock-button
        aria-label={`Switch to ${nextMeta.label}`}
        onClick={toggle}
        className={cn(
          "rounded-full border border-border flex items-center transition-all duration-300 cursor-pointer focus-visible:outline-none",
          compact
            ? "bg-card h-9 px-3 gap-2 hover:scale-105 focus-visible:scale-105"
            : "w-14 h-14 md:w-16 md:h-16 justify-center bg-card/60 hover:scale-125 hover:bg-card focus-visible:scale-125 focus-visible:bg-card",
        )}
      >
        <HugeiconsIcon
          icon={current.icon}
          size={compact ? 16 : 24}
          strokeWidth={1.2}
          className="shrink-0 transition-all duration-300"
        />
        {compact && (
          <span className="whitespace-nowrap text-xs font-medium">
            {isHovered ? nextMeta.label : current.label}
          </span>
        )}
      </button>
      {!compact && (
        <span
          className={cn(
            "text-sm font-medium text-foreground transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {nextMeta.label}
        </span>
      )}
    </div>
  );
}
