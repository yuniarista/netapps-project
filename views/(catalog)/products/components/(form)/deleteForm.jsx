"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import Loading from "@/app/(protected)/loading";
import CustomAlert from "@/components/alert/customAlert";

export default function DeleteFeaturesForm({
  formData,
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
  handleConfirm,
}) {
  const form = useForm();
  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleConfirm)} className="space-y-0">
        <CustomAlert
          variant={response?.status ?? "info"}
          title={response?.status}
          open={response?.status === "error" && alertOpen}
          onClose={() => setAlertOpen(false)}
        >
          {response?.message}
        </CustomAlert>
        <div className="mt-4">
          Are you sure to delete{" "}
          {formData?.length > 1 ? formData?.length : "this"} data?
        </div>
        <div className="w-full flex items-center justify-end space-x-4 pt-4">
          <DialogClose asChild>
            <Button type="reset" variant="secondary" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? <Loading /> : "Delete"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
