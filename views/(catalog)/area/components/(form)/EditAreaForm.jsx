"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditAreaForm({ handleUpdate, loading, formData, handleModalClose }) {
  const form = useForm({ defaultValues: { areaName: formData?.areaName || "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col">
        
        <div className="px-6 py-4">
          <FormField
            control={form.control}
            name="areaName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#334155] font-semibold text-sm">
                  Area Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Area name" {...field} className="mt-1" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="border-t border-slate-200 w-full" />
        <div className="w-full flex items-center justify-end space-x-4 px-6 py-4">
          <Button type="button" variant="outline" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Added..." : "Add"}
          </Button>
        </div>
        
      </form>
    </Form>
  );
}