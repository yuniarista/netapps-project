"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { SwitchToggleInput } from "@/components/inputcopy/switchToggleInput";


export default function EditTelegramForm({ handleModalClose, loading }) {
    const [openSections, setOpenSections] = useState({
        general: true,
        provider: true,
    });

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

    const onSubmit = (data) => {
        console.log("Data Form Submit:", data);
    };

    const isOptions = [
        { label: "NetApps", value: "netapps" },
        { label: "SAI", value: "sai" },
        { label: "BLiP", value: "blip" },
    ];

    const providerOptions = [
        { label: "NetApps", value: "netapps" },
        { label: "SAI", value: "sai" },
        { label: "BLiP", value: "blip" },
    ];

    const timezoneOptions = [
        { label: "GMT+7", value: "gmt+7" },
        { label: "GMT+8", value: "gmt+8" },
        { label: "GMT+9", value: "gmt+9" },
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
                                    label="Activate Gateway"
                                    description="Turn this on to activate your gateway status."
                                />

                                <SelectInputForm
                                    name="ispName"
                                    label="ISP Name"
                                    placeholder="ISP Name"
                                    errors={errors}
                                    control={control}
                                    options={isOptions}
                                    optionName="label"
                                    disabled={true}
                                />

                                <TextInputForm
                                    name="whatsappNumber"
                                    label="WhatsApp Number"
                                    placeholder="+62 812 3456 7890"
                                    errors={errors}
                                    control={control}
                                />

                                <SelectInputForm
                                    name="provider"
                                    label="Provider"
                                    placeholder="Select Provider"
                                    errors={errors}
                                    control={control}
                                    options={providerOptions}
                                    optionName="label"
                                />

                                <SelectInputForm
                                    name="timezone"
                                    label="Timezone"
                                    placeholder="Select Timezone"
                                    errors={errors}
                                    control={control}
                                    options={timezoneOptions}
                                    optionName="label"
                                />
                            </div>
                        )}
                    </section>

                    <section>
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleSection("provider")}
                        >
                            <h3 className="text-lg font-semibold text-slate-700 tracking-wider">Provider Credential</h3>
                            {openSections.provider ? (
                                <ChevronUp className="h-4 w-4 text-slate-500" />
                            ) : (
                                <ChevronDown className="h-4 w-4 text-slate-500" />
                            )}
                        </div>

                        {openSections.provider && (
                            <div className="space-y-4 animate-in fade-in duration-300 py-2">
                                <TextInputForm
                                    name="token"
                                    label="API Token"
                                    placeholder="Input token device"
                                    errors={errors}
                                    control={control}
                                />

                                <TextInputForm
                                    name="sessionId"
                                    label="Session ID / Device Tag"
                                    placeholder="Input sessionID / device tag"
                                    errors={errors}
                                    control={control}
                                />
                                <TextInputForm
                                    name="telecoreHots"
                                    label="Telecore Host / Domain API"
                                    placeholder="https://telecore.netapps.web.id"
                                    errors={errors}
                                    control={control}
                                />
                                <TextInputForm
                                    name="chatId"
                                    label="Default Chat ID / Phone (Optional)"
                                    placeholder="chatID / 0812345678"
                                    errors={errors}
                                    control={control}
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