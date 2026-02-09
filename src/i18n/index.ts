import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";

const storedLang =
  typeof window !== "undefined" ? localStorage.getItem("lang") : null;
const browserLang =
  typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "en";
const detectedLang =
  storedLang || (browserLang.startsWith("es") ? "es" : "en");

i18n.use(initReactI18next).init({
  resources,
  lng: detectedLang,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
  i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
  });
}

export default i18n;
