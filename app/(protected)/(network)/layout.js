import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function NetworkLayout({ children }) {
  const networkTabs = [
    {
      label: "Check Coverage",
      path: "/check-coverage",
    },
    {
      label: "POP",
      path: "/pop",
    },
    {
      label: "BSC",
      path: "/bsc",
    },
    {
      label: "ODC",
      path: "/odc",
    },
    {
      label: "Homepass ID",
      path: "/homepass-id",
    },
  ];

  return (
    <div className="flex flex-col h-screen p-4">
      <div>
        <PageHeader title="Network" />
        <CustomTabs tabs={networkTabs} />
      </div>

      <div className="flex-1 overflow-auto min-h-0 pt-4">{children}</div>
    </div>
  );
}
