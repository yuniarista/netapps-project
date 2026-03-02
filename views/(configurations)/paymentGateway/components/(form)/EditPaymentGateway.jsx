"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export default function EditPaymentGateway({ handleModalClose, loading }) {
    const [openSections, setOpenSections] = useState({
        general: true,
        transaction: true,
    });

    const form = useForm({
        mode: "all",
    });

    const { control, formState: { errors }, handleSubmit, watch } = form;
    const selectedFeeType = watch("feeType");

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
        { label: "NetApps", value: "netapps" },
        { label: "SAI", value: "sai" },
        { label: "BLiP", value: "blip" },
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
                            <h3 className="text-lg font-semibold text-slate-700">GENERAL</h3>
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
                                    name="gatewayVendor"
                                    label="Gateway Vendor"
                                    placeholder="Select Gateway Vendor"
                                    errors={errors}
                                    control={control}
                                    // options={isOptions}
                                    optionName="label"
                                    disabled={true}
                                />

                                <SelectInputForm
                                    name="environment"
                                    label="Environment"
                                    placeholder="Select Environment"
                                    errors={errors}
                                    control={control}
                                    // options={providerOptions}
                                    optionName="label"
                                />

                                <TextInputForm
                                    name="serverKey"
                                    label="Server Key"
                                    placeholder="Input your server key"
                                    errors={errors}
                                    control={control}
                                />

                                <TextInputForm
                                    name="clientKey"
                                    label="CLient Key"
                                    placeholder="input your client key"
                                    errors={errors}
                                    control={control}
                                />
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-700">
                                TRANSACTION FEE
                            </h3>
                            {openSections.transaction ? (
                                <ChevronUp className="h-4 w-4 text-slate-500 transition-transform" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-slate-500 transition-transform" />
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground leading-5 mt-1 pr-6">
                            The transaction fee set here will be added to the customer’s invoice amount
                            for every payment made via the gateway.
                        </p>

                        {openSections.transaction && (
                            <div className="animate-in fade-in duration-300">
                                <FormField
                                    control={control}
                                    name="feeType"
                                    render={({ field }) => (
                                        <FormItem className="pt-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-3"
                                                >
                                                    <div className="flex flex-col space-y-3">
                                                        <div className="flex items-center space-x-3">
                                                            <RadioGroupItem value="personal" id="personal" />
                                                            <label htmlFor="personal" className="text-sm font-medium text-slate-700 cursor-pointer">
                                                                No Additional Fee
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center space-x-3 min-h-[40px]">
                                                            <div className="flex items-center space-x-3">
                                                                <RadioGroupItem value="company" id="company" />
                                                                <label htmlFor="company" className="text-sm font-medium text-slate-700 cursor-pointer shrink-0">
                                                                    Fixed Amount
                                                                </label>
                                                            </div>

                                                            {selectedFeeType === "company" && (
                                                                <div className="animate-in fade-in zoom-in-95 duration-200 w-32">
                                                                    <TextInputForm
                                                                        name="feeAmount"
                                                                        label=""
                                                                        placeholder="5000"
                                                                        errors={errors}
                                                                        control={control}
                                                                        type="number"
                                                                        className="h-8 text-sm" 
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
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
                        {loading ? "Submitting..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}