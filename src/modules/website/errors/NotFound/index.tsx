import { Home, LayoutDashboard, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/common/layouts/ErrorLayout";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <ErrorLayout
      icon={
        <SearchX
          className="w-24 h-24 text-muted-foreground/40"
          strokeWidth={1.5}
        />
      }
      errorCode="404"
      title={t("errors.notFound.title")}
      description={t("errors.notFound.description")}
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">
          <Home className="w-4 h-4" />
          {t("errors.notFound.backHome")}
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
        <Link to="/dashboard">
          <LayoutDashboard className="w-4 h-4" />
          {t("errors.notFound.toDashboard")}
        </Link>
      </Button>
    </ErrorLayout>
  );
}
