import { Card } from "@/common/components/ui/card";
import type { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  children: ReactNode;
}

export function SkillCard({ title, children }: SkillCardProps) {
  return (
    <Card padding="compact" rounded="large" className="flex items-center gap-4">
      <span className="text-foreground font-semibold text-sm border-r border-border pr-4">
        {title}
      </span>
      {children}
    </Card>
  );
}
