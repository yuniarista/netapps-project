"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

export default function AddSegmentForm({ handleModalClose, loading, onSuccess }) {

  const form = useForm({
    defaultValues: {
      segmentName: "",
      segmentType: "personal" // default selected
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSuccess)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="segmentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#334155] font-semibold text-sm">
                Custom Segment Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Custom Segment name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="segmentType"
          render={({ field }) => (
            <FormItem className="pt-4">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className=""
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <label htmlFor="personal" className="text-sm">
                      Individual (Personal)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="company" id="company" />
                    <label htmlFor="company" className="text-sm">
                      Business (Company)
                    </label>
                  </div>
                </RadioGroup>
            </FormItem>
          )}
        />

      </form>
    </Form>
  );
}
