"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputNumberForm from "@/components/inputcopy/inputNumber";
import { Separator } from "@/components/ui/separator"; // Pastikan import dari UI component yang benar

export default function EditTransactionSetting({ handleModalClose, loading }) {
    const [openSections, setOpenSections] = useState({
        general: true,
    });

    const form = useForm({
        mode: "all",
    });

    const { control, formState: { errors }, handleSubmit } = form;

    // Data Dummy untuk Satuan Waktu
    const timeUnitOptions = [
        { label: "Minutes", value: "minutes" },
        { label: "Hours", value: "hours" },
        { label: "Days", value: "days" },
    ];

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const onSubmit = (data) => {
        console.log("Data Form Submit:", data);
    };

    const RadioYesNo = ({ name, label }) => (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-slate-700">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col" 
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="yes" id={`${name}-yes`} />
                                <label
                                    htmlFor={`${name}-yes`}
                                    className="text-sm font-medium text-slate-600 cursor-pointer"
                                >
                                    Yes
                                </label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="no" id={`${name}-no`} />
                                <label
                                    htmlFor={`${name}-no`}
                                    className="text-sm font-medium text-slate-600 cursor-pointer"
                                >
                                    No
                                </label>
                            </div>
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )}
        />
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CardContent className="space-y-6">
                    <section className="space-y-4">
                        <div
                            className="flex items-center justify-between cursor-pointer group"
                            onClick={() => toggleSection("general")}
                        >
                            <h3 className="text-lg font-bold text-slate-700 tracking-tight">GENERAL SETTING</h3>
                            {openSections.general ? (
                                <ChevronUp className="h-5 w-5 text-slate-500" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-slate-500" />
                            )}
                        </div>

                        {openSections.general && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 py-2">

                                <div className="space-y-2">
                                    <div className="flex items-end space-x-2">
                                        <div className="flex-1">
                                            <InputNumberForm
                                                control={control}
                                                name="time"
                                                label="Transaction Expiry Time"
                                                placeholder="0"
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="w-35">
                                            <SelectInputForm
                                                name="timeUnit"
                                                label=""
                                                placeholder="Select unit"
                                                optionName="label"
                                                options={timeUnitOptions}
                                                control={control}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Transaction will automatically expire if customer does not complete payment within this time.
                                    </p>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-4">
                                    <RadioYesNo
                                        name="allowMultipleInvoices"
                                        label="Allow multiple unpaid invoices?"
                                    />
                                    <RadioYesNo
                                        name="autoCancel"
                                        label="Auto-cancel unpaid invoice after expiry?"
                                    />
                                    <RadioYesNo
                                        name="allowRegenerate"
                                        label="Allow customer to regenerate payment link?"
                                    />
                                </div>

                                <Separator className="my-4" />

                                <TextInputForm
                                    name="maxRetry"
                                    label="Max Transaction retry attempts"
                                    placeholder="e.g. 3"
                                    errors={errors}
                                    control={control}
                                    helperText="Maximum number of payment retry attempts allowed"
                                />
                            </div>
                        )}
                    </section>
                </CardContent>

                <div className="flex items-center justify-end space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleModalClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}