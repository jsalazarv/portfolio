import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  return (
    <div
      className="flex flex-col items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        aria-label={label}
        className={cn(
          "w-16 h-16 rounded-full border border-border flex items-center justify-center transition-all duration-200 cursor-pointer",
          isActive || isHovered
            ? "bg-white shadow-md scale-125"
            : "bg-white/60 shadow-sm",
        )}
      >
        <Icon size={24} strokeWidth={1.5} />
      </button>
      <span
        className={cn(
          "text-sm font-medium text-foreground transition-opacity duration-200",
          showLabel ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {label}
      </span>
    </div>
  );
}
