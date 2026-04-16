import {
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SidebarTrigger, useSidebar } from "../components/ui/sidebar";
import { Separator } from "./ui/separator";
import React from "react";

export default function PageHeader({
  children,
  icon,
  title,
  showBackButton = false,
  backAction = null,
  search = null, // = { placeholder, value, onChange }
  rightSection = null, // JSX bebas
}) {
  return (
    <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="w-full flex items-center space-x-3">
        <SidebarTrigger
          iconOpen={<PanelRight className="h-6 w-6" />}
          iconClose={<PanelLeft className="h-6 w-6" />}
        />
        <Separator orientation="vertical" className="h-3" />
        <div className="flex gap-2">
          <Label className="font-medium text-sm text-muted-foreground **whitespace-nowrap**">
            {title}
          </Label>
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </div>

      {search && (
        <div className="relative w-full max-w-xs ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={search.placeholder}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
            className="pl-9 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40"
          />
        </div>
      )}

      {rightSection && (
        <div className="flex items-center gap-3">{rightSection}</div>
      )}
    </div>
  );
}
