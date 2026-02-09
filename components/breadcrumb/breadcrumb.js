// ** React / Next
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** MUI
import { Breadcrumbs, Typography } from "@mui/material";
import { splitUppercase } from "@/utils/splitUppercase";

// ** Components
import IconifyIcon from "../icon";

const Breadcrumb = ({
  crumbTitle = undefined,
  isCrumbTitleShowed = false,
  isSpecialCrumbTitleShowed = false
}) => {
  const pathname = usePathname();

  let textClassStyle = "text-base font-normal";

  const crumbs = decodeURIComponent(pathname)
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      const crumbText = splitUppercase({ text: crumb, split: "-", join: " " });
      isCrumbTitleShowed && array.pop();

      if (index === array.length - 1) {
        return (
          <Typography
            className={`${textClassStyle} text-[#00000099]`}
            key={crumb}
          >
            {crumbTitle ?? crumbText}
          </Typography>
        );
      }
      if (isCrumbTitleShowed && index >= array.length - 1) {
        return (
          <Typography
            className={`${textClassStyle} text-[#00000099]`}
            key={crumb}
          >
            {crumbText}
          </Typography>
        );
      }
      if (isSpecialCrumbTitleShowed && index !== 1) {
        return (
          <Typography
            className={`${textClassStyle} text-[#00000099]`}
            key={crumb}
          >
            {crumbText}
          </Typography>
        );
      }
      return (
        <Link
          className={`${textClassStyle}  text-[#000000DE]`}
          component={Link}
          underline="hover"
          color="inherit"
          href={`${
            isSpecialCrumbTitleShowed ? `/${array[index - 1]}/${crumb}` : crumb
          } `}
          key={crumb}
        >
          {crumbText}
        </Link>
      );
    });
  return (
    <Breadcrumbs
      separator={<IconifyIcon icon={"material-symbols:chevron-right"} />}
      aria-label="breadcrumb"
    >
      {crumbs}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
