import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex justify-center items-center rounded-full px-2 border py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        "outlined-active":
          "bg-[#22C55E] text-white border-transparent hover:bg-green-600 ",
        "outlined-inactive":
          "bg-red-500 text-white border-transparent hover:bg-red-600",
        "outlined-red":
          "bg-red-500/10 text-red-600 hover:bg-red-500/20 border-none",
        "outlined-blue":
          "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-none",
        "outlined-yellow":
          "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-none",
        "outlined-green":
          "bg-green-500/10 text-green-600 hover:bg-green-500/20 border-none",
        "outlined-slate":
          "bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-none",
        "outlined-none": "bg-transparent border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
