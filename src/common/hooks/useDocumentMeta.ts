import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  es: "es_MX",
};

const ALTERNATE_LOCALE_MAP: Record<string, string> = {
  en: "es_MX",
  es: "en_US",
};

const SELF_MANAGED_ROUTES = new Set(["/", "/projects"]);

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

const ROUTE_TITLE_KEY: Record<string, string> = {
  "/": "seo.pages.home.title",
  "/projects": "seo.pages.projects.title",
};

export function useDocumentMeta() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    setMeta('meta[property="og:locale"]', LOCALE_MAP[i18n.language] ?? "en_US");
    setMeta(
      'meta[property="og:locale:alternate"]',
      ALTERNATE_LOCALE_MAP[i18n.language] ?? "es_MX"
    );

    if (SELF_MANAGED_ROUTES.has(pathname)) {
      document.title = t(ROUTE_TITLE_KEY[pathname]);
    }
  }, [t, i18n.language, pathname]);

  useEffect(() => {
    setCanonical(pathname);
  }, [pathname]);
}
