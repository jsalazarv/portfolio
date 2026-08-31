import { Check, Globe } from "lucide-react";
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

  const setLang = (code: string) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            data-dock-button
            aria-label="Language"
            className={cn(
              "rounded-full border border-border bg-card/60 shadow-sm flex items-center justify-center transition-all duration-500 cursor-pointer hover:scale-125 hover:bg-card hover:shadow-md focus-visible:outline-none focus-visible:scale-125 focus-visible:bg-card focus-visible:shadow-md",
              compact ? "w-10 h-10" : "w-14 h-14 md:w-16 md:h-16",
            )}
          >
            <Globe
              className={cn("transition-all duration-500", compact ? "size-4" : "size-5 md:size-6")}
              strokeWidth={1.5}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top">
          {LANGS.map((lang) => (
            <DropdownMenuItem key={lang.code} onClick={() => setLang(lang.code)}>
              <span>{lang.label}</span>
              {current === lang.code && <Check className="size-4 ml-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="opacity-0 pointer-events-none text-sm font-medium">Language</span>
    </div>
  );
}
