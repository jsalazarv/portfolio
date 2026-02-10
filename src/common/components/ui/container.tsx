import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/common/lib/utils";

const containerVariants = cva(
  "mx-auto max-w-3xl bg-card border border-border rounded-2xl",
  {
    variants: {
      variant: {
        header: "px-4 md:px-8 mt-5 mb-4",
        footer: "px-4 md:px-8 py-8",
        default: "px-4 md:px-8 py-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ContainerProps
  extends React.ComponentProps<"div">, VariantProps<typeof containerVariants> {}

export function Container({ className, variant, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ variant }), className)} {...props} />
  );
}
