"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { BILLING_VARIABLES } from "@/constants/variables";

export default function VariableDialog({ open, onOpenChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent
        positionClass="fixed left-[calc(var(--sidebar-width,240px)+610px)] top-10 translate-y-0"
        className={cn(
          "transition-all duration-300 gap-0 p-7 rounded-md bg-white shadow-none border border-zinc-200",
          "max-w-md w-[400px]", 
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold text-zinc-900 leading-tight">
            Variable
          </DialogTitle>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="outline-none text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </button>
        </DialogHeader>

        {!isCollapsed && (
          <div className="h-fit overflow-y-auto">
            {BILLING_VARIABLES.map((v) => (
              <div 
                key={v.label} 
              >
                <p className="font-medium text-sm">
                  - {v.label} = <span className="text-sm leading-relaxed">
                  {v.description}
                </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}