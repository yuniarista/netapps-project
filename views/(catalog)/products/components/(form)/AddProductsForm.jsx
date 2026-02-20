"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { X, ChevronDown, ChevronUp, Trash, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextInputForm from "@/components/inputcopy/textInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import SelectInput from "@/components/inputcopy/selectInputCustom";
import InputFileForm from "@/components/inputcopy/inputFileForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import AddAreaForm from "./AddAreaForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import { Label } from "@radix-ui/react-select";
import NumberInputForm from "@/components/inputcopy/inputNumber";
import InputNumberForm from "@/components/inputcopy/inputNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductAddSchema } from "../../schemas/productScemas";
import AddCategoryForm from "./AddCategoryForm";
import AddSubCategoryForm from "./AddSubCategoryForm";

export default function AddProductsForm() {
  const form = useForm({
    mode: "all",
    defaultValues: {
      sameAsCompanyEmail: false,
      category: "",
      addOns: [{ addName: "", categoryProduct: "", quantity: 1 }],
    },
  });
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addOns",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    // Handle input change logic here
  };

  const isToggleActive = watch("sameAsCompanyEmail");
  const [openSections, setOpenSections] = useState({
    clasification: true,
    product: true,
  });

  const [addedFeatures, setAddedFeatures] = useState([]);

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
  const productOptions = [{ label: "Access Point", value: "product1" }];
  const productCategory = [{ label: "Device", value: "productCat1" }];

  useEffect(() => {
    if (isToggleActive) {
      setValue("area", "");
      setValue("category", "");
    }
  });

  const onSubmit = (data) => {
    console.log("Data Form:", data);

    if (handleCreate) {
      handleCreate(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
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
                      <AddCategoryForm
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
                      <AddSubCategoryForm
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
              className="flex items-center justify-between cursor-pointer"
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
                <div>
                  <SwitchToggleInput
                    control={control}
                    name="sameAsCompanyEmail"
                    label="Include Add-on Products"
                    description="Toggle this on if this product plan comes with optional hardware or extra services."
                  />

                  {isToggleActive && (
                    <div className="flex flex-col gap-2 p-4 mt-2 bg-[#F9F9F9] border rounded-[5px]">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex flex-row gap-4 items-start py-1"
                        >
                          <SelectInputCustom
                            name="addOnName"
                            label="Add-on Name"
                            control={control}
                            options={productOptions}
                            optionName="label"
                            placeholder="Product Name"
                            errors={errors}
                            helperText="e.g., Wifi Extender, Static IP, or Mesh Router."
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
                            name="categoryProduct"
                            label="Category"
                            control={control}
                            options={productCategory}
                            optionName="label"
                            placeholder="Category"
                            errors={errors}
                            helperText="e.g., Choose the brand of the add-on."
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

                          {/* <div className="flex gap-2"> */}
                          <InputNumberForm
                            control={control}
                            name="quantity"
                            label="Qty"
                            placeholder="0"
                            errors={errors}
                          />

                          <div className="py-6 mt-1">
                            <button
                              type="button"
                              className=""
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                          {/* </div> */}
                        </div>
                      ))}
                      <div
                        className="flex items-center py-3 gap-1 cursor-pointer text-primary text-sm font-medium "
                        onClick={() =>
                          append({
                            addOnName: "",
                            categoryProduct: "",
                            quantity: 1,
                          })
                        }
                      >
                        <Plus className="w-4 h-4" />
                        Add another add-on
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row gap-4 justify-between">
                  <div className="w-full">
                    <TextInputForm
                      id="price"
                      name="price"
                      placeholder="IDR"
                      label="Price"
                      control={control}
                      errors={errors}
                    />

                    <div className="py-2">
                      <SwitchToggleInput
                        // control={control}
                        name="includeTax"
                        label="Include Tax (11%)"
                        description="Turn off if tax should be added separately."
                      />
                    </div>
                  </div>

                  <TextInputForm
                    id="promoPrice"
                    name="promoPrice"
                    placeholder="IDR"
                    label="Promo Price"
                    control={control}
                    errors={errors}
                    helperText="Leave empty if no promotion."
                  />
                  <TextInputForm
                    id="promoPrice"
                    name="promoPrice"
                    placeholder="IDR"
                    label="Promo Price"
                    control={control}
                    errors={errors}
                    helperText="One-time fee charged during the initial setup."
                  />
                </div>
                <SelectInputCustom
                  name="status"
                  label="Status"
                  control={control}
                  options={statusValues}
                  optionName="label"
                  placeholder="status"
                  errors={errors}
                />
                <TextInputForm
                  id="detailsProduct"
                  name="detailsProduct"
                  placeholder="Describe speed, quota, SLA, contract terms."
                  label="Product Details"
                  rows={3}
                  maxLength={100}
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
