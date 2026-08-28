import { Check, Monitor, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { useTheme } from "@/common/hooks/useTheme";
import { cn } from "@/common/lib/utils";

const THEMES = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
];

const DOCK_CIRCLE_CLASSES =
  "w-10 h-10 md:w-16 md:h-16 rounded-full border border-border bg-white/60 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:scale-125 focus-visible:bg-white focus-visible:shadow-md";

function getCurrentIcon(theme: string) {
  if (theme === "light") return <Sun className="size-4 md:size-6" strokeWidth={1.5} />;
  if (theme === "dark") return <Moon className="size-4 md:size-6" strokeWidth={1.5} />;
  return <Monitor className="size-4 md:size-6" strokeWidth={1.5} />;
}

export function DockThemeItem() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button data-dock-button aria-label="Theme" className={cn(DOCK_CIRCLE_CLASSES)}>
            {getCurrentIcon(theme)}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {THEMES.map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
              <Icon className="size-4" />
              <span>{label}</span>
              {theme === value && <Check className="size-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="opacity-0 pointer-events-none text-sm font-medium">
        Theme
      </span>
    </div>
  );
}
