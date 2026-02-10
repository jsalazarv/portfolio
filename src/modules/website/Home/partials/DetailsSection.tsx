import { Badge } from "@/common/components/ui/badge";
import { details } from "../data/details.tsx";
import { useTranslation } from "react-i18next";

export function DetailsSection() {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-foreground font-semibold text-sm">
          {t("sections.details")}
        </span>
        <div className="flex flex-wrap gap-2">
          {details.map((detail, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="gap-2 rounded-full px-3 py-1.5"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                {detail.icon}
              </span>
              <span>{t(detail.label)}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
