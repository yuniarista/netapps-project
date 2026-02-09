"use client";

import { SwitchToggleInput } from "@/components/form-p/switchToggleInput";
import InputInvoiceForm from "@/components/input/invoiceInputForm";
import SelectInputForm from "@/components/input/selectInputForm";
import { Button } from "@/components/ui-p/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui-p/card";
import { Form } from "@/components/ui-p/form";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddInvoiceForm() {
  const form = useForm({ mode: "all" });
  const {
    control,
    formState: { errors },
  } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const [openSections, setOpenSections] = useState({
    register: true,
    template: true,
    description: true,
    status: true,
  });

  const statusValues = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const isOptions = [
    { label: "NetApps", value: "netapps" },
    { label: "SAI", value: "sai" },
    { label: "BLiP", value: "blip" },
  ];

  const templateOptions = [
    { label: "SAI", value: "sai" },
    { label: "Invoice A", value: "invoice_a" },
    { label: "Invoice B", value: "invoice_b" },
  ];

  const descriptionOptions = [
    { label: "Instalation Fee", value: "instalatioinFee" },
    { label: "Basic Template", value: "basic" },
    { label: "Premium Template", value: "premium" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <section>
            {openSections.register && (
              <div className="flex flex-col gap-4 py-2">
                <div className="space-y-4">
                  <SelectInputForm
                    name="ispName"
                    label="ISP Name"
                    placeholder="Choose registered ISP"
                    errors={errors}
                    control={control}
                    optionName="label"
                    options={isOptions}
                  />
                </div>
              </div>
            )}
          </section>
          <section>
            {openSections.template && (
              <div className="flex flex-col gap-4">
                <div className="space-y-4">
                  <SelectInputForm
                    name="template"
                    label="Template Name"
                    placeholder="Enter invoice template name here"
                    errors={errors}
                    control={control}
                    options={templateOptions}
                    optionName="label"
                  />
                </div>
              </div>
            )}
          </section>
          <section>
            {openSections.description && (
              <div className="flex flex-col gap-4 py-2">
                <div className="space-y-4">
                  <SelectInputForm
                    name="description"
                    label="Description"
                    placeholder="Enter invoice template description here"
                    errors={errors}
                    control={control}
                    options={descriptionOptions}
                    optionName="label"
                  />
                </div>
              </div>
            )}
          </section>
          <section>
            <div className="flex flex-col gap-4 py-2">
              <div className="space-y-4">
                <InputInvoiceForm
                  name="invoice"
                  label="Invoice File"
                  errors={errors}
                  control={control}
                />
                <div className="flex flex-col">
                  <Label className="gap-2 mt-4">Default (Yes/No)</Label>
                  <SwitchToggleInput control={control} name={"default"} />
                </div>
              </div>
            </div>
          </section>
          <section>
            {openSections.status && (
              <div className="flex flex-col">
                <div>
                  <SelectInputForm
                    name="status"
                    label="Status"
                    placeholder="Status"
                    errors={errors}
                    control={control}
                    options={statusValues}
                    optionName="label"
                  />
                </div>
              </div>
            )}
          </section>
        </CardContent>
        <CardFooter className="gap-4 py-3">
          <Button type="reset" variant="secondary">
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Create
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
