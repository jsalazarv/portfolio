import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useDocumentMeta() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("seo.title");

    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription?.setAttribute("content", t("seo.description"));
  }, [t, i18n.language]);
}
