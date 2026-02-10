"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import PageHeader from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Settings2, X } from "lucide-react";

export default function WhatsAppDataTable({ columns, handleModalOpen }) {
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
      actions: "...",
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
      actions: "...",
    },
     {
      name: "PT Sukses Selalu",
      legalName: "PT Sukses Selalu Sejahtera",
      email: "info@sukses-selalu.co.id",
      phone: "021-98765432",
      invoiceNumber: "INV-003",
      province: "Bali",
      city: "Denpasar",
      status: "Active",
      actions: "...",
    },
  ];

  const isEmpty = dummyData.length === 0;

  return (
    <div>
      <PageHeader />
   
    <div className="px-6 space-y-2">
      {!isEmpty && (
        <div className="flex justify-end py-3 justify-between">
          <div className="space-y-4 w-full">
            <div className="w-full flex items-center">
              <Label className="font-semibold text-md">Table Title</Label>
            </div>
           <div className="flex items-center justify-between w-full gap-4 pt-0">
          <div className="relative w-full max-w-xs">
            <Input
              placeholder="Search"
              className="pr-10 rounded-[5px]"
            // value={nameFilter}
            // onChange={(e) => setNameFilter(e.target.value)}
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
            />
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
              <SelectTrigger className="w-40 gap-2 rounded-[5px]">
                <Settings2 className="h-4 w-4 text-primary" />
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
              className="mt-1"
              
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
              className="mt-1"
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
          </div>
          
        </div>
      )}

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="mb-4 text-lg font-semibold">No Customers</p>
          <p className="mb-6 text-sm text-center text-muted-foreground">
            You haven’t created any costumers yet. <br /> Go a head and create
            your first one.
          </p>
          <CustomButton
            onClick={() => handleModalOpen("add")}
            type="create"
            variant="primary"
          >
            <Plus className="h-4 w-4" />
            Create customer
          </CustomButton>
        </div>
      ) : (
        <div className="">
          <DataTableComponent
            columns={columns}
            data={dummyData}
            pagination={{ pageIndex: 0, pageLimit: 10 }}
          />
        </div>
      )}
    </div>
     </div>
  );
}
