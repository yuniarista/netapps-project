import SelectFieldUncontrolled from "@/components/input/selectFieldUncontrolled";
import { fetchServer } from "@/libs/ServerFunction";
import { CardHeader, MenuItem, Stack } from "@mui/material";
import React from "react";

const BarCardHeader = ({ selectYearValue, setMonthlyChart }) => {
  const handleSelectYear = async (e) => {
    const [monthlyChart] = await Promise.all([
      fetchServer({ uri: `property/monthly?year=${e.target.value}` }),
    ]);

    setMonthlyChart(monthlyChart?.data);
  };

  const getOptionYears = () => {
    let length = selectYearValue - 2023;
    let years = [];
    for (let index = 0; index < length + 1; index++) {
      years.push(selectYearValue - index);
    }
    return years;
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <CardHeader
        title="Total Subscription"
        sx={{
          ".MuiCardHeader-title": {
            fontSize: "20px",
            fontWeight: 600,
          },
        }}
      />
      <CardHeader
        subheader={
          <SelectFieldUncontrolled
            fieldSx={{ textAlign: "left" }}
            fieldLabel={"Year"}
            fieldDefaulValue={selectYearValue}
            onChange={handleSelectYear}
            isUseDefaultMenuItem={false}
          >
            {getOptionYears().map((e, i) => (
              <MenuItem key={i} value={e}>
                {e}
              </MenuItem>
            ))}
          </SelectFieldUncontrolled>
        }
        sx={{
          textAlign: "right",
          "& .MuiTypography-root": {
            fontSize: { xs: "15px", md: "15px" },
          },
          "&.MuiCardHeader-root": {
            width: "150px",
          },
        }}
      />
    </Stack>
  );
};

export default BarCardHeader;
