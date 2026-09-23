import { ExternalLinkIcon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslation } from "react-i18next";

import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const CLIP_BEVEL_OUTER =
  "polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)";
const CLIP_BEVEL_INNER =
  "polygon(13px 0%, 100% 0%, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0% 100%, 0% 13px)";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className="group relative h-full bg-border/60 p-px"
      style={{ clipPath: CLIP_BEVEL_OUTER }}
    >
      <div
        className="relative h-full flex flex-col bg-background overflow-hidden"
        style={{ clipPath: CLIP_BEVEL_INNER }}
      >
        <div className="relative h-44 shrink-0 overflow-hidden">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
              {t("projects.noImage")}
            </div>
          )}

          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="scan-line" />
          </div>

          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-primary/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-primary/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary/70 pointer-events-none" />

          <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] text-primary/80 uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1 gap-3">
          <h3 className="font-mono text-sm uppercase tracking-wide text-foreground">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-3">
            {t(project.descriptionKey)}
          </p>

          <div className="mt-auto space-y-3">
            <div className="flex gap-1.5 flex-wrap">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70 border border-border/60 px-1.5 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-border/40 font-mono text-[10px] uppercase tracking-wider">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  <HugeiconsIcon
                    icon={ExternalLinkIcon}
                    size={11}
                    strokeWidth={1.5}
                  />
                  {t("projects.demo")}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={GithubIcon}
                    size={11}
                    strokeWidth={1.5}
                  />
                  {t("projects.repo")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
