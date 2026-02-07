import type { Interest } from "../types";

import { Badge } from "@/common/components/ui/badge";

export function InterestTag({ icon, label }: Interest) {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-2 bg-secondary border border-border rounded-full px-3 py-1.5 text-foreground/80 text-sm cursor-pointer hover:bg-accent transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Badge>
  );
}
