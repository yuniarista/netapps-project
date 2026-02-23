"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

export default function BaseModal({
  open,
  onOpenChange,
  title,
  children,
  footer,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  
      <DialogOverlay
        className={cn(
          "fixed inset-0 bg-white/60",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0",
          "data-[state=closed]:fade-out-0",
          "duration-200"
        )}
      />

      <DialogContent
        className={cn(
          "fixed z-50 w-[90%] max-w-[400px] bg-white p-0 border border-muted overflow-hidden",
          "top-[35%] left-1/2 -translate-x-1/2",
          "data-[state=open]:animate-in",
          "data-[state=closed]:animate-out",
          "data-[state=open]:slide-in-from-top-5",
          "data-[state=closed]:slide-out-to-top-5",
          "duration-300"
        )}
      >
        <DialogHeader className="p-4 border-b border-slate-300">
          <DialogTitle className="text-lg font-bold text-[#1e293b]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-white">
          {children}
        </div>

        {footer && (
          <DialogFooter className="px-4 py-4 border-t border-slate-300">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
