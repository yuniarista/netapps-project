"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { MultiSelect } from "../ui/multi-select";

export default function MultiSelectInputForm({
  name,
  label,
  control,
  placeholder,
  disabled,
  defaultValue = [],
  isHidden = false,
  options = [],
  errors,
  maxCount = 3,
  animation = 0,
  modalPopover = false,
  isUsingSelectAll = false
}) {
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <MultiSelect
                  options={options}
                  defaultValue={field.value || []}
                  onValueChange={field.onChange}
                  placeholder={placeholder || `Pilih ${label}`}
                  disabled={disabled}
                  maxCount={maxCount}
                  animation={animation}
                  modalPopover={modalPopover}
                  className={cn(errors?.[name] && "border-destructive")}
                  variant="outlined"
                  isUsingSelectAll={isUsingSelectAll}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
