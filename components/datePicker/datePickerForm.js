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
import { BasicCalendar } from "../calendar/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { addYears, format, subYears } from "date-fns";

export default function DatePickerForm({
  name,
  label,
  control,
  placeholder = "Select Date",
  disabled,
  disabledOptions,
  captionLayout,
  defaultValue,
  errors
}) {
  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      : placeholder;

  const today = new Date();
  const yearsAgo = Number(format(subYears(today, 10), "yyyy"));
  const yearsLater = Number(format(addYears(today, 10), "yyyy"));

  return (
    <div className="w-full">
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover modal={false}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      !!disabled &&
                        "bg-slate-100 text-slate-400 border border-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(field.value)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 border-0 z-50"
                  align="start"
                  side="bottom"
                  sideOffset={4}
                  style={{ pointerEvents: "auto" }}
                  avoidCollisions={true}
                  collisionsPadding={8}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div style={{ pointerEvents: "auto" }}>
                    <BasicCalendar
                      disabled={disabledOptions}
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      initialFocus
                      captionLayout={captionLayout}
                      fromYear={yearsAgo}
                      toYear={yearsLater}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
