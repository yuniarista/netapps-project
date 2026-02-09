import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import IconifyIcon from "../icon";
import PrimaryCard from "../card/primaryCard";

const BoxIcon = styled(Box)(() => ({
  backgroundColor: "#A6C40433",
  borderRadius: 1,
  padding: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SummaryDashboardCard = ({
  icon,
  iconColor,
  titleText,
  totalData,
  totalDataText,
}) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <PrimaryCard>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <BoxIcon>
              <IconifyIcon icon={icon} fontSize={25} color={iconColor} />
            </BoxIcon>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {titleText}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>
              {totalData}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#B2B2B2",
              }}
            >
              {totalDataText}
            </Typography>
          </Stack>
        </Stack>
      </PrimaryCard>
    </Grid>
  );
};

export default SummaryDashboardCard;
