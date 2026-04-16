import PageHeader from "@/components/pageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Box, Zap, User } from "lucide-react";

export default function TechnicianJobsTable() {
    const checklistData = [
        { title: "Arrived at customer location", desc: "Confirm you are on site and ready to begin installation.", checked: true },
        { title: "Install fiber cable to CPE", desc: "Run fiber from ODP port to customer's ONT/router location.", checked: false },
        { title: "Configure ONT / Router", desc: "Apply ISP settings, SSID, and password per customer request.", checked: false },
        { title: "Run connection speed test", desc: "Minimum 45 Mbps down / 20 Mbps up required to pass.", checked: false },
        { title: "Customer usage walkthrough", desc: "Explain WiFi name, password, and basic troubleshooting steps.", checked: false },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* <PageHeader title="Technical Support" /> */}

            <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
                <div className="bg-white border rounded-lg p-6 shadow-sm bg-muted/40">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">WO/2026/03/00192</p>
                            <h2 className="text-xl font-bold text-slate-800">Rina Ahmad</h2>
                            <Badge className="bg-blue-600 hover:bg-blue-700 mt-1">In Progress</Badge>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-slate-800">10:00</p>
                            <p className="text-sm text-slate-500">15 March 2026</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Address</span>
                                <span className="text-sm font-medium">Jl. Merdeka No. 45</span>
                            </div>
                            <Button size="sm" className="bg-blue-600 gap-2 h-8 text-xs">
                                <MapPin className="h-3 w-3" /> Get Direction
                            </Button>
                        </div>

                        <div className="p-3 border rounded-lg bg-slate-50">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Package</p>
                            <p className="text-sm font-medium">Home 50 Mbps</p>
                        </div>

                        <div className="p-3 border rounded-lg bg-slate-50">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">ODP Assignment</p>
                            <p className="text-sm font-medium">ODP-DPS-001</p>
                        </div>

                        <div className="p-3 border rounded-lg bg-slate-50">
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Technician</p>
                            <p className="text-sm font-medium">Agus Wibowo</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-slate-800">Installation Checklist</h3>
                        <p className="text-sm text-slate-400 font-medium">0 / 5 completed</p>
                    </div>

                    <div className="space-y-3">
                        {checklistData.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 bg-white border rounded-xl hover:shadow-md transition-shadow"
                            >
                                <Checkbox
                                    checked={item.checked}
                                    className="mt-1 h-5 w-5 border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <div className="space-y-1">
                                    <p className={`text-sm font-bold ${item.checked ? 'text-slate-800' : 'text-slate-600'}`}>
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}