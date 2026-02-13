" use client";
import Loading from "@/app/(protected)/loading";
import InputFileForm from "@/components/inputcopy/inputFileForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import LoadingCircle from "@/components/loadingCircle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddAreaForm from "./AddAreaForm";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInput from "@/components/inputcopy/selectInputCustom";
import SelectInputForm from "@/components/inputcopy/selectInputForm";


export default function AddInvoiceForm({ handleModalClose, loading }) {
  const form = useForm({ mode: "all" });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log("Data Form:", data);

    if (handleCreate) {
      handleCreate(data);
    }
  };

  const statusValues = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const isOptions = [
    { label: "NetApps", value: "netapps" },
    { label: "SAI", value: "sai" },
    { label: "BLiP", value: "blip" },
  ];


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          {/* <SelectInputForm
            name="ispName"
            label="ISP Name"
            placeholder="Choose registered ISP"
            errors={errors}
            control={control}
            optionName="label"
            options={isOptions}
          // renderModalContent={(closeModal) => (
          //   <AddAreaForm
          //     onCancel={closeModal}
          //     onSuccess={(data) => {
          //       console.log("Data area baru:", data);
          //       // Tambahkan logic API di sini jika perlu
          //       closeModal(); // Tutup modal setelah sukses
          //     }}
          //   />
          // )}
          /> */}
          <SelectInput
            name="ispName"
            label="ISP Name"
            placeholder="Choose registered ISP"
            errors={errors}
            control={control}
            optionName="label"
            options={isOptions}
          />
          <TextInputForm
            name="template"
            label="Template Name"
            placeholder="Enter document template name here"
            errors={errors}
            control={control}
          />
          <SelectInput
            name="template"
            label="Document Type"
            placeholder="Choose document template type"
            errors={errors}
            control={control}
            options={isOptions}
          />
          <TextInputForm
            name="description"
            label="Description"
            placeholder="Enter document template description here"
            errors={errors}
            control={control}
          />
          <InputFileForm
            name="invoice"
            label="Invoice File"
            errors={errors}
            control={control}
            helperText="Supports HTML with optional JS (sandboxed)"
          />
        </CardContent>

        <div className="w-full flex items-center justify-end space-x-4 p-4">
          <Button type="reset" variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form >
  );
}

