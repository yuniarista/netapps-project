"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

export default function AccordionInputForm({
  name,
  label,
  control,
  options = [],
  isHidden = false,
  defaultValue = [],
  errors,
  onChange,
  firstRenderOpen = false,
}) {
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const value = field.value || [];

          const toggleValue = (option) => {
            const newValue = value.includes(option)
              ? value.filter((item) => item !== option)
              : [...value, option];
            field.onChange(newValue);
            onChange?.(option);
          };

          return (
            <FormItem>
              <FormControl>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={firstRenderOpen ? "item-1" : undefined}
                >
                  <AccordionItem
                    value="item-1"
                    className=" "
                  >
                    {/* <AccordionTrigger className="px-4 py-3 rounded-lg text-left font-medium text-gray-900 hover:bg-gray-100">
                      {label}
                    </AccordionTrigger> */}
                    <AccordionTrigger className="px-2 py-2 rounded-lg font-medium text-gray-900 hover:bg-gray-100 hover:no-underline group">
                      <div className="flex items-center justify-between w-full pr-2">
                        <span className="text-sm font-semibold">{label}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Select All
                          </button>

                          <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            Clear All
                          </button>

                          <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onChange) onChange("delete-feature");
                            }}
                          >
                            <Trash className="w-4 h-4 text-red-500" />
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-2 data-[state=closed]:p-0 bg-gray-100">
                      <div className="grid grid-cols-4 gap-4 justify-between">
                        {options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center border border-[1px] border-slate-400 px-2 rounded-[5px] bg-white"
                          >
                            <Checkbox
                              id={`${name}-${option}`}
                              checked={value.includes(option)}
                              onCheckedChange={() => toggleValue(option)}
                            />
                            <label
                              htmlFor={`${name}-${option}`}
                              className="text-sm text-black font-medium px-2 py-1  rounded-md text-left"
                            >
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
