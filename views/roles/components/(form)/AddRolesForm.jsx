"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Icon, Trash, X } from "lucide-react"; // Import X icon
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { Label } from "@/components/ui/label";
import AccordionInputForm from "@/components/inputcopy/accordionInputForm";

export default function AddRoleForm({
  handleModalClose,
  loading,
  handleCreate,
}) {
  const form = useForm({
    mode: "all",
    defaultValues: {
      role: "",
      feature: "",
      redirect: "",
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = form;

  const [addedFeatures, setAddedFeatures] = useState([]);
  const [selectedFeatureId, setSelectedFeatureId] = useState("");

  const featOptions = [
    { label: "Dashboard Analytics", value: "feat1" },
    { label: "User Management", value: "feat2" },
    { label: "Billing System", value: "feat3" },
  ];

  const redirectOption = [
    { label: "Dashboard", value: "dash" },
    { label: "Home", value: "home" },
  ];

  const handleAddFeature = () => {
    const currentSelectedId = form.getValues("feature");

    if (!currentSelectedId) {
      console.log("Pilih fitur terlebih dahulu");
      return;
    }

    const isAlreadyAdded = addedFeatures.some(
      (f) => f.featureId === currentSelectedId,
    );

    if (!isAlreadyAdded) {
      const featureDetail = featOptions.find(
        (f) => f.value === currentSelectedId,
      );

      setAddedFeatures((prev) => [
        ...prev,
        {
          featureId: currentSelectedId,
          name: featureDetail?.label,
          access: ["Read"],
        },
      ]);
      form.setValue("feature", "");
    }
  };

  const handleRemoveFeature = (id) => {
    setAddedFeatures(addedFeatures.filter((f) => f.featureId !== id));
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      permissions: addedFeatures,
    };
    console.log("Data Form Terkirim:", finalData);
    if (handleCreate) handleCreate(finalData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <TextInputForm
            name="role"
            label="Role Name"
            placeholder="Enter your role name here"
            errors={errors}
            control={control}
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Features & Permissions
            </Label>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <SelectInputForm
                  name="feature"
                  label=""
                  control={control}
                  options={featOptions}
                  placeholder="Select a feature to add"
                  errors={errors}
                  optionName={"label"}
                />
              </div>
              <Button
                type="button"
                variant="primary"
                onClick={handleAddFeature}
              >
                + Add Feature
              </Button>
            </div>

            {addedFeatures.map((feat, idx) => (
              <div
                key={feat.featureId}
                className="flex flex-col border rounded-[5px] overflow-hidden"
              >
                <div className="py-1 bg-gray-100">
                  <AccordionInputForm
                    name={`permissions-${feat.featureId}`}
                    label={feat.name}
                    control={control}
                    options={["read", "write", "update", "delete"]}
                    errors={errors}
                    defaultValue={feat.access}
                    firstRenderOpen={true}
                    onChange={(val) => console.log("New Perms:", val)}
                  />
                </div>
              </div>
            ))}
          </div>

          <SelectInputForm
            name="redirect"
            label="Redirect Feature"
            placeholder="Redirect to..."
            errors={errors}
            control={control}
            options={redirectOption}
            optionName={"label"}
          />
        </CardContent>

        <div className="w-full flex items-center justify-end space-x-4 p-4 mt-4">
          <Button type="button" variant="secondary" onClick={handleModalClose}>
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
