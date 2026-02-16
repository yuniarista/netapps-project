"use client";

import CustomButton from "@/components/button/customButton";
import DataTableComponent from "@/components/data-table/DataTableComponent";
import IconifyIcon from "@/components/icon";
import PageHeader from "@/components/pageHeader";
import CustomTabs from "@/components/tabs/CustomTabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  PanelRight,
  Plus,
  Search,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { PRODUCT_TABS_CONFIG } from "../../configs/productTabsConfig";
import { usePathname, useRouter } from "next/navigation";
import SelectDropdown from "@/components/inputcopy/selectDropdown";
import { useState } from "react";

export default function ProductDataTable({ columns, handleModalOpen }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const dummyData = [
    {
      productName: "Bisnis Soho 30 Mbps",
      price: "120,000.00",
      areaCategory: "Urban",
      areaCategory: "Urban",
      category: "Residential",
      subCategory: "Basic",
      promoPrice: "100,000.00",
      status: "Active",
    },
    {
      productName: "Bisnis Soho 30 Mbps",
      price: "120,000.00",
      areaCategory: "Urban",
      areaCategory: "Urban",
      category: "Residential",
      subCategory: "Basic",
      promoPrice: "100,000.00",
      status: "Inactive",
    },
  ];

  const handleAddFilter = (label, value) => {
    if (!activeFilters.find((f) => f.value === value)) {
      setActiveFilters([...activeFilters, { label, value }]);
    }
  };

  const handleRemoveFilter = (value) => {
    setActiveFilters(activeFilters.filter((f) => f.value !== value));
  };
  const filterSections = [
    {
      label: "Area",
      items: [
        {
          label: "Bali",
          value: "bali",
          onClick: () => handleAddFilter("Bali", "bali"),
        },
        {
          label: "Jawa",
          value: "jawa",
          onClick: () => handleAddFilter("Jawa", "jawa"),
        },
        {
          label: "Sumatera",
          value: "sumatera",
          onClick: () => handleAddFilter("Sumatera", "sumatera"),
        },
        // { label: "Bali", value: "bali", onClick: (v) => console.log("Filter area:", v) },
        // { label: "Jawa", value: "jawa", onClick: (v) => console.log("Filter area:", v) },
        // { label: "Sumatera", value: "sumatera", onClick: (v) => console.log("Filter area:", v) },
      ],
    },
    {
      label: "Category",
      items: [
        {
          label: "Business",
          value: "biz",
          onClick: () => handleAddFilter("Business", "biz"),
        },
        {
          label: "Professional",
          value: "prof",
          onClick: () => handleAddFilter("Professional", "prof"),
        },
        {
          label: "Home",
          value: "home",
          onClick: () => handleAddFilter("Home", "home"),
        },
        // { label: "Business", value: "biz", onClick: (v) => console.log("Filter cat:", v) },
        // { label: "Proffesional", value: "prof", onClick: (v) => console.log("Filter cat:", v) },
        // { label: "Home", value: "home", onClick: (v) => console.log("Filter cat:", v) },
      ],
    },
  ];

  const bulkActionSections = [
    {
      label: "Change Status",
      items: [
        {
          label: "Mark as active",
          value: "active",
          onClick: () => handleAddFilter("Active", "active"),
        },
        {
          label: "Mark as non active",
          value: "inactive",
          onClick: () => handleAddFilter("Inactive", "inactive"),
        },
        // { label: "Mark as active", value: "active", onClick: (v) => alert("Status updated!") },
        // { label: "Mark as non active", value: "inactive", onClick: (v) => alert("Status updated!") },
      ]
    },
    {
      items: [
        {
          label: "Delete",
          value: "delete",
          icon: Trash2,
          variant: "destructive",
          onClick: () => confirm("Are you sure?")
        },
      ]
    }
  ];


  const hasData = dummyData.length > 0;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        icon={<PanelRight className="w-4 h-4 text-gray-600" />}
        title="Product"
      />

      {hasData ? (
        <>
          <div className="p-4 space-y-4">
            <CustomTabs
              tabs={PRODUCT_TABS_CONFIG}
              activeTab={pathname}
              onChange={(tab) => {
                router.push(tab.path);
              }}
            />
            <div className="w-full">
              <Label className="font-semibold text-md">
                Catalog Product Data
              </Label>
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
                  <SelectDropdown
                    triggerLabel="Filter By"
                    icon={Settings2}
                    iconPosition="left"
                    className="w-40"
                    sections={filterSections}
                  />
                  
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

                {activeFilters.map((filter) => (
                  <CustomButton
                    key={filter.value}
                    variant="secondary"
                    type="button"
                    size="sm"
                    className="mt-1"
                    onClick={() => handleRemoveFilter(filter.value)}
                  >
                    {filter.label}
                    <X className="h-4 w-4 text-primary" />
                  </CustomButton>
                ))}

                <SelectDropdown
                  triggerLabel="Bulk Action"
                  sections={bulkActionSections}
                />
                

                {/* <CustomButton
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
                </CustomButton> */}

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
