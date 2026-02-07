import { PortfolioLink } from "../components/PortfolioLink";
import { portfolioLinks } from "../data/portfolio.tsx";

export function PortfolioSection() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-foreground font-semibold text-sm">Portfolio</span>
        <div className="flex flex-wrap gap-2">
          {portfolioLinks.map((link, index) => (
            <PortfolioLink key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
