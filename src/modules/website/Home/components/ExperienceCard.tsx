import type { Experience } from "../types";

export function ExperienceCard({ title, role, period, points }: Experience) {
  return (
    <div className="flex h-full flex-col bg-card border border-border rounded-2xl p-5">
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-foreground text-xl font-semibold">{title}</h3>
        <span className="text-muted-foreground text-sm border border-border rounded-full px-3 py-1">
          {period}
        </span>
      </div>
      <p className="text-muted-foreground/80 text-sm mb-4">{role}</p>
      <div className="border-t border-border pt-4">
        <ul className="space-y-2">
          {points.map((point, i) => (
            <li
              key={i}
              className="text-foreground/70 text-sm flex items-start gap-2"
            >
              <span className="text-muted-foreground mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
