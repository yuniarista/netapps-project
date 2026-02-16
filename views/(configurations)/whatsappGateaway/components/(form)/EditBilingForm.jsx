"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Eye, EyeClosed, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";


export default function EditBilingForm({ handleModalClose, loading }) {
    const [openSections, setOpenSections] = useState({
        general: true,
    });

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const form = useForm({
        mode: "all",
    });

    const { control, formState: { errors }, handleSubmit } = form;

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const togglePreview = () => {
        setIsPreviewOpen(!isPreviewOpen);
    };

    const onSubmit = (data) => {
        console.log("Data Form Submit:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CardContent className="p-0">
                    <section className="overflow-hidden">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleSection("general")}
                        >
                            <h3 className="text-sm font-semibold text-slate-700 tracking-wider">GENERAL</h3>
                            {openSections.general ? (
                                <ChevronUp className="h-4 w-4 text-slate-500" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-slate-500" />
                            )}
                        </div>

                        {openSections.general && (
                            <div className="space-y-4 animate-in fade-in duration-300 p-2">
                                <SwitchToggleInput
                                    control={control}
                                    name="isActive"
                                    label="Activate Biling Feature"
                                    description="Turn this on to activate your template and send it to customer."
                                />

                                <SelectInputForm
                                    name="billingfeature"
                                    label="Feature"
                                    placeholder="Billing Feature"
                                    errors={errors}
                                    control={control}
                                />


                                <div className="space-y-2">
                                    <div className="flex gap-2 items-center">
                                        <TextInputForm
                                            name="message"
                                            label="Message"
                                            placeholder="Enter message template"
                                            rows={4}
                                            errors={errors}
                                            control={control}
                                        />
                                        <Button
                                            type="button"                                       
                                            onClick={togglePreview} 
                                            disabled={loading}
                                        >
                                            {isPreviewOpen ? (
                                                <EyeOff className="h-4 w-4" /> 
                                            ) : (
                                                <Eye className="h-4 w-4" />    
                                            )}
                                            Preview
                                        </Button>
                                    </div>
                                </div>
                                
                                {/* contoh condisional rendering nanti diganti */}
                                {isPreviewOpen && (
                                    <div>
                                       <h1 className="flex items-center text-sm font-medium pb-1"> Preview (with sample data) </h1>
                                    <div className="p-4 border rounded-md bg-slate-50 animate-in slide-in-from-top-2 duration-300">
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Message Preview:</p>
                                        <div className="text-sm text-slate-700 whitespace-pre-wrap italic">
                                            {form.watch("message") || "Belum ada pesan yang diketik..."}
                                        </div>
                                    </div>
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
                        {loading ? "Submitting..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}