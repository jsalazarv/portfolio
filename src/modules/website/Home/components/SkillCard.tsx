import type { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  children: ReactNode;
}

export function SkillCard({ title, children }: SkillCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
      <span className="text-foreground font-semibold text-sm border-r border-border pr-4">
        {title}
      </span>
      {children}
    </div>
  );
}
