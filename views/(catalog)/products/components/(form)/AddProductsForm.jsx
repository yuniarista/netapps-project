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
import SelectInput from "@/components/inputcopy/selectInputCustom";
import InputFileForm from "@/components/inputcopy/inputFileForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import AddAreaForm from "./AddAreaForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";

export default function AddProductsForm() {
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
    clasification: true,
    product: true,
  });

  // Fungsi untuk toggle (bolak-balik) status
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const statusValues = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const areaOptions = [{ label: "Bali", value: "area1" }];

  const categoryOptions = [{ label: "Business", value: "category1" }];

  const subCategoryOptions = [{ label: "Soho", value: "subCategory1" }];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <section>
            <div
              className="flex items-center justify-between mt-4 cursor-pointer"
              onClick={() => toggleSection("clasification")}
            >
              <h3 className="text-lg font-semibold">CLASSIFICATION</h3>
              {openSections.clasification ? (
                <ChevronDown className="h-4 w-4 text-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-500" />
              )}
            </div>

            {openSections.clasification && (
              <div className="flex flex-col gap-4 py-3">
                <div className="flex flex-row gap-4 justify-between">
                  <SelectInputCustom
                    name="area"
                    label="Area"
                    control={control}
                    options={areaOptions}
                    optionName="label"
                    placeholder="Select area"
                    errors={errors}
                    required
                    renderModalContent={(closeModal) => (
                      <AddAreaForm
                        onCancel={closeModal}
                        onSuccess={(data) => {
                          console.log("Data area baru:", data);
                          // Tambahkan logic API di sini jika perlu
                          closeModal(); // Tutup modal setelah sukses
                        }}
                      />
                    )}
                  />
                  <SelectInputCustom
                    name="category"
                    label="Category"
                    control={control}
                    options={categoryOptions}
                    optionName="label"
                    placeholder="Select category"
                    errors={errors}
                    renderModalContent={(closeModal) => (
                      <AddAreaForm
                        onCancel={closeModal}
                        onSuccess={(data) => {
                          console.log("Data area baru:", data);
                          // Tambahkan logic API di sini jika perlu
                          closeModal(); // Tutup modal setelah sukses
                        }}
                      />
                    )}
                  />
                  <SelectInputCustom
                    name="subCategory"
                    label="Sub Category"
                    control={control}
                    options={subCategoryOptions}
                    optionName="label"
                    placeholder="Select sub category"
                    errors={errors}
                    renderModalContent={(closeModal) => (
                      <AddAreaForm
                        onCancel={closeModal}
                        onSuccess={(data) => {
                          console.log("Data area baru:", data);
                          // Tambahkan logic API di sini jika perlu
                          closeModal(); // Tutup modal setelah sukses
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </section>

          <section>
            <div
              className="flex items-center justify-between mt-4 cursor-pointer"
              onClick={() => toggleSection("product")}
            >
              <h3 className="text-lg font-semibold">PRODUCT INFO & PRICING</h3>
              {openSections.product ? (
                <ChevronDown className="h-4 w-4 text-500" />
              ) : (
                <ChevronUp className="h-4 w-4 text-500" />
              )}
            </div>

            {openSections.product && (
              <div className="flex flex-col gap-4 py-3">
                <div className="flex flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <TextInputForm
                      id="productName"
                      name="productName"
                      placeholder="e.g., Fiber Home Pro"
                      label="Product name"
                      control={control}
                      errors={errors}
                      helperText="Use a unique name that customers will see on their bill."
                    />
                  </div>
                  <div className="flex-1">
                    <TextInputForm
                      id="capacity"
                      name="capacity"
                      placeholder="e.g., 50 Mbps"
                      label="Capacity"
                      control={control}
                      errors={errors}
                      helperText="Enter the maximum download speed for this plan."
                    />
                  </div>
                  <div className="flex-1">
                    <InputFileForm
                      name="productImage"
                      label="Product Image"
                      errors={errors}
                      control={control}
                      helperText="Recommended size: 1080×1350px. Max file size 2MB. JPG, PNG"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 justify-between">
                  <TextInputForm
                    id="price"
                    name="price"
                    placeholder="IDR"
                    label="Price"
                    control={control}
                    errors={errors}
                  />

                  <TextInputForm
                    id="promoPrice"
                    name="promoPrice"
                    placeholder="IDR"
                    label="Promo Price"
                    control={control}
                    errors={errors}
                  />

                  <SelectInputForm
                    name="status"
                    label="Status"
                    placeholder="Select status"
                    control={control}
                    options={statusValues}
                    optionName="label"
                    errors={errors}
                  />
                </div>
                <TextInputForm
                  id="detailsProduct"
                  name="detailsProduct"
                  placeholder="Describe speed, quota, SLA, contract terms."
                  helperText="Leave empty if not promotion."
                  label="Product Details"
                  rows={4}
                />
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
