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

const DOCK_CIRCLE_CLASSES =
  "w-16 h-16 rounded-full border border-border bg-white/60 shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 hover:bg-white/80 hover:shadow-md";

export function DockLanguageItem() {
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
          <button aria-label="Language" className={cn(DOCK_CIRCLE_CLASSES)}>
            <Globe size={24} strokeWidth={1.5} />
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
