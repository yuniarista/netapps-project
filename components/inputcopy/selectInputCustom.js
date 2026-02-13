"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/CustomSelect";
import { Plus } from "lucide-react";
import BaseModal from "./inputBaseModal";
import { Button } from "../ui/button";
import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import IconifyIcon from "../icon";

export default function SelectInputCustom({
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
  required = false,
  helperText = "",
  errors,
  onAddNew,
  renderModalContent,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          const [isModalOpen, setIsModalOpen] = useState(false);
          return (
            <FormItem>
              {label && <FormLabel className="flex items-center gap-0"><span>{String(label).trim()}</span>{required && <span className="text-red-500">*</span>}</FormLabel>}
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
                            "capitalize text-sm",
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

                    {(onAddNew || renderModalContent) && (
                      <>
                        <div
                          onClick={(e) => {
                            if (renderModalContent) {
                              setIsModalOpen(true); // Buka modal internal
                            }
                            if (onAddNew) onAddNew(); // Jalankan fungsi external jika ada
                          }}
                          className="flex items-center gap-2 px-2 py-2 text-sm text-primary font-medium cursor-pointer hover:bg-blue-50 rounded-md transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          Add new {label?.toLowerCase() || "item"}
                        </div>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {renderModalContent && (
        <BaseModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={`Add ${label}`}
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="add-select-form"
              >
                Add
              </Button>
            </>
          }
        >
          {renderModalContent(() => setIsModalOpen(false))}
        </BaseModal>
      )}
    </div>
  );
}
