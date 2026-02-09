import { cn } from "@/lib/utils";
import { addMonths, eachMonthOfInterval, format, startOfYear } from "date-fns";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";

// Month picker grid
export function MonthPicker({ value, onChange, className, isRange }) {
  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: new Date(new Date().getFullYear(), 11, 1)
  });

  const endMonth = addMonths(value, isRange - 1);
  const displayText = isRange
    ? `${format(value, "MMM")} - ${format(endMonth, "MMM yyyy")}`
    : format(value, "MMM");

  return (
    <div className={cn("grid gap-2 p-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal"
              //   !date && "text-muted-foreground"
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
          <div className="grid grid-rows-3 grid-cols-4 p-5 gap-2">
            {months.map((month) => (
              <button
                key={month.toISOString()}
                onClick={() => onChange?.(month)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm",
                  value &&
                    format(value, "MMM yyyy") === format(month, "MMM yyyy")
                    ? "bg-purple-500 text-white"
                    : "hover:bg-gray-100"
                )}
              >
                {format(month, "MMM")}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
