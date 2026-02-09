"use client";

import * as React from "react";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export function BasicCalendar({ size = "md", ...props }) {
  const sizeClass = size === "sm" ? "scale-90" : "scale-100";

  return (
    <div
      className={cn(
        "w-fit mx-auto rounded-xl border-[1px] border-[#E4E4E7] p-1 shadow-sm",
        sizeClass
      )}
      style={{
        "--primary": "263 60% 50%",
        "--primary-foreground": "0 0% 100%"
      }}
    >
      <ShadCalendar
        className={cn(
          "[&_[data-selected]]:rounded-md",
          "[&_[data-selected]]:bg-[#6332CE]",
          "[&_[data-selected]]:text-white",
          "[&_[data-selected]:hover]:bg-[#5124a3]"
        )}
        {...props}
      />
    </div>
  );
}
