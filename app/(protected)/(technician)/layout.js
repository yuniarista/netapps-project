import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function TechnicianLayout({ children }) {
    const technicalTabs = [
        {
            label: "Jobs",
            path: "/jobs",
        },
        {
            label: "History",
            path: "/history",
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