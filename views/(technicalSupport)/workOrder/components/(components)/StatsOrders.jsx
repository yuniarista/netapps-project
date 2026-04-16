import CustomCard from "@/components/card/customCard";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

export const getBillingStyle = (type) => {
  switch (type) {
    case "paid":
      return { color: "text-[#16A34A]", bg: "bg-[#16A34A14]", border: "border-[#16A34A]", bgP: "bg-[#22C55E24]" };
    case "unpaid":
      return { color: "text-[#EA580C]", bg: "bg-[#EA580C14]", border: "border-[#EA580C]", bgP: "bg-[#EA580C1A]" };
  }
};

export default function StatsOrders({ data }) {
  const s = {
    unpaid: getBillingStyle("unpaid"),
    paid: getBillingStyle("paid"),
  };

  return (
    <div className="flex flex-row gap-4 w-fit">
      <CustomCard className={cn(s.unpaid.bg, s.unpaid.border)}>
        <div className="flex flex-col space-y-1 p-4">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            Unassigned
          </span>

          <div className={cn("text-lg font-medium", s.unpaid.color)}>
            {data?.unpaid_value || "0 Work Orders"}
          </div>

          <span className="text-xs text-muted-foreground flex items-center gap-1">
            Needs action
          </span>
        </div>
      </CustomCard>

      <CustomCard className={cn(s.paid.bg, s.paid.border)}>
        <div className="flex flex-col space-y-1 p-4">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            Completed
          </span>

          <div className={cn("text-lg font-medium", s.paid.color)}>
            {data?.unpaid_value || "0 Work Orders"}
          </div>

          <span className="text-xs text-muted-foreground flex items-center gap-1">
           This Month
          </span>
        </div>
      </CustomCard>
    </div>
  );
}