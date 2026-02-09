import PrimaryCard from "@/components/card/primaryCard";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

const ProfileCompanyDashboard = ({
  propertyImg,
  propertyName,
  propertyDescription,
  propertyLocation,
}) => {
  const theme = useTheme();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const locationText = `${propertyLocation?.city}, ${propertyLocation?.province?.name}, ${propertyLocation?.state}`;
  return (
    <PrimaryCard>
      <Stack direction={isMdDown ? "column" : "row"} spacing={5}>
        <Box
          sx={{
            width: "145px",
            height: "145px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}>
          <Image alt="company-img" fill priority src={propertyImg} />
        </Box>
        <Stack direction={"column"} spacing={2} width={"45%"}>
          <Typography
            sx={{ fontSize: "28px", fontWeight: 700, color: "#413F40" }}>
            {propertyName}
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 400,
              color: "#6C696B",
              textTransform: "capitalize",
            }}>
            {locationText.toLowerCase()}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#413F40",
              lineHeight: "16px",
              textAlign: "left",
            }}>
            {propertyDescription}
          </Typography>
        </Stack>
      </Stack>
    </PrimaryCard>
  );
};

export default ProfileCompanyDashboard;
