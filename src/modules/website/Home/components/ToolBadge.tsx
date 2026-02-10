import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/common/lib/utils";

const toolBadgeVariants = cva(
  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-primary-foreground grayscale hover:grayscale-0 transition-all duration-300",
  {
    variants: {
      tool: {
        ai: "bg-[#FF9A00]",
        ps: "bg-[#31A8FF]",
        id: "bg-[#FF3366]",
        xd: "bg-[#FF61F6]",
        ae: "bg-[#9999FF]",
        pr: "bg-[#9999FF]",
      },
    },
  },
);

interface ToolBadgeProps extends VariantProps<typeof toolBadgeVariants> {
  text: string;
}

export function ToolBadge({ tool, text }: ToolBadgeProps) {
  return <div className={cn(toolBadgeVariants({ tool }))}>{text}</div>;
}
