import type { Tool } from "../types";

export function ToolBadge({ color, text }: Tool) {
  return (
    <div
      className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white text-xs font-bold grayscale hover:grayscale-0 transition-all duration-300`}
    >
      {text}
    </div>
  );
}
