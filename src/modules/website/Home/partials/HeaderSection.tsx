import { InterestTag } from "../components/InterestTag";
import { interests } from "../data/interests.tsx";
import { profile } from "../data/profile";

export function HeaderSection() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Avatar */}
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden bg-linear-to-br from-amber-200 to-orange-300 shrink-0">
        <img
          src={profile.avatarUrl}
          alt={`${profile.name} Avatar`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bio and Interests */}
      <div className="flex-1 space-y-4">
        {/* Bio Card */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-foreground/90 text-base md:text-lg italic leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* Interests */}
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-wrap items-center gap-3">
          <span className="text-foreground font-semibold text-sm">
            Interests
          </span>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <InterestTag key={index} {...interest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
