"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  startOfDay,
  startOfWeek
} from "date-fns";
import { BasicCalendar } from "../calendar/calendar";

export function DatePicker({
  className,
  isRange = 0,
  onChange,
  defaultValue,
  rangeFormat = "month"
}) {
  const [date, setDate] = React.useState(defaultValue);
  const [month, setMonth] = React.useState(date ?? new Date());

  const handleSelect = (newDate) => {
    setDate(newDate);
    if (onChange) onChange(newDate); // lempar ke parent
  };

  const displayText = React.useMemo(() => {
    if (!date) return <span>Placeholder</span>;

    if (rangeFormat === "month") {
      if (isRange > 0) {
        const endMonth = addMonths(date, isRange);
        return `${format(date, "dd MMM")} - ${format(endMonth, "MMM yyyy")}`;
      }
    } else if (rangeFormat === "week") {
      return `${format(
        startOfWeek(date, { weekStartsOn: 0 }),
        "dd"
      )} - ${format(
        endOfWeek(date, {
          weekStartsOn: 0
        }),
        "dd MMM yyyy"
      )}`;
    }

    return format(date, "dd MMMM yyyy");
  }, [date, isRange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 " />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-0"
          align="start"
          avoidCollisions={true}
          collisionsPadding={8}
          sideOffset={4}
        >
          <BasicCalendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            month={month}
            onMonthChange={setMonth}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
