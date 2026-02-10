"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function AccordionInputForm({
  name,
  label,
  control,
  options = [],
  isHidden = false,
  defaultValue = [],
  errors,
  onChange,
  firstRenderOpen = false
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
                    className="border-[1px] border-[#E4E4E7]"
                  >
                    <AccordionTrigger className="px-4 py-3 rounded-lg text-left font-medium text-gray-900 hover:bg-gray-100">
                      {label}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 data-[state=closed]:p-0">
                      <div className="flex flex-wrap gap-3">
                        {options.map((option) => (
                          <div key={option} className="flex items-center gap-2">
                            <Checkbox
                              id={`${name}-${option}`}
                              checked={value.includes(option)}
                              onCheckedChange={() => toggleValue(option)}
                            />
                            <label
                              htmlFor={`${name}-${option}`}
                              className="text-sm text-black font-medium px-2 py-1  rounded-md"
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
