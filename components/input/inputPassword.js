"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword({
  orientation = "vertical",
  variant = "default",
  label,
  placeholder,
  helperText,
  disabled = false,
  value,
  onChange,
  showLabel = true,
  layout = "vertical"
}) {
  const isDestructive = variant === "destructive";
  const isHorizontal = layout === "horizontal";
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className={cn(
        "w-full",
        isHorizontal ? "flex items-center gap-4" : "flex flex-col gap-1"
      )}
    >
      {showLabel && (
        <Label
          className={cn(
            "text-sm font-medium",
            isDestructive ? "text-red-600" : "text-slate-900"
          )}
        >
          {label}
        </Label>
      )}

      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pr-10 rounded-md border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            disabled && "bg-slate-100 text-slate-400",
            isDestructive && "border-red-500 focus-visible:ring-red-500",
            !isDestructive && "border-slate-300 focus-visible:ring-slate-900"
          )}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {helperText && (
        <p
          className={cn(
            "text-sm mt-1",
            isDestructive ? "text-red-600" : "text-slate-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
