import { useTranslation } from "react-i18next";

import { ProjectCard } from "./components/ProjectCard";
import { PROJECTS } from "./data/projects";

import { SEO } from "@/common/components/SEO";

export function Projects() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("seo.pages.projects.title")}
        description={t("seo.pages.projects.description")}
        url={`${window.location.origin}/projects`}
        type="website"
      />

      <div className="-mt-8">
        <div
          className="bg-muted-foreground/50 p-px"
          style={{
            clipPath:
              "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
          }}
        >
          <div
            className="relative bg-background overflow-hidden px-2"
            style={{
              clipPath:
                "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
            }}
          >
            <div className="absolute inset-0 scanlines-overlay pointer-events-none z-10" />

            <div className="flex items-center gap-2 px-4 py-4 bg-muted/60 border-b border-border font-mono text-[12px] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-primary tracking-widest uppercase">
                [ {t("projects.hud.title")} ]
              </span>
              <span className="ml-auto text-muted-foreground tracking-wider">
                {String(PROJECTS.length).padStart(3, "0")}{" "}
                {t("projects.hud.records")}
              </span>
            </div>

            <div className="relative z-20 px-4 py-3 border-b border-border/40">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                {t("projects.subtitle")}
              </p>
            </div>

            <div className="relative z-20 py-6 px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECTS.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-20 flex items-center justify-between px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] tracking-wider text-muted-foreground/50 uppercase">
              <span>{t("projects.hud.title")}</span>
              <span>
                {String(PROJECTS.length).padStart(3, "0")}{" "}
                {t("projects.hud.records")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
