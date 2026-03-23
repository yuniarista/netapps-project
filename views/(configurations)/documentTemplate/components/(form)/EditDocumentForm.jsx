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
import { DialogClose } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";


export default function EditDocumentForm({ handleModalClose, loading }) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
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
  );
}

