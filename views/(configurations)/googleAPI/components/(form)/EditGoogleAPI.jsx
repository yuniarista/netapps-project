"use client";

import InputFileForm from "@/components/inputcopy/inputFileForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import { useEffect } from "react";

export default function EditGoogleAPIForm({
  handleModalClose,
  loading,
  data,
  handleUpdate,
  formData
}) {
  const form = useForm({
    mode: "all",
    defaultValues: {
      integrationName: formData?.integrationName || "",
      apiKey: formData?.apiKey || "",
      status: formData?.status || "active",
    },
  });
  const {
    control,
    formState: { errors },
    reset
  } = form;

  const onSubmit = (data) => {
    console.log("Data Form:", data);

    // if (handleUpdate) {
    //   handleUpdate(data);
    // }
  };
  

  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData, reset]);

  const statusValues = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const isOptions = [
    { label: "NetApps", value: "netapps" },
    { label: "SAI", value: "sai" },
    { label: "BLiP", value: "blip" },
  ];

  const timezoneOptions = [
    { label: "GMT+7", value: "gmt+7" },
    { label: "GMT+8", value: "gmt+8" },
    { label: "GMT+9", value: "gmt+9" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <TextInputForm
            name="integrationName"
            label="Integration Name"
            placeholder="Insert your ID here"
            errors={errors}
            control={control}
            // defaultValue={data?.integrationName}
          />
          <TextInputForm
            name="apiKey"
            label="API Key"
            placeholder="Insert your API key here"
            errors={errors}
            control={control}
            defaultValue={data?.apiKey}
            disabled={true}
          />
          <SelectInputForm
            name="status"
            label="Status"
            placeholder="Status"
            errors={errors}
            control={control}
            optionName="label"
            options={statusValues}
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
    </Form>
  );
}
