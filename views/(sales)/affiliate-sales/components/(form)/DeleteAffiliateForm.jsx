"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
//import BasicAlert from "@/components/alert/basicAlert";
import Loading from "@/app/(protected)/loading";
import CustomAlert from "@/components/alert/customAlert";

export default function DeleteAffiliateForm({
  loading,
  response,
  setResponse,
  alertOpen,
  setAlertOpen,
  handleConfirm
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

        <div className="p-4">
          <div className="space-x-1">
            <h4 className="text-md font-bold text-[#1e293b]">Are you sure?</h4>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete this data?
            </p>
          </div>
        </div>

      <DialogFooter className="border-t border-slate-200 bg-white px-2 py-4 mt-0">
        <div className="flex items-center justify-end space-x-3">
          <DialogClose>
            <Button type="reset" variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? <Loading /> : "Delete"}
          </Button>
        </div>
      </DialogFooter>
      </form>
    </Form>
  );
}
