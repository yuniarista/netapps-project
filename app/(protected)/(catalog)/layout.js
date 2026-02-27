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
    <div>
      <PageHeader title="Catalog" />

      <div className="px-4">
        <CustomTabs tabs={catalogTabs} />
      </div>
      <div className="pt-1">{children}</div>
    </div>
  );
}
