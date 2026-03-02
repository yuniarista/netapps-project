"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select/CustomSelect";
import { Plus, Search } from "lucide-react"; 
import BaseModal from "./inputBaseModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input"; 
import { useState, useMemo } from "react";

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
  helperText,
  errors,
  onAddNew,
  renderModalContent,
  showSearch = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic untuk memfilter opsi berdasarkan search query
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchQuery) return options;
    return options.filter((option) =>
      String(option[optionName])
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, showSearch, optionName]);

  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem>
              {label && (
                <FormLabel className="flex items-center gap-0">
                  <span>{String(label).trim()}</span>
                  {required && <span className="text-red-500">*</span>}
                </FormLabel>
              )}
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
                    {showSearch && (
                      <div className="flex items-center px-2 py-2 sticky top-0 bg-white z-10">
                        <div className="relative w-full">
                          <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="h-9 w-full pr-10 border rounded-md shadow-none text-sm"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                        </div>
                      </div>
                    )}
                    <div className="max-h-[200px] overflow-y-auto mt-1">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <SelectItem
                            key={option.value || option.id}
                            value={option.value || option.id}
                            className={cn(
                              "capitalize text-sm",
                              isMultiple &&
                                multipleData?.includes(
                                  option.value || option.id,
                                )
                                ? "bg-gray-200"
                                : "",
                            )}
                          >
                            {option[optionName]}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="py-2 px-2 text-xs text-slate-500 text-center">
                          No results found.
                        </div>
                      )}
                    </div>

                    {(onAddNew || renderModalContent) && (
                      <div
                        onClick={() => {
                          if (renderModalContent) setIsModalOpen(true);
                          if (onAddNew) onAddNew();
                        }}
                        className="flex items-center gap-2 px-2 py-2 mt-1 text-sm text-primary font-medium cursor-pointer hover:bg-blue-50 border-t rounded-none transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Add {label?.toLowerCase() || "item"}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              {helperText && !error && (
                <p className="text-[12px] text-slate-500 mt-1">{helperText}</p>
              )}
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
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="add-select-form">
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