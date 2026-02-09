import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import PrimaryCard from "@/components/card/primaryCard";
import IconifyIcon from "@/components/icon";

const BoxIcon = styled(Box)(() => ({
  backgroundColor: "#A6C40433",
  borderRadius: 1,
  padding: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

const SummaryReport = ({
  icon,
  iconColor,
  titleText,
  totalData,
  bottomText,
  isUseChannel
}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={isUseChannel ? 3 : 6}>
      <PrimaryCard>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <BoxIcon>
              <IconifyIcon icon={icon} fontSize={25} color={iconColor} />
            </BoxIcon>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600
              }}
            >
              {titleText}
            </Typography>
          </Stack>
          <Stack direction={"column"} spacing={2}>
            <Typography sx={{ fontSize: "36px", fontWeight: 600 }}>
              {totalData}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#475467"
              }}
            >
              {bottomText}
            </Typography>
          </Stack>
        </Stack>
      </PrimaryCard>
    </Grid>
  );
};

export default SummaryReport;
