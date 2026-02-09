import { Rows } from "lucide-react";
import { FormField } from "../ui-p/form";

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
  errors,
  readOnly,
}) {
  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div
          className={`flex flex-col gap-1 w-full ${isHidden ? "hidden" : ""}`}
        >
          {label && (
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {rows ? (
            <textarea
              id={name}
              {...field}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              readOnly={readOnly}
              className="flex rounded-[5px] border border-[#E2E8F0] px-2 py-2 text-sm"
            />
          ) : (
            <input
              id={name}
              type={type}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              readOnly={readOnly}
              className="flex rounded-[5px] border border-[#E2E8F0] px-2 py-2 text-sm"
            />
          )}
        </div>
      )}
    />
  );
}
