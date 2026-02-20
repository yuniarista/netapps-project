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

import { X } from "lucide-react";

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
}) => {
  const isDelete = ["delete", "bulk-delete"].includes(modalType);

  const positionClass = isDelete
    ? "fixed left-1/2 top-20 -translate-x-1/2 translate-y-0"
    : "fixed left-[var(--sidebar-width,240px)] top-10 translate-y-0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        positionClass={positionClass}
        className={cn(
          "transition-all duration-300 ",
          isDelete
            ? "max-w-sm gap-0 rounded-xl border border-zinc-200"
            : "rounded-xl rounded-l-none border-l-0",
          className,
        )}
      >
        <DialogHeader className="relative flex items-center justify-center">
          <DialogTitle
            className={cn(
              "w-full text-base font-semibold text-zinc-900 leading-5 text-center",
              `text-${headerAlignment}`,
            )}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              margin: 0,
            }}
          >
            {title}
          </DialogTitle>

          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute outline-none top-1/2 right-0 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {description && (
          <DialogDescription className="text-sm text-zinc-500 leading-5 mt-1">
            {description}
          </DialogDescription>
        )}

        <div>{children}</div>

        {footer && <DialogFooter className="mt-6">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
