"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function RadioButtonInputForm({
  name,
  label,
  control,
  options = [],
  defaultValue,
  isHidden = false,
  errors,
  readOnly = false,
  disabled = false
}) {
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={readOnly ? undefined : field.onChange}
                value={field.value}
                className="flex space-x-6"
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center space-x-2",
                      (readOnly || disabled) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      disabled={disabled}
                      className={cn(readOnly && "pointer-events-none")}
                    />
                    <label
                      htmlFor={option.value}
                      className="text-sm font-medium"
                    >
                      {option.label || option.value}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage>{errors[name]?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
