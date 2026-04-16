"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, InfoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import dynamic from "next/dynamic";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/button/customButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomDialog from "@/components/dialog/basicDialog";
import { useHomepassState } from "../../hooks/useHomepassHooks";
import { getModalConfig } from "@/utils/getModalConfig";
import { HomepassModalConfig } from "../../configs/HomepassModalConfig";
import CoverageMapForm from "./coverageMapForm";
const MapInput = dynamic(() => import("@/components/inputcopy/mapInput"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 animate-pulse flex items-center justify-center rounded-md border">
      <p className="text-slate-400 text-sm">Loading Map...</p>
    </div>
  ),
});

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

export default function AddHomepassForm({ handleModalClose, loading, isCoverageModalOpen, handleOpenCoverage, handleCloseCoverage }) {
  const [openSections, setOpenSections] = useState({
    general: true,
    contactDetails: true,
    network: true,
  });

  const { openModal, modalType, handleModalOpen } = useHomepassState(odpData);

  const modalConfig = getModalConfig(
    modalType,
    HomepassModalConfig({
      odpData,
      preSalesLeads,
    }),
  );

  const form = useForm({
    mode: "all",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = form;

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const onSubmit = (data) => {
    console.log("Data Form Submit:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("contactDetails")}
            >
              <h3 className="text-lg font-semibold text-slate-700 tracking-wider">
                CONTACT DETAILS
              </h3>
              {openSections.contactDetails ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </div>

            {openSections.contactDetails && (
              <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="flex gap-2 justify-between">
                  <TextInputForm
                    type="string"
                    name="fullName"
                    label="Full Name"
                    placeholder="Full Name"
                    control={control}
                    errors={errors}
                  />
                  <TextInputForm
                    type="string"
                    name="email"
                    label="Email"
                    placeholder="email"
                    control={control}
                    errors={errors}
                  />
                  <TextInputForm
                    type="string"
                    name="number"
                    label="Whatsapp Number"
                    placeholder="+62"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <TextInputForm
                    name="longitude"
                    label="Longitude"
                    placeholder="Longitude"
                    control={control}
                    errors={errors}
                  />
                  <TextInputForm
                    name="latitude"
                    label="Latitude"
                    placeholder="Latitude"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="my-4">
                  <div>
                    <Label className="text-sm flex gap-2 items-center">
                      Coverage Validation
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent side={"right"}>
                          <p className="text-sm leading-5">
                            The system uses the entered GPS coordinates to
                            automatically scan and identify <br />
                            the nearest ODP and Homepass within the defined
                            proximity radius.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <p className="text-xs leading-4 text-muted-foreground">
                      Pinpoint the customer's exact location to verify network
                      availability. You can perform a real-time coverage check
                      or skip this step to fill in details manually.
                    </p>
                  </div>
                  <MapInput setValue={setValue} watch={watch} />
                  <div className="flex gap-2 justify-between">
                    <CustomButton
                      variant="secondary"
                      type="button"
                      className="text-primary w-full"
                    >
                      Skip For Now
                    </CustomButton>
                    <CustomButton
                      variant="primary"
                      type="button"
                      className="w-full"
                      onClick={handleOpenCoverage}
                    >
                      Check Coverage
                    </CustomButton>
                  </div>
                </div>

                <TextInputForm
                  name="addressDetail"
                  label="Address Details"
                  placeholder="Address Details"
                  rows={4}
                  control={control}
                  errors={errors}
                />
              </div>
            )}
          </section>

          <section>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("network")}
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-700 tracking-wider">
                  NETWORK
                </h3>
                <p className="text-sm leading-5">
                  Network details will be automatically populated after you
                  select a Homepass via the Check Coverage modal.
                </p>
              </div>
              {openSections.network ? (
                <ChevronUp className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </div>

            {openSections.network && (
              <div className="flex flex-col gap-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <TextInputForm
                  type="string"
                  name="homepass"
                  label="Homepass"
                  placeholder=""
                  helperText="The verified building unit ID identified on the map for this instalation"
                  control={control}
                  errors={errors}
                  disabled
                />
                <div className="flex flex-row gap-4 justify-between">
                  <TextInputForm
                    type="string"
                    name="odp"
                    label="ODP"
                    placeholder=""
                    helperText="The specific Optical Distribution Point (ODP) where the customer's cable will be plugged in"
                    control={control}
                    errors={errors}
                    disabled
                  />
                  <TextInputForm
                    type="string"
                    name="odc"
                    label="ODC"
                    placeholder=""
                    helperText="The optical Distribution Cabinet (ODC) managing the splitters for this neighborhood."
                    control={control}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="flex flex-row gap-4 justify-between">
                  <TextInputForm
                    type="string"
                    name="bsc"
                    label="BSC"
                    placeholder=""
                    helperText="The Backbones Splice Cassette (BSC) connecting the POP to the distribution cabinets"
                    control={control}
                    errors={errors}
                    disabled
                  />
                  <TextInputForm
                    type="string"
                    name="pop"
                    label="POP"
                    placeholder=""
                    helperText="The point of presence (POP) that servers as the main internet source for this area"
                    control={control}
                    errors={errors}
                    disabled
                  />
                </div>
              </div>
            )}
          </section>
        </CardContent>
        <div className="flex items-center justify-end space-x-3 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Create"}
          </Button>
        </div>
        <CustomDialog
          open={isCoverageModalOpen}
          onOpenChange={handleCloseCoverage}
          title="Real-time Coverage Check"
          modalType="coverage"
          size="3xl"
        >
          <CoverageMapForm
            odpData={odpData}
            preSalesLeads={preSalesLeads}
            onSelectHomepass={(hp) => {
              setValue("homepass", hp.hpName);
              setValue("odp", hp.parentODPName);
              handleCloseCoverage(); 
            }}
          />
        </CustomDialog>
      </form>
    </Form>
  );
}
