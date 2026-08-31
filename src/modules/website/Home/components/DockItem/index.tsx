import { useState } from "react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/common/lib/utils";

interface DockItemProps {
  ref?: React.Ref<HTMLButtonElement>;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  compact?: boolean;
  tabIndex?: number;
  onClick: () => void;
}

export function DockItem({
  ref,
  icon: Icon,
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
      className={cn(
        compact ? "flex items-center" : "flex flex-col items-center justify-center gap-3",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        ref={ref}
        data-dock-button
        onClick={onClick}
        aria-label={label}
        tabIndex={tabIndex}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "rounded-full border border-border flex items-center justify-center transition-all duration-500 cursor-pointer focus-visible:outline-none",
          compact ? "w-10 h-10" : "w-14 h-14 md:w-16 md:h-16",
          isHighlighted ? "bg-card shadow-md scale-125" : "bg-card/60 shadow-sm",
        )}
      >
        <Icon
          className={cn(
            "transition-all duration-500",
            compact ? "size-4" : "size-5 md:size-6",
          )}
          strokeWidth={1.5}
        />
      </button>
      {compact ? (
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap text-xs font-medium text-foreground transition-all duration-300 ease-in-out",
            isHighlighted ? "max-w-[8rem] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0",
          )}
        >
          {label}
        </span>
      ) : (
        <span
          className={cn(
            "text-sm font-medium text-foreground transition-opacity duration-200",
            isHighlighted ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
