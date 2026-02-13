import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 focus-visible:outline-[#A1A1AA] disabled:bg-[#6332CEE6] disabled:text-[#FFF1F2]",
        secondary:
          "bg-[#F4F4F5] text-[#18181B] hover:bg-[#F4F4F5CC] focus-visible:outline-[#A1A1AA] disabled:bg-[#F4F4F5E6] disabled:text-[#18181B]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#EF4444CC] focus-visible:outline-[#A1A1AA] disabled:bg-[#EF4444E6] disabled:text-[#FFF1F2]",
        outline:
          "bg-white text-[#18181B] border border-[#E4E4E7] hover:bg-[#F4F4F5CC] focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B]",
        link: "bg-white text-primary hover:text-[#18181B] underline hover:bg-white focus-visible:outline-[#A1A1AAE6] disabled:text-[#18181B] disabled:cursor-not-allowed"
      },
      size: {
        sm: "py-[6px] px-[12px] text-sm",
        md: "py-[8px] px-[16px] text-sm",
        lg: "py-[10px] px-[24px] text-sm",
        full: "w-full py-[10px]",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
        type={type}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" /> {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
