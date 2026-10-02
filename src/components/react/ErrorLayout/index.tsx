import { useTranslation } from "react-i18next";

import type { PropsWithChildren, ReactNode } from "react";

import { Badge } from "@/common/components/ui/badge";

interface ErrorLayoutProps extends PropsWithChildren {
  icon: ReactNode;
  errorCode: string;
  title: string;
  description: string;
}

export function ErrorLayout({
  icon,
  errorCode,
  title,
  description,
  children,
}: ErrorLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex items-center justify-center py-8">
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
    </div>
  );
}
