"use client";

import * as React from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RangeCalendar } from "../calendar/rangeCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

export function DateRangePicker({
  className,
  options = [],
  date,
  optionValue,
  setOptionValue,
  handleSelect,
  placeHolder
}) {
  const hasOptions = options?.length > 0;

  const CalendarPopover = (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-0"
        align="start"
        avoidCollisions={true}
        collisionsPadding={8}
        sideOffset={4}
      >
        <RangeCalendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          className="custom-calendar"
        />
      </PopoverContent>
    </Popover>
  );

  if (!hasOptions) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-fit justify-start items-center text-left font-normal gap-x-2",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date?.to || date?.from === date?.to ? (
                <>
                  {format(date.from, "dd MMM yyyy")} -{" "}
                  {format(date.to, "dd MMM yyyy")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeHolder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-0"
          align="start"
          avoidCollisions={true}
          collisionsPadding={8}
          sideOffset={4}
        >
          <RangeCalendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            className="custom-calendar"
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex items-center border border-[#E4E4E7] rounded-[10px]">
      {CalendarPopover}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id="date"
            variant="ghost"
            className={cn(
              "w-fit justify-start items-center text-left font-normal gap-x-2 pl-1",
              !date && "text-muted-foreground"
            )}
          >
            {date?.from ? (
              date?.to || date?.from === date?.to ? (
                <>
                  {format(date.from, "dd MMM yyyy")} -{" "}
                  {format(date.to, "dd MMM yyyy")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeHolder}</span>
            )}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.onClick}
              className={cn(
                "flex items-center space-x-2",
                optionValue === option.label && "font-bold",
                option.className || ""
              )}
            >
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
