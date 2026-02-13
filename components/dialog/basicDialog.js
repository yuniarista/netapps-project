"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
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
  modalType,
}) => {
  // Tentukan posisi berdasarkan modalType
  const isEditOrCreate = modalType === "edit" || modalType === "add" || modalType === "create";
  const isDelete = modalType === "delete";
  const positionClass = isEditOrCreate
    ? "fixed left-[230px] top-10 max-h-[calc(100vh-40px)] overflow-y-auto"
    : "fixed left-1/2 top-10 -translate-x-1/2 translate-y-0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        positionClass={positionClass}
        className={`max-w-xl max-h-full rounded-[10px] border border-zinc-200 shadow-md overflow-y-auto scrollbar-hidden-y ${isDelete ? "p-0" : ""} ${className}`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className={isDelete ? "border-b border-slate-200 bg-white px-6 py-4" : ""}>
          <DialogTitle
            className={cn(
              "w-full text-base font-semibold text-zinc-900 leading-5 ",
              `text-${headerAlignment}`
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
        <div className={isDelete ? "px-6" : ""}>{children}</div>
        {footer && <DialogFooter className={isDelete ? "border-t border-slate-200 bg-white px-6 py-4 mt-0" : "mt-6"}>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
