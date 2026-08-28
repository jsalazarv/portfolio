import type { LucideIcon } from "lucide-react";

import { cn } from "@/common/lib/utils";

interface DockItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function DockItem({
  icon: Icon,
  label,
  isActive,
  onClick,
}: DockItemProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        aria-label={label}
        className={cn(
          "w-16 h-16 rounded-full border border-border flex items-center justify-center transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-white shadow-md scale-125"
            : "bg-white/60 shadow-sm hover:scale-125 hover:bg-white/80 hover:shadow-md",
        )}
      >
        <Icon size={24} strokeWidth={1.5} />
      </button>
      <span
        className={cn(
          "text-sm font-medium text-foreground transition-opacity duration-200",
          isActive ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {label}
      </span>
    </div>
  );
}
