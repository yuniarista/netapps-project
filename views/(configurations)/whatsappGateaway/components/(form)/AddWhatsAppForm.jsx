"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui-p/card";
import { useForm } from "react-hook-form";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import TextInputForm from "@/components/inputcopy/textInputForm";

export default function AddWhatsAppForm() {
  const form = useForm({ mode: "all" });
  const {
    control,
    formState: { errors },
  } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    // Handle input change logic here
  };

  const [openSections, setOpenSections] = useState({
    general: true,
    register: true,
    number: true,
    timezone: true,
    status: true,
  });

  const statusValues = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const register = [
    { label: "NetApps", value: "netapps" },
    { label: "SAI", value: "sai" },
    { label: "BLiP", value: "blip" },
  ];

  const number = [
    { label: "+62 812-3456-7890", value: "6281234567890" },
    { label: "+62 813-9876-5432", value: "6281398765432" },
    { label: "+62 811-2345-6789", value: "6281123456789" },
  ];    

  const timezone = [
    { label: "GMT+7 Jakarta", value: "gmt+7" },
    { label: "GMT+8 Bali", value: "gmt+8" },
    { label: "GMT+9 Jayapura", value: "gmt+9" },
  ];



  // Fungsi untuk toggle (bolak-balik) status
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="">
        <CardContent>
       
            <div
              className="flex items-center justify-between space-y-4 mt-4 cursor-pointer"
              onClick={() => toggleSection("billing")}
            >
              <h3 className="text-lg font-semibold">GENERAL</h3>
              {openSections.general ? (
                <ChevronDown className="h-4 w-4 text-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-500" />
              )}
            </div>

            {openSections.billing && (
              <div className="flex flex-col gap-4 py-3">
                <div>
                  <SelectInputForm
                    name="ispName"
                    label="ISP Name"
                    placeholder="Choose registered ISP"
                    errors={errors}
                    control={control}
                    optionName="label"
                    options={register}
                  />

                  <TextInputForm
                    id="number"
                    name="whatsappName"
                    placeholder="W"
                    label="WhatsApp Gateway Name"
                    required
                  />
                  <SelectInputForm
                    name="timezone"
                    label="Timezone"
                    placeholder="Select Timezone"
                    errors={errors}
                    control={control}
                    optionName="label"
                    options={timezone}
                  />
                  <SelectInputForm
                    name="status"
                    label="Status"
                    placeholder="Select Status"
                    errors={errors}
                    control={control}
                    optionName="label"
                    options={statusValues}
                  />


                </div>
              </div>
            )}
        </CardContent>
        <CardFooter className="gap-4">
          <Button
            type="reset"
            variant="secondary"
            className="bg-[#FFFFFF] border border-gray-300"
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
