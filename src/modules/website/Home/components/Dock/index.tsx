import { useRef, useState } from "react";

import type { LucideIcon } from "lucide-react";

import { DockItem } from "@/modules/website/Home/components/DockItem";
import { DockLanguageItem } from "@/modules/website/Home/components/DockLanguageItem";
import { DockThemeItem } from "@/modules/website/Home/components/DockThemeItem";

export interface NavDockItem {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface DockProps {
  items: NavDockItem[];
  defaultActiveId?: string;
}

export function Dock({ items, defaultActiveId }: DockProps) {
  const [activeId, setActiveId] = useState(defaultActiveId ?? items[0]?.id ?? "");
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
      className="grid grid-cols-2 gap-3 px-6 md:flex md:items-center md:gap-4 md:px-0"
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => (
        <DockItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={activeId === item.id}
          onClick={() => {
            setActiveId(item.id);
            item.onClick();
          }}
        />
      ))}
      <DockLanguageItem />
      <DockThemeItem />
    </div>
  );
}
