import type { Detail } from "../types";
import { useTranslation } from "react-i18next";

export function DetailBadge({ icon, label }: Detail) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 bg-secondary border border-border rounded-full px-3 py-1.5 text-foreground/80 text-sm">
      <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      <span>{t(label)}</span>
    </div>
  );
}
