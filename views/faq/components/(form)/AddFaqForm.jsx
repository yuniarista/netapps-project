"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import { DialogClose } from "@/components/ui/dialog";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { Loader2 } from "lucide-react";
import DatePickerForm from "@/components/datePicker/datePickerForm";

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
            <DatePickerForm
              name="schedule"
              label="Installation Schedule"
              placeholder="Pick a date"
              control={control}
              errors={errors}
              showTime={true}
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
