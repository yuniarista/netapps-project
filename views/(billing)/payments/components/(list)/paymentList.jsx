"use client";
import CustomCard from "@/components/card/customCard";
import IconifyIcon from "@/components/icon";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getBillingStyle } from "@/views/(billing)/invoices/configs/billingStyle";
import { useState } from "react";

export default function List({ status }) {
  const [selectedItem, setSelectedItem] = useState([]);
  const ListData = [
    {
      id: 1,
      status: "Paid",
      name: "Putu Wahyu Putra",
      totalPrice: "Rp25.400.000",
      noInvoice: "INV/2026/03/002",
      date: "03/04/2026",
    },
    {
      id: 2,
      status: "Unpaid",
      name: "Ni Luh Ayu",
      totalPrice: "Rp10.500.000",
      noInvoice: "INV/2026/03/002",
      date: "03/04/2026",
    },
  ];

  const handleListClick = (id) => {
    setSelectedItem((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <>
      <div>
        {ListData.map((item) => {
          const type = item.status?.toLocaleLowerCase() || "unpaid";
          const style = getBillingStyle(type);
          const isChecked = selectedItem.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleListClick(item.id)}
              className={cn(
                "border-b text-xs cursor-pointer hover:bg-muted transition-colors py-4",
                isChecked && "bg-muted/50",
              )}
            >
              
              <div className="flex flex-row gap-2 items-start px-3">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => handleListClick(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1" 
                />
                <div className="flex-1 space-y-2 mt-1 ">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800">
                      {item.name}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {item.totalPrice}
                    </span>
                  </div>
                  <div className="text-slate-500">
                    <span>{item.noInvoice}</span>
                    <span className="px-1">|</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span
                      className={cn(
                        "text-[10px] border px-3 py-0.5 rounded-full font-semibold",
                        style.color,
                        style.border,
                        style.bgP,
                      )}
                    >
                      {item.status}
                    </span>
                    <div className="flex gap-2 text-slate-500">
                      <IconifyIcon
                        icon="ic:baseline-whatsapp"
                        className="w-4 h-4"
                      />
                      <IconifyIcon icon="lucide:mail" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
