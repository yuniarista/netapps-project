"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import dynamic from "next/dynamic";
import { DialogClose } from "@/components/ui/dialog";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { Loader2 } from "lucide-react";
const MapInput = dynamic(() => import("@/components/inputcopy/mapInput"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 animate-pulse flex items-center justify-center rounded-md border">
      <p className="text-slate-400 text-sm">Loading Map...</p>
    </div>
  ),
});

const activeData = [
  { name: "active", value: true },
  { name: "inactive", value: false },
];

export default function AddFaqForm({ handleModalClose, loading, formOptions }) {
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

  const onSubmit = (data) => {
    console.log("Data Form Submit:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col space-y-6">
            <TextInputForm
              name={"question"}
              label={"Question*"}
              placeholder={"Enter question here"}
              control={control}
              type="string"
              rows={4}
            />
            <TextInputForm
              name={"answer"}
              label={"Answer*"}
              placeholder={"Enter answer here"}
              control={control}
              type="string"
              rows={4}
            />
            <SelectInputForm
              name={"status"}
              label={"Status*"}
              placeholder={"Select status"}
              control={control}
              errors={errors}
              options={activeData}
              optionName={"name"}
              optionValue="value"
            />
          </div>
        </CardContent>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
