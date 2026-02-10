// ** React Import
import React from "react";

// ** Third Party Imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInputUncontrolled = ({
  fieldError,
  fieldDefaultValue,
  fieldValue,
  fieldLabel,
  fieldReadOnly,
  onChange,
  fieldHelperText
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(date) => {
          const formattedDate = date ? date.format("YYYY-MM-DD") : null;
          onChange(formattedDate);
        }}
        label={fieldLabel}
        value={fieldValue || null}
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
  );
};

export default DateInputUncontrolled;
