import { EducationCard } from "../components/EducationCard";
import { SkillCard } from "../components/SkillCard";
import { ToolBadge } from "../components/ToolBadge";
import { educationData } from "../data/education";
import { designTools, editingTools, languages } from "../data/skills";

export function SkillsEducationSection() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Left Column - Tools and Languages */}
      <div className="space-y-4">
        {/* Design Tools */}
        <SkillCard title="Design Tools">
          <div className="flex gap-2">
            {designTools.map((tool, index) => (
              <ToolBadge key={index} {...tool} />
            ))}
          </div>
        </SkillCard>

        {/* Editing Tools */}
        <SkillCard title="Editing Tools">
          <div className="flex gap-2">
            {editingTools.map((tool, index) => (
              <ToolBadge key={index} {...tool} />
            ))}
            <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#FF6B35" />
                <circle cx="8" cy="10" r="2" fill="white" />
                <circle cx="16" cy="10" r="2" fill="white" />
                <circle cx="12" cy="16" r="2" fill="white" />
              </svg>
            </div>
          </div>
        </SkillCard>

        {/* Languages */}
        <SkillCard title="Languages">
          <div className="flex gap-3">
            {languages.map((lang, index) => (
              <span key={index} className="text-2xl">
                {lang}
              </span>
            ))}
          </div>
        </SkillCard>
      </div>

      {/* Right Column - Education */}
      <div className="space-y-4">
        {educationData.map((edu, index) => (
          <EducationCard key={index} {...edu} />
        ))}
      </div>
    </div>
  );
}
