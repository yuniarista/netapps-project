"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";

export function RangeCalendar({ size = "md", ...props }) {
  const sizeClass = size === "sm" ? "scale-90" : "scale-100";

  const [date, setDate] = React.useState({
    from: new Date(2025, 5, 13),
    to: addDays(new Date(2025, 5, 14), 0)
  });

  return (
    <div
      className={cn(
        "w-fit mx-auto rounded-xl p-4 shadow-sm bg-white",
        sizeClass
      )}
      style={{
        "--primary": "221 83% 53%",
        "--primary-foreground": "0 0% 100%"
      }}
    >
      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className={cn(
          "[&_[data-selected]]:bg-transparent",
          "[&_[data-selected]]:text-white",
          "[&_[data-in-range]]:bg-[#FEF08A]",
          "[&_[data-in-range]]:text-black"
          // "[&_[data-range-start]]:rounded-l-md",
          // "[&_[data-range-end]]:rounded-r-md"
        )}
        {...props}
      />
    </div>
  );
}
