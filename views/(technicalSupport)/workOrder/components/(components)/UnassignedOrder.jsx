import React from "react";
import CustomCard from "@/components/card/customCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MapPin, Clock, ArrowRight, X } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const getStatsStyle = (type) => {
    switch (type) {
        case "unassigned":
            return { bg: "bg-[#FB923C1A]/10", border: "border-[#F9731699]/60" };
        case "technician":
            return { bg: "bg-[#16A34A1A]/10", border: "border-[#16A34A66]/40" };
        case "waiting":
            return { bg: "bg-[#EF44441A]/10", border: "border-[#FCA5A5]" };
        default:
            return { bg: "bg-gray-50", border: "border-gray-200" };
    }
};

const isOldTime = (timeStr) => {
    const lowerTime = timeStr.toLowerCase();
    return lowerTime.includes("day") || lowerTime.includes("days");
};

const DUMMY_ORDERS = [
    {
        id: "1",
        customerName: "Siti Rahma",
        woNumber: "WO/2026/03/00191",
        package: "Office 200 Mbps",
        location: "Denpasar",
        time: "1 days ago",
        initials: "SR",
        avatarColor: "bg-blue-500",
    },
    {
        id: "2",
        customerName: "Andi Wijaya",
        woNumber: "WO/2026/03/00192",
        package: "Office 150 Mbps",
        location: "Seminyak",
        time: "Just now",
        initials: "AW",
        avatarColor: "bg-red-500",
    },
];

const STATS_DATA = [
    { label: "Unassigned", value: 10, type: "unassigned" },
    { label: "Available Technicians", value: 3, type: "technician" },
    { label: "Oldest Waiting", value: 3, type: "waiting" },
];

export default function UnassignedOrder({ onClose, onAssign }) {
    return (
        <>
        <div className="space-y-4">
            <div className="flex flex-row gap-2 ">
                {STATS_DATA.map((stat, index) => {
                    const style = getStatsStyle(stat.type);
                    return (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col p-2 rounded-sm border w-fit",
                                style.bg,
                                style.border
                            )}
                        >
                            <span className="text-xs font-medium text-muted-foreground mb-1 whitespace-nowrap">
                                {stat.label}
                            </span>
                            <span className={cn("text-lg font-semibold", style.color)}>
                                {stat.value}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-4">
                {DUMMY_ORDERS.map((order) => {
                    const timeIsOld = isOldTime(order.time);

                    return (
                        <div
                            key={order.id}
                            className="group flex items-center justify-between p-2 rounded-sm border border-slate-200 bg-muted/40"
                        >
                            <div className="flex items-start gap-2">
                                <Avatar className={cn("h-8 w-8", order.avatarColor)}>
                                    <AvatarFallback className="text-white font-medium text-sm">
                                        {order.initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col gap-0.5">
                                    <h3 className="font-semibold text-sm text-foreground">{order.customerName}</h3>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                        {order.woNumber} <span className="text-muted-foreground">|</span> {order.package}
                                    </div>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="w-4 h-4 text-red-400" /> {order.location}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-4 h-4 shrink-0" />
                                            <span className={cn(
                                                timeIsOld ? "text-red-500" : "text-muted-foreground"
                                            )}>
                                                {order.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="xs"
                                onClick={() => onAssign(order)}
                                className="h-8 px-2 text-xs shrink-0"
                            >
                                Assign
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}
            </div>

            <div className="w-full flex items-center justify-end space-x-4 pt-4">
                <DialogClose asChild>
                    <Button type="reset" variant="outline">
                        Close
                    </Button>
                </DialogClose>
            </div>
        </div>
        </>
    );
}