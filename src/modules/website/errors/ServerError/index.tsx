import { Home, RefreshCw, ServerCrash } from "lucide-react";
import { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/common/layouts/ErrorLayout";

export function ServerError() {
  const error = useRouteError();
  const { t } = useTranslation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("Route error:", error);
    }
  }, [error]);

  return (
    <ErrorLayout
      icon={
        <ServerCrash
          className="w-24 h-24 text-destructive/40"
          strokeWidth={1.5}
        />
      }
      errorCode="500"
      title={t("errors.serverError.title")}
      description={t("errors.serverError.description")}
      standalone={true}
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">
          <Home className="w-4 h-4" />
          {t("errors.notFound.backHome")}
        </Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => window.location.reload()}
      >
        <RefreshCw className="w-4 h-4" />
        {t("errors.serverError.retry")}
      </Button>
    </ErrorLayout>
  );
}
