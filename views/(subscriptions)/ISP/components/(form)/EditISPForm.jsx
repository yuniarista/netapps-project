"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextInputForm from "@/components/inputcopy/textInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";

export default function EditISP() {
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
    billing: true,
    details: true,
  });

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
          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("general")}
            >
              <h3 className="text-lg font-semibold">GENERAL</h3>
              {openSections.general ? (
                <ChevronDown className="h-4 w-4 text-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-500" />
              )}
            </div>

            {openSections.general && (
              <div className="flex flex-col gap-4 py-3">
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <TextInputForm
                      id="companyName"
                      name="companyName"
                      placeholder="Company name"
                      label="ISP Company Name"
                      
                    />
                  </div>
                  <div className="flex-1">
                    <TextInputForm
                      id="LegalCompanyName"
                      name="LegalCompanyName"
                      placeholder="Legal company name"
                      label="Legal Company Name"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 justify-between">
                  <TextInputForm
                    id="CompanyEmail"
                    name="CompanyEmail"
                    placeholder="Company Email"
                    label="Company Email"
                  />

                  <TextInputForm
                    id="phone"
                    name="phone"
                    placeholder="+62"
                    label="Phone"
                  />

                  <TextInputForm
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Contact person"
                    label="Contact Person"
                  />
                </div>
              </div>
            )}
          </section>

          <section>
            <div
              className="flex items-center justify-between space-y-4 mt-4 cursor-pointer"
              onClick={() => toggleSection("billing")}
            >
              <h3 className="text-lg font-semibold">BILLING CONTACT</h3>
              {openSections.billing ? (
                <ChevronDown className="h-4 w-4 text-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-500" />
              )}
            </div>

            {openSections.billing && (
              <div className="flex flex-col gap-4 py-3">
                <div className="">
                  <TextInputForm
                    id="billingEmail"
                    name="billingEmail"
                    placeholder="Billing email"
                    label="Billing Email"
                  />

                  <div className="py-2">
                    <SwitchToggleInput
                      control={control}
                      name={"sameAsCompanyEmail"}
                      label="Same as Company Email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <TextInputForm
                    id="BillingAddress"
                    name="BillingAddress"
                    placeholder="Billing address"
                    label="Billing Address"
                    rows={4}
                  />
                </div>
              </div>
            )}
          </section>

          <section>
            <div
              className="flex items-center justify-between space-y-4 mt-4 cursor-pointer"
              onClick={() => toggleSection("details")}
            >
              <h3 className="text-lg font-semibold">DETAILS</h3>
              {openSections.details ? (
                <ChevronDown className="h-4 w-4 text-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-500" />
              )}
            </div>

            {openSections.details && (
              <div className="flex flex-col gap-4 py-3">
                <div className="space-y-4">
                  <TextInputForm
                    id="state"
                    name="state"
                    placeholder="State"
                    label="State"
                  
                  />
                  <TextInputForm
                    id="province"
                    name="province"
                    placeholder="Province"
                    label="Province"
                
                  />
                  <TextInputForm
                    id="city"
                    name="city"
                    placeholder="City"
                    label="City"
                    
                  />
                  <TextInputForm
                    id="addressDetails"
                    name="addressDetails"
                    placeholder="Address details"
                    label="Address Details"
                    rows={4}
                    
                  />
                </div>
              </div>
            )}
          </section>
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
