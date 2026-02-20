import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function catalogLayout({ children }) {
  const customersTabs = [
    {
      label: "Products",
      path: "/products",
    },
    {
      label: "Area",
      path: "/area",
    },
    {
      label: "Category",
      path: "/category",
    },
    {
      label: "Sub Category",
      path: "/sub-category",
    },
  ];

  return (
    <div className="flex flex-col h-screen p-4">
      <div>
        <PageHeader title="Catalog" />
        <CustomTabs tabs={customersTabs} />
      </div>

      <div className="flex-1 overflow-auto min-h-0 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
