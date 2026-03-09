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
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { TriangleAlert, X } from "lucide-react";
import { Separator } from "../ui/separator";

const CustomDialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className,
  footer,
  headerAlignment = "start",
  modalType,
  size = "3xl",
}) => {
  const isDelete = ["delete", "bulk-delete"].includes(modalType);
  const isForm = ["addModal", "editModal"].includes(modalType);

  const isModal = isDelete || isForm;

  const sizeClasses = {
    sm: "max-w-sm",      // ~384px
    md: "max-w-md",      // ~448px
    lg: "max-w-lg",      // ~512px
    xl: "max-w-xl",      // ~576px
    "600": "max-w-[600px]", 
    "3xl": "max-w-[800px]",  
  };

  const positionClass = isModal
    ? "fixed left-1/2 top-20 -translate-x-1/2 translate-y-0"
    : "fixed left-[var(--sidebar-width,240px)] top-10 translate-y-0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        positionClass={positionClass}
        className={cn(
          "transition-all duration-300",
          isModal
            ? "max-w-sm gap-0 p-0 rounded-md border border-zinc-200"
            : cn("rounded-md rounded-l-none border-l-0 gap-4 p-7", sizeClasses[size] || sizeClasses["3xl"]),
          className,
        )}
      >
        <DialogHeader
          className={`flex items-center justify-between align-self-stretch ${isModal ? "p-4" : ""}`}
        >
          <DialogTitle
            className={cn(
              "w-full flex items-center text-xl font-medium text-zinc-900 leading-7",
              `text-${headerAlignment}`,
            )}
          >
            <div className="flex flex-col gap-2">
        {isDelete ? <TriangleAlert className="w-6 h-6 text-red-500 font-light mr-2" /> : "" } {title}
        <span className="text-xs font-normal tracking-normal text-muted-foreground">{description}</span>
              </div>  
          </DialogTitle>

          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="outline-none text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className={isModal ? "border-t border-slate-200" : "pt-4"}>
          {children}
        </div>

        {footer && <DialogFooter className={"mt-6"}>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
