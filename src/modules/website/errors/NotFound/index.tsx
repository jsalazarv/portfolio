import { DashboardBrowsingIcon, Home01Icon, SearchRemoveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/common/layouts/ErrorLayout";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <ErrorLayout
      icon={
        <HugeiconsIcon
          icon={SearchRemoveIcon}
          size={96}
          strokeWidth={1.5}
          className="text-muted-foreground/40"
        />
      }
      errorCode="404"
      title={t("errors.notFound.title")}
      description={t("errors.notFound.description")}
    >
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link to="/">
          <HugeiconsIcon icon={Home01Icon} size={16} strokeWidth={1.5} />
          {t("errors.notFound.backHome")}
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
        <Link to="/dashboard">
          <HugeiconsIcon icon={DashboardBrowsingIcon} size={16} strokeWidth={1.5} />
          {t("errors.notFound.toDashboard")}
        </Link>
      </Button>
    </ErrorLayout>
  );
}
