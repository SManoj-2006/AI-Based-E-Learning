import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        achievement: "border-transparent gradient-achievement text-achievement-foreground",
        xp: "border-transparent bg-xp text-xp-foreground hover:bg-xp/80",
        streak: "border-transparent bg-streak text-streak-foreground hover:bg-streak/80",
        common: "border-border bg-secondary/50 text-secondary-foreground",
        rare: "border-xp/30 bg-xp/10 text-xp",
        epic: "border-primary/30 bg-primary/10 text-primary",
        legendary: "border-achievement/30 gradient-achievement text-achievement-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
