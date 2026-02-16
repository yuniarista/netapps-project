"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(" ", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 transition-all [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 w-full">
          {/* Checkbox external bisa disisipkan di children */}
          {children}
        </div>
        <svg
          className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "px-4 pb-1 pt-1 rounded-lg text-sm text-gray-700 bg-white transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  />
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
