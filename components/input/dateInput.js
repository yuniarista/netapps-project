// ** React Import
import React from "react";

// ** MUI Components
import { FormControl, Skeleton } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

// ** Third Party Imports
import { Controller, Control } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({
  trigger = undefined,
  triggerField = "",
  fieldName,
  fieldDefaultValue,
  fieldError,
  fieldHelperText,
  fieldLabel,
  fieldControl,
  fieldSx,
  fieldReadOnly,
  fieldRequired
}) => {
  return (
    <FormControl fullWidth sx={fieldSx}>
      <Controller
        name={fieldName}
        defaultValue={fieldDefaultValue}
        control={fieldControl}
        rules={{ required: fieldRequired }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              onChange={(date) => {
                field.onChange(date);
                if (typeof trigger === "function" && triggerField) {
                  trigger(triggerField);
                }
              }}
              label={fieldLabel}
              value={field.value || null}
              readOnly={fieldReadOnly}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  defaultValue: fieldDefaultValue,
                  error: fieldError,
                  helperText: fieldHelperText
                }
              }}
            />
          </LocalizationProvider>
        )}
      />
    </FormControl>
  );
};

export default DateInput;
