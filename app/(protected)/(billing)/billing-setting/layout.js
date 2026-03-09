import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";
import SettingCard from "@/views/(billing)/setting/components/(card)/settingCard";

export default function billingSettingLayout({ children }) {
  // const billingSettingTabs = [
  //   {
  //     label: "Invoices",
  //     path: "/invoices",
  //   },
  //   {
  //     label: "Payments Received",
  //     path: "/payments",
  //   },
  //   {
  //     label: "Refund List",
  //     path: "/refund",
  //   },
  //   {
  //     label: "Billing Setting",
  //     path: "/billing-setting",
  //   },
  // ];

  return (
    <div className="flex flex-col h-screen py-3">
      {children}
      {/* <SettingCard>
        <div>
        <CustomTabs tabs={billingSettingTabs} />
      </div>

      <div className="flex-1 flex flex-col overflow-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      </SettingCard> */}
    </div>
  );
}
