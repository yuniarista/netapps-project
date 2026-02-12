"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  PanelRight,
  Plus,
  Search,
  Settings2,
  X,
} from "lucide-react";

export default function CustomerDataTable({ columns, handleModalOpen }) {
  const dummyData = [
    {
      name: "SAI",
      legalName: "PT Semua Aplikasi Indonesia",
      email: "sai@gmail.com",
      phone: "021-12345678",
      invoiceNumber: "INV-001",
      province: "Bali",
      city: "Badung",
      status: "Active",
    },
    {
      name: "PT Maju Mundur",
      legalName: "PT Maju Mundur Sejahtera",
      email: "info@maju-mundur.co.id",
      phone: "021-87654321",
      invoiceNumber: "INV-002",
      province: "Jawa Barat",
      city: "Bandung",
      status: "Inactive",
    },
    {
      name: "PT Sukses Selalu",
      legalName: "PT Sukses Selalu Sejahteraaaaaaaaaaaaaaaaaa",
      email: "info@sukses-selalu.co.id",
      phone: "021-98765432",
      invoiceNumber: "INV-003",
      province: "Bali",
      city: "Denpasar",
      status: "Active",
    },
  ];

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="ISP Customers"
      />

      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <div className="w-full">
              <Label className="font-semibold text-md">Table Title</Label>
            </div>

            <div className="flex items-center justify-between w-full gap-4 pt-0">
              <div className="relative w-full max-w-xs">
                <Input
                  placeholder="Search"
                  className="pr-10"
                  // value={nameFilter}
                  // onChange={(e) => setNameFilter(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              <div className="flex items-center space-x-2">
                <Select>
                  {/* value={sortDataBy}
                    // onValueChange={async (val) => {
                    //   setSortDataBy(val);
                    //   setFilterParams([
                    //     { key: "search", value: nameFilter },
                    //     {
                    //       key: !!val ? `order[${val.split("-")[0]}]` : "",
                    //       value: val.split("-")[1] ?? ""
                    //     }
                    //   ]);
                    //   const result = await FilterData({
                    //     uri,
                    //     setLoading,
                    //     paginationModel: {
                    //       pageIndex: paginationModel.pageIndex + 1,
                    //       pageLimit: paginationModel.pageLimit
                    //     },
                    //     filterParams: getFilterParams(nameFilter, val)
                    //   });
                    //   setData(result);
                    // }} */}
                  <SelectTrigger
                    className="w-40"
                    icon={Settings2}
                    iconPosition="left"
                    iconClassName="text-primary"
                  >
                    <SelectValue placeholder="Filter By" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {sortableFieldList.map((item) => (
                        <SelectItem
                          key={item.label}
                          value={`${item.value.sortDataBy}-${item.value.sortType}`}
                        >
                          {item.label}
                        </SelectItem>
                      ))} */}
                  </SelectContent>
                </Select>

                <CustomButton
                  variant="secondary"
                  type="button"
                  size="sm"
                  className="mt-2"

                  // onClick={() => {
                  //   handleModalOpen("bulk-delete");
                  // }}
                >
                  Home
                  <X className="h-4 w-4 text-primary" />
                </CustomButton>
                <CustomButton
                  variant="secondary"
                  type="button"
                  size="sm"
                  className="mt-2"
                  // onClick={() => {
                  //   handleModalOpen("bulk-delete");
                  // }}
                >
                  Active
                  <X className="h-4 w-4 text-primary" />
                </CustomButton>

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
                  totalData: dummyData.length,
                }}
                pagination={{ pageIndex: 0, pageLimit: 10 }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex  flex-col items-center justify-center text-center p-6">
          <div className="space-y-4 max-w-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              No Invoice Template
            </h2>
            <p className="text-slate-500 max-w-sm">
              You haven't created any invoice template yet. <br />
              Go ahead and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create invoice template
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
