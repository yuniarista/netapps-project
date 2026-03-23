"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Phone, Globe, Clock, Building, ShoppingBag, Store, Server, KeyRound, Coins } from "lucide-react";
import IconifyIcon from "@/components/icon";
import { Separator } from "@/components/ui/separator";

const TransactionSetting = ({ onEdit }) => {
    const infoData = [
        {
            label: "Environment",
            value: "Production",
            icon: Server,
            hexColor: "#06B6D4",
            hexBg: "#ECFEFF",
        },
        {
            label: "Server Key",
            value: "123456789",
            icon: Globe,
            hexColor: "#0EA5E9",
            hexBg: "#F0F9FF",
        },
        {
            label: "Client Key",
            value: "123456789",
            icon: KeyRound,
            hexColor: "#8B5CF6", // violet-500
            hexBg: "#F5F3FF",    // violet-50
        },
        {
            label: "Transaction Fee",
            value: "2000",
            icon: Coins,
            hexColor: "#F59E0B", // amber-500
            hexBg: "#FFFBEB",    // amber-50
        },
    ];
    const gatewayProvider = [
        {
            label: "Gateway Provider",
            value: "Midtrans",
            icon: Store,
            hexColor: "#22C55E", // Green-500
            hexBg: "#F0FDF4",    // Green-50
        },
    ];

    return (
        <Card className="h-full flex flex-col shadow-sm border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-base font-bold text-slate-900">Transaction Setting
                    <p className="text-xs font-normal text-muted-foreground">Manage payment gateway settings and transaction preferences</p>
                </CardTitle>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-slate-100"
                    onClick={onEdit} 
                >
                    <Pencil className="h-4 w-4 text-slate-400" />
                </Button>
            </CardHeader>
            {gatewayProvider.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={index} className="flex items-center gap-2 px-4">
                            <div 
                                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                                style={{ backgroundColor: item.hexBg }}
                            >
                                {typeof IconComponent === "string" ? (
                                    <IconifyIcon 
                                        icon={IconComponent} 
                                        width="20" 
                                        height="20" 
                                        style={{ color: item.hexColor }} 
                                    />
                                ) : (
                                    <IconComponent 
                                        size={20} 
                                        style={{ color: item.hexColor }} 
                                    />
                                )}
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
                <div className="px-4 mt-4">

                <Separator/>
                </div>
            <CardContent className="p-4 space-y-4 flex-1">
                {infoData.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={index} className="flex items-center gap-2">
                            <div 
                                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                                style={{ backgroundColor: item.hexBg }}
                            >
                                {typeof IconComponent === "string" ? (
                                    <IconifyIcon 
                                        icon={IconComponent} 
                                        width="20" 
                                        height="20" 
                                        style={{ color: item.hexColor }} 
                                    />
                                ) : (
                                    <IconComponent 
                                        size={20} 
                                        style={{ color: item.hexColor }} 
                                    />
                                )}
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

export default TransactionSetting;