"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Trash2, X, CirclePlus, Plus, Calendar, Type } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { useState } from "react";
import SelectFilter from "@/components/inputcopy/selectFilter";
import { DateRangePicker } from "@/components/datePicker/rangeDatePicker";

export default function InvoiceDataTable({
  uri,
  data,
  setData,
  columns,
  setLoading,
  handleModalOpen,
  filterParams,
  setFilterParams,
  selectedRows,
  setSelectedRows,
  nameFilter,
  setNameFilter,
  sortDataBy,
  setSortDataBy,
  paginationModel,
  setPaginationModel,
  dashboardAccessPermissions,
}) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [date, setDate] = useState({ from: undefined, to: undefined });

  const dummyData = [
    {
      id: "1",
      date: "01/03/2026",
      noInvoice: "INV/2026/02/001",
      customerName: "Ni Putu Angelina Giovany",
      address:
        "Jl. Imam Bonjol No.350, Pemecutan Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 90119",
      period: "Feb,2026",
      billingType: "Prorate-12 days",
      email: "angelina@gmail.com",
      dueDate: "06/03/2026",
      status: "Paid",
      invoice: "01/02/2026",
      price: 20000,
      disc: 10,
      total: 100000,
      phone: "+123456789098",
      package: "PAKET 20MBPS",
      billingPeriod: "tess",
      type: "paid"
    },
    {
      id: "2",
      date: "03/04/2026",
      noInvoice: "INV/2026/03/002",
      customerName: "Putu Wahyu Putra",
      address:
        "Jl. Peliatan No.10, Kec. Ubud Bar., Kota Denpasar, Bali 123",
      period: "Jun,2026",
      billingType: "Prorate-10 days",
      email: "wahyu@gmail.com",
      dueDate: "07/04/2026",
      status: "Unpaid",
      invoice: "02/02/2026",
      price: 50000,
      disc: 10,
      total: 500000,
      phone: "+09876543212",
      package: "PAKET 50MBPS",
      billingPeriod: "tess123",
      type: "unpaid",
    },
    {
      id: "3",
      date: "03/04/2026",
      noInvoice: "INV/2026/03/002",
      customerName: "Putu Wahyu Putra",
      address:
        "Jl. Peliatan No.10, Kec. Ubud Bar., Kota Denpasar, Bali 123",
      period: "Jun,2026",
      billingType: "Prorate-10 days",
      email: "wahyu@gmail.com",
      dueDate: "07/04/2026",
      status: "Unpaid",
      invoice: "02/02/2026",
      price: 50000,
      disc: 10,
      total: 500000,
      phone: "+09876543212",
      package: "PAKET 50MBPS",
      billingPeriod: "tess123",
      type: "warning",
    },
  ];

  const handleAddFilter = (label, value) => {
    if (!activeFilters.find((f) => f.value === value)) {
      setActiveFilters([...activeFilters, { label, value, showBadge: true }]);
    }
  };

  const handleRemoveFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
  };

  const areaOptions = [
    { label: "Bali", value: "bali" },
    { label: "Jawa", value: "jawa" },
    { label: "Sumatera", value: "sumatera" },
  ];

  const categoryOptions = [
    { label: "Residential", value: "residential" },
    { label: "Business", value: "business" },
  ];

  const subCategoryOptions = [
    { label: "Tess", value: "tes" },
    { label: "SubCategri 2", value: "subcategory" },
  ];

  const handleResetAll = () => {
    setSelectedSegments([]);
    setSelectedStatus([]);
  };

  const bulkActionSections = [
    {
      // label: "Change Status",
      items: [
        {
          label: "Export as PDF",
          value: "pdf",
          // onClick: () => handleAddFilter("Active", "active", true),
        },
        {
          label: "Export as ZIP (File)",
          value: "zip",
          // onClick: () => handleAddFilter("Inactive", "inactive", true),
        },
        {
          label: "Mark as Sent",
          value: "sent",
          // onClick: () => handleAddFilter("Inactive", "inactive", true),
        },
      ],
    },
    {
      items: [
        {
          label: "Delete",
          value: "delete",
          icon: Trash2,
          variant: "destructive",
          // onClick: () => confirm("Are you sure?"),
        },
      ],
    },
  ];

  const hasData = dummyData.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      {hasData ? (
        <div className="px-4 space-y-2 py-2">
          <CustomButton
            variant="primary"
            size="md"
            onClick={() => handleModalOpen("adds")}
          >
            <IconifyIcon icon="lucide:refresh-ccw-dot" />
            Generate Invoice
          </CustomButton>
          <div className="w-full">
            <Label className="font-semibold text-sm">Invoices Data</Label>
          </div>

          <div className="flex flex-nowrap items-center justify-start w-full gap-2 pt-0">
            <div className="relative w-md flex-shrink-0">
              <Input placeholder="Search" className="pr-10 h-9" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hidden-x">
              <div className="flex flex-nowrap gap-2">
                <SelectFilter
                  label="Area/Region"
                  options={areaOptions}
                  selected={selectedSegments}
                  onChange={setSelectedSegments}
                  icon={CirclePlus}
                  showSearch
                />

                <SelectFilter
                  label="Payment Status"
                  options={categoryOptions}
                  selected={selectedStatus}
                  onChange={setSelectedStatus}
                  icon={CirclePlus}
                  showSearch
                />
                <DateRangePicker
                  date={date}
                  handleSelect={setDate}
                  placeHolder="select date range"
                />
                <SelectFilter
                  label="Status"
                  options={subCategoryOptions}
                  selected={selectedStatus}
                  onChange={setSelectedStatus}
                  icon={CirclePlus}
                  showSearch
                />

                {(selectedSegments.length > 0 || selectedStatus.length > 0) && (
                  <CustomButton
                    variant="ghost"
                    size="sm"
                    className="text-primary h-9"
                    onClick={handleResetAll}
                  >
                    Reset <X className="h-3 w-3" />
                  </CustomButton>
                )}
              </div>
            </div>

            <div className="ml-auto flex flex-nowrap items-center gap-2 flex-shrink-0">
              <div className="flex flex-nowrap gap-2">
                {activeFilters
                  .filter((filter) => filter.showBadge === true)
                  .map((filter) => (
                    <CustomButton
                      key={filter.value}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1 whitespace-nowrap flex-shrink-0 h-8 rounded-full bg-slate-100 border-none px-3"
                      onClick={() => handleRemoveFilter(filter.value)}
                    >
                      <span className="text-[13px] text-slate-700">
                        {filter.label}
                      </span>
                      <X className="h-3.5 w-3.5 text-primary" />
                    </CustomButton>
                  ))}
              </div>

              <SelectDropdown
                triggerLabel="Bulk Action"
                sections={bulkActionSections}
                badgeVariant="outline"
              />

              <CustomButton
                variant="primary"
                size="md"
                onClick={() => handleModalOpen("add")}
              >
                <IconifyIcon icon="lucide:plus" />
                Create
              </CustomButton>
            </div>
          </div>

          <div className="pt-2 py-1">
            <DataTableComponent
              columns={columns}
              data={{ data: dummyData, totalData: dummyData.length }}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              pagination={{ pageIndex: 0, pageLimit: 10 }}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex-1 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-center">
            <Label className="text-lg">No Catalog Product</Label>
            <p className="text-sm text-muted-foreground">
              You haven’t created any product yet.
              <br /> Go a head and create your first one.
            </p>
            <CustomButton
              variant="primary"
              className="flex gap-2"
              onClick={() => handleModalOpen("add")}
            >
              <Plus className="w-4 h-4" /> Setup Network
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}



// import IconifyIcon from "@/components/icon";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import PaymentStatus from "../(card)/PaymentStatus";

// export default function InvoiceDetail({ data }) {
//   // Jika data belum ada, berikan nilai default agar tidak crash
//   if (!data) return <div className="p-4 text-center">Loading data...</div>;

//   // Membersihkan format Rp 100.000 menjadi angka untuk perhitungan
//   const cleanNumber = (val) => {
//     if (typeof val === 'number') return val;
//     return Number(val?.replace(/[^0-9]/g, "")) / 100 || 0;
//   };

  // const subTotal = cleanNumber(data.amount);
  // const tax = subTotal * 0.11;
  // const grandTotal = subTotal + tax;

//   return (
//     <div className="space-y-4">
//       <PaymentStatus status={data.status} />
      
//       <section>
//         <h3 className="font-semibold mb-2">Customer Information</h3>
//         <div className="space-y-2">
//           <div className="flex items-center gap-2 text-sm">
//             <IconifyIcon icon="lucide:user-round" className="text-muted-foreground w-4 h-4" />
//             <span>{data.customerName}</span>
//           </div>
//           {/* Data tambahan jika tersedia di dummyData */}
//           <div className="flex items-start gap-2 text-sm text-muted-foreground">
//             <IconifyIcon icon="lucide:map-pin" className="w-4 h-4 mt-0.5" />
//             <span>{data.address || "Address not provided"}</span>
//           </div>
//         </div>
//       </section>

//       <Separator />

//       <section className="grid grid-cols-3 gap-4 text-xs">
//         <div>
//           <span className="font-semibold block">Invoice Date</span>
//           <p>{data.date}</p>
//         </div>
//         <div>
//           <span className="font-semibold block">Invoice No.</span>
//           <p>{data.noInvoice}</p>
//         </div>
//         <div>
//           <span className="font-semibold block">Billing Period</span>
//           <p>{data.billingPeriod}</p>
//         </div>
//       </section>

//       <section className="bg-slate-50 p-3 rounded-lg text-xs space-y-2">
//         <div className="flex justify-between">
//           <span>Sub Total</span>
//           <span>{data.amount}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Tax (11%)</span>
//           <span>Rp {tax.toLocaleString("id-ID")}</span>
//         </div>
//         <div className="flex justify-between border-t border-dashed pt-2 font-bold text-sm">
//           <span>Total Amount</span>
//           <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
//         </div>
//       </section>

//       <div className="flex justify-end gap-2 pt-4">
//         <Button variant="outline" size="sm">Cancel</Button>
//         <Button variant="primary" size="sm">Download PDF</Button>
//       </div>
//     </div>
//   );
// }