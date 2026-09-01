import { CheckIcon, LanguageSkillIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

const LANGS = [
  { code: "es", labelKey: "language.es" },
  { code: "en", labelKey: "language.en" },
];

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "es").slice(0, 2);

  const setLang = (code: string) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("header.language")}>
          <HugeiconsIcon icon={LanguageSkillIcon} size={16} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {LANGS.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => setLang(lang.code)}>
            <span>{t(lang.labelKey)}</span>
            {current === lang.code && <HugeiconsIcon icon={CheckIcon} size={16} className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
