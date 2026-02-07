import type { PortfolioLink as PortfolioLinkType } from "../types";

export function PortfolioLink({ icon, label }: PortfolioLinkType) {
  return (
    <div className="flex items-center gap-2 bg-secondary border border-border rounded-full px-3 py-1.5 text-foreground/80 text-sm cursor-pointer hover:bg-accent transition-colors">
      <span className="w-4 h-4 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
