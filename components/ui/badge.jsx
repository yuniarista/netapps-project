import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-1 h-auto w-fit cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[#6332CE] text-white hover:bg-[#6332CECC]",
        secondary: "bg-[#F4F4F5] text-black hover:bg-[#F4F4F5CC]",
        outlined:
          "border border-[#D1D5DB] bg-white text-black hover:bg-[#F4F4F5]",
        destructive: "bg-[#EF4444] text-white hover:bg-[#EF4444CC]",
        active: "bg-[#4DB52B] text-white hover:bg-[#4DB52BCC]",
        offline: "bg-[#DC2626] text-white hover:bg-[#DC2626CC]",
        "outlined-active": "bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#F4F4F5]",
        "outlined-idle": "bg-[#6332CE]/10 text-[#6332CE] hover:bg-primary/30",
        "outlined-destructive": "bg-red-100 text-destructive hover:bg-red-200",
        "outlined-yellow": "bg-yellow-50 text-yellow-600 hover:bg-yellow-50",
        "outlined-secondary": "bg-gray-100 text-gray-400 hover:bg-gray-100",
        "outlined-info": "bg-blue-100 text-blue-500 hover:bg-blue-200"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

function Badge({ className, variant = "primary", ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
