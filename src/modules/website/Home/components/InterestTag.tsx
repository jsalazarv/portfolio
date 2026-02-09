import type { Interest } from "../types";
import { useTranslation } from "react-i18next";

import { Badge } from "@/common/components/ui/badge";

export function InterestTag({ icon, label }: Interest) {
  const { t } = useTranslation();

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-2 bg-secondary border border-border rounded-full px-3 py-1.5 text-foreground/80 text-sm cursor-pointer hover:bg-accent transition-colors"
    >
      {icon}
      <span>{t(label)}</span>
    </Badge>
  );
}
