"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function CheckboxInputForm({
  name,
  label,
  description,
  control,
  defaultValue = false,
  isHidden = false,
  disabled,
  errors,
  onCustomChange
}) {
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (onCustomChange) {
                      onCustomChange(checked);
                    }
                  }}
                  disabled={disabled}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
                <FormMessage className="text-xs font-light text-muted-foreground">
                  {description}
                </FormMessage>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />
    </div>
  );
}
