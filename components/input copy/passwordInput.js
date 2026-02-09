"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

export default function PasswordInput({
  name,
  label,
  control,
  errors,
  placeholder,
  defaultValue
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue ?? ""}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder || `Input ${label}`}
                autoComplete="current-password"
                {...field}
                className={`pr-10 ${errors[name] ? "border-red-500" : ""}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>
          <FormMessage>{errors[name]?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
