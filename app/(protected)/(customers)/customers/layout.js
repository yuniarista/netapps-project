import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function customersLayout({ children }) {
    const customersTabs = [
        {
            label: "Customers",
            path: "/customers",
        },
        {
            label: "Requested Customers",
            path: "/requestedCustomers",
        },
        {
            label: "Potential Customers",
            path: "/potentialCustomers",
        },
        {
            label: "Customers Segments",
            path: "/customersSegments",
        },
    ];

    return (
        <div>
            <PageHeader title="Customers" />

            <div className="px-4">
                <CustomTabs tabs={customersTabs} />
            </div>
            <div className="pt-1">{children}</div>
        </div>
    );
}