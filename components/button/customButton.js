import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#2563EB] text-white hover:bg-blue-700 focus-visible:outline-[#A1A1AA] disabled:bg-[#6332CEE6] disabled:text-[#FFF1F2]",
  secondary:
    "bg-[#F4F4F5] text-[#18181B] hover:bg-[#F4F4F5CC] focus-visible:outline-[#A1A1AA] disabled:bg-[#F4F4F5E6] disabled:text-[#18181B]",
  destructive:
    "bg-[#EF4444] text-white hover:bg-[#EF4444CC] focus-visible:outline-[#A1A1AA] disabled:bg-[#EF4444E6] disabled:text-[#FFF1F2]",
  outline:
    "bg-white text-[#18181B] border hover:bg-[#F4F4F5CC] focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B] disabled:bg-white",
  link: "bg-white text-[#18181B] hover:text-[#18181B] hover:underline hover:bg-white focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B] disabled:cursor-not-allowed",
  ghost:
    "bg-transparent text-[#18181B] hover:bg-transparent focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B] disabled:bg-transparent disabled:cursor-not-allowed"
};

const sizes = {
  sm: "py-[6px] px-[12px] text-sm",
  md: "py-[8px] px-[10px] text-sm",
  lg: "py-[10px] px-[15px] text-sm"
};

export default function CustomButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  ...props
}) {
  return (
    <Button
      className={cn(
        "rounded-[8px] font-medium",
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
  );
}
