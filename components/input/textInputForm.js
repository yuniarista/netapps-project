"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  helperText,
  errors,
  readOnly,
  maxLength,
}) {
  const isTextarea = !!rows;

  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue ?? ""}
        render={({ field, fieldState: { error } }) => {
          const handleChange = (event) => {
            let inputValue = event.target.value;
            
            if (maxLength && inputValue.length > maxLength) {
              inputValue = inputValue.substring(0, maxLength);
            }

            if (type === "number") {
              const numericValue = parseInt(inputValue);
              inputValue =
                !isNaN(numericValue) && numericValue >= 0 ? numericValue : "";
            }

            field.onChange(inputValue);
          };

          const currentLength = field.value?.toString().length || 0;

          return (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="flex items-center gap-0">
                  <span>{String(label).trim()}</span>
                  {required && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>

                {maxLength && (
                  <span className={cn(
                    "text-sm font-medium",
                    currentLength >= maxLength ? "text-red-500" : "text-slate-400"
                  )}>
                    {currentLength}/{maxLength}
                  </span>
                )}
              </div>

              <FormControl>
                {isTextarea ? (
                  <Textarea
                    rows={rows}
                    className="rounded-[5px]"
                    placeholder={placeholder || `Input ${label}`}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    {...field}
                    maxLength={maxLength}
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
                    maxLength={maxLength}
                    value={
                      type === "number" && field.value === 0 ? "0" : field.value
                    }
                    onChange={handleChange}
                    endAdornment={endAdornment}
                    showLabel={false}
                    readOnly={readOnly}
                  />
                )}
              </FormControl>
              
              {helperText && !error && (
                <p className="text-xs text-slate-500">{helperText}</p>
              )}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}