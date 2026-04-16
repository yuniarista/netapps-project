"use client";

import dynamic from "next/dynamic";
import SidebarCoverage from "../(components)/sidebarCoverage";
import { useHomepassState } from "../../hooks/useHomepassHooks";
import { useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
const MapCoverage = dynamic(() => import("../(components)/mapCoverage"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 h-full bg-slate-50 animate-pulse rounded-lg" />
  ),
});
// KOMPONEN CONTROLLER (Hanya jalan di Client)
function MapController({ center }) {
  const { useMap } = require("react-leaflet");
  const map = useMap();

  useEffect(() => {
    if (center && map) {
      map.setView(center, 16);
      map.invalidateSize();
    }
  }, [center, map]);

  return null;
}

export default function CoverageMapForm({ odpData, preSalesLeads }) {
  const {
    selectedLead,
    setSelectedLead,
    radius,
    setRadius,
    L,
    createHomepassIcon,
    getDistance,
    coveredHomepassesByODP,
    isCovered,
  } = useHomepassState(odpData);

  const handleSelectLead = (value) => {
    const lead = preSalesLeads.find((l) => l.id === value);
    setSelectedLead(lead);
  };

  console.log("data leads", preSalesLeads);
  console.log("data odp", odpData);

  return (
    <div className="flex w-full h-[80vh] overflow-hidden bg-white z-10">
      {/* SIDEBAR */}
      <SidebarCoverage
        coveredHomepassesByODP={coveredHomepassesByODP}
        selectedLead={selectedLead}
        isCovered={isCovered}
        radius={radius}
        setRadius={setRadius}
        handleSelectLead={handleSelectLead}
        preSalesLeads={preSalesLeads}
        getDistance={getDistance}
      />

      {/* MAP */}
      <MapCoverage
        L={L}
        MapController={MapController}
        selectedLead={selectedLead}
        radius={radius}
        coveredHomepassesByODP={coveredHomepassesByODP}
        createHomepassIcon={createHomepassIcon}
        odpData={odpData}
      />
    </div>
  );
}
