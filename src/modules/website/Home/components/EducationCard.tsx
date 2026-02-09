import type { Education } from "../types";
import { useTranslation } from "react-i18next";

export function EducationCard({
  title,
  subtitle,
  location,
  period,
}: Education) {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-start justify-between">
      <div>
        <h4 className="text-foreground text-lg font-semibold">{t(title)}</h4>
        <p className="text-muted-foreground/80 text-sm">{t(subtitle)}</p>
        <p className="text-muted-foreground text-sm">{t(location)}</p>
      </div>
      <span className="text-muted-foreground text-sm border border-border rounded-full px-3 py-1">
        {t(period)}
      </span>
    </div>
  );
}
