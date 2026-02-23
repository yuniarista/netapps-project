"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import InputFileForm from "@/components/inputcopy/inputFileForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import DatePickerForm from "@/components/datePicker/datePickerForm";
import AddSegmentForm from "@/views/(customers)/customer/components/(components)/AddSegmentForm";
import dynamic from "next/dynamic";
import { DialogClose } from "@/components/ui/dialog";
const MapInput = dynamic(() => import("@/components/inputcopy/mapInput"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 animate-pulse flex items-center justify-center rounded-md border">
      <p className="text-slate-400 text-sm">Loading Map...</p>
    </div>
  ),
});

const customerSegmentOptions = [
  { label: "Home", value: "home" },
  { label: "Villas", value: "villas" },
  { label: "Hospital", value: "hospital" },
];

const salesNameOptions = [
  { label: "Sales 1", value: "sales1" },
  { label: "Sales 2", value: "sales2" },
  { label: "Sales 3", value: "sales3" },
];

const productOptions = [
  { label: "Product 1", value: "product1" },
  { label: "Product 2", value: "product2" },
  { label: "Product 3", value: "product3" },
];

export default function AddPopForm({ handleModalClose, loading }) {
  const [openSections, setOpenSections] = useState({
    general: true,
    contactDetails: true,
    salesInfo: true,
  });

  const form = useForm({
    mode: "all",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = form;
  const isAffiliate = watch("isActive");

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const onSubmit = (data) => {
    console.log("Data Form Submit:", data);
  };

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
                  <SelectInputCustom
                    name="area"
                    label="Area / Region"
                    placeholder="Select Area / Region"
                    optionName="label"
                    control={control}
                    errors={errors}
                    // required
                    options={customerSegmentOptions}
                    renderModalContent={(closeModal) => (
                      <AddSegmentForm
                        onCancel={closeModal}
                        onSuccess={(data) => {
                          console.log("Data segment baru:", data);
                          // Tambahkan logic API di sini jika perlu
                          closeModal(); // Tutup modal setelah sukses
                        }}
                      />
                    )}
                  />
                  <TextInputForm
                    name="popName"
                    label="POP Name"
                    placeholder="POP Name"
                    control={control}
                    errors={errors}
                    helperText="Unique name to identify this POP within the network."
                  />
                </div>
              </div>
            )}
          </section>

          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("contactDetails")}
            >
              <h3 className="text-lg font-semibold text-slate-700 tracking-wider">
                LOCATION INFORMATION
              </h3>
              {openSections.contactDetails ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </div>

            {openSections.contactDetails && (
              <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <SelectInputCustom
                  name="address"
                  label="Search Address"
                  placeholder="Select address"
                  control={control}
                  errors={errors}
                  showSearch={true}
                  options={productOptions}
                  optionName="label"
                  helperText={"Physical location of the POP"}
                />

                <div className="flex flex-row gap-4">
                  <TextInputForm
                    name="longitude"
                    label="Longitude"
                    placeholder="Longitude"
                    control={control}
                    errors={errors}
                  />
                  <TextInputForm
                    name="latitude"
                    label="Latitude"
                    placeholder="Latitude"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="my-4">
                  <MapInput setValue={setValue} watch={watch} />
                </div>

                <TextInputForm
                  name="locationNotes"
                  label="Location Notes"
                  placeholder="Location Notes"
                  rows={4}
                  control={control}
                  errors={errors}
                />
              </div>
            )}
          </section>
        </CardContent>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
