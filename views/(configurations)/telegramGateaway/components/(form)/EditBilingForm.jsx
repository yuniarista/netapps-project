"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Eye, EyeClosed, EyeOff, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";
import VariableDialog from "@/components/dialog/variableDialog";
import IconifyIcon from "@/components/icon";


export default function EditIncoiceTemplateForm({ handleModalClose, loading, initialData }) {
    const [isVariableModalOpen, setIsVariableModalOpen] = useState(false);
    const [openSections, setOpenSections] = useState({
        general: true,
    });
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const form = useForm({
        mode: "all",
        defaultValues: {
            isActive: false,
            billingfeature: "",
            message: ""
        }
    });

    const { control, formState: { errors }, handleSubmit, reset } = form;

    useEffect(() => {
        if (initialData) {
            reset({
                isActive: initialData.status === "Active",
                billingfeature: initialData.name,
                message: initialData.message
            });
        }
    }, [initialData, reset]);

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

    useEffect(() => {
        setIsVariableModalOpen(true);

        // Opsional: Tutup modal variabel saat form edit ditutup
        return () => setIsVariableModalOpen(false);
    }, []);

    return (
        <>
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
                                <div className="space-y-4 animate-in fade-in duration-300 py-2">
                                    <SwitchToggleInput
                                        control={control}
                                        labelPosition="left"
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
                                        disabled={true}
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
                                        <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                                            <h1 className="flex items-center text-sm font-medium pb-2 text-slate-600">
                                                Preview (with sample data)
                                            </h1>

                                            <div className="border w-96 rounded-sm bg-white shadow-sm overflow-hidden mt-2 mx-auto">
                                                <div className="flex items-center gap-3 p-3 border-b bg-white">
                                                    <div
                                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                                        style={{ backgroundColor: '#1E96C8' }}
                                                    >
                                                        <IconifyIcon
                                                            icon="ph:telegram-logo"
                                                            className="w-5 h-5 text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-bold text-slate-800 leading-tight">Telegram Business</h4>
                                                        <p className="text-[12px] text-slate-500 leading-tight">Online</p>
                                                    </div>
                                                </div>

                                                <div className="p-2 min-h-[200px] relative">
                                                    <div
                                                        className="p-3 rounded-sm shadow-sm relative"
                                                        style={{ backgroundColor: '#F0F9FF' }}
                                                    >
                                                        <div className="text-[13px] text-slate-800 leading-relaxed break-words">
                                                            {form.watch("message") ? (
                                                                form.watch("message").split("\n").map((line, index) => (
                                                                    <span key={index}>
                                                                        {line}
                                                                        <br />
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="text-slate-400 italic">Belum ada pesan yang diketik...</span>
                                                            )}
                                                        </div>

                                                        <div
                                                            className="absolute top-0 -left-2 w-0 h-0 border-l-[10px] border-l-transparent"
                                                            style={{ borderTop: '10px solid #e7ffdb' }}
                                                        ></div>
                                                    </div>
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

            <VariableDialog open={isVariableModalOpen} onOpenChange={setIsVariableModalOpen} />
        </>
    );
}