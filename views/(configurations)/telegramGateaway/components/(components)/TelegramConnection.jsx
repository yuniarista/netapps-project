import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Building2, Phone, Globe, Clock, RefreshCcw } from "lucide-react";

const TelegramConnection = () => {
  const connectionData = {
    status: "Connected",
    sessionExpiry: "05-02-2026 16:28",
    lastReconnect: "05-02-2026 16:28",
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "connected":
        return "outlined-active"; 
      case "disconnected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
        <CardTitle className="text-base font-bold">Connection</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 flex-1">
       <div>
          <p className="text-xs text-muted-foreground mb-1.5 font-medium">Status</p>
          <Badge variant={getStatusVariant(connectionData.status)}>
            {connectionData.status}
          </Badge>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1 font-medium">Session Expiry</p>
          <p className="text-sm font-bold text-slate-800">
            {connectionData.sessionExpiry}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1 font-medium">Last Reconnect</p>
          <p className="text-sm font-bold text-slate-800">
            {connectionData.lastReconnect}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 ">
        <Button variant="primary" className="w-full text-white font-semibold h-10 shadow-sm transition-all flex items-center justify-center">
          Reconnect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TelegramConnection;