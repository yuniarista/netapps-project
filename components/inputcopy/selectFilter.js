"use client";

import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SelectFilter({
    label,
    options = [],
    selected = [],
    onChange,
    icon: Icon = ChevronDown,
    showSearch = false,
    className,
}) {
    const [search, setSearch] = useState("");

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (value) => {
        const isSelected = selected.includes(value);
        const newSelected = isSelected
            ? selected.filter((item) => item !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    return (
        <DropdownMenu onOpenChange={() => setSearch("")}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "flex h-9 items-center rounded-sm gap-2 px-3 py-2 text-sm border-dashed border-slate-300 bg-white text-[#18181B] hover:bg-slate-50",
                        "outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                        selected.length > 0 && "bg-slate-100 border-slate-300 shadow-sm",
                        className
                    )}
                >
                    <Icon className="h-4 w-4 shrink-0 text-slate-800" />

                    <div className="flex items-center gap-2">
                        <span className="font-medium">{label}</span>

                        {selected.length > 0 && (
                            <>
                                <div className="w-[1px] h-3 bg-slate-300 mx-0.5" />
                                <span className="font-normal text-slate-600">{selected.length} Item</span>
                            </>
                        )}
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="w-52 p-0 shadow-xl border-slate-200 rounded-[8px] overflow-hidden"
            >
                {showSearch && (
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 bg-white">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                            className="text-[14px] outline-none w-full placeholder:text-slate-400 bg-transparent"
                            placeholder={`${label}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                )}

                <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
                    {filteredOptions.map((opt) => (
                        <DropdownMenuItem
                            key={opt.value}
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => handleSelect(opt.value)}
                            className="px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-slate-50 focus:bg-slate-50"
                        >
                            <Checkbox
                                checked={selected.includes(opt.value)}
                                className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <label className="text-[14px] cursor-pointer flex-1 text-slate-700">
                                {opt.label}
                            </label>
                        </DropdownMenuItem>
                    ))}

                    {filteredOptions.length === 0 && (
                        <div className="px-3 py-4 text-center text-xs text-slate-400">
                            Data tidak ditemukan
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator className="m-0 bg-slate-100" />
                <button
                    type="button"
                    onClick={() => onChange([])}
                    className="w-full py-2.5 text-center text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors bg-white"
                >
                    Clear filters
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}