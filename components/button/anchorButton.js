import { Menu } from "@mui/material";
import React from "react";
import IconButton from "./customButtonIcon";

const AnchorButton = ({
  open,
  anchorEl,
  iconText,
  iconClass,
  profileName = "",
  setAnchorEl,
  handleClose,
  children
}) => {
  return (
    <div>
      {iconText && iconClass ? (
        <IconButton
          iconText={iconText}
          iconClass={iconClass}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          type="button"
        />
      ) : (
        <div
          className="cursor-pointer select-none capitalize"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          Hello, {profileName}
        </div>
      )}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <div className="space-y-2">{children}</div>
      </Menu>
    </div>
  );
};

export default AnchorButton;
