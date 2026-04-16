"use client";

import { Globe, CheckCircle2 } from "lucide-react";
import InstallationWorkOrderCard from "../(components)/InstallationWorkOrderCard";
import InstallationTimeline from "../(components)/InstallationsTimeline";
import { MediaViewDetails } from "../(components)/MediaViewDetails";

export default function TechnicianHistoryPage({ loading }) {
    const completedData = {
        woNumber: "WO/2026/03/00185",
        customerName: "Budi Santoso",
        status: "Completed",
        date: "14 March 2026",
        timeRange: "08:00 – 09:47",
        duration: "1h 47m",
        address: "Griya Permata Blok C/12, Badung",
        package: "Gamer 100 Mbps",
        odp: "ODP-BDG-022",
        technicianName: "Agus Wibowo"
    };

    const times = ["08:00", "08:14", "08:38", "08:55", "09:20", "09:31", "09:47"];
    const isActive = times.length === 7;

    const completedJobData = {
        installation_photos: [
            { id: "img-001", name: "ONT_Installation_Front.jpg", size: 2411724, url: "#" },
            { id: "img-002", name: "Cabling_Route_Final.png", size: 1572864, url: "#" },
            { id: "img-003", name: "Speedtest_Result.jpg", size: 838860, url: "#" }
        ],
        baa_documents: [
            { id: "doc-001", name: "Work Order.pdf", size: 2097152, url: "#" },
            { id: "doc-002", name: "Baa.pdf", size: 2097152, url: "#" }
        ]
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full max-w-6xl mx-auto space-y-4 p-4">
                <div className="rounded-xl p-4 bg-[#1E293B] text-white flex flex-col items-center text-center space-y-4">
                    <div className="flex items-center justify-center rounded-md bg-[#2563EB1A]/10 w-12 h-12">
                        <Globe className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex items-center gap-2">
                        {isActive && (
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                        )}
                        <h1 className="text-xl font-medium">
                            Internet {isActive ? "ACTIVE" : "INACTIVE"}
                        </h1>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-sm">
                            Installation completed successfully. {completedData.customerName}'s service is now live.
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-2 font-mono text-sm text-muted-foreground">
                            <span>Activated: 14 Mar 2026</span>
                            <span className="hidden md:inline">•</span>
                            <span>09:47 AM</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">
                                Active Customer
                            </span>
                        </div>
                    </div>
                </div>
                <InstallationWorkOrderCard data={completedData} />

                <InstallationTimeline history={times} />

                <MediaViewDetails data={completedJobData} />
            </div>
        </div>
    );
}