import React from "react";
import { TextField, Box, MenuItem } from "@mui/material";
import Icon from "../icon";
const SelectFieldUncontrolled = ({
  fieldLabel,
  fieldPlaceholder,
  fieldDefaulValue,
  fieldType,
  fieldValue,
  fieldSx,
  onChange,
  size,
  option,
  prefixIcon,
  children,
  isUseDefaultMenuItem = true
}) => {
  return (
    <TextField
      fullWidth
      label={fieldLabel}
      onChange={onChange}
      sx={fieldSx}
      placeholder={fieldPlaceholder}
      type={fieldType}
      size={size ?? "small"}
      defaultValue={fieldDefaulValue ?? ""}
      value={fieldValue}
      select
      SelectProps={
        prefixIcon
          ? {
              startAdornment: (
                <Box sx={{ mr: 2, display: "flex" }}>
                  <Icon icon={prefixIcon} fontSize={20} />
                </Box>
              )
            }
          : {}
      }
    >
      {isUseDefaultMenuItem && (
        <MenuItem value={""}>Pilih {fieldLabel}</MenuItem>
      )}
      {children
        ? children
        : option?.map((item, index) => (
            <MenuItem key={index} value={item?._id ?? item?.name}>
              {item?.name || item?.propertyName || item?.roomNumber}
            </MenuItem>
          ))}
    </TextField>
  );
};

export default SelectFieldUncontrolled;
