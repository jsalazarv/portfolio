import { useTranslation } from "react-i18next";

import { SEO } from "@/common/components/SEO";

export function Home() {
  const { t } = useTranslation();

  return (
    <SEO
      title={t("seo.pages.home.title")}
      description={t("seo.pages.home.description")}
      url="https://jsalazarv.dev/"
    />
  );
}
