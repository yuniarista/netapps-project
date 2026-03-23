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
import TextInputForm from "@/components/inputcopy/textInputForm";

export default function AddSegmentForm({ handleModalClose, loading, onSuccess }) {

  const form = useForm({
    defaultValues: {
      segmentName: "",
      segmentType: "personal" // default selected
    }
  });

  const { control, formState: { errors }, handleSubmit, setValue, watch } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSuccess)}
        className="space-y-6"
      >
        <TextInputForm
          name="segmentName"
          label="Segment Name"
          placeholder="Segment Name"
          control={control}
          errors={errors}
        />
        {/* <FormField
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
                  className="focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                />
              </FormControl>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="segmentType"
          render={({ field }) => (
            <FormItem>
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
