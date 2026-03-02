"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InputNumberForm({
  name,
  label,
  control,
  placeholder,
  description,
  disabled,
  isHidden = false,
  required = false,
  errors = {},
  helperText,
}) {
  return (
    <div className={cn("w-30", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          const handleStep = (step) => {
            const val = Number(field.value) || 0;
            field.onChange(val + step);
          };

          return (
            <FormItem>
              {label && (
                <FormLabel className="flex items-center gap-0">
                  <span>{String(label).trim()}</span>
                  {required && <span className="text-red-500">*</span>}
                </FormLabel>
              )}

              <FormControl>
                <div className="relative flex items-center group">
                  <Input
                    {...field}
                    type="number"
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                      "flex h-9 w-full rounded-[5px] border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-all outline-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                      "bg-background pr-10",
                      errors[name] && "border-destructive",
                      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    )}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? "" : Number(val));
                    }}
                  />

                  <div className="absolute right-0 flex flex-col w-8 overflow-hidden">
                    <button
                      type="button"
                      tabIndex="-1"
                      className="flex flex-1 items-center justify-center transition-colors"
                      onClick={() => handleStep(1)}
                    >
                      <ChevronUp className="h-3 w-3 opacity-50" />
                    </button>
                    <button
                      type="button"
                      tabIndex="-1"
                      className="flex flex-1 items-center justify-center transition-colors"
                      onClick={() => handleStep(-1)}
                    >
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </button>
                  </div>
                </div>
              </FormControl>
              {helperText && !error && (
                <p className="text-[12px] text-slate-500 mt-1">{helperText}</p>
              )}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
