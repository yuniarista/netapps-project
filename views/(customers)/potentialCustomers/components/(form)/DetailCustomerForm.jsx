"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/input/textInputForm";
import SelectInputForm from "@/components/input/selectInputForm";
import { SwitchToggleInput } from "@/components/input/switchToggleInput";
import InputFileForm from "@/components/input/inputFileForm";
import SelectInputCustom from "@/components/input/selectInputCustom";
import MapInput from "@/components/input/mapInput";
import AddSegmentForm from "../(components)/AddSegmentForm";
import DatePickerForm from "@/components/datePicker/datePickerForm";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import Loading from "@/app/(protected)/loading";

export default function DetailCustomerForm({
    loading,
    formData,
    formOptions,
    userProfile,
    alertOpen,
    setAlertOpen,
    response,
    setResponse,
    handleUpdate,
    handleModalClose
}) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [openSections, setOpenSections] = useState({
        general: true,
        contactDetails: true,
        salesInfo: true,
    });

    const form = useForm({
        mode: "all",
    });

    const { control, formState: { errors }, handleSubmit, setValue, watch, reset } = form;
    const isAffiliate = watch("isActive");

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="flex justify-end mb-2">
                    {!isEditMode ? (
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            onClick={() => setIsEditMode(true)}
                        >
                            <Pencil className="h-4 w-4 text-primary" />
                            Edit
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="gap-1"
                            onClick={handleCancelEdit}
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </Button>
                    )}
                </div>

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
                                    disabled={!isEditMode}
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
                                    defaultValue={formData?.customerSegment}
                                />
                                <TextInputForm
                                    name="name"
                                    label="Company Name"
                                    placeholder="Company Name"
                                    control={control}
                                    errors={errors}
                                    disabled={!isEditMode}
                                    helperText="Not Required for personal customers."
                                    defaultValue={formData?.name}
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
                                    // options={productOptions}
                                    optionName="label"
                                    defaultValue={formData?.product}
                                />
                                <SelectInputCustom
                                    name="areasId"
                                    label="Area"
                                    placeholder="Select area"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.areasId}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <SelectInputCustom
                                    name="homepassId"
                                    label="Homepass ID"
                                    placeholder="Select homepass ID"
                                    showSearch={true}
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.homepassId}
                                />

                                <TextInputForm
                                    name="odpId"
                                    label="ODP"
                                    placeholder="ODP Number"
                                    control={control}
                                    errors={errors}
                                    disabled={!isEditMode}
                                    helperText="ODP will be automatically set after you select a Homepass ID."
                                    defaultValue={formData?.odpId}
                                />
                            </div>

                            <div className="flex flex-row gap-4 justify-between">
                                <div className="w-1/2">
                                    <TextInputForm
                                        name="npwpNumber"
                                        label="NPWP"
                                        placeholder="NPWP Number"
                                        control={control}
                                        errors={errors}
                                        disabled={!isEditMode}
                                        helperText="Not Required for personal customers."
                                        defaultValue={formData?.npwpNumber}
                                    />
                                </div>

                                <div className="w-2/3">
                                    <InputFileForm
                                        name="npwpPhoto"
                                        label="NPWP Photo"
                                        control={control}
                                        errors={errors}
                                        disabled={!isEditMode}
                                        helperText="Not Required for personal customers."
                                        defaultValue={formData?.npwpPhoto}
                                    />
                                </div>
                            </div>

                            <InputFileForm
                                name="housePhoto"
                                label="Location Photo"
                                control={control}
                                errors={errors}
                                disabled={!isEditMode}
                                helperText="Upload a photo of the business exterior for verification."
                                defaultValue={formData?.housePhoto}
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
                                    defaultValue={formData?.nationality}
                                />
                                <SelectInputCustom
                                    name="idType"
                                    label="ID Type"
                                    placeholder="Select ID Type"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.idType}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="cardNumber"
                                    label="ID Number"
                                    placeholder="Enter ID Number"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.cardNumber}
                                />
                                <InputFileForm
                                    name="cardPhoto"
                                    label="Photo With ID"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.cardPhoto}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="fullName"
                                    label="Full Name"
                                    placeholder="Full Name"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.fullName}
                                />
                                <TextInputForm
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.email}
                                />
                                <TextInputForm
                                    name="phone"
                                    label="WhatsApp Number"
                                    placeholder="+62"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.phone}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <SelectInputCustom
                                    name="gender"
                                    label="Gender"
                                    placeholder="Select gender"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.gender}
                                />
                                <DatePickerForm
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    placeholder="Pick a date"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.dateOfBirth}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="state"
                                    label="State"
                                    placeholder="State"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.state}
                                />
                                <TextInputForm
                                    name="province"
                                    label="Province"
                                    placeholder="Province"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.province}
                                />
                                <TextInputForm
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.city}
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <TextInputForm
                                    name="longitude"
                                    label="Longitude"
                                    placeholder="Longitude"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.longitude}
                                />
                                <TextInputForm
                                    name="latitude"
                                    label="Latitude"
                                    placeholder="Latitude"
                                    control={control}
                                    errors={errors}
                                    defaultValue={formData?.latitude}
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
                                defaultValue={formData?.address}
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
                            {isEditMode && (
                                <SwitchToggleInput
                                    control={control}
                                    name="isActive"
                                    label="Is this Affiliate Sales?"
                                    labelPosition="right"
                                />
                            )}

                            {isAffiliate ? (
                                <div className="flex flex-row gap-4">
                                    <TextInputForm
                                        name="referalCode"
                                        label="Referral Code"
                                        control={control}
                                        errors={errors}
                                        disabled={!isEditMode}
                                        defaultValue={formData?.referalCode}
                                    />
                                    <TextInputForm
                                        name="affiliateSalesName"
                                        label="Affiliate Sales Name"
                                        control={control}
                                        errors={errors}
                                        disabled={!isEditMode}
                                        defaultValue={formData?.affiliateSalesName}
                                    />
                                    <TextInputForm
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        control={control}
                                        errors={errors}
                                        disabled={!isEditMode}
                                        defaultValue={formData?.mobileNumber}
                                    />
                                </div>
                            ) : (
                                <SelectInputCustom
                                    name="salesName"
                                    label="Sales Name"
                                    control={control}
                                    errors={errors}
                                    // options={salesNameOptions}
                                    defaultValue={formData?.salesName}
                                />
                            )}
                        </div>
                    )}
                </section>

                {isEditMode && (
                    <div className="w-full flex items-center justify-end space-x-4 pt-4">
                        <DialogClose disabled={loading}>
                            <Button type="reset" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loading /> : "Create"}
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
}