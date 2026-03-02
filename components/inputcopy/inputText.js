// components/custom-input-with-button.js
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

export default function InputText({
  name,
  variant = "default",
  label,
  control,
  placeholder,
  helperText,
  disabled = false,
  value,
  onChange,
  showLabel = true,
  layout = "vertical",
  type,
  endAdornment = null,
  readOnly = false,
}) {
  const isDestructive = variant === "destructive";
  const isHorizontal = layout === "horizontal";
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "w-full",
        isHorizontal ? "flex items-center gap-4" : "flex flex-col gap-1",
        disabled && "opacity-60 cursor-not-allowed",
      )}
    >
      {showLabel && (
        <Label
          className={cn(
            "text-sm font-medium transition-colors",
            disabled ? "text-slate-400" : "text-slate-900",
          )}
        >
          {label}
        </Label>
      )}

      <div className="flex w-full items-center">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            const hasValue =
              field.value !== undefined &&
              field.value !== "" &&
              field.value !== null &&
              field.value !== 0 &&
              field.value !== "0";


            return (
              <div className="w-full flex flex-col">
                <Input
                  {...field}
                  value={field.value ?? ""}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    field.onBlur();
                  }}
                  className={cn(
                    "rounded-[5px] border px-3 text-sm transition-all",
                    hasValue && !isFocused
                      ? "border-transparent bg-transparent shadow-none"
                      : "border-slate-300 bg-white",
                    error && "border-red-500",

                    disabled &&
                      "bg-slate-50 border-slate-300 cursor-not-allowed",
                    readOnly && "bg-slate-50 text-slate-900 cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  )}
                  type={type ?? "text"}
                  readOnly={readOnly}
                />
              </div>
            );
          }}
        />
        {endAdornment}
      </div>

      {helperText && (
        <p
          className={cn(
            "text-sm mt-1",
            disabled
              ? "text-slate-300"
              : isDestructive
                ? "text-red-600"
                : "text-slate-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
