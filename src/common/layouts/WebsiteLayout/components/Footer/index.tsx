import { useTranslation } from "react-i18next";

import { profile } from "@/modules/website/Home/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="px-4 md:px-8 pb-8 max-w-3xl mx-auto w-full">
      <div
        className="bg-muted-foreground/50 p-px"
        style={{
          clipPath:
            "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
        }}
      >
        <div
          className="relative bg-background overflow-hidden"
          style={{
            clipPath:
              "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
          }}
        >
          <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10" />
          <div className="relative z-20 flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-wider text-muted-foreground/50 uppercase">
            <span>ID :: jsalazarv</span>
            <span>{t("footer.rights", { year: currentYear, name: profile.name })}</span>
            <span className="text-primary animate-pulse">● {t("about.hud.online")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
