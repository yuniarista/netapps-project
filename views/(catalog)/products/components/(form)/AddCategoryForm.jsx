"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddCategoryForm({ handleModalClose, loading, onSuccess }) {
    const form = useForm({ defaultValues: { categoryName: "" } });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSuccess)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="categoryName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#334155] font-semibold text-sm">Category Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Category name"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* <div className="w-full flex items-center justify-end space-x-4 py-4 pt-8 border-t border-slate-300">
                    <Button type="reset" variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Added..." : "Add"}
                    </Button>
                </div> */}
            </form>
        </Form>
    );
}