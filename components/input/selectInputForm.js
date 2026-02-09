"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui-p/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-p/select";
// import IconifyIcon from "../icon";

export default function SelectInputForm({
  name,
  label,
  control,
  placeholder,
  disabled,
  defaultValue,
  isHidden = false,
  options = [],
  optionName,
  isMultiple = false,
  multipleData = [],
  errors,
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
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(selectedValue) => {
                    const selected = options?.find(
                      (option) =>
                        (option.value ?? option.id)?.toString() ===
                        selectedValue?.toString(),
                    );
                    if (selected) {
                      field.onChange(selected?.value ?? selected?.id);
                    }
                  }}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={cn(errors[name] && "border-destructive")}
                  >
                    <SelectValue
                      placeholder={placeholder || `Pilih ${label}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => {
                      return (
                        <SelectItem
                          key={option.value || option.id}
                          value={option.value || option.id}
                          className={cn(
                            "capitalize",
                            isMultiple &&
                              multipleData?.includes(option.value || option.id)
                              ? "bg-gray-200"
                              : "",
                          )}
                        >
                          {option[optionName]}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
