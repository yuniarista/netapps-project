"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import dynamic from "next/dynamic";
import { DialogClose } from "@/components/ui/dialog";
import AddSegmentAreaForm from "./AddSegmentAreaForm";
const MapInput = dynamic(() => import("@/components/inputcopy/mapInput"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 animate-pulse flex items-center justify-center rounded-md border">
      <p className="text-slate-400 text-sm">Loading Map...</p>
    </div>
  ),
});

export default function AddPopForm({ handleModalClose, loading, formOptions }) {
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
                    options={formOptions["area"]}
                    renderModalContent={(closeModal) => (
                      <AddSegmentAreaForm
                        onCancel={closeModal}
                        onSuccess={(data) => {
                          console.log("Data segment baru:", data);
                          // Tambahkan logic API di sini jika perlu
                          closeModal();
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
                  options={formOptions["area"]}
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
