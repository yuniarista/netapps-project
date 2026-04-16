"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function SelectInputUncontrolled({
  label,
  placeholder,
  disabled,
  isHidden = false,
  options = [],
  selectedValue,
  setSelectedValue,
  handleCustomChange
}) {
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        value={selectedValue}
        onValueChange={(selectedValue) => {
          const selected = options?.find(
            (option) =>
              (option.value ?? option.id)?.toString() ===
              selectedValue?.toString()
          );
          if (selected) {
            setSelectedValue(selected?.value ?? selected?.id);
          }
          handleCustomChange(selectedValue);
        }}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue
            className="placeholder-gray-400 text-gray-700"
            placeholder={placeholder || `Pilih ${label}`}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem
                key={option.value || option.id}
                value={option.value || option.id}
                className={"capitalized"}
              >
                {option.value || option.label || option.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
