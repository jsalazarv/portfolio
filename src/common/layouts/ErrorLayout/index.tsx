import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { PropsWithChildren, ReactNode } from "react";

import { Badge } from "@/common/components/ui/badge";
import { portfolioLinks } from "@/modules/website/Home/data/portfolio";
import { profile } from "@/modules/website/Home/data/profile";

interface ErrorLayoutProps extends PropsWithChildren {
  icon: ReactNode;
  errorCode: string;
  title: string;
  description: string;
  standalone?: boolean;
}

export function ErrorLayout({
  icon,
  errorCode,
  title,
  description,
  children,
  standalone = false,
}: ErrorLayoutProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const errorContent = (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-8 items-center text-center animate-in fade-in-0 zoom-in-95 duration-500">
      {/* Icono grande + Badge */}
      <div className="flex flex-col items-center gap-4">
        {icon}
        <Badge variant="outline" className="text-base px-4 py-1.5">
          {t("errors.badge", { code: errorCode })}
        </Badge>
      </div>

      {/* Título + descripción */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          {description}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {children}
      </div>
    </div>
  );

  if (standalone) {
    return (
      <div className="min-h-svh bg-background flex flex-col gap-4 p-4 md:p-8">
        {/* Header */}
        <header>
          <div className="mx-auto max-w-3xl bg-card border border-border rounded-2xl px-4 md:px-8">
            <div className="flex h-16 items-center justify-center">
              <Link
                to="/"
                className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
              >
                JS
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center">
          {errorContent}
        </main>

        {/* Footer */}
        <footer>
          <div className="mx-auto max-w-3xl bg-card border border-border rounded-2xl px-4 md:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm">
                  {t("footer.connect")}
                </span>
                <div className="flex gap-3">
                  {portfolioLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:border-foreground/40 transition-colors"
                      aria-label={t(link.label)}
                    >
                      {typeof link.icon === "string" ? (
                        <span className="text-lg">{link.icon}</span>
                      ) : (
                        link.icon
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <p className="text-muted-foreground/60 text-sm">
                {t("footer.rights", { year: currentYear, name: profile.name })}
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center py-8">
      {errorContent}
    </div>
  );
}
