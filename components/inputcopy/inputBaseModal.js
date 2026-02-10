"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function BaseModal({ open, onOpenChange, title, children, footer }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "fixed z-50 w-[90%] max-w-[400px] bg-white p-0 border border-muted overflow-hidden",
                    "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
                    "md:left-[calc(260px+40px)] md:translate-x-0"
                )}
            >
                <DialogHeader className="p-4 flex flex-row items-center justify-between border-b border-slate-300">
                    <DialogTitle className="text-lg font-bold text-[#1e293b]">{title}</DialogTitle>
                </DialogHeader>

                <div className="bg-white px-4">
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