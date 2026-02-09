"use client";

import * as React from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import weekOfYear from "dayjs/plugin/weekOfYear";

export function WeekPicker({ value, onChange, className }) {
  const [month, setMonth] = React.useState(value ? value.start : new Date());
  dayjs.extend(weekOfYear);

  // Generate weeks in month
  const weeksInMonth = React.useMemo(() => {
    const start = dayjs(month).startOf("month").startOf("week");
    const end = dayjs(month).endOf("month").endOf("week");

    const weeks = [];
    let current = start;
    let i = 1;

    while (current.isBefore(end)) {
      const weekStart = current;
      const weekEnd = current.endOf("week");

      weeks.push({
        label: `Week ${i}`,
        start: weekStart.toDate(),
        end: weekEnd.toDate()
      });

      current = current.add(1, "week");
      i++;
    }

    return weeks;
  }, [month]);

  // Display text
  const displayText = value
    ? `${dayjs(value.start).format("DD MMM")} - ${dayjs(value.end).format(
        "DD MMM YYYY"
      )}`
    : "Select week";

  const week = weeksInMonth.find(
    (val) =>
      dayjs(value.start).format("YYYY-MM-DD") ===
      dayjs(val.start).format("YYYY-MM-DD")
  );

  return (
    <div className={cn("grid gap-2 p-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal")}
          >
            <CalendarIcon className="mr-1 h-0.5 w-0.5 lg:h-4 lg:w-4 lg:mr-2" />
            <span className="hidden lg:block">{displayText}</span>
            <span className="block text-xs lg:hidden">{`${dayjs(
              week?.start
            ).format("MMM")} - ${week?.label}`}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-0"
          align="start"
          avoidCollisions={true}
          collisionsPadding={8}
          sideOffset={4}
        >
          <div className="space-y-4 p-4">
            {/* Header bulan */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setMonth(dayjs(month).subtract(1, "month").toDate())
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-semibold">
                {dayjs(month).format("MMMM YYYY")}
              </span>
              <button
                onClick={() => setMonth(dayjs(month).add(1, "month").toDate())}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Grid minggu */}
            <div className="grid grid-rows-2 grid-cols-3 gap-2">
              {weeksInMonth.map((week) => {
                const isSelected =
                  value &&
                  dayjs(value.start).isSame(week.start, "day") &&
                  dayjs(value.end).isSame(week.end, "day");

                return (
                  <button
                    key={week.label}
                    onClick={() => onChange?.(week)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm",
                      isSelected
                        ? "bg-purple-500 text-white"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {week.label}
                  </button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
