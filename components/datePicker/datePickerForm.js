"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BasicCalendar } from "../calendar/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TimePicker from "./timePicker";

export default function DatePickerForm({
  name,
  label,
  control,
  placeholder,
  disabled,
  required = false,
  isHidden = false,
  showTime = false,
  helperText,
  errors = {},
  defaultValue,
}) {
  const formatDate = (value) => {
    if (!value) return null;
    const date = new Date(value);

    const datePart = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    if (showTime) {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${datePart} . ${hours}:${minutes}`;
    }

    return datePart;
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, error }) => (
          <FormItem>
            {label && (
              <FormLabel className="flex items-center gap-0">
                <span>{String(label).trim()}</span>
                {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}

            <FormControl>
              <Popover modal={false}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "w-full justify-start text-left font-normal h-9 border-slate-300 focus:ring-1 focus:ring-blue-500",
                      !field.value && "text-muted-foreground",
                      errors[name] && "border-destructive",
                      disabled && "bg-slate-100 text-slate-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    <span className="truncate">
                      {field.value
                        ? formatDate(field.value)
                        : placeholder || `Pilih ${label}`}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 border-0 z-50 flex flex-row "
                  align="center"
                  side="top"
                  sideOffset={8}
                  avoidCollisions={true}
                  onWheel={(e) => e.stopPropagation()}
                >
                  <BasicCalendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={currentYear - 100}
                    toYear={currentYear}
                  />

                  {showTime && field.value && (
                    <TimePicker value={field.value} onChange={field.onChange} />
                  )}
                </PopoverContent>
              </Popover>
            </FormControl>

            {helperText && !error && (
              <p className="text-xs text-slate-500">{helperText}</p>
            )}
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
