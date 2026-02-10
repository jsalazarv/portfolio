import { Badge } from "@/common/components/ui/badge";
import { interests } from "../data/interests.tsx";
import { profile } from "../data/profile";
import { useTranslation } from "react-i18next";

export function HeaderSection() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Avatar */}
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden bg-linear-to-br from-amber-200 to-orange-300 shrink-0">
        <img
          src={profile.avatarUrl}
          alt={t("home.profile.avatarAlt", { name: profile.name })}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bio and Interests */}
      <div className="flex-1 space-y-4">
        {/* Bio Card */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-foreground/90 text-base md:text-lg italic leading-relaxed">
            {t(profile.bio)}
          </p>
        </div>

        {/* Interests */}
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-wrap items-center gap-3">
          <span className="text-foreground font-semibold text-sm">
            {t("header.interests")}
          </span>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge
                key={index}
                variant="outline"
                className="gap-2 bg-secondary rounded-full px-3 py-1.5 text-foreground/80 cursor-pointer hover:bg-accent transition-colors"
              >
                {interest.icon}
                <span>{t(interest.label)}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
