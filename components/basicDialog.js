"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui-p/dialog";
import { cn } from "@/lib/utils";

const CustomDialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className,
  footer,
  headerAlignment = "center",
  titleClassname,
  withHeaderBorder = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn("max-w-md max-h-full rounded-[10px] border border-zinc-200 shadow-xl top-10 left-1/2 -translate-x-1/2 translate-y-0 overflow-hidden",
          className)}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className={cn(
          withHeaderBorder && "border-b border-slate-200 bg-white",
          headerAlignment === "center" ? "text-center" : "text-left"
        )}>
          <DialogTitle
            className={cn(
              "w-full text-base font-semibold text-zinc-900 leading-5 ",
              // `text-${headerAlignment}`,
              titleClassname,
            )}
          >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-zinc-500 leading-5 mt-1">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className={cn(withHeaderBorder ? "p-0" : "mt-4")}>{children}</div>
        {footer && <DialogFooter className="mt-6">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
