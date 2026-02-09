import { DetailsSection } from "./partials/DetailsSection";
import { ExperienceSection } from "./partials/ExperienceSection";
import { HeaderSection } from "./partials/HeaderSection";
import { PortfolioSection } from "./partials/PortfolioSection";
import { SkillsEducationSection } from "./partials/SkillsEducationSection";

export function Home() {
  return (
    <div className="mx-auto w-full md:max-w-3xl space-y-4">
      <HeaderSection />
      <PortfolioSection />
      <ExperienceSection />
      <SkillsEducationSection />
      <DetailsSection />
    </div>
  );
}
