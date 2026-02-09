// ** React / Next Imports
import React from "react";

// ** Mui Imports
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

const ViewOnlyTableToolbar = (props) => {
  const { titleRightText, titleLeftText, pathnameTo, queryName = "" } = props;

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingX={2}
      paddingY={2}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
        {titleLeftText}
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
        {titleRightText}
      </Typography>
      {/* <Link href={{ pathname: pathnameTo, query: { name: queryName } }}>
        <Button sx={{ fontSize: "15px" }}>View All</Button>
      </Link> */}
    </Stack>
  );
};

export default ViewOnlyTableToolbar;
