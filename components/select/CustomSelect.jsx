"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-[5px] border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus-visible:ring-slate-900",
        "data-[state=open]:ring-2 data-[state=open]:ring-blue-500 data-[state=open]:ring-offset-2",
        
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef(
  ({ className, children, onActionClick, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        ref={ref}
        position="popper"
        align="center"
        sideOffset={-36}
        className={cn(
          "z-50 overflow-hidden rounded-[5px] border-2 border-[#E4E4E7] bg-white text-[#18181B] shadow-lg animate-in fade-in-80",
          "w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-0">
          <div className="flex flex-col">
            {children}
          </div>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-muted-foreground",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// const SelectItem = React.forwardRef(
//   ({ className, children, ...props }, ref) => (
//     <SelectPrimitive.Item
//       ref={ref}
//       className={cn(
//         "h-fit flex w-full cursor-default items-center justify-between select-none rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-[#F4F4F5CC] focus:bg-[#F4F4F5CC] focus:text-[#18181B]",
//         className
//       )}
//       {...props}
//     >
//       <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//       {props.isChecked && (
//         <span className="flex h-3.5 w-3.5 items-center justify-center">
//           <SelectPrimitive.ItemIndicator>
//             <Check className="h-4 w-4" />
//           </SelectPrimitive.ItemIndicator>
//         </span>
//       )}
//     </SelectPrimitive.Item>
//   )
// );
// SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      data-slot="select-item"
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-center py-0.5 outline-none group",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-[99%] items-center justify-between px-3 py-1 rounded-[5px] transition-colors",

          "group-data-[highlighted]:bg-[#F1F5F9]",
          "group-data-[state=checked]:bg-[#F1F5F9]",
        )}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-gray-800" />
        </SelectPrimitive.ItemIndicator>
      </div>
    </SelectPrimitive.Item>
  ),
);

const SelectSeparator = ({ className, ...props }) => (
  <SelectPrimitive.Separator
    className={cn("my-1 h-px bg-muted", className)}
    {...props}
  />
);

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};