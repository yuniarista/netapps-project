"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TextInputForm from "@/components/inputcopy/textInputForm";

export default function AddSegmentAreaForm({
  handleModalClose,
  loading,
  onSuccess,
}) {
  const form = useForm({
    mode: "all",
    defaultValues: {},
  });

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSuccess)} className="space-y-6">
        <TextInputForm
          label={"Area Name"}
          name={"areaName"}
          control={control}
          errors={errors}
        />
      </form>
    </Form>
  );
}
