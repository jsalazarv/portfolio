import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LOCALE_MAP: Record<string, string> = { en: "en_US", es: "es_MX" };
const ALTERNATE_LOCALE_MAP: Record<string, string> = {
  en: "es_MX",
  es: "en_US",
};

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

function setCanonical(path: string) {
  const canonical =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
    (() => {
      const link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
      return link;
    })();

  canonical.href = `https://jsalazarv.dev${path}`;
}

export function useDocumentMeta(path: string) {
  const { i18n } = useTranslation();

  useEffect(() => {
    setMeta('meta[property="og:locale"]', LOCALE_MAP[i18n.language] ?? "en_US");
    setMeta(
      'meta[property="og:locale:alternate"]',
      ALTERNATE_LOCALE_MAP[i18n.language] ?? "es_MX",
    );
  }, [i18n.language]);

  useEffect(() => {
    setCanonical(path);
  }, [path]);
}
