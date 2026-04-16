"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/input/textInputForm";
import SelectInputForm from "@/components/input/selectInputForm";
import { SwitchToggleInput } from "@/components/input/switchToggleInput";
import InputFileForm from "@/components/input/inputFileForm";
import SelectInputCustom from "@/components/input/selectInputCustom";
import MapInput from "@/components/input/mapInput";
import AddSegmentForm from "../(components)/AddSegmentForm";
import DatePickerForm from "@/components/datePicker/datePickerForm";
import { cn } from "@/lib/utils";
import { CustomerAddSchema, CustomerSchema } from "../../schema/usePotentialCustomerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import Loading from "@/app/(protected)/loading";

export default function AddCustomerForm({
    response,
    setResponse,
    userProfile,
    alertOpen,
    setAlertOpen,
    formOptions,
    handleCreate,
    loading,
    areasData,
    productsData,
    homepassesData,
}) {
    const [openSections, setOpenSections] = useState({
        general: true,
        contactDetails: true,
        salesInfo: true,
    });

    const form = useForm({
        // resolver: yupResolver(CustomerAddSchema),
        mode: "all",
    });

    const { control, formState: { errors }, handleSubmit, setValue, watch } = form;
    const selectedSegment = watch("customerSegment");
    const isAffiliate = watch("isActive");
    const selectedHomepass = watch("homepassesId");

    const areasOptions = areasData?.data?.map((areas) => ({
        label: areas.name,
        value: areas.id
    })) || [];


    const productsOptions = productsData?.data?.map((products) => ({
        label: products.name,
        value: products.id
    })) || [];

    const homepassesOptions = homepassesData?.data?.map((homepasses) => ({
        label: homepasses.name,
        value: homepasses.id,
        odpName: homepasses.odp?.name || "No ODP"
    })) || [];

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Prefer not to say", value: "not_specified" },
    ]

    useEffect(() => {
        if (selectedHomepass) {
            const selectedData = homepassesOptions.find(item => item.value === selectedHomepass);

            if (selectedData) {
                setValue("odpId", selectedData.odpName);
            }
        } else {
            setValue("odpId", "");
        }
    }, [selectedHomepass, homepassesOptions, setValue]);

    useEffect(() => {
        if (selectedSegment === "home") {
            setValue("companyName", "");
            setValue("npwpId", "");
            setValue("npwpPhoto", null);
        }
    }, [selectedSegment, setValue]);

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <section>
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("general")}
                    >
                        <h3 className="text-lg font-semibold text-slate-700">GENERAL</h3>
                        {openSections.general ? (
                            <ChevronUp className="h-4 w-4 text-slate-500" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                        )}
                    </div>

                    {openSections.general && (
                        <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                            <div className="flex flex-row gap-4 justify-between">
                                <SelectInputCustom
                                    name="customerSegment"
                                    label="Customer Segment"
                                    placeholder="Select segment"
                                    optionName="label"
                                    control={control}
                                    errors={errors}
                                    // required
                                    // options={customerSegmentOptions}
                                    renderModalContent={(closeModal) => (
                                        <AddSegmentForm
                                            onCancel={closeModal}
                                            onSuccess={(data) => {
                                                console.log("Data segment baru:", data);
                                                // Tambahkan logic API di sini jika perlu
                                                closeModal(); // Tutup modal setelah sukses
                                            }}
                                        />
                                    )}
                                />
                                <TextInputForm
                                    name="name"
                                    label="Company Name"
                                    placeholder="Company Name"
                                    control={control}
                                    errors={errors}
                                    // disabled={selectedSegment === "home"}
                                    helperText="Not Required for personal customers."
                                />
                                {/* <TextInputForm
                                    name="status"
                                    label="Status"
                                    placeholder="Company Name"
                                    control={control}
                                    errors={errors}
                                /> */}
                            </div>

                            <div className="flex flex-row gap-4">
                                <SelectInputCustom
                                    name="productId"
                                    label="Product"
                                    placeholder="Select product"
                                    control={control}
                                    errors={errors}
                                    showSearch={true}
                                    options={productsOptions}
                                    optionName="label"
                                />
                                <SelectInputCustom
                                    name="area"
                                    label="Area"
                                    placeholder="Select area"
                                    control={control}
                                    errors={errors}
                                    options={areasOptions}
                                    optionName={"label"}
                                />
                            </div>

                            <div className="flex flex-row gap-4 justify-between">
                                <div className={cn("transition-all duration-500", selectedHomepass ? "w-1/2" : "w-full")}>
                                    <SelectInputCustom
                                        name="homepassesId"
                                        label="Homepass ID"
                                        placeholder="Select Homepass"
                                        showSearch={true}
                                        control={control}
                                        errors={errors}
                                        options={homepassesOptions}
                                        optionName="label"
                                    />
                                </div>

                                {selectedHomepass && (
                                    <div className="w-1/2 animate-in fade-in slide-in-from-left-4 duration-500">
                                        <TextInputForm
                                            name="odpId"
                                            label="ODP"
                                            placeholder="ODP Number"
                                            control={control}
                                            errors={errors}
                                            disabled={true}
                                            helperText="ODP will be automatically set after you select a Homepass ID."
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="w-1/2">
                                    <TextInputForm
                                        name="npwpNumber"
                                        label="NPWP"
                                        placeholder="NPWP Number"
                                        control={control}
                                        errors={errors}
                                        disabled={selectedSegment === "home"}
                                        helperText="Not Required for personal customers."
                                    />
                                </div>

                                <div className="w-2/3">
                                    <InputFileForm
                                        name="npwpPhoto"
                                        label="NPWP Photo"
                                        control={control}
                                        errors={errors}
                                        disabled={selectedSegment === "home"}
                                        helperText="Not Required for personal customers."
                                    />
                                </div>
                            </div>

                            <InputFileForm
                                name="housePhoto"
                                label="Location Photo"
                                control={control}
                                errors={errors}
                                helperText="Upload a photo of the business exterior for verification."
                            />
                        </div>
                    )}
                </section>

                <section>
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("contactDetails")}
                    >
                        <h3 className="text-lg font-semibold text-slate-700">CONTACT DETAILS</h3>
                        {openSections.contactDetails ? (
                            <ChevronUp className="h-4 w-4 text-slate-500" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                        )}
                    </div>

                    {openSections.contactDetails && (
                        <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                            <div className="flex flex-row gap-4">
                                <SelectInputCustom
                                    name="nationality"
                                    label="Nationality"
                                    placeholder="Select nationality"
                                    control={control}
                                    errors={errors}
                                    optionName="label"
                                />
                                <TextInputForm
                                    name="cid"
                                    label="ID Type"
                                    placeholder="Select ID Type"
                                    control={control}
                                    errors={errors}
                                    optionName="label"
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="cardIdNumber"
                                    label="ID Number"
                                    placeholder="Enter ID Number"
                                    control={control}
                                    errors={errors}
                                    accept=".pdf, image/*"
                                />
                                <InputFileForm
                                    name="cardPhoto"
                                    label="Photo With ID"
                                    control={control}
                                    errors={errors}
                                    accept=".pdf, image/*"
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="fullName"
                                    label="Full Name"
                                    placeholder="Full Name"
                                    control={control}
                                    errors={errors}
                                />
                                <TextInputForm
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    control={control}
                                    errors={errors}
                                />
                                <TextInputForm
                                    name="phone"
                                    label="WhatsApp Number"
                                    placeholder="+62"
                                    control={control}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <SelectInputCustom
                                    name="gender"
                                    label="Gender"
                                    placeholder="Select gender"
                                    control={control}
                                    errors={errors}
                                    options={genderOptions}
                                    optionName="label"
                                />
                                <DatePickerForm
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    placeholder="Pick a date"
                                    control={control}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="state"
                                    label="State"
                                    placeholder="State"
                                    control={control}
                                    errors={errors}
                                />
                                <TextInputForm
                                    name="province"
                                    label="Province"
                                    placeholder="Province"
                                    control={control}
                                    errors={errors}
                                />
                                <TextInputForm
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    control={control}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="longitude"
                                    label="Longitude"
                                    placeholder="Longitude"
                                    control={control}
                                    errors={errors}
                                />
                                <TextInputForm
                                    name="latitude"
                                    label="Latitude"
                                    placeholder="Latitude"
                                    control={control}
                                    errors={errors}
                                />
                                <TextInputForm
                                    name="postalCode"
                                    label="Postal Code"
                                    placeholder="e.g. 80361"
                                    control={control}
                                    errors={errors}
                                    optionName="label"
                                />
                            </div>

                            <div className="my-4">
                                <MapInput setValue={setValue} watch={watch} helperText="Adjust the pin to the exact customer location." />
                            </div>

                            <TextInputForm
                                name="address"
                                label="Address Details"
                                placeholder="Address Details"
                                rows={4}
                                control={control}
                                errors={errors}
                            />
                        </div>
                    )}
                </section>

                <section>
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleSection("salesInfo")}
                    >
                        <h3 className="text-lg font-semibold text-slate-700">SALES INFORMATION</h3>
                        {openSections.salesInfo ? (
                            <ChevronUp className="h-4 w-4 text-slate-500" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-slate-500" />
                        )}
                    </div>

                    {openSections.salesInfo && (
                        <div className="space-y-4 animate-in fade-in duration-300 py-3">
                            <SwitchToggleInput
                                control={control}
                                name="isActive"
                                label="Is this Affiliate Sales?"
                                labelPosition="right"
                            />

                            {!isAffiliate && (
                                <SelectInputCustom
                                    name="salesName"
                                    label="Sales Name"
                                    placeholder="Sales name"
                                    optionName="label"
                                    errors={errors}
                                    control={control}
                                // options={salesNameOptions}
                                />
                            )}

                            {isAffiliate && (
                                <div className="flex flex-row gap-4 animate-in slide-in-from-top-2 duration-300">
                                    <TextInputForm
                                        name="referalCode"
                                        label="Referral Code"
                                        placeholder="Referral Code"
                                        control={control}
                                        errors={errors}
                                    />
                                    <TextInputForm
                                        name="affiliateSalesName"
                                        label="Affiliate Sales Name"
                                        placeholder="Affiliate Sales Name"
                                        control={control}
                                        errors={errors}
                                    />
                                    <TextInputForm
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        placeholder="+62"
                                        control={control}
                                        errors={errors}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </section>
                <div className="w-full flex items-center justify-end space-x-4 pt-4">
                    <DialogClose asChild>
                        <Button type="reset" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading}>
                        {loading ? <Loading /> : "Confirm Order"}
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form >
    );
}