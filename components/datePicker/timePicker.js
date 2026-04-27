import * as React from "react";
import { cn } from "@/lib/utils";

export default function TimePicker({ value, onChange }) {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
    const selectedDate = value ? new Date(value) : new Date();

    const handleSelect = (type, val) => {
        const newDate = new Date(selectedDate);
        if (type === "hour") newDate.setHours(val);
        if (type === "minute") newDate.setMinutes(val);
        onChange(newDate);
    };

    return (
        <div className="flex h-[300px] bg-white border-l rounded-r-lg border-slate-100">
            <div className="flex flex-col w-[70px] border-r border-slate-50">
                <div className="text-xs text-muted-foreground font-semibold py-3 text-center bg-white sticky top-0 z-10">
                    Hours
                </div>
                <div className="flex-1 h-full overflow-y-auto scrollbar-hidden-y pb-4">
                    {hours.map((h) => (
                        <button
                            key={h}
                            type="button"
                            onClick={() => handleSelect("hour", h)}
                            className={cn(
                                "w-[50px] h-9 mx-auto flex items-center justify-center rounded-md text-sm mb-1 transition-all",
                                selectedDate.getHours() === h
                                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                                    : "hover:bg-slate-100 text-foreground"
                            )}
                        >
                            {String(h).padStart(2, "0")}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-[70px]">
                <div className="text-xs text-muted-foreground font-semibold py-3 text-center bg-white sticky top-0 z-10">
                    Minute
                </div>
                <div className="flex-1 h-full overflow-y-auto scrollbar-hidden-y pb-4">
                    {minutes.map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => handleSelect("minute", m)}
                            className={cn(
                                "w-[50px] h-9 mx-auto flex items-center justify-center rounded-md text-sm mb-1 transition-all",
                                selectedDate.getMinutes() === m
                                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                                    : "hover:bg-slate-100 text-foreground"
                            )}
                        >
                            {String(m).padStart(2, "0")}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
