import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function catalogLayout({ children }) {
  const catalogTabs = [
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
    <div className="flex flex-col h-screen">
      <div>
        <PageHeader title="Catalog" />
        <CustomTabs tabs={catalogTabs} />
      </div>

      <div className="flex-1 flex flex-col overflow-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
