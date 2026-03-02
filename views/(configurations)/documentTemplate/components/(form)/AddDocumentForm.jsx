" use client";
import InputFileForm from "@/components/inputcopy/inputFileForm";;
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
import { useForm, useWatch } from "react-hook-form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInput from "@/components/inputcopy/selectInputCustom";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InvoicePreview from "../(components)/invoicePreview";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";

export default function AddDocumentForm({ handleModalClose, loading }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const form = useForm({ mode: "all" });
  const {
    control,
    getValues,
    formState: { errors },
  } = form;
  const invoiceFile = useWatch({
    control,
    name: "invoice",
  });
  const hasFile = !!invoiceFile;

  const onSubmit = (data) => {
    console.log("Data Form:", data);

    if (handleCreate) {
      handleCreate(data);
    }
  };

  // const invoiceData = useWatch({ control, name: "invoice" });

  // const handlePreview = () => {
  //   const data = getValues();
  //   const query = new URLSearchParams({
  //     invoiceNo: "INV-2026-00123",
  //     ispName: data.ispName || "",
  //     description: data.description || "",
  //   }).toString();

  //   window.open(`/invoice-preview?${query}`, "_blank");
  // };

  const handlePreview = () => {
    const data = getValues();

    setPreviewData({
      invoiceNo: "INV-2026-00123",
      ispName: data.ispName || "",
      template: data.template || "",
      description: data.description || "",
    });

    setIsPreviewOpen(true);
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <SelectInputCustom
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
            <SelectInputCustom
              name="documentType"
              label="Document Type"
              placeholder="Choose document template type"
              optionName="label"
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

            <div className="space-y-2">
              <div className="flex flex-row gap-2 items-start">
                <div className="flex-1">
                  <InputFileForm
                    name="invoice"
                    label="Invoice File"
                    errors={errors}
                    control={control}
                    helperText="Supports HTML with optional JS"
                  />
                </div>

                {hasFile && (
                  <Button
                    className="mt-5 px-3"
                    size="md"
                    variant="outline"
                    type="button"
                    onClick={handlePreview}
                    disabled={loading}
                  >
                    <Eye className="h-4 w-4 text-primary" />
                    Preview
                  </Button>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="w-full flex items-center justify-end space-x-4 p-4">
            <Button type="reset" variant="outline" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form >

      {isPreviewOpen && (
  <div className="fixed inset-0 flex z-50">
    <div className="bg-white rounded-xs p-6 w-full max-h-[90vh] overflow-y-auto relative">
      
      <button
        className="absolute top-3 right-3 text-zinc-500"
        onClick={() => setIsPreviewOpen(false)}
      >
        ✕
      </button>

      <InvoicePreview data={previewData} />

    </div>
  </div>
)}
    </>
  );
}

