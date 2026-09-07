import { useRef } from "react";

import type { IconSvgElement } from "@hugeicons/react";

import { cn } from "@/common/lib/utils";

import { DockItem } from "@/modules/website/Home/components/DockItem";
import { DockLanguageItem } from "@/modules/website/Home/components/DockLanguageItem";
import { DockSoundItem } from "@/modules/website/Home/components/DockSoundItem";
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
      containerRef.current?.querySelectorAll<HTMLButtonElement>(
        "[data-dock-button]",
      ) ?? [],
    );

    const currentIndex = buttons.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const total = buttons.length;

    const nextIndex =
      e.key === "ArrowRight"
        ? (currentIndex + 1) % total
        : (currentIndex - 1 + total) % total;

    buttons[nextIndex]?.focus();
  };

  const stretch = !compact;

  return (
    <div
      ref={containerRef}
      className={cn(
        stretch
          ? "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-4"
          : "flex flex-wrap justify-center gap-4",
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
          stretch={stretch}
          onClick={item.onClick}
          avatarSrc={item.avatarSrc}
          avatarFallback={item.avatarFallback}
        />
      ))}
      <DockLanguageItem compact={compact} stretch={stretch} />
      <DockThemeItem compact={compact} stretch={stretch} />
      <DockSoundItem compact={compact} stretch={stretch} />
    </div>
  );
}
