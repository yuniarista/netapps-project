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
import { TimePicker } from "@mui/x-date-pickers";

const TimeInput = ({
  fieldName,
  fieldDefaultValue,
  fieldError,
  fieldHelperText,
  fieldLabel,
  fieldControl,
  fieldSx,
  fieldReadOnly,
  fieldRequired,
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
            <TimePicker
              {...field}
              label={fieldLabel}
              value={field.value || null}
              readOnly={fieldReadOnly}
              disablePast
              slotProps={{
                textField: {
                  defaultValue: fieldDefaultValue,
                  error: fieldError,
                  helperText: fieldHelperText,
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </FormControl>
  );
};

export default TimeInput;
