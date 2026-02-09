"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const AlertContext = createContext("default");

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm flex items-center justify-start space-x-2 p-3 ",
  {
    variants: {
      variant: {
        default: "bg-[#2F86EB1A] border border-[#2F86EB] text-[#09090B]",
        primary: "bg-primary/5 border border-primary text-primary",
        destructive: "bg-[#DC26261A] border border-[#DC2626] text-[#DC2626]",
        success: "bg-[#47D28A1A] border border-[#47D28A] text-[#47D28A]",
        warning: "bg-[#FFC0211A] border border-[#FFC021] text-[#09090B]",
        info: "bg-[#2F86EB1A] border border-[#2F86EB] text-[#09090B]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const Alert = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => (
    <AlertContext.Provider value={variant}>
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    </AlertContext.Provider>
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("text-base font-medium", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => {
  const variant = useContext(AlertContext);

  const descriptionColors = {
    default: "text-[#09090B]",
    destructive: "text-[#DC2626]",
    success: "text-[#09090B]",
    warning: "text-[#09090B]",
    info: "text-[#09090B]"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "text-sm font-normal",
        descriptionColors[variant],
        className
      )}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
