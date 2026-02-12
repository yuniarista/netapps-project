"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import InputText from "./inputText";

export default function TextInputForm({
  name,
  type = "text",
  rows,
  label,
  control,
  disabled,
  autoFocus,
  endAdornment,
  defaultValue,
  placeholder,
  isHidden = false,
  required = false,
  helperText = "",
  errors,
  readOnly
}) {
  const isTextarea = !!rows;
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue ?? ""}
        render={({ field }) => {
          const handleChange = (event) => {
            let inputValue = event.target.value;
            if (type === "number") {
              const numericValue = parseInt(inputValue);
              inputValue =
                !isNaN(numericValue) && numericValue >= 0 ? numericValue : "";
            }

            field.onChange(inputValue);
          };
          return (
            <FormItem>
              <FormLabel className="flex items-center gap-0"><span>{String(label).trim()}</span>{required && <span className="text-red-500">*</span>}</FormLabel>
              <FormControl>
                {isTextarea ? (
                  <Textarea
                    rows={rows}
                    className="rounded-[10px]"
                    placeholder={placeholder || `Input ${label}`}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    {...field}
                    value={field.value ?? ""}
                    onChange={handleChange}
                  />
                ) : (
                  <InputText
                    {...field}
                    label={label}
                    name={name}
                    type={type}
                    placeholder={placeholder || `Input ${label}`}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    value={
                      type === "number" && field.value === 0 ? "0" : field.value
                    }
                    onChange={handleChange}
                    endAdornment={endAdornment}
                    // variant={!!errors[name] && "destructive"}
                    showLabel={false}
                    readOnly={readOnly}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
