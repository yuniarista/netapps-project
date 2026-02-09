import { Button, Grid } from "@mui/material";
import React from "react";
import { BasicButtonStyle } from "@/libs/muiStyle";
import IconButton from "../button/customButtonIcon";

const FilterGrid = ({
  handleFilter,
  selectFilters = [],
  additionalButtonList = [],
  iconClass,
  iconText
}) => {
  const selectFilterLength = selectFilters?.length;
  const additionalButtonListLength = additionalButtonList?.length;

  const selectFiltersGridMd = () => {
    switch (selectFilterLength) {
      case 1:
        return 3;
      case 2:
        return 6;
      case 3:
        return 4;
      default:
        return 3;
    }
  };

  const additionalButtonListGridMd = () => {
    switch (additionalButtonListLength) {
      case 1:
        return 6;
      case 2:
        return 6;
      case 3:
        return 6;
      default:
        return 6;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFilter();
      }}
    >
      <Grid
        container
        columnSpacing={3}
        marginBottom={4}
        alignItems={"center"}
        justifyContent={"space-between"}
        layout={"row"}
      >
        <Grid
          item
          container
          md={10}
          rowSpacing={3}
          columnSpacing={3}
          justifyContent={"start"}
        >
          {selectFilters.map((component, i) => {
            return (
              <Grid
                item
                key={i}
                md={
                  component?.props?.additionalStyle?.md || selectFiltersGridMd()
                }
              >
                {component}
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={2}
          justifyContent={"end"}
          rowSpacing={5}
          columnSpacing={2}
        >
          <Grid item md={7}>
            {iconClass && iconText ? (
              <IconButton iconClass={iconClass} iconText={iconText} />
            ) : (
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={BasicButtonStyle}
              >
                Filter
              </Button>
            )}
          </Grid>
          {additionalButtonList.map((component, i) => (
            <Grid item key={i} md={additionalButtonListGridMd()}>
              {component}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </form>
  );
};

export default FilterGrid;
