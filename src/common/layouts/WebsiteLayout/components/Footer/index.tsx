import { useTranslation } from "react-i18next";

import { profile } from "@/modules/website/Home/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="mb-8">
      <div className="mx-auto max-w-3xl bg-card border border-border rounded-2xl px-4 md:px-8 py-6">
        <p className="text-muted-foreground/60 text-sm text-center">
          {t("footer.rights", { year: currentYear, name: profile.name })}
        </p>
      </div>
    </footer>
  );
}
