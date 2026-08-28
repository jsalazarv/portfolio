import { useState } from "react";

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
  const [activeId, setActiveId] = useState(
    defaultActiveId ?? items[0]?.id ?? "",
  );

  return (
    <div className="flex items-center gap-4">
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
