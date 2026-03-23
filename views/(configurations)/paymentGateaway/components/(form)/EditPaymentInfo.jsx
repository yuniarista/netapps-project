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

export default function EditPaymentForm({ handleModalClose, loading }) {
  const [openSections, setOpenSections] = useState({
    general: true,
    provider: true,
  });

  const form = useForm({
    mode: "all",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
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

  const isOptions = [
    { label: "Midtrans", value: "midtrans" },
    { label: "Midtrans1", value: "midtrans1" },
    { label: "Midtrans2", value: "midtrans2" },
  ];

  const providerOptions = [
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
              <div className="space-y-4 animate-in fade-in duration-300 py-2">
                <SwitchToggleInput
                  control={control}
                  labelPosition="left"
                  name="isActive"
                  label="Activate Gateway"
                  description="Turn this on to activate your gateway status."
                />

                <SelectInputForm
                  name="vendor"
                  label="Gateway Vendor"
                  placeholder="Vendor Name"
                  errors={errors}
                  control={control}
                  options={isOptions}
                  optionName="label"
                  disabled={true}
                />
                <SelectInputForm
                  name="environtment"
                  label="Environtment"
                  placeholder="Environtment"
                  errors={errors}
                  control={control}
                  options={isOptions}
                  optionName="label"
                />

                <TextInputForm
                  name="aerverKey"
                  label="Server Key"
                  placeholder="input your server key"
                  errors={errors}
                  control={control}
                />
                <TextInputForm
                  name="clientKey"
                  label="Client Key"
                  placeholder="input your client key"
                  errors={errors}
                  control={control}
                />
              </div>
            )}
          </section>

          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("provider")}
            >
              <h3 className="text-lg font-semibold text-slate-700 tracking-wider">
                Transaction FEE
              </h3>
              {openSections.provider ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground ">
              The transaction fee set here will be added to the customer’s
              invoice amount for every payment made via the gateway.
            </p>
            {openSections.provider && (
              <div className="space-y-4 animate-in fade-in duration-300 py-2"></div>
            )}
          </section>
        </CardContent>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleModalClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
