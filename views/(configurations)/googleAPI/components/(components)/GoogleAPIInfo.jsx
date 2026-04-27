"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Pastikan shadcn badge sudah terinstall
import { Separator } from "@/components/ui/separator"; // Pastikan shadcn separator sudah terinstall
import {
  Pencil,
  Globe,
  Clock,
  Building,
  CheckCircle2,
  Store,
  Server,
  KeyRound,
  Coins,
} from "lucide-react";
import IconifyIcon from "@/components/icon";

const GoogleAPIInfo = ({ onEdit, data }) => {
  const infoData = [
    {
      label: "API",
      value: data?.api,
      icon: Store,
      hexColor: "#22c55e",
      hexBg: "#f0fdf4",
    },
    {
      label: "Integration Name",
      value: data?.integrationName,
      icon: Server,
      hexColor: "#06B6D4",
      hexBg: "#ECFEFF",
    },
    {
      label: "Created By",
      value: data?.created,
      icon: Globe,
      hexColor: "#0EA5E9",
      hexBg: "#F0F9FF",
    },
    {
      label: "Date Added",
      value: data?.dateAdded,
      icon: KeyRound,
      hexColor: "#8B5CF6",
      hexBg: "#F5F3FF",
    }
  ];

  const RenderIcon = ({ item }) => {
    const IconComponent = item.icon;
    return (
      <div
        className="flex items-center justify-center w-10 h-10 rounded-xs shrink-0"
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
          <IconComponent size={20} style={{ color: item.hexColor }} />
        )}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col shadow-sm border-slate-200 bg-white">
      <CardHeader className="flex flex-row items-start justify-between p-4 pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold text-slate-900">
            Google API Info
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Manage Google API Data
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-slate-100"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4 text-slate-400" />
        </Button>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {infoData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <RenderIcon item={item} />
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-muted-foreground leading-5">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-slate-900 truncate leading-6">
                  {item.value || ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleAPIInfo;
