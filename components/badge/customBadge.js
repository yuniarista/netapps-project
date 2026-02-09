import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";

const customVariants = {
  primary: "bg-[#6332CE] text-white hover:bg-[#6332CECC] cursor-pointer",
  secondary: "bg-[#F4F4F5] text-black hover:bg-[#F4F4F5CC] cursor-pointer",
  outlined:
    "border border-[#D1D5DB] bg-white text-black hover:bg-[#F4F4F5] cursor-pointer",
  destructive: "bg-[#EF4444] text-white hover:bg-[#EF4444CC] cursor-pointer",
  active: "bg-[#4DB52B] text-white hover-none hover:bg-[#4DB52BCC]",
  offline: "bg-[#DC2626] text-white hover-none hover:bg-[#DC2626CC]"
};

export default function CustomBadge({ label, variant = "primary", className }) {
  return (
    <div
      className={cn(
        badgeVariants({ variant: "default" }),
        "rounded-full text-xs font-semibold px-2.5 py-1 h-auto w-fit ",
        customVariants[variant],
        className
      )}
    >
      {label}
    </div>
  );
}
