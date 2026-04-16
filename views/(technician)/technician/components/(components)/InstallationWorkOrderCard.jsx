"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Calendar, Clock, Timer } from "lucide-react"; // Tambah icon baru
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CalendarDay } from "react-day-picker";

export default function InstallationWorkOrderCard({ data }) {
  if (!data) return null;

  const isCompleted = data.status === "Completed";

  return (
    <Card className="w-full bg-muted/40 border-none shadow-none">
      <CardHeader className="flex flex-row justify-between items-start pb-4 space-y-0">
        <div className="space-y-1">
          <p className="text-xs font-mono text-muted-foreground">
            {data.woNumber}
          </p>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            {data.customerName}
          </h2>

          {isCompleted ? (
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {data.date}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {data.timeRange}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                <Timer className="h-4 w-4 text-muted-foreground" />
                {data.duration}
              </div>
            </div>
          ) : (
            <Badge variant="default">
              {data.status}
            </Badge>
          )}
        </div>

        {isCompleted && (
          <div className="pt-4 text-right items-center">
          <Badge
            // variant="outlined-active"
            className="bg-[#22C55E24]/10 text-[#16A34A] border-[#16A34A66]/40 px-3 py-1 text-xs shadow-none"
          >
            Completed
          </Badge>
          </div>
        )}

        {!isCompleted && (
          <div className="pt-4 text-right items-center">
            <p className="text-xl font-semibold text-foreground leading-none">{data.time}</p>
            <p className="text-sm text-foreground">{data.date}</p>
          </div>
        )}
      </CardHeader>

      <div className="px-6">
        <Separator />
      </div>

      <CardContent className="grid grid-cols-2 gap-4 p-4 space-y-0">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/40 h-20 w-full overflow-hidden">
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <p className="text-sm text-muted-foreground mb-0.5">Address</p>
            <p className="text-sm text-foreground">{data.address}</p>
          </div>
          {!isCompleted && (
            <Button
              size="sm"
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`, '_blank')}
            >
              <Map className="h-4 w-4" /> <span className="hidden sm:inline">Get Direction</span>
            </Button>
          )}
        </div>

        <div className="flex flex-col justify-center p-4 border rounded-lg bg-muted/40 h-20 w-full overflow-hidden">
          <p className="ttext-sm text-muted-foreground mb-0.5">Package</p>
          <p className="text-sm text-foreground">{data.package}</p>
        </div>

        <div className="flex flex-col justify-center p-4 border rounded-lg bg-muted/40 h-20 w-full overflow-hidden">
          <p className="text-sm text-muted-foreground mb-0.5">ODP Assignment</p>
          <p className="text-sm text-foreground">{data.odp}</p>
        </div>

        <div className="flex flex-col justify-center p-4 border rounded-lg bg-muted/40 h-20 w-full overflow-hidden">
          <p className="text-sm text-muted-foreground mb-0.5">Technician</p>
          <p className="text-sm text-foreground">{data.technicianName}</p>
        </div>
      </CardContent>
    </Card>
  );
}


// "use client";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Map, Calendar, Clock, Timer } from "lucide-react"; // Tambah icon baru
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";

// export default function InstallationWorkOrderCard({ data }) {
//   if (!data) return null;

//   const isCompleted = data.status === "Completed";

//   return (
//     <Card className="w-full bg-white border-none shadow-none">
//       <CardHeader className="flex flex-row justify-between items-start pb-4 space-y-0">
//         <div className="space-y-1">
//           <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
//             {data.woNumber}
//           </p>
//           <h2 className="text-lg font-bold tracking-tight text-slate-900">
//             {data.customerName}
//           </h2>

//           {/* Tampilan Baris Info jika Completed */}
//           {isCompleted ? (
//             <div className="flex items-center gap-4 pt-1">
//               <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
//                 <Calendar className="h-4 w-4 text-muted-foreground" />
//                 {data.date}
//               </div>
//               <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//                 {data.timeRange || "08:00 - 09:47"}
//               </div>
//               <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
//                 <Timer className="h-4 w-4 text-muted-foreground" />
//                 {data.duration || "4h 30m"}
//               </div>
//             </div>
//           ) : (
//             <Badge variant="default" className="bg-blue-600">
//               {data.status}
//             </Badge>
//           )}
//         </div>

//         {/* Status Badge di Kanan jika Completed */}
//         {isCompleted && (
//           <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1 text-xs font-semibold">
//             Completed
//           </Badge>
//         )}

//         {/* Info Waktu di Kanan jika In Progress */}
//         {!isCompleted && (
//           <div className="text-right">
//             <p className="text-lg font-bold text-slate-900 leading-none">{data.time}</p>
//             <p className="text-xs text-muted-foreground mt-1">{data.date}</p>
//           </div>
//         )}
//       </CardHeader>

//       <div className="px-6">
//         <Separator className="bg-slate-100" />
//       </div>

//       <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
//         {/* Address Item */}
//         <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50 min-h-20">
//           <div className="flex flex-col min-w-0 flex-1">
//             <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Address</p>
//             <p className="text-sm font-semibold text-slate-700 truncate">{data.address}</p>
//           </div>
//           {!isCompleted && (
//             <Button
//               variant="outline"
//               size="sm"
//               className="ml-2 h-8"
//               onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`, '_blank')}
//             >
//               <Map className="h-3.5 w-3.5 mr-1.5" />
//               <span className="text-xs">Direction</span>
//             </Button>
//           )}
//         </div>

//         {/* Package Item */}
//         <div className="flex flex-col justify-center p-4 border border-slate-100 rounded-xl bg-slate-50/50 min-h-20">
//           <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Package</p>
//           <p className="text-sm font-semibold text-slate-700">{data.package}</p>
//         </div>

//         {/* ODP Item */}
//         <div className="flex flex-col justify-center p-4 border border-slate-100 rounded-xl bg-slate-50/50 min-h-20">
//           <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">ODP Assignment</p>
//           <p className="text-sm font-semibold text-slate-700">{data.odp}</p>
//         </div>

//         {/* Technician Item */}
//         <div className="flex flex-col justify-center p-4 border border-slate-100 rounded-xl bg-slate-50/50 min-h-20">
//           <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Technician</p>
//           <p className="text-sm font-semibold text-slate-700">{data.technicianName}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }