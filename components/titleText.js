import { Typography } from "@mui/material";
import React from "react";

const TitleText = ({ titleText }) => {
  return (
    <Typography sx={{ fontSize: "28px", fontWeight: 700 }}>
      {titleText}
    </Typography>
  );
};

export default TitleText;
