import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Building2, Phone, Globe, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const WhatsAppFeatures = () => {
 const features = [
    { id: "billing", label: "Billing Reminder", defaultChecked: true },
    { id: "payment", label: "Payment Success Notification", defaultChecked: true },
    { id: "otp", label: "OTP Verification", defaultChecked: true },
    { id: "marketing", label: "Marketing Promo", defaultChecked: false },
    { id: "technical", label: "Technical Broadcast", defaultChecked: false },
  ];

  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
        <CardTitle className="text-base font-bold">Features</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 flex-1">
       <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between">
              <Label 
                htmlFor={feature.id} 
                className="text-sm font-medium text-slate-700 cursor-pointer"
              >
                {feature.label}
              </Label>
              <Switch 
                id={feature.id} 
                defaultChecked={feature.defaultChecked}
              />
            </div>
          ))}
        </div>

        {/* <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <Input 
            type="number" 
            defaultValue={5} 
            className="text-center font-semibold"
          />
          <span className="text-sm text-muted-foreground">
            Days before deadline
          </span>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default WhatsAppFeatures;