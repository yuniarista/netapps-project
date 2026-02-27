import CustomCard from "@/components/card/customCard";
import { cn } from "@/lib/utils";
import { getBillingStyle } from "../../configs/billingStyle";

export default function Card() {
  const BillingData = [
    {
      type: "unpaid",
      title: "Total Unpaid",
      value: "Rp 25.400.000",
      persent: "+20%",
    },
    {
      type: "paid",
      title: "Total Paid",
      value: "Rp 87.200.000",
      persent: "+20%",
    },
    {
      type: "overdue",
      title: "Total Paid",
      value: "Rp 87.200.000",
      persent: "+20%",
    },
    {
      type: "upcoming-due",
      title: "Upcoming Due",
      value: "Rp 25.400.000",
      persent: "+20%",
    },
  ];

  return (
    <div className="flex flex-row">
      <div className="flex w-full gap-4">
        {BillingData.map((item, index) => {
          const style = getBillingStyle(item.type);
          return (
            <CustomCard key={index} className={cn(style.bg, style.border)}>
              <div className="flex flex-col space-y-3 px-2 py-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                    {item.title}
                    <span className="cursor-help text-[10px] border border-slate-500 rounded-full w-3 h-3 flex items-center justify-center">
                      ?
                    </span>
                  </span>
                  <span
                    className={cn(
                      `text-xs border px-1 rounded-md`,
                      style.color,
                      style.border,
                      style.bgP,
                    )}
                  >
                    {item.persent}
                  </span>
                </div>
                <div className={cn(style.color)}>{item.value}</div>
              </div>
            </CustomCard>
          );
        })}
      </div>
    </div>
  );
}
