import { DetailBadge } from "../components/DetailBadge";
import { details } from "../data/details.tsx";

export function DetailsSection() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-foreground font-semibold text-sm">Details</span>
        <div className="flex flex-wrap gap-2">
          {details.map((detail, index) => (
            <DetailBadge key={index} {...detail} />
          ))}
        </div>
      </div>
    </div>
  );
}
