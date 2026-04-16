"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import "leaflet/dist/leaflet.css";
import CustomButton from "@/components/button/customButton";
import { Label } from "@/components/ui/label";
import { useCheckCoverageState } from "../../hooks/useCheckCoverageHooks";
import { getModalConfig } from "@/utils/getModalConfig";
import CustomDialog from "@/components/dialog/basicDialog";
import { CheckCoverageModalConfig } from "../../configs/CheckCoverageModalConfig";
import SidebarCoverage from "../(components)/sidebarCoverage";
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

const preSalesLeads = [
  {
    id: "lead-1",
    name: "Maudy Ayunda",
    lat: -8.7117408,
    lng: 115.1773656,
    status: "not_covered",
  },
  {
    id: "lead-2",
    name: "Jhon Doe",
    lat: -8.72,
    lng: 115.18,
    status: "covered",
  },
  {
    id: "lead-3",
    name: "Wahsurr",
    lat: -8.504348,
    lng: 115.027842,
    status: "covered",
  },
];

const odpData = [
  {
    id: "odp-1",
    name: "ODP-KUTA-01",
    homepasses: [
      {
        id: "hp-1-1",
        hpName: "HP-KUTA-01A",
        address: "Jl. Kuta No. 1",
        lat: -8.7119,
        lng: 115.178,
        status: "available",
      },
      {
        id: "hp-1-2",
        hpName: "HP-KUTA-01B",
        address: "Jl. Kuta No. 2",
        lat: -8.7121,
        lng: 115.1785,
        status: "available",
      },
    ],
  },
  {
    id: "odp-2",
    name: "ODP-KUTA-02",
    homepasses: [
      {
        id: "hp-2-1",
        hpName: "HP-KUTA-02A",
        address: "Jl. Kuta No. 5",
        lat: -8.7115,
        lng: 115.1765,
        status: "occupied",
      },
    ],
  },
  {
    id: "odp-3",
    name: "ODP-Tabanan-03",
    homepasses: [
      {
        id: "hp-3-1",
        hpName: "HP-TABANAN-03A",
        address: "Jl. Serma Arda No. 3",
        lat: -8.504348,
        lng: 115.027842,
        status: "occupied",
      },
    ],
  },
];

export default function CoveragePage() {
  const {
    openModal,
    handleModalOpen,
    handleModalClose,
    modalType,
    networkData,
    loading,
    response,
    setResponse,
    alertOpen,
    setAlertOpen,
    selectedRows,
    setSelectedRows,
    form,
    selectedLead,
    setSelectedLead,
    radius,
    setRadius,
    L,
    createHomepassIcon,
    getDistance,
    coveredHomepassesByODP,
    isCovered,
  } = useCheckCoverageState(odpData);

  const modalConfig = getModalConfig(
    modalType,
    CheckCoverageModalConfig({
      form,
      formOptions: { area: [] },
      loading,
      response,
      setResponse,
      alertOpen,
      setAlertOpen,
      selectedRows,
      setSelectedRows,
    }),
  );

  const handleSelectLead = (value) => {
    const lead = preSalesLeads.find((l) => l.id === value);
    setSelectedLead(lead);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full h-full">
      {!networkData ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 max-w-xs text-center">
          <Label className="text-lg font-semibold">
            Network Setup Required
          </Label>
          <p className="text-sm text-muted-foreground">
            Network not configured yet. Create POP to start coverage checking.
          </p>
          <CustomButton
            variant="primary"
            onClick={() => handleModalOpen("add")}
          >
            <Plus className="w-4 h-4 mr-2" /> Setup Network
          </CustomButton>
        </div>
      ) : (
        <div className="flex flex-1 w-full h-full py-6 px-4 overflow-hidden bg-white shadow-sm z-10">
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
      )}

      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        modalType={modalType}
      >
        {modalConfig.content}
      </CustomDialog>
    </div>
  );
}
