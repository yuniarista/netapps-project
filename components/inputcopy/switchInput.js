// ** MUIs
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";

// ** React / Next
import React from "react";

// ** 3rd Parties
import { Controller } from "react-hook-form";

const SwitchInput = ({
  isHidden = false,
  control,
  label,
  name,
  errors,
  defaultValue,
}) => {
  return (
    <FormControl sx={{ display: isHidden ? "none" : "" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label={label}
          />
        )}
      />
      {errors.isActive && (
        <FormHelperText error>{errors.isActive.message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SwitchInput;
