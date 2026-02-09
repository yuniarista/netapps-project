import React from "react";
import { FormHelperText, TextField } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";

export default function DynamicInput({ name, control, label, errors }) {
  const { fields } = useFieldArray({
    name: name,
    control,
  });
  return (
    <div>
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div className="flex space-x-2" key={item.id}>
            <div className="w-full">
              <Controller
                name={`${name}[${index}].text`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    autoComplete="off"
                    error={!!errors[name]?.[index]?.text}
                    label={`${label} ${index + 1}`}
                    placeholder={`Input ${label} ${index + 1}`}
                  />
                )}
              />
              {errors[name]?.[0].text && (
                <FormHelperText sx={{ marginX: 1 }} error>
                  {errors[name]?.message}
                </FormHelperText>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
