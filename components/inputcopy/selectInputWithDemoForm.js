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
import Image from "next/image";

export default function SelectInputWithImageAndTransition({
  name,
  label,
  control,
  placeholder,
  disabled,
  defaultValue,
  isHidden = false,
  options = [],
  errors
}) {
  // Find selected option for display in trigger
  const getSelectedOption = (value) => {
    return options.find(
      (option) => (option.value ?? option.id)?.toString() === value?.toString()
    );
  };

  return (
    <div className={cn("w-full", isHidden && "hidden")}>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          const selectedOption = getSelectedOption(field.value);
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(selectedValue) => {
                    const selected = options.find(
                      (option) =>
                        (option.value ?? option.id)?.toString() ===
                        selectedValue?.toString()
                    );
                    if (selected) {
                      field.onChange(selected?.value ?? selected?.id);
                    }
                  }}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={cn(
                      "h-[2.5rem]",
                      errors[name] && "border-destructive"
                    )}
                  >
                    <SelectValue placeholder={placeholder || `Pilih ${label}`}>
                      {selectedOption ? (
                        <div className="flex items-center gap-3 py-1">
                          <span className="truncate">
                            {selectedOption.value ||
                              selectedOption.transitionName ||
                              selectedOption.name ||
                              selectedOption.label}
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
                            "w-full h-auto p-1 cursor-pointer",
                            option.value === selectedOption?.value &&
                              "outline outline-primary"
                          )}
                        >
                          <div className="w-full flex flex-col items-stretch gap-3">
                            {/* title */}
                            <div className="w-full">
                              <div className="font-medium text-sm truncate text-center">
                                {option.value ||
                                  option.transitionName ||
                                  option.name ||
                                  option.label}
                              </div>
                            </div>

                            {/* media */}
                            {option.image ? (
                              <div className="relative h-20 w-28 overflow-hidden rounded self-stretch min-w-0">
                                <Image
                                  src={option.image} // "/transition-type/None.png" dsb.
                                  alt={
                                    option.transitionName ||
                                    option.name ||
                                    "Transition"
                                  }
                                  fill
                                  className="object-cover block" // pakai block, jangan tambah w-full/h-full saat fill
                                  sizes="100vw"
                                  onError={() => console.error("Image error")}
                                  onLoad={() => console.log("Image loaded")}
                                />
                              </div>
                            ) : (
                              <div className="relative h-20 w-28 overflow-hidden rounded">
                                <video
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  controls={false}
                                  className="w-full h-24 object-cover rounded"
                                >
                                  {/* Gunakan <source> + type untuk bantu browser memilih decoder */}
                                  <source src={option.video} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                                {/* <video
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  onError={(err) => console.log(err)}
                                  src={option.video} // e.g. "/transition-type/Fade.mp4"
                                /> */}
                              </div>
                            )}

                            {option.color && (
                              <div
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: option.color }}
                              />
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </div>
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
