// components/custom-input-with-button.js
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function InputText({
  name,
  variant = "default",
  label,
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
      )}
    >
      {showLabel && (
        <Label
          className={cn(
            "text-sm font-medium",
            isDestructive ? "text-red-600" : "text-slate-900",
          )}
        >
          {label}
        </Label>
      )}

      <div className="flex w-full gap-2 items-center">
        <Input
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "rounded-md border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            disabled && "bg-slate-100 text-slate-400",
            readOnly && "bg-slate-50 text-slate-900 cursor-not-allowed",
            isDestructive && "border-red-500 focus-visible:ring-red-500",
            !isDestructive && "border-slate-300 focus-visible:ring-slate-900",
          )}
          type={type ?? "text"}
          readOnly={readOnly}
        />
        {endAdornment}
      </div>

      {helperText && (
        <p
          className={cn(
            "text-sm mt-1",
            isDestructive ? "text-red-600" : "text-slate-500",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
