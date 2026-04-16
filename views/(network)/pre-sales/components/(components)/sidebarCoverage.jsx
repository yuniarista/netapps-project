"use client";

import CustomButton from "@/components/button/customButton";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, MapPin, TriangleAlert, WifiOff } from "lucide-react";

export default function SidebarCoverage({
  coveredHomepassesByODP,
  preSalesLeads,
  selectedLead,
  isCovered,
  radius,
  setRadius,
  handleSelectLead,
  getDistance,
}) {
  return (
    <div className="w-[309px] flex flex-col space-y-4">
      <div>
        <Label className="text-lg flex gap-2 items-center">
          Network Coverage Map
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent side={"right"}>
              <p className="text-sm leading-5">
                Search for an existing prospect to visualize their distance to
                the nearest <br />
                ODP and verify service feasibility based on port availability.
              </p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <p className="text-xs leading-4 text-muted-foreground">
          Real-time visualization of network infrastructure. Use the search tool
          to verify service availability for new customers based on ODP capacity
          and Homepass inheritance.
        </p>
      </div>
      <div className=" border rounded-lg space-y-3 overflow-y-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:display-none">
        <div className="space-y-2 px-3 pt-3">
          <Label className="text-sm font-medium leading-5">
            Select Pre-Sales Lead
          </Label>
          <Select onValueChange={handleSelectLead}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Pre-Sales lead" />
            </SelectTrigger>
            <SelectContent>
              {preSalesLeads.map((lead) => (
                <SelectItem key={lead.id} value={lead.id}>
                  {lead.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs leading-4 text-muted-foreground">
            Find and select the lead to be processed
          </p>
        </div>

        {selectedLead && (
          <div className="space-y-4 animate-in fade-in">
            <div className="px-3">
              <div className="flex items-center justify-between p-2 bg-muted rounded-xs text-[11px]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>
                    {selectedLead.lat}, {selectedLead.lng}
                  </span>
                </div>
              </div>
              {!isCovered && selectedLead && (
                <div className="flex flex-col gap-1 bg-red-500/10 mt-4 p-2 rounded-xs">
                  <Label className="flex gap-3 text-red-500 text-xs font-medium leading-4 items-center">
                    <TriangleAlert className="w-4 h-4" />
                    Outside Coverage Area
                  </Label>
                  <p className="text-xs text-red-500 leading-4 pl-7">
                    This location has no Homepass within the selected radius.
                    Try increasing the range or register as a potential
                    customer.
                  </p>
                </div>
              )}
              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm flex gap-2 leading-6 items-center">
                    Proximity Radius
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent side={"right"}>
                        <p className="text-sm leading-5">
                          Search for an existing prospect to visualize their
                          distance to the nearest <br />
                          ODP and verify service feasibility based on port
                          availability.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <p className="text-xs font-medium leading-4">{radius} m</p>
                </div>
                <Slider
                  defaultValue={[250]}
                  max={500}
                  step={1}
                  onValueChange={(val) => setRadius(val)}
                  className="mx-auto mt-3 w-full max-w-xs"
                />
              </div>
            </div>
            <hr />
            {isCovered && selectedLead && (
              <div className="animate-in slide-in-from-top-2 duration-300 px-3">
                <Label className="flex text-sm font-medium text-green-600 mb-2 gap-2 items-center">
                  Result (
                  {coveredHomepassesByODP.reduce(
                    (acc, curr) => acc + curr.homepasses.length,
                    0,
                  )}{" "}
                  Homepasses Found)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="w-4 h-4 text-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side={"right"}>
                      <p className="text-sm leading-5">
                        List of available ODP/Homepass within the selected
                        radius <br />
                        that can serve this prospect.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>

                <div className="flex flex-col gap-4">
                  {coveredHomepassesByODP.map((odp) => (
                    <div key={odp.id} className="space-y-2">
                      <span className="text-sm font-semibold mb-2 text-slate-700">
                        {odp.name}
                      </span>

                      {odp.homepasses.map((hp) => {
                        const distance = getDistance(
                          selectedLead.lat,
                          selectedLead.lng,
                          hp.lat,
                          hp.lng,
                        ).toFixed(0);
                        return (
                          <div
                            key={hp.id}
                            className="border p-3 rounded-md hover:bg-slate-50 transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-semibold text-slate-700">
                                  {hp.hpName}
                                </span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <div className="rounded-full w-2 h-2 bg-green-500 animate-pulse" />
                                <span className="text-green-600 text-xs leading-5">
                                  Available
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 flex flex-col gap-2 text-xs">
                              <p className="text-muted-foreground">
                                Homepass Name :{" "}
                                <span className="font-medium text-foreground">
                                  {hp.hpName}
                                </span>
                              </p>
                              <p className="text-muted-foreground">
                                Longitude Latitude :{" "}
                                <span className="font-medium text-foreground">
                                  {hp.lat.toFixed(4)}, {hp.lng.toFixed(4)}
                                </span>
                              </p>
                              <p className="text-muted-foreground">
                                Est Distance :{" "}
                                <span className="font-medium text-foreground">
                                  {distance} meters
                                </span>
                              </p>
                              <p className="text-muted-foreground">
                                Address :{" "}
                                <span className="font-medium text-foreground">
                                  {hp.address}
                                </span>
                              </p>
                            </div>
                            <CustomButton
                              variant="primary"
                              className="mt-3 w-full"
                            >
                              Register Customer
                            </CustomButton>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isCovered && selectedLead && (
              <div className="">
                <Label className="flex gap-2 px-3 items-center text-sm font-medium leading-6 text-red-500">
                  Result (0 Homepass)
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="w-4 h-4 text-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side={"right"}>
                      <p className="text-sm leading-5">
                        Search for an existing prospect to visualize their
                        distance to the nearest <br />
                        ODP and verify service feasibility based on port
                        availability.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <div className="flex flex-col gap-3 items-center justify-center text-center py-4">
                  <div className="p-2.5 bg-red-500/10 max-w-sm mx-auto rounded-md inline-flex items-center gap-2">
                    <WifiOff className="w-4 h-4 text-red-500" />
                  </div>
                  <Label className="text-sm font-medium">
                    No Coverage Found
                  </Label>
                  <p className="text-xs leading-4 text-center text-muted-foreground px-5">
                    This location is outside the current network coverage zone.
                    You can register it as a potential customer or submit a
                    network expansion request.
                  </p>
                  <CustomButton variant="primary">
                    Add address to Homepass
                  </CustomButton>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
