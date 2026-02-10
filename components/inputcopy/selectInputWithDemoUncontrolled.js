"use client";

import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Image from "next/image";

export default function SelectInputWithDemoUncontrolled({
  name,
  label,
  placeholder,
  disabled,
  defaultValue,
  isHidden = false,
  options = [],
  errors,
  selectedValue,
  setSelectedValue
}) {
  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormLabel>{label}</FormLabel>
      <Select
        value={selectedValue}
        onValueChange={(selectedValue) => {
          const selected = options.find(
            (option) =>
              (option.value ?? option.id)?.toString() ===
              selectedValue?.toString()
          );
          if (selected) {
            setSelectedValue(selected?.value ?? selected?.id);
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn("h-[2.5rem]", errors[name] && "border-destructive")}
        >
          <SelectValue placeholder={placeholder || `Pilih ${label}`}>
            {selectedValue ? (
              <div className="flex items-center gap-3 py-1">
                <span className="truncate">
                  {selectedValue.value ||
                    selectedValue.transitionName ||
                    selectedValue.name ||
                    selectedValue.label}
                </span>
              </div>
            ) : (
              placeholder || `Pilih ${label}`
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[280px]">
          <div className="grid grid-cols-2 gap-2 p-2">
            {options.map((option) => (
              <SelectItem
                key={option.value || option.id}
                value={(option.value || option.id)?.toString()}
                className={cn(
                  "h-auto p-1 cursor-pointer",
                  option.value === selectedValue?.value &&
                    "outline outline-primary"
                )}
              >
                <div className="w-full flex-col justify-center items-center gap-3">
                  {/* Transition Name and additional info */}
                  <div className="flex-1 w-full">
                    <div className="font-medium text-sm truncate text-center">
                      {option.value ||
                        option.transitionName ||
                        option.name ||
                        option.label}
                    </div>
                  </div>

                  {/* Image */}
                  {option.image ? (
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={option.image}
                        alt={
                          option.transitionName || option.name || "Transition"
                        }
                        fill
                        className="object-cover rounded"
                        sizes="40px"
                      />
                    </div>
                  ) : (
                    <video
                      autoPlay
                      className="w-full h-auto"
                      src="http://192.168.254.95:9000/ptsaiteknologi/1755138277799-sebuah_video.mp4"
                    />
                  )}

                  {/* Optional: Color indicator if you still want it */}
                  {option.color && (
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 border border-border"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
