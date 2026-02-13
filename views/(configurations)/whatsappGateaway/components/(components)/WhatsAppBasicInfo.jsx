import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Building2, Phone, Globe, Clock, Building } from "lucide-react";

const WhatsAppBasicInfo = () => {
    const infoData = [
        {
            label: "ISP Name",
            value: "SAI ISP",
            icon: <Building className="w-4 h-4 text-blue-500" />,
        },
        {
            label: "WhatsApp Number",
            value: "+62 123-3456-7890",
            icon: <Phone className="w-4 h-4 text-green-500" />,
        },
        {
            label: "Provider",
            value: "WatZap",
            icon: <Globe className="w-4 h-4 text-purple-500" />,
        },
        {
            label: "Timezone",
            value: "GMT +8",
            icon: <Clock className="w-4 h-4 text-orange-500" />,
        },
    ];

    return (
        <Card className="h-full flex flex-col shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
                <CardTitle className="text-base font-bold">Basic Info</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
                </div>
            </CardHeader>
            <CardContent className="px-4 py-1 space-y-4 flex-1">
                {infoData.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 ">
                            {item.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm  text-muted-foreground">{item.label}</span>
                            <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default WhatsAppBasicInfo;