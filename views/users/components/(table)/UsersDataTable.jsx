"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import PageHeader from "@/components/pageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, PanelRight, Plus, Search, Settings2, Trash2 } from "lucide-react";

export default function UsersDataTable({ columns, handleModalOpen }) {
    const dummyData = [
        {
            email: "user@example.com",
            roleId: "Super Admin",
            ispId: "ISP 1"
        },
        {
            email: "admin@example.com",
            roleId: "Tenant Admin",
            ispId: "ISP 2"
        }
    ];

    const filterSections = [
        {
            label: "ISP Name",
            type: "checkbox",
            items: [
                { label: "ISP 1", value: "bali", checked: true, onClick: (v) => console.log("Toggle area:", v) },
                { label: "ISP 2", value: "jawa", checked: false, onClick: (v) => console.log("Toggle area:", v) },
                { label: "ISP 3", value: "sumatera", checked: false, onClick: (v) => console.log("Toggle area:", v) },
            ]
        },
        {
            label: "Role",
            type: "checkbox",
            items: [
                { label: "Super Admin", value: "biz", onClick: (v) => console.log("Selected cat:", v) },
                { label: "Tenant Admin", value: "prof", onClick: (v) => console.log("Selected cat:", v) },
            ]
        }
    ];

    const bulkActionSections = [
        {
        items: [ 
            {
                label: "Delete",
                value: "delete",
                icon: Trash2,
                onClick: () => confirm("Are you sure?")
            },
        ]
    },
    ];

    const hasData = dummyData.length > 0;

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                icon={<PanelRight className="w-4 h-4 text-gray-600" />}
                title="Users"
            />

            {hasData ? (
                <>
                    <div className="p-4 space-y-4">
                        <div className="w-full">
                            <Label className="font-semibold text-md">Users</Label>
                        </div>

                        <div className="flex items-center justify-between w-full gap-4 pt-0">
                            <div className="relative w-full max-w-xs">
                                <Input
                                    placeholder="Search"
                                    className="pr-10"
                                // value={nameFilter}
                                // onChange={(e) => setNameFilter(e.target.value)}
                                />
                                <Search
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <SelectDropdown
                                    triggerLabel="Filter By"
                                    icon={Settings2}
                                    iconPosition="left"
                                    className="w-40"
                                    sections={filterSections}
                                />
                                <SelectDropdown
                                    triggerLabel="Bulk Action"
                                    sections={bulkActionSections}
                                    showSectionLabelSeparator={false}
                                    showSectionSeparator={false}
                                />

                                <CustomButton
                                    variant="primary"
                                    type="button"
                                    size="md"
                                    onClick={() => handleModalOpen("add")}
                                >
                                    <IconifyIcon icon="lucide:plus" />
                                    Create
                                </CustomButton>
                            </div>
                        </div>

                        <div className="pt-2">
                            <DataTableComponent
                                columns={columns}
                                data={{
                                    data: dummyData,
                                    totalData: dummyData.length
                                }}
                                pagination={{ pageIndex: 0, pageLimit: 10 }}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
                    <div className="space-y-4 max-w-sm">
                        <h2 className="text-xl font-semibold text-slate-900">No User Data</h2>
                        <p className="text-slate-500 max-w-sm">
                            You haven't created any user yet. <br />
                            Go ahead and create your first one.
                        </p>
                        <CustomButton
                            variant="primary"
                            size="lg"
                            onClick={() => handleModalOpen("add")}
                            className="mt-4"
                        >
                            <Plus className="w-4 h-4" />
                            Create User
                        </CustomButton>
                    </div>
                </div>
            )}
        </div>
    );
}
