"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import InputFileForm from "@/components/inputcopy/inputFileForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import MapInput from "@/components/inputcopy/mapInput";
import DatePickerForm from "@/components/datePicker/datePickerForm";
import { cn } from "@/lib/utils";
import InputNumberForm from "@/components/inputcopy/inputNumber";
import invoiceActionConfig from "../../configs/refundActionConfig";
import TableForm from "@/components/table/TableForm";

const customerSegmentOptions = [
  { label: "Home", value: "home" },
  { label: "Villas", value: "villas" },
  { label: "Hospital", value: "hospital" },
];

const productOptions = [
  { label: "Product 1", value: "product1" },
  { label: "Product 2", value: "product2" },
  { label: "Product 3", value: "product3" },
];

const homepassOptions = [
  { label: "HP-001 (Blok A-10)", value: "hp001", odp: "ODP-KUTA-01" },
  { label: "HP-002 (Blok B-05)", value: "hp002", odp: "ODP-KUTA-01" },
  { label: "HP-003 (Blok C-12)", value: "hp003", odp: "ODP-KUTA-02" },
  { label: "HP-004 (Blok D-01)", value: "hp004", odp: "ODP-JIMBARAN-05" },
];

export default function GenerateInvoiceForm({
  handleModalClose,
  loading,
  handleModalOpen,
}) {
  const [openSections, setOpenSections] = useState({
    general: true,
    billDetails: true,
  });

  const form = useForm({
    mode: "all",
    defaultValues: {
      invoiceItems: [
        { name: "UI/UX Design", price: 2000000, disc: "-", total: 2000000 },
      ],
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = form;
  const isAffiliate = watch("isActive");
  const selectedHomepass = watch("homepassId");

  useEffect(() => {
    if (selectedHomepass) {
      const selectedData = homepassOptions.find(
        (item) => item.value === selectedHomepass,
      );

      if (selectedData) {
        setValue("odpId", selectedData.odp);
      }
    } else {
      setValue("odpId", "");
    }
  }, [selectedHomepass, setValue]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const onSubmit = (data) => {
    console.log("Data Form Submit:", data);
  };

  const actions = invoiceActionConfig(
    (type, item) => {
      handleModalOpen(type, item);
    },
    ["update", "delete"],
  );

  const items = watch("invoiceItems") || [];
  const subTotal = items.reduce(
    (acc, item) => acc + (Number(item.total) || 0),
    0,
  );
  const tax = subTotal * 0.11;
  const grandTotal = subTotal + tax;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("general")}
            >
              <h3 className="text-lg font-semibold text-slate-700 tracking-wider">
                GENERAL
              </h3>
              {openSections.general ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </div>

            {openSections.general && (
              <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="flex flex-row gap-4 justify-between">
                  <TextInputForm
                    name="invoiceId"
                    label="Invoice ID"
                    placeholder="INV/2026/02/001"
                    control={control}
                    errors={errors}
                    disabled={true}
                    helperText="Auto-generated based on system sequence"
                  />
                  <SelectInputCustom
                    name="area"
                    label="Area"
                    placeholder="Select area"
                    control={control}
                    errors={errors}
                    showSearch={true}
                    options={productOptions}
                    optionName="label"
                    isCheckbox={true}
                  />
                </div>
                <SelectInputCustom
                  name="customer"
                  label="Customer"
                  placeholder="Select customer"
                  control={control}
                  errors={errors}
                  showSearch={true}
                  options={productOptions}
                  optionName="label"
                  isCheckbox={true}
                />

                <div className="flex flex-row gap-4">
                  <SelectInputCustom
                    name="billType"
                    label="Bill Type"
                    placeholder="Select segment"
                    optionName="label"
                    control={control}
                    errors={errors}
                    options={customerSegmentOptions}
                  />

                  <InputNumberForm
                    control={control}
                    name="prorate"
                    label="Prorate"
                    placeholder="0"
                    errors={errors}
                    helperText="Number of days"
                  />

                  <DatePickerForm
                    name="billingPeriod"
                    label="Billing Period"
                    placeholder="Pick a date"
                    control={control}
                    errors={errors}
                    helperText="The service month and year this invoice covers (e.g., Feb 2026)"
                  />
                </div>
              </div>
            )}
          </section>
          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("billDetails")}
            >
              <h3 className="text-lg font-semibold text-slate-700 tracking-wider">
                Bill Details
              </h3>
              {openSections.billDetails ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </div>

            {openSections.billDetails && (
              <div className="flex flex-col gap-4 py-1 animate-in fade-in slide-in-from-top-1 duration-300">
                <p className="text-xs">Review or add items to this invoice</p>
                <TableForm
                  control={control}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  showButton={false}
                  showDelete={false}
                />

                <div className="flex flex-col items-end text-sm">
                  <div className="">
                    <div className=" flex p-1 justify-between border-b">
                      <span>Discount</span>
                      <span className="font-semibold">Rp 0.00</span>
                    </div>
                    <div className="flex p-1 justify-between border-b gap-6 space-x-10">
                      <span>Sub Total</span>
                      <span className="font-semibold">
                        Rp {subTotal.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex p-1 justify-between border-b">
                      <span>Tax 11%</span>
                      <span className="font-semibold">
                        Rp {tax.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex p-1 justify-between border-b font-semibold">
                      <span>Total</span>
                      <span className="font-semibold">
                        Rp {grandTotal.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                <SwitchToggleInput
                  control={control}
                  name="sendToWhatsApp"
                  label="Send To WhatsApp"
                  description="Automatically send invoice notifications to customers via WhatsApp once the generation process is complete"
                />
              </div>
            )}
          </section>
        </CardContent>

        <CardFooter className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleModalClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Create"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
