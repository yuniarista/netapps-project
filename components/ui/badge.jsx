import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

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
        "outlined-active": "bg-[#22C55E] text-white border-transparent hover:bg-green-600 ",
        "outlined-inactive": "bg-red-500 text-white border-transparent hover:bg-red-600",
        completed: "bg-green-500 text-white border-transparent hover:bg-green-600",
        "in-progress": "bg-blue-500 text-white border-transparent hover:bg-blue-600",
        scheduled: "bg-purple-500 text-white border-transparent hover:bg-purple-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}


export { Badge, badgeVariants }

