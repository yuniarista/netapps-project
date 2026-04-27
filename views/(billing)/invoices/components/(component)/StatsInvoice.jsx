import CustomCard from "@/components/card/customCard";
import { cn } from "@/lib/utils";
import { getBillingStyle } from "../../configs/billingStyle";
import { HelpCircle } from "lucide-react";

export default function StatsInvoice({ data }) {
  const s = {
    unpaid: getBillingStyle("unpaid"),
    paid: getBillingStyle("paid"),
    upcoming: getBillingStyle("upcoming-due"),
    overdue: getBillingStyle("overdue"),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <CustomCard className={cn(s.unpaid.bg, s.unpaid.border)}>
        <div className="flex flex-col space-y-3 px-4 py-4">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Total Unpaid <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </span>
          </div>
          <div className={cn("text-lg font-medium", s.unpaid.color)}>
            {data?.unpaid_value || "Rp 0"}
          </div>
        </div>
      </CustomCard>

      <CustomCard className={cn(s.paid.bg, s.paid.border)}>
        <div className="flex flex-col space-y-3 px-4 py-4">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Total Paid <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </span>
          </div>
          <div className={cn("text-lg font-medium", s.paid.color)}>
            {data?.paid_value || "Rp 0"}
          </div>
        </div>
      </CustomCard>

      <CustomCard className={cn(s.upcoming.bg, s.upcoming.border)}>
        <div className="flex flex-col space-y-3 px-4 py-4">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Upcoming Due <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </span>
          </div>
          <div className={cn("text-lg font-medium", s.upcoming.color)}>
            {data?.upcoming_value || "Rp 0"}
          </div>
        </div>
      </CustomCard>

      <CustomCard className={cn(s.overdue.bg, s.overdue.border)}>
        <div className="flex flex-col space-y-3 px-4 py-4">
          <div className="flex justify-between items-start">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              Overdue <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </span>
          </div>
          <div className={cn("text-lg font-medium", s.overdue.color)}>
            {data?.overdue_value || "Rp 0"}
          </div>
        </div>
      </CustomCard>
    </div>
  );
}