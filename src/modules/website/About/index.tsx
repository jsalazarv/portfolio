import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();
  const words = t("about.words", { returnObjects: true }) as string[];
  const skills = t("about.skills", { returnObjects: true }) as string[];
  const jobs = t("about.terminal.jobs", { returnObjects: true }) as Array<{
    company: string;
    period: string;
  }>;
  const education = t("about.education", { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    period: string;
  }>;

  const [wordIndex, setWordIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const timers = [
      600, 1100, 1600, 2100, 2600, 3100, 3600, 4100, 4600, 5100, 5600,
    ].map((delay, i) => setTimeout(() => setVisibleLines(i + 1), delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full -mt-8">
      {/* HUD Frame */}
      <div className="relative mb-8">
        {/* Outer div: background = border color, clip-path with 20px bevel */}
        <div
          className="bg-muted-foreground/50 p-px"
          style={{
            clipPath:
              "polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)",
          }}
        >
          {/* Inner div: real background, clip-path with 19px bevel (20-1px); padding on outer exposes 1px border strip on all sides */}
          <div
            className="relative bg-background"
            style={{
              clipPath:
                "polygon(19px 0%, 100% 0%, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0% 100%, 0% 19px)",
            }}
          >
            {/* Header bar */}
            <div className="flex items-center gap-2 px-4 py-4 bg-muted/60 border-b border-border font-mono text-[12px] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-primary tracking-widest uppercase">
                [ {t("about.hud.title")} ]
              </span>
              <span className="ml-auto text-muted-foreground tracking-wider">
                {t("about.hud.sysActive")}
              </span>
            </div>

            {/* Main content area */}
            <div className="relative bg-background/50 flex flex-col font-mono text-sm">
              {/* Scanlines texture */}
              <div className="absolute inset-0 z-10 scanlines-overlay pointer-events-none" />

              {/* Top: 2 columns — photo + directive/function */}
              <div className="flex pt-6">
                <div className="relative w-36 md:w-44 shrink-0 self-start z-20 overflow-hidden ml-6">
                  <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-primary z-30 pointer-events-none" />
                  <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-primary z-30 pointer-events-none" />
                  <div className="absolute bottom-6 left-1 w-5 h-5 border-b-2 border-l-2 border-primary z-30 pointer-events-none" />
                  <div className="absolute bottom-6 right-1 w-5 h-5 border-b-2 border-r-2 border-primary z-30 pointer-events-none" />
                  <img
                    src="/avatar.png"
                    alt="Juan Salazar"
                    className="w-full aspect-[3/4] object-cover object-right"
                    style={{
                      filter: "grayscale(100%) contrast(1.15) brightness(0.88)",
                    }}
                  />
                  <div className="scan-line" />
                  <div className="absolute bottom-1.5 left-0 right-0 flex justify-center z-30 pointer-events-none">
                    <span className="font-mono text-[9px] text-primary bg-background/80 px-2 py-0.5 tracking-[0.2em] animate-pulse uppercase">
                      {t("about.hud.scanning")}
                    </span>
                  </div>
                </div>

                <div className="relative z-20 flex-1 flex flex-col pt-8 pb-8 px-6">
                  <table className="font-mono text-xs w-full border-collapse">
                    <tbody>
                      {visibleLines >= 1 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            name::
                          </td>
                          <td className="uppercase tracking-widest text-foreground py-1">
                            {t("about.subject.name")}
                          </td>
                        </tr>
                      )}
                      {visibleLines >= 2 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            role::
                          </td>
                          <td className="uppercase tracking-widest text-primary py-1">
                            {t("about.subject.role")}
                          </td>
                        </tr>
                      )}
                      {visibleLines >= 3 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            origin::
                          </td>
                          <td className="uppercase tracking-widest text-foreground py-1">
                            {t("about.subject.origin")}
                          </td>
                        </tr>
                      )}
                      {visibleLines >= 4 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            exp::
                          </td>
                          <td className="uppercase tracking-widest text-foreground py-1">
                            {t("about.subject.yearsExp")}
                          </td>
                        </tr>
                      )}
                      {visibleLines >= 5 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            directive::
                          </td>
                          <td className="uppercase tracking-widest text-foreground py-1">
                            {t("about.subject.directive")}
                          </td>
                        </tr>
                      )}
                      {visibleLines >= 6 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            function::
                          </td>
                          <td className="uppercase tracking-widest text-foreground py-1">
                            {t("about.bio")}{" "}
                            <span className="text-primary transition-all duration-300">
                              {words[wordIndex]}
                            </span>
                          </td>
                        </tr>
                      )}
                      {visibleLines >= 7 && (
                        <tr className="hud-line-in">
                          <td className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 pr-4 py-1 align-top whitespace-nowrap">
                            status::
                          </td>
                          <td className="uppercase tracking-widest text-foreground py-1">
                            {t("about.estado")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {visibleLines < 7 && (
                    <span className="inline-block w-2 h-[1em] bg-primary animate-pulse mt-1" />
                  )}
                </div>
              </div>

              {/* Bottom: full-width — stack + career */}
              <div className="relative z-20 flex flex-col gap-3 px-6 pb-8 border-t border-border/40">
                {visibleLines >= 3 && (
                  <div className="hud-line-in pt-6">
                    <div className="border-l-2 border-primary pl-3 flex-1">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1.5">
                        stack::
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill, i) => (
                          <span
                            key={skill}
                            className="hud-line-in text-[10px] tracking-wider text-muted-foreground border border-border/70 px-2 py-0.5 rounded-sm"
                            style={{ animationDelay: `${i * 80}ms` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {visibleLines >= 4 && (
                  <div className="hud-line-in">
                    <div className="border-l-2 border-primary pl-3 flex-1">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1.5">
                        career::
                      </span>
                      <div className="space-y-1.5">
                        {jobs.map((job, i) => {
                          const isCurrent = i === jobs.length - 1;
                          return (
                            <div
                              key={job.company}
                              className="hud-line-in flex items-baseline gap-2 text-xs"
                              style={{ animationDelay: `${i * 180}ms` }}
                            >
                              <span className="text-muted-foreground/50 shrink-0 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={
                                  isCurrent ? "text-primary" : "text-foreground"
                                }
                              >
                                {job.company}
                              </span>
                              <span className="text-muted-foreground">
                                · {job.period}
                              </span>
                              {isCurrent && (
                                <span className="text-primary animate-pulse">
                                  ●
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {visibleLines >= 8 && (
                  <div className="hud-line-in">
                    <div className="border-l-2 border-primary pl-3 flex-1">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1.5">
                        education::
                      </span>
                      <div className="space-y-1.5">
                        {education.map((item, i) => (
                          <div
                            key={item.institution}
                            className="hud-line-in flex items-baseline gap-2 text-xs"
                            style={{ animationDelay: `${i * 180}ms` }}
                          >
                            <span className="text-muted-foreground/50 shrink-0 tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-foreground">
                              {item.degree}
                            </span>
                            <span className="text-muted-foreground">
                              · {item.institution}
                            </span>
                            <span className="text-muted-foreground/50">
                              · {item.period}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {visibleLines >= 9 && (
                  <div className="hud-line-in">
                    <div className="border-l-2 border-primary pl-3 flex-1">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">
                        philosophy::
                      </span>
                      <span className="uppercase tracking-widest text-foreground leading-snug text-xs">
                        {t("about.filosofia")}
                      </span>
                    </div>
                  </div>
                )}
                {visibleLines >= 10 && (
                  <div className="hud-line-in">
                    <div className="border-l-2 border-primary pl-3 flex-1">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">
                        focus::
                      </span>
                      <span className="uppercase tracking-widest text-foreground leading-snug text-xs">
                        {t("about.enfoque")}
                      </span>
                    </div>
                  </div>
                )}
                {visibleLines >= 3 && visibleLines < 10 && (
                  <span className="inline-block w-2 h-[1em] bg-primary animate-pulse ml-6" />
                )}
              </div>
            </div>

            {/* Footer status bar */}
            <div className="flex items-center gap-3 px-4 py-1.5 bg-muted/60 border-t border-border font-mono text-[10px] text-muted-foreground tracking-wider backdrop-blur-sm">
              <span>ID::jsalazarv</span>
              <span className="text-border">|</span>
              <span>{t("about.hud.location")}</span>
              <span className="text-border">|</span>
              <span className="text-green-500">● {t("about.hud.online")}</span>
              <a
                href="/cv.pdf"
                download
                className="ml-auto flex items-center gap-1.5 border border-border/70 px-2.5 py-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                <span>↓</span>
                <span>{t("about.downloadDossier")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
