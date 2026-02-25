import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function catalogLayout({ children }) {
  const billingTabs = [
    {
      label: "Invoices",
      path: "/invoices",
    },
    {
      label: "Payments",
      path: "/paymenst",
    },
    {
      label: "Refund List",
      path: "/refund-list",
    },
    {
      label: "Billing Setting",
      path: "/billing-settings",
    },
  ];

  return (
    <div>
      <PageHeader title="Billing" />

      <div className="px-4">
        <CustomTabs tabs={billingTabs} />
      </div>
      <div className="pt-1">{children}</div>
    </div>
  );
}
