import { useState } from "react";

import {
  CheckIcon,
  MonitorIcon,
  Moon01Icon,
  Sun01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { useTheme } from "@/common/hooks/useTheme";
import { cn } from "@/common/lib/utils";

const THEMES = [
  { value: "light" as const, label: "Light", icon: Sun01Icon },
  { value: "dark" as const, label: "Dark", icon: Moon01Icon },
  { value: "system" as const, label: "System", icon: MonitorIcon },
];

interface DockThemeItemProps {
  compact?: boolean;
}

function getCurrentIcon(theme: string, compact: boolean) {
  const size = compact ? 16 : 24;
  if (theme === "light") return <HugeiconsIcon icon={Sun01Icon} size={size} strokeWidth={1.2} className="transition-all duration-500" />;
  if (theme === "dark") return <HugeiconsIcon icon={Moon01Icon} size={size} strokeWidth={1.2} className="transition-all duration-500" />;
  return <HugeiconsIcon icon={MonitorIcon} size={size} strokeWidth={1.2} className="transition-all duration-500" />;
}

export function DockThemeItem({ compact = false }: DockThemeItemProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(!compact && "flex flex-col items-center gap-3")}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            data-dock-button
            aria-label="Theme"
            className={cn(
              "rounded-full border border-border shadow-sm flex items-center transition-all duration-300 cursor-pointer focus-visible:outline-none",
              compact
                ? "bg-card h-9 px-3 gap-2 hover:scale-105 focus-visible:scale-105"
                : "w-14 h-14 md:w-16 md:h-16 justify-center bg-card/60 hover:scale-125 hover:bg-card focus-visible:scale-125 focus-visible:bg-card",
            )}
          >
            {getCurrentIcon(theme, compact)}
            {compact && <span className="whitespace-nowrap text-xs font-medium">Theme</span>}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {THEMES.map(({ value, label, icon }) => (
            <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
              <HugeiconsIcon icon={icon} size={16} strokeWidth={1.2} />
              <span>{label}</span>
              {theme === value && <HugeiconsIcon icon={CheckIcon} size={16} className="ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {!compact && <span className="opacity-0 pointer-events-none text-sm font-medium">Theme</span>}
    </div>
  );
}
