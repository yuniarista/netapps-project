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
import { Separator } from "@/components/ui/separator";
import invoiceActionConfig from "@/views/(billing)/invoices/configs/invoiceActionConfig";

const customerSegmentOptions = [
  { label: "Home", value: "home" },
  { label: "Villas", value: "villas" },
  { label: "Hospital", value: "hospital" },
];

const homepassOptions = [
  { label: "HP-001 (Blok A-10)", value: "hp001", odp: "ODP-KUTA-01" },
  { label: "HP-002 (Blok B-05)", value: "hp002", odp: "ODP-KUTA-01" },
  { label: "HP-003 (Blok C-12)", value: "hp003", odp: "ODP-KUTA-02" },
  { label: "HP-004 (Blok D-01)", value: "hp004", odp: "ODP-JIMBARAN-05" },
];

export default function RecordPaymentForm({
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
        { name: "Web Development", price: 5000000, disc: 10, total: 4500000 },
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
          <Separator />
          <div className="flex flex-col gap-4 py-3 bg-muted p-4 border border-[#E2E8F0] rounded-sm">
            <div className="flex gap-6 space-x-6">
              <div className="flex flex-col gap-1">
                <span className="font-normal text-xs text-muted-foreground">
                  Invoice No.
                </span>
                <span className="font-semibold text-sm">INV/2026/02/001</span>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <span className="font-normal text-xs text-muted-foreground">
                  Invoice No.
                </span>
                <span className="text-xs border border-primary px-2 rounded-md bg-blue-100 text-primary">
                Sent
              </span>
              </div>
            </div>

            <div className="flex gap-6 space-x-6">
              <div className="flex flex-col gap-1">
                <span className="font-normal text-muted-foreground text-xs">
                  Invoice Amount
                </span>
                <span className="font-semibold text-sm">IDR 333,000.001</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-normal text-muted-foreground text-xs">
                  Due Date
                </span>
                <span className="font-semibold text-sm">06/03/2026</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <span className="text-lg font-semibold text-slate-700 tracking-wider">
              Record Payment
            </span>
          </div>
          <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="flex flex-row gap-4 justify-between">
              <DatePickerForm
                name="invoiceDate"
                label="Invoice Date"
                placeholder="Pick a date"
                control={control}
                errors={errors}
                helperText="The official issue date of this document (default: today)"
              />
              <SelectInputCustom
                name="paymentMethod"
                label="Payment Method"
                placeholder="Select payment"
                optionName="label"
                control={control}
                errors={errors}
                options={customerSegmentOptions}
              />
            </div>

            <div className="flex flex-row gap-4">
              <TextInputForm
                name="amount"
                label="Amount Paid"
                placeholder="0.00"
                control={control}
                errors={errors}
              />
              <InputFileForm
                name="photo"
                label="Photo With ID"
                errors={errors}
                control={control}
              />
            </div>
            <TextInputForm
              id="note"
              name="note"
              placeholder="Opdional notes about this payment"
              label="Notes"
              rows={3}
            />
          </div>
        </CardContent>
        <Separator />

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
            {loading ? "Submitting..." : "Record Payment"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
