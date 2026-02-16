"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

export default function SelectDropdown({
    triggerLabel,
    icon: Icon = ChevronDown,
    iconPosition = "right",
    iconClassName,
    sections = [],
    className,
    triggerVariant = "outline",
    asBadge = false,
    badgeVariant = "outlined-active",
    showSectionLabelSeparator = true, 
    showSectionSeparator = true,
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                {asBadge ? (
                    <div className={cn("inline-flex items-center gap-1.5", className)}>
                        <Badge
                            variant={badgeVariant}
                            className="px-2 py-0.5 text-[12px] font-medium"
                        >
                            {triggerLabel}
                        </Badge>

                        <div className="flex items-center">
                            <Icon className="w-4 h-4 text-primary shrink-0" />
                        </div>
                    </div>
                ) : (
                    <Button
                        variant={triggerVariant}
                        className={cn(
                            "flex h-9 w-full items-center rounded-[8px] gap-2 border border-slate-200 bg-white px-3 py-2 text-sm text-[#18181B] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            iconPosition === "right" ? "justify-between" : "justify-start",
                            className
                        )}
                    >
                        {iconPosition === "left" && (
                            <Icon className={cn("h-4 w-4 shrink-0 text-primary", iconClassName)} />
                        )}

                        <span className="truncate font-semibold">{triggerLabel}</span>

                        {iconPosition === "right" && (
                            <Icon className={cn("h-4 w-4 shrink-0 text-primary", iconClassName)} />
                        )}
                    </Button>
                )}
            </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-52 p-0 py-1 shadow-xl border-slate-200 rounded-[8px]">
                {sections.map((section, sIdx) => (
                    <React.Fragment key={sIdx}>
                        {section.label && (
                            <>
                                <DropdownMenuLabel className="px-3 py-2 text-[13px] font-bold text-[#1e293b]">
                                    {section.label}
                                </DropdownMenuLabel>
                                {showSectionLabelSeparator && <DropdownMenuSeparator className="bg-slate-200 m-0" />}
                            </>
                        )}

                        {section.items.map((item, iIdx) => (
                            <DropdownMenuItem
                                key={iIdx}
                                onSelect={(e) => section.type === "checkbox" && e.preventDefault()}
                                onClick={() => item.onClick && item.onClick(item.value)}
                                className="px-3 py-2 cursor-pointer flex items-center gap-2"
                            >
                                {section.type === "checkbox" ? (
                                    <>
                                        <label className="text-[14px] cursor-pointer flex-1">{item.label}</label>
                                        <Checkbox
                                            id={`${section.label}-${item.value}`}
                                            checked={item.checked}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {item.icon && <item.icon className="w-4 h-4" />}
                                        <span className="text-[14px]">{item.label}</span>
                                    </>
                                )}
                            </DropdownMenuItem>
                        ))}

                        {showSectionSeparator && sIdx < sections.length - 1 && (
                            <DropdownMenuSeparator className="bg-slate-200 m-0" />
                        )}
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

