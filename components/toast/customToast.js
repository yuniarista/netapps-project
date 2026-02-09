"use client";

import { toast } from "sonner";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  InfoCircledIcon
} from "@radix-ui/react-icons";
import { TriangleAlert, X } from "lucide-react";

const toastConfig = {
  success: {
    icon: <CheckCircledIcon className="text-[#47D28A] mt-2 size-5" />,
    title: "Success",
    borderColor: "border-l-green-500"
  },
  error: {
    icon: <CrossCircledIcon className="text-[#F43964] mt-2 size-5" />,
    title: "Error",
    borderColor: "border-l-pink-500"
  },
  info: {
    icon: <InfoCircledIcon className="text-[#2F86EB] mt-2 size-5" />,
    title: "Info",
    borderColor: "border-l-blue-500"
  },
  warning: {
    icon: <TriangleAlert className="text-[#FFC021] mt-2 size-5" />,
    title: "Warning",
    borderColor: "border-l-yellow-500"
  }
};

export function CustomToast({ severity, message }) {
  const config = toastConfig[severity] ?? toastConfig.info;

  toast.custom(() => (
    <div
      className={`bg-white border ${config.borderColor} border-l-[9px] rounded-md shadow-md px-[10px] py-[8px] w-[400px] flex gap-2 relative`}
    >
      {config.icon}
      <div className="flex-1">
        <p className="text-sm font-semibold">{config.title}</p>
        <p className="text-sm text-muted-foreground leading-snug">{message}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="absolute right-2 top-2 text-gray-500 hover:text-black text-sm p-1"
      >
        <X className="size-3" />
      </button>
    </div>
  ));
}
