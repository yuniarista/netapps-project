"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

const CustomAlertDialog = ({
  trigger,
  title,
  message,
  cancelText = "Cancel",
  confirmText = "Continue",
  onConfirm
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent className="max-w-[512px] rounded-xl p-6 border border-zinc-200 shadow-xl top-10 left-1/2 -translate-x-1/2 translate-y-0">
        <AlertDialogCancel asChild>
          <button
            aria-label="Close"
            className="absolute z-50 top-4 right-4 text-zinc-400 hover:text-zinc-600 
               p-0 m-0 hover:bg-transparent bg-transparent border-none outline-none 
               focus:outline-none focus:ring-0"
          >
            <X className="w-5 h-5" />
          </button>
        </AlertDialogCancel>

        <AlertDialogHeader>
          <AlertDialogTitle className="text-base font-semibold text-zinc-900 leading-7">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-zinc-500 leading-5 mt-1">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-2 flex justify-end gap-1">
          <AlertDialogCancel className="rounded-[10px] bg-[#FFFFFF] border-2 text-[#18181B] hover:bg-[#F4F4F5] text-sm px-[12px] py-[6px] font-medium ">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-[10px] bg-[#6332CE] text-white hover:bg-[#6332CECC] text-sm px-[12px] py-[6px] font-medium"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
