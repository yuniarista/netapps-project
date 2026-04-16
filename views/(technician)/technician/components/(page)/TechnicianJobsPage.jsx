"use client";

import PageHeader from "@/components/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Box, Zap, User, Globe } from "lucide-react";
import InstallationWorkOrderCard from "../(components)/InstallationWorkOrderCard";
import InstallationChecklist from "../(components)/InstallationChecklist";
import ChecklistItem from "../(components)/InstallationChecklist";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import InstallationTimeline from "../(components)/InstallationsTimeline";
import InstallationMedia from "../(components)/InstallationMedia";
import Loading from "@/app/(protected)/loading";

export default function TechnicianJobsPage({ loading }) {
    const inProgressData = {
        woNumber: "WO/2026/03/00192",
        customerName: "Rina Ahmad",
        status: "In Progress",
        time: "10:00", // Waktu kedatangan/janji temu
        date: "15 March 2026",
        address: "Jl. Merdeka No. 45, Denpasar",
        package: "Home 50 Mbps",
        odp: "ODP-DPS-001",
        technicianName: "Agus Wibowo"
    };

    const dummyHistory = [
        {
            time: "08:00",
            title: "Arrived on site",
            description: "Technician checked in at customer location.",
        },
        {
            time: "08:14",
            title: "Fiber cable installed",
            description: "Fiber cable successfully installed and connected.",
        },
        {
            time: "08:38",
            title: "ONT configured",
            description: "Device configured and connected to network.",
        },
        {
            time: "08:55",
            title: "Speed test passed",
            description: "Connection speed meets the required threshold.",
        },
        {
            time: "09:20",
            title: "Customer walkthrough done",
            description: "Customer briefed on usage and basic troubleshooting.",
        },
        {
            time: "09:31",
            title: "Technician signed",
            description: "Digital signature recorded by technician.",
        },
        {
            time: "09:47",
            title: "Customer signed & job completed",
            description: "Customer confirmed installation. Internet service activated.",
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* <PageHeader title="Technical Support" /> */}

            <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
                <InstallationWorkOrderCard data={inProgressData} />
                <InstallationChecklist />

                <InstallationMedia />
            </div>
            <div className="w-full max-w-6xl mx-auto p-4 pt-0">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 text-base"
                >
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Globe className="h-5 w-5" />
                            Activate Internet & Complete Job
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}