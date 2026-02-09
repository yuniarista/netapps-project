import React from "react";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardWrapper = styled(Card)(({ theme }) => ({
  padding: "30px",
  borderRadius: 3,
  boxShadow: "0px 0px 30px 0px rgba(0, 0, 0, 0.09)",
  [theme.breakpoints.down("sm")]: {
    padding: "30px",
  },
}));

const PrimaryCard = ({ sx, children }) => {
  return <CardWrapper sx={sx}>{children}</CardWrapper>;
};

export default PrimaryCard;
