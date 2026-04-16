// import { Check, CheckCheckIcon, CheckCircle, CheckCircle2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

// export default function InstallationTimeline({ history = [] }) {
//     return (
//         <div className="bg-white border rounded-sm p-6 space-y-4 bg-muted/40">
//                 <h3 className="text-base font-semibold text-foreground">
//                     Installation Timeline
//                 </h3>

//             <div className="relative space-y-0 pb-2 p-4 rounded-lg border">
//                 <div className="absolute left-7 top-6 bottom-2 w-0.5 bg-green-200" />
                
//                 {history.map((item, idx) => (
//                     <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
//                         <div className="relative z-10 flex items-start">
//                             <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#16A34A] text-white shrink-0 shadow-sm">
//                                 <Check className="w-4 h-4" />
//                             </div>
//                         </div>

//                         <div className="flex flex-col space-y-1">
//                             <span className="text-sm font-mono text-muted-foreground">
//                                 {item.time}
//                             </span>
//                             <h4 className="text-base font-medium text-foreground">
//                                 {item.title}
//                             </h4>
//                             <p className="text-sm text-muted-foreground">
//                                 {item.description}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

import { Check } from "lucide-react";

// 1. Definisikan urutan tahapan yang statis di luar komponen
const TIMELINE_STEPS = [
    { title: "Arrived on site", description: "Technician checked in at customer location." },
    { title: "Fiber cable installed", description: "Fiber cable successfully installed and connected." },
    { title: "ONT configured", description: "Device configured and connected to network." },
    { title: "Speed test passed", description: "Connection speed meets the required threshold." },
    { title: "Customer walkthrough done", description: "Customer briefed on usage and basic troubleshooting." },
    { title: "Technician signed", description: "Digital signature recorded by technician." },
    { title: "Customer signed & job completed", description: "Customer confirmed installation. Internet service activated." },
];

export default function InstallationTimeline({ history = [] }) {
    return (
        <div className="bg-muted/40 rounded-sm p-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground">
                Installation Timeline
            </h3>

            <div className="relative p-4 rounded-lg border bg-white">
                <div className="absolute left-7 top-6 bottom-2 w-0.5 bg-green-200" />
                
                <div className="space-y-6">
                    {TIMELINE_STEPS.map((step, idx) => {
                        const logTime = history[idx] || "--:--";
                        const isCompleted = !!history[idx];

                        return (
                            <div key={idx} className="relative flex gap-4 pb-4 last:pb-0">
                                <div className="relative z-10 flex items-start">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                        isCompleted ? "bg-[#16A34A] text-white" : "bg-slate-200 text-slate-400"
                                    }`}>
                                        <Check className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-mono text-muted-foreground"
                                    >
                                        {logTime}
                                    </span>
                                    <h4 className={`text-base font-medium ${
                                        isCompleted ? "text-foreground" : "text-slate-400"
                                    }`}>
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}