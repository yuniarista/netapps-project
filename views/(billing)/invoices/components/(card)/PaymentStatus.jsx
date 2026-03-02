import { cn } from "@/lib/utils";
import { getPaymentStatus } from "../../configs/billingStyle";
import IconifyIcon from "@/components/icon";

export default function PaymentStatus({type, date}) {

  const status = type?.toLowerCase() || "unpaid"; //kalo gaisi unpaid nanti bakalan muncul undifined soalnya unpaid ini tujuannya agar ketika ada type yg kosong maka nanti yg dimunculkan unpaid agar tidaka undifined
  const style = getPaymentStatus(status);


  const getMessage = () => {
    switch (status) {
      case "paid":
        return `This invoice has been fully paid and confirmed on ${date || "-"}`;
      case "unpaid":
        return "This invoice is currently unpaid and awaiting for payment.";
      case "warning":
        return (
          <span>
            Outside Coverage Area <br />
            This invoice is currently unpaid and awaiting for payment.
          </span>
        );
      case "canceled":
        return "This invoice has been cancelled and is no longer valid for payment";
      case "refund":
        return "This payment has been refunded to the customer on 03/03/2026";
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col space-y-3 py-2">
            <div className="flex justify-between items-start">
              <span
                className={cn(
                  `flex text-xs px-2 py-2 rounded-[5px] items-center gap-2`,
                  style.color,
                  style.bg,
                )}
              >
                <IconifyIcon icon={style.icons} className={cn("w-6 h-6", style.color)}/>
                {getMessage()}
              </span>
            </div>
          </div>
    </div>
  );
}
