import CustomTabs from "@/components/tabs/CustomTabs";
import PaymentMethod from "../(component)/payment";

export default function SettingCard({children}) {
     const billingSettingTabs = [
    {
      label: "Payment Method",
      path: "/billing-setting",
    },
    {
      label: "Invoice Schedule",
      path: "/payments",
    },
    {
      label: "Due Date Rules",
      path: "/refund",
    },
    {
      label: "Notification",
      path: "/notifications",
    },
  ];
  return (
    <div className="flex flex-col gap-4 bg-muted border border-[#E2E8F0] rounded-sm">
        <CustomTabs tabs={billingSettingTabs} />
        <div>{children}</div>
        <div className="p-4">
            <PaymentMethod />
        </div>
    </div>
  );
}
