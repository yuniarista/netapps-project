"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import InputFileForm from "@/components/inputcopy/inputFileForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import MapInput from "@/components/inputcopy/mapInput";
import AddSegmentForm from "../(components)/AddSegmentForm";
import DatePickerForm from "@/components/datePicker/datePickerForm";
import { cn } from "@/lib/utils";

const customerSegmentOptions = [
    { label: "Home", value: "home" },
    { label: "Villas", value: "villas" },
    { label: "Hospital", value: "hospital" },
];

const salesNameOptions = [
    { label: "Sales 1", value: "sales1" },
    { label: "Sales 2", value: "sales2" },
    { label: "Sales 3", value: "sales3" },
];

const productOptions = [
    { label: "Product 1", value: "product1" },
    { label: "Product 2", value: "product2" },
    { label: "Product 3", value: "product3" },
];

const homepassOptions = [
    { label: "HP-001 (Blok A-10)", value: "hp001", odp: "ODP-KUTA-01" },
    { label: "HP-002 (Blok B-05)", value: "hp002", odp: "ODP-KUTA-01" },
    { label: "HP-003 (Blok C-12)", value: "hp003", odp: "ODP-KUTA-02" },
    { label: "HP-004 (Blok D-01)", value: "hp004", odp: "ODP-JIMBARAN-05" },
];

export default function EditCustomerForm({ handleModalClose, loading }) {
    const [openSections, setOpenSections] = useState({
        general: true,
        contactDetails: true,
        salesInfo: true,
    });

    const form = useForm({
        mode: "all",
    });

    const { control, formState: { errors }, handleSubmit, setValue, watch } = form;
    const isAffiliate = watch("isActive");
    const selectedHomepass = watch("homepassId");

    useEffect(() => {
        if (selectedHomepass) {
            const selectedData = homepassOptions.find(item => item.value === selectedHomepass);

            if (selectedData) {
                setValue("odpId", selectedData.odp);
            }
        } else {
            setValue("odpId", "");
        }
    }, [selectedHomepass, setValue]);

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const onSubmit = (data) => {
        console.log("Data Form Submit:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <section>
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleSection("general")}
                        >
                            <h3 className="text-lg font-semibold text-slate-700 tracking-wider">GENERAL</h3>
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
                                        options={customerSegmentOptions}
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
                                        name="companyName"
                                        label="Company Name"
                                        placeholder="Company Name"
                                        control={control}
                                        errors={errors}
                                        disabled={true}
                                        helperText="Not Required for personal customers."
                                    />
                                </div>

                                <div className="flex flex-row gap-4">
                                    <SelectInputCustom
                                        name="product"
                                        label="Product"
                                        placeholder="Select product"
                                        control={control}
                                        errors={errors}
                                        showSearch={true}
                                        options={productOptions}
                                        optionName="label"
                                    />
                                    <SelectInputCustom
                                        name="area"
                                        label="Area"
                                        placeholder="Select area"
                                        control={control}
                                        errors={errors}
                                    />
                                </div>

                                <div className="flex flex-row gap-4 items-end">
                                    <div className={cn("transition-all duration-500", selectedHomepass ? "w-1/2" : "w-full")}>
                                        <SelectInputCustom
                                            name="homepassId"
                                            label="Homepass ID"
                                            placeholder="Select Homepass"
                                            showSearch={true}
                                            control={control}
                                            errors={errors}
                                            options={homepassOptions}
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
                                            name="npwpId"
                                            label="NPWP"
                                            placeholder="NPWP Number"
                                            control={control}
                                            errors={errors}
                                            helperText="Not Required for personal customers."
                                        />
                                    </div>

                                    <div className="w-2/3">
                                        <InputFileForm
                                            name="npwpPhoto"
                                            label="NPWP Photo"
                                            control={control}
                                            errors={errors}
                                            helperText="Not Required for personal customers."
                                        />
                                    </div>
                                </div>

                                <InputFileForm
                                    name="locationId"
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
                            <h3 className="text-lg font-semibold text-slate-700 tracking-wider">CONTACT DETAILS</h3>
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
                                    />
                                    <SelectInputCustom
                                        name="idType"
                                        label="ID Type"
                                        placeholder="Select ID Type"
                                        control={control}
                                        errors={errors}
                                        helperText="Not Required for personal customers."
                                    />
                                </div>

                                <div className="flex flex-row gap-4">
                                    <TextInputForm
                                        name="idNumber"
                                        label="ID Number"
                                        placeholder="Enter ID Number"
                                        control={control}
                                        errors={errors}
                                    />
                                    <InputFileForm
                                        name="photoId"
                                        label="Photo With ID"
                                        control={control}
                                        errors={errors}
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
                                        name="whatsappNumber"
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
                                </div>

                                <div className="my-4">
                                    <MapInput setValue={setValue} watch={watch} />
                                </div>

                                <TextInputForm
                                    name="addressDetails"
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
                            <h3 className="text-lg font-semibold text-slate-700 tracking-wider">SALES INFORMATION</h3>
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
                                        options={salesNameOptions}
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
                        {loading ? "Submitting..." : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}