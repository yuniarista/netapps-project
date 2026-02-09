import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import IconifyIcon from "../icon";

const variants = {
  primary:
    "bg-[#6332CE] text-white hover:bg-[#7246D2] focus-visible:outline-[#A1A1AA] disabled:bg-[#6332CEE6] disabled:text-[#FFF1F2]",
  secondary:
    "bg-[#F4F4F5] text-[#18181B] hover:bg-[#F4F4F5CC] focus-visible:outline-[#A1A1AA] disabled:bg-[#F4F4F5E6] disabled:text-[#18181B]",
  destructive:
    "bg-[#EF4444] text-white hover:bg-[#EF4444CC] focus-visible:outline-[#A1A1AA] disabled:bg-[#EF4444E6] disabled:text-[#FFF1F2]",
  outline:
    "bg-white text-[#18181B] border border-[#E4E4E7] hover:bg-[#F4F4F5CC] focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B]",
  link: "bg-white text-[#18181B] hover:text-[#18181B] hover:underline hover:bg-white focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B] disabled:cursor-not-allowed"
};

const parentVariants = {
  primary:
    "bg-[#6332CE] text-white focus-visible:outline-[#A1A1AA] disabled:bg-[#6332CEE6] disabled:text-[#FFF1F2]",
  secondary:
    "bg-[#F4F4F5] text-[#18181B] focus-visible:outline-[#A1A1AA] disabled:bg-[#F4F4F5E6] disabled:text-[#18181B]",
  destructive:
    "bg-[#EF4444] text-white focus-visible:outline-[#A1A1AA] disabled:bg-[#EF4444E6] disabled:text-[#FFF1F2]",
  outline:
    "bg-white text-[#18181B] border border-[#E4E4E7] focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B]",
  link: "bg-white text-[#18181B] focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B] disabled:cursor-not-allowed"
};

const sizes = {
  sm: "py-[6px] px-[12px] text-sm",
  md: "py-[8px] px-[16px] text-sm",
  lg: "py-[12px] px-[32px] text-sm"
};

export default function WithDropdownButton({
  children,
  variant = "primary",
  parentVariant = "primary",
  size = "md",
  loading = false,
  className,
  options = [],
  ...props
}) {
  return (
    <div
      className={cn(
        "flex items-center rounded-[10px]",
        parentVariants[parentVariant]
      )}
    >
      <Button
        className={cn(
          "font-medium",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4 " />
            {children}
          </>
        ) : (
          children
        )}
      </Button>
      <Separator orientation="vertical" className="h-6 bg-slate-500" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              className={cn(
                "font-medium",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                variants[variant],
                sizes[size],
                className
              )}
              disabled={loading || props.disabled}
              {...props}
            >
              <ChevronDown />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.onClick}
              className={cn(
                "flex items-center space-x-2",
                option.className || ""
              )}
            >
              <IconifyIcon icon={option.icon} />
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
