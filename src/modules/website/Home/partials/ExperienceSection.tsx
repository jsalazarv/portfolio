import { ExperienceCard } from "../components/ExperienceCard";
import { experiences } from "../data/experience";

export function ExperienceSection() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} {...exp} />
      ))}
    </div>
  );
}
