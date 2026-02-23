"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditCategoryForm({ handleUpdate, loading, formData, handleModalClose }) {
  const form = useForm({ defaultValues: { categoryName: formData?.categoryName || "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="flex flex-col">
        
        <div className="px-6 py-4">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#334155] font-semibold text-sm">
                  Category Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} className="mt-1" />
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