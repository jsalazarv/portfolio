import { useRef } from "react";

import type { IconSvgElement } from "@hugeicons/react";

import { cn } from "@/common/lib/utils";
import { DockItem } from "@/modules/website/Home/components/DockItem";
import { DockLanguageItem } from "@/modules/website/Home/components/DockLanguageItem";
import { DockThemeItem } from "@/modules/website/Home/components/DockThemeItem";

export interface NavDockItem {
  id: string;
  icon: IconSvgElement;
  label: string;
  onClick: () => void;
  avatarSrc?: string;
  avatarFallback?: string;
}

interface DockProps {
  items: NavDockItem[];
  activeId: string;
  compact?: boolean;
}

export function Dock({ items, activeId, compact = false }: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    e.preventDefault();

    const buttons = Array.from(
      containerRef.current?.querySelectorAll<HTMLButtonElement>("[data-dock-button]") ?? [],
    );

    const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const total = buttons.length;

    const nextIndex =
      e.key === "ArrowRight"
        ? (currentIndex + 1) % total
        : (currentIndex - 1 + total) % total;

    buttons[nextIndex]?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid grid-cols-2 gap-3 px-6 md:px-0",
        compact ? "md:flex md:items-center md:gap-2" : "md:flex md:items-center md:gap-8",
      )}
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activeId === item.id}
          compact={compact}
          onClick={item.onClick}
          avatarSrc={item.avatarSrc}
          avatarFallback={item.avatarFallback}
        />
      ))}
      <DockLanguageItem compact={compact} />
      <DockThemeItem compact={compact} />
    </div>
  );
}
