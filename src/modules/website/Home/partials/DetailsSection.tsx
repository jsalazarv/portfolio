import { DetailBadge } from "../components/DetailBadge";
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
            <DetailBadge key={index} {...detail} />
          ))}
        </div>
      </div>
    </div>
  );
}
