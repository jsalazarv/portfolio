import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function HomeStatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 px-6 flex items-center justify-between border-t border-border bg-secondary">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-background select-none">
            JS
          </span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Juan S.
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground tabular-nums">
        {time}
      </span>
    </div>
  );
}
