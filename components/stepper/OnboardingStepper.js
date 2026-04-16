"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStepperData } from "@/hooks/use-stepper-data";
import IconifyIcon from "../icon";
import { useEffect } from "react";
import { stepper_config } from "@/constants/data";

// const DEFAULT_STEPS = [
//     { id: "step-1", title: "Check Coverage", sub: "Sales", endpoint: "users/profile" },
//     { id: "step-2", title: "Pre-Sales Lead", sub: "Sales", endpoint: "roles/active" },
//     { id: "step-3", title: "Data + Confirmation", sub: "Sales Admin", endpoint: "customers/active" },
//     { id: "step-4", title: "Billing & Payment", sub: "Finance", endpoint: "organizations?limit=5&page=1" },
//     { id: "step-5", title: "Assign Technician", sub: "Technical Admin" },
// ];

export function OnboardingStepper({
    steps = stepper_config,
    currentStep = 1,
    onStepChange,
    className = "",
}) {
    // const { loadStepData } = useStepperData(steps);

    // useEffect(() => {
    //     const stepToLoad = steps[currentStep - 1];
    //     if (stepToLoad?.id) {
    //         loadStepData(stepToLoad.id);
    //     }
    // }, [currentStep, steps, loadStepData]);

    const getStepStatus = (stepIndex) => {
        if (stepIndex < currentStep - 1) return "complete";
        if (stepIndex === currentStep - 1) return "active";
        return "pending";
    };

    return (
        <div className={cn("flex w-full flex-col gap-6 p-2", className)}>
            <div className="flex items-center justify-between px-2 py-0 overflow-x-auto scrollbar-hidden-x">
                {steps.map((step, index) => {
                    const status = getStepStatus(index);
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={step.id} className="flex items-center flex-1 last:flex-none relative pb-4">
                            <div
                                className="flex items-start gap-3 cursor-pointer group"
                                // onClick={() => onStepChange?.(index + 1)}
                            >
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all",
                                    status === "complete" ? "bg-[#16A34A] text-white" :
                                        status === "active" ? "bg-primary text-white" :
                                            "bg-slate-200 text-muted-foreground"
                                )}>
                                    {status === "complete" ? <Check className="w-4 h-4" /> : index + 1}
                                </div>

                                <div className="flex flex-col">
                                    <span className={cn(
                                        "text-sm font-semibold transition-colors",
                                        status === "active" ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {step.title}
                                    </span>

                                    <span className={cn(
                                        "text-sm font-medium transition-colors mt-1",
                                        status === "active" ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {step.sub}
                                    </span>
                                </div>
                            </div>

                            {!isLast && (
                                <div className="mx-4 text-slate-300">
                                    <IconifyIcon icon="lucide:chevron-right" width={16} />
                                </div>
                            )}

                            {status === "active" && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-in fade-in duration-500" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}