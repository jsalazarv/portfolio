import { Home01Icon, SearchRemoveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";

import "@/i18n";

import { Button } from "@/common/components/ui/button";
import { ErrorLayout } from "@/components/react/ErrorLayout";

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
        <a href="/">
          <HugeiconsIcon icon={Home01Icon} size={16} strokeWidth={1.5} />
          {t("errors.notFound.backHome")}
        </a>
      </Button>
    </ErrorLayout>
  );
}
