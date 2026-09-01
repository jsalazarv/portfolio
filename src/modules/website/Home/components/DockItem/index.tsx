import { useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

import { cn } from "@/common/lib/utils";

interface DockItemProps {
  ref?: React.Ref<HTMLButtonElement>;
  icon: IconSvgElement;
  label: string;
  isActive: boolean;
  compact?: boolean;
  tabIndex?: number;
  onClick: () => void;
  avatarSrc?: string;
  avatarFallback?: string;
}

export function DockItem({
  ref,
  icon,
  label,
  isActive,
  compact = false,
  tabIndex = 0,
  onClick,
  avatarSrc,
  avatarFallback,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const isHighlighted = isActive || isHovered || isFocused;

  return (
    <div
      className={cn(!compact && "flex flex-col items-center justify-center gap-3")}
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
          "rounded-full flex items-center transition-all duration-300 cursor-pointer focus-visible:outline-none",
          compact
            ? cn(
                "h-9 px-3 gap-2",
                isActive ? "bg-primary text-primary-foreground" : "bg-card border border-border",
                isHighlighted && "scale-105",
              )
            : cn(
                "w-14 h-14 md:w-16 md:h-16 justify-center transition-all duration-500 overflow-hidden",
                isActive ? "bg-primary text-primary-foreground md:scale-125" : cn("border border-border", isHighlighted ? "bg-card scale-125" : "bg-card/60"),
              ),
        )}
      >
        {avatarSrc && !imgFailed ? (
          compact ? (
            <img
              src={avatarSrc}
              alt={label}
              className="w-6 h-6 rounded-full object-cover shrink-0"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <img
              src={avatarSrc}
              alt={label}
              className="w-full h-full object-cover"
              onError={() => setImgFailed(true)}
            />
          )
        ) : avatarFallback ? (
          compact ? (
            <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold shrink-0", isActive ? "bg-primary-foreground text-primary" : "bg-muted text-foreground")}>
              {avatarFallback}
            </span>
          ) : (
            <span className="w-full h-full flex items-center justify-center text-sm font-semibold">
              {avatarFallback}
            </span>
          )
        ) : (
          <HugeiconsIcon
            icon={icon}
            size={compact ? 16 : 24}
            strokeWidth={1.2}
            className="shrink-0 transition-all duration-300"
          />
        )}
        {compact && (
          <span className="whitespace-nowrap text-xs font-medium">{label}</span>
        )}
      </button>
      {!compact && (
        <span
          className={cn(
            "text-sm font-medium text-foreground transition-opacity duration-200",
            !isHighlighted && "md:opacity-0 md:pointer-events-none",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
