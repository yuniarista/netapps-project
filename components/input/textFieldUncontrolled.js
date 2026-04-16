import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import Icon from "../icon";

const TextFieldUncontrolled = ({
  fieldLabel,
  fieldPlaceholder,
  fieldType,
  fieldValue,
  fieldSx,
  onChange,
  size,
  setSearch,
}) => {
  const handleClear = () => {
    setSearch("");
  };
  return (
    <TextField
      fullWidth
      label={fieldLabel}
      value={fieldValue}
      onChange={onChange}
      sx={fieldSx}
      placeholder={fieldPlaceholder}
      InputProps={{
        startAdornment: (
          <Box sx={{ mr: 2, display: "flex" }}>
            <Icon icon="mdi:magnify" fontSize={20} />
          </Box>
        ),
        endAdornment: (
          <IconButton
            size="small"
            title="Clear"
            aria-label="Clear"
            onClick={handleClear}
          >
            <Icon icon="mdi:close" fontSize={20} />
          </IconButton>
        ),
      }}
      type={fieldType}
      size={size ?? "small"}
    />
  );
};

export default TextFieldUncontrolled;
