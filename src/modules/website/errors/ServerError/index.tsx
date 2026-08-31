import { Home01Icon, Refresh01Icon, ServerCrashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router-dom";

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
        <HugeiconsIcon
          icon={ServerCrashIcon}
          size={96}
          strokeWidth={1.5}
          className="text-destructive/40"
        />
      }
      errorCode="500"
      title={t("errors.serverError.title")}
      description={t("errors.serverError.description")}
      standalone={true}
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">
          <HugeiconsIcon icon={Home01Icon} size={16} strokeWidth={1.5} />
          {t("errors.notFound.backHome")}
        </Link>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => window.location.reload()}
      >
        <HugeiconsIcon icon={Refresh01Icon} size={16} strokeWidth={1.5} />
        {t("errors.serverError.retry")}
      </Button>
    </ErrorLayout>
  );
}
