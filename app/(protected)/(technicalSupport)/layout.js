import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function TechnicalLayout({ children }) {
    const technicalTabs = [
        {
            label: "Work Order",
            path: "/work-orders",
        },
        {
            label: "Installations",
            path: "/installations",
        },
    ];

    return (
        <div>
            <PageHeader title="Technical Support" />

            <div>
                <CustomTabs tabs={technicalTabs} />
            </div>
            <div className="pt-1">{children}</div>
        </div>
    );
}