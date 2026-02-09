// ** Mui Imports
import { Switch } from "@mui/material";

// ** React Imports
import React from "react";

const SwitchBasicButton = ({
  onClick,
  onChange,
  defaultChecked = false,
  isChecked = false
}) => {
  return (
    <Switch
      size="medium"
      disabled={false}
      onClick={onClick}
      onChange={onChange}
      defaultChecked={defaultChecked}
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
          backgroundColor: "#a7c404"
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: isChecked ? "#a7c404" : "white" // Custom colors
        }
      }}
    />
  );
};

export default SwitchBasicButton;
