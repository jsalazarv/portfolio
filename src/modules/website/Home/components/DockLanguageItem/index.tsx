import { useState } from "react";

import { CheckIcon, LanguageSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { cn } from "@/common/lib/utils";

const LANGS = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

interface DockLanguageItemProps {
  compact?: boolean;
}

export function DockLanguageItem({ compact = false }: DockLanguageItemProps) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage ?? i18n.language ?? "es").slice(0, 2);
  const [open, setOpen] = useState(false);

  const setLang = (code: string) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <div className={cn(!compact && "flex flex-col items-center gap-3")}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            data-dock-button
            aria-label="Language"
            className={cn(
              "rounded-full border border-border shadow-sm flex items-center transition-all duration-300 cursor-pointer focus-visible:outline-none",
              compact
                ? "bg-card h-9 px-3 gap-2 hover:scale-105 focus-visible:scale-105"
                : "w-14 h-14 md:w-16 md:h-16 justify-center bg-card/60 hover:scale-125 hover:bg-card focus-visible:scale-125 focus-visible:bg-card",
            )}
          >
            <HugeiconsIcon
              icon={LanguageSquareIcon}
              size={compact ? 16 : 24}
              strokeWidth={1.2}
              className="shrink-0 transition-all duration-300"
            />
            {compact && <span className="whitespace-nowrap text-xs font-medium">Language</span>}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {LANGS.map((lang) => (
            <DropdownMenuItem key={lang.code} onClick={() => setLang(lang.code)}>
              <span>{lang.label}</span>
              {current === lang.code && <HugeiconsIcon icon={CheckIcon} size={16} className="ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {!compact && <span className="opacity-0 pointer-events-none text-sm font-medium">Language</span>}
    </div>
  );
}
