"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Phone, Globe, Clock, Building } from "lucide-react";

const WhatsAppBasicInfo = ({ onEdit }) => {
    const infoData = [
        {
            label: "ISP Name",
            value: "SAI ISP",
            icon: Building,
            hexColor: "#3b82f6", // Blue-500
            hexBg: "#eff6ff",    // Blue-50
        },
        {
            label: "WhatsApp Number",
            value: "+62 123-3456-7890",
            icon: Phone,
            hexColor: "#22c55e", // Green-500
            hexBg: "#f0fdf4",    // Green-50
        },
        {
            label: "Provider",
            value: "WatZap",
            icon: Globe,
            hexColor: "#a855f7", // Purple-500
            hexBg: "#faf5ff",    // Purple-50
        },
        {
            label: "Timezone",
            value: "GMT +8",
            icon: Clock,
            hexColor: "#f97316", // Orange-500
            hexBg: "#fff7ed",    // Orange-50
        },
    ];

    return (
        <Card className="h-full flex flex-col shadow-sm border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-base font-bold text-slate-900">Basic Info</CardTitle>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-slate-100"
                    onClick={onEdit} 
                >
                    <Pencil className="h-4 w-4 text-slate-400" />
                </Button>
            </CardHeader>
            <CardContent className="px-4 space-y-4 flex-1">
                {infoData.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <div 
                                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                                style={{ backgroundColor: item.hexBg }}
                            >
                                <IconComponent 
                                    size={20} 
                                    style={{ color: item.hexColor }} 
                                />
                            </div>
                            
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-medium text-slate-500 uppercase">
                                    {item.label}
                                </span>
                                <span className="text-sm font-bold text-slate-900 truncate">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default WhatsAppBasicInfo;