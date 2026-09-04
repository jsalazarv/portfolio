import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Line =
  | { type: "command"; text: string }
  | { type: "pass"; role: string; company: string; period: string }
  | { type: "running"; role: string; company: string; period: string }
  | { type: "summary"; text: string };

const DELAY = 380;
const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function JobDesc({ role, company, period }: { role: string; company: string; period: string }) {
  return (
    <span>
      <span className="text-foreground">{role}</span>
      <span className="text-muted-foreground"> @ </span>
      <span className="text-primary">{company}</span>
      <span className="text-muted-foreground"> · {period}</span>
    </span>
  );
}

export function Terminal({ runCount }: { runCount: number }) {
  const { t } = useTranslation();
  const role = t("about.terminal.role");
  const command = t("about.terminal.command");
  const jobs = t("about.terminal.jobs", { returnObjects: true }) as Array<{ company: string; period: string }>;

  const lines: Line[] = [
    { type: "command", text: command },
    { type: "pass",    role, company: jobs[0].company, period: jobs[0].period },
    { type: "pass",    role, company: jobs[1].company, period: jobs[1].period },
    { type: "pass",    role, company: jobs[2].company, period: jobs[2].period },
    { type: "running", role, company: jobs[3].company, period: jobs[3].period },
  ];

  const [visible, setVisible] = useState<Line[]>([]);
  const [done, setDone] = useState(false);
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  useEffect(() => {
    if (runCount === 0) return;

    setVisible([]);
    setDone(false);

    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setVisible((prev) => [...prev, line]);
        if (i === lines.length - 1) setDone(true);
      }, i * DELAY),
    );

    return () => timers.forEach(clearTimeout);
  }, [runCount]);

  useEffect(() => {
    const last = visible[visible.length - 1];
    if (!last || last.type !== "running") return;

    const interval = setInterval(
      () => setSpinnerFrame((f) => (f + 1) % SPINNER.length),
      100,
    );
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-muted-foreground">
          jsalazarv ~ about
        </span>
      </div>

      {/* Body */}
      <div className="bg-card px-5 py-4 min-h-[140px] space-y-1">
        {visible.map((line, i) => (
          <div key={i}>
            {line.type === "command" && (
              <div>
                <span className="text-primary">jsalazarv</span>
                <span className="text-muted-foreground">:~$ </span>
                <span className="text-foreground">{line.text}</span>
              </div>
            )}
            {line.type === "pass" && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold shrink-0">✓ PASS</span>
                <JobDesc role={line.role} company={line.company} period={line.period} />
              </div>
            )}
            {line.type === "running" && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 font-bold shrink-0">
                  {SPINNER[spinnerFrame]} RUN
                </span>
                <JobDesc role={line.role} company={line.company} period={line.period} />
              </div>
            )}
            {line.type === "summary" && (
              <div className="mt-2 pt-2 border-t border-border text-green-500 font-semibold">
                {line.text}
              </div>
            )}
          </div>
        ))}

        {done && (
          <div>
            <span className="text-primary">jsalazarv</span>
            <span className="text-muted-foreground">:~$ </span>
            <span className="inline-block w-2 h-4 bg-foreground align-middle animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
