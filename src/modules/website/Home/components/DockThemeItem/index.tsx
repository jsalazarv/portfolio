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
  "w-16 h-16 rounded-full border border-border bg-white/60 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 hover:bg-white/80 hover:shadow-md";

function getCurrentIcon(theme: string) {
  if (theme === "light") return <Sun size={24} strokeWidth={1.5} />;
  if (theme === "dark") return <Moon size={24} strokeWidth={1.5} />;
  return <Monitor size={24} strokeWidth={1.5} />;
}

export function DockThemeItem() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label="Theme" className={cn(DOCK_CIRCLE_CLASSES)}>
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
      <span className="opacity-0 pointer-events-none text-sm font-medium">Theme</span>
    </div>
  );
}
