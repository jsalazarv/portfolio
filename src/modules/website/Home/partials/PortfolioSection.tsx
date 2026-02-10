import { Badge } from "@/common/components/ui/badge";
import { portfolioLinks } from "../data/portfolio.tsx";
import { useTranslation } from "react-i18next";

export function PortfolioSection() {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-foreground font-semibold text-sm">
          {t("sections.portfolio")}
        </span>
        <div className="flex flex-wrap gap-2">
          {portfolioLinks.map((link, index) => (
            <Badge
              key={index}
              asChild
              variant="secondary"
              className="gap-2 rounded-full px-3 py-1.5 text-foreground/80 cursor-pointer hover:bg-accent transition-colors"
            >
              <a
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {link.icon}
                </span>
                <span>{t(link.label)}</span>
              </a>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
