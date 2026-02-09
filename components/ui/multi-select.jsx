// src/components/multi-select.jsx

import * as React from "react";
import { cva } from "class-variance-authority";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
  X
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { Checkbox } from "./checkbox";
import IconifyIcon from "../icon";

// Variants
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 <hover:scale-105></hover:scale-105 duration-50",
  {
    variants: {
      variant: {
        primary: "bg-[#6332CE] text-white hover:bg-[#6332CECC]",
        secondary: "bg-[#F4F4F5] text-black hover:bg-[#F4F4F5CC]",
        outlined:
          "border border-[#D1D5DB] bg-white text-black hover:bg-[#F4F4F5]",
        destructive: "bg-[#EF4444] text-white hover:bg-[#EF4444CC]",
        active: "bg-[#4DB52B] text-white hover:bg-[#4DB52BCC]",
        offline: "bg-[#DC2626] text-white hover:bg-[#DC2626CC]",
        "outlined-active": "bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#F4F4F5]",
        "outlined-destructive": "bg-red-100 text-destructive hover:bg-red-200",
        "outlined-yellow": "bg-yellow-50 text-yellow-600 hover:bg-yellow-50",
        "outlined-secondary": "bg-gray-100 text-gray-400 hover:bg-gray-100",
        "outlined-info": "bg-blue-100 text-blue-500 hover:bg-blue-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export const MultiSelect = React.forwardRef(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      isUsingSelectAll = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleInputKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value || option.id);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-slate-300 focus-visible:ring-slate-900 shadow-sm min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find(
                      (o) => o.id === value || o.value === value
                    );
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          isAnimating ? "animate-bounce" : "",
                          multiSelectVariants({ variant }),
                          "rounded-sm font-medium text-xs"
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2 text-black" />
                        )}
                        {option?.label || option?.name}
                        <div
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                          className="bg-gray-100 rounded-xs size-4 cursor-pointer ml-2"
                        >
                          <X className="size-3 text-accent-foreground" />
                        </div>
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "bg-transparent text-slate-400 font-medium text-xs border-foreground/1 hover:bg-transparent rounded-sm",
                        isAnimating ? "animate-bounce" : "",
                        multiSelectVariants({ variant })
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more ...`}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          className={cn("w-full p-0 border border-slate-300 shadow-sm")}
          avoidCollisions={true}
          collisionsPadding={8}
          sideOffset={4}
        >
          <Command className={cn("w-full p-0")}>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              className={"border-b-slate-300"}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {isUsingSelectAll && (
                  <CommandItem
                    key="all"
                    onSelect={toggleAll}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 rounded-xs items-center justify-center border border-foreground",
                        selectedValues.length === options.length
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <IconifyIcon
                        icon={"material-symbols:check-rounded"}
                        size="0.25rem"
                      />
                    </div>
                    <span>(Select All)</span>
                  </CommandItem>
                )}
                {options.map((option, key) => {
                  const isSelected = selectedValues.includes(
                    option.value || option.id
                  );
                  return (
                    <CommandItem
                      key={option.value || option.id}
                      onSelect={() => toggleOption(option.value || option.id)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex size-4 rounded-xs items-center justify-center border border-foreground",
                          isSelected
                            ? "bg-gray-500 text-secondary"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <IconifyIcon
                          icon={"material-symbols:check-rounded"}
                          size="0.25rem"
                        />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 size-2 text-muted-foreground" />
                      )}
                      <span>{option.label || option.name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
              isAnimating ? "" : "text-muted-foreground"
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
