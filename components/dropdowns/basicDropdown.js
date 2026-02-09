"use client";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Info } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteDialog from "../dialog/deleteDialog";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BasicDropdown({
  params,
  setForm,
  setModal,
  Delete,
  UpdateStatus,
  isEditable = true,
  isActive = true,
  isDelete = true,
  isDetailShow = false,
  modalName = "Edit",
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setForm(params.row);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <>
        <MenuIcon
          onClick={handleClick}
          sx={{
            "&.MuiSvgIcon-root": {
              cursor: "pointer",
              fill: open ? "#3d3b3c" : "#3d3b3c3b",
              "&:hover": {
                fill: "#3d3b3c",
              },
            },
          }}
        />
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          {isActive && (
            <MenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                UpdateStatus(params.row._id) ?? "";
                handleClose();
              }}
            >
              <VpnKeyIcon fontSize="1rem" />
              {params.row.isActive ? "NonActive" : "Active"}
            </MenuItem>
          )}
          {isEditable && (
            <MenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                setModal(modalName);
                handleClose();
              }}
            >
              <EditIcon fontSize="1rem" />
              Edit
            </MenuItem>
          )}
          {isDetailShow && (
            <MenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                setModal("Detail");
                handleClose();
              }}
            >
              <Info fontSize="1rem" />
              Detail
            </MenuItem>
          )}
          {isDelete && (
            <MenuItem
              className="flex items-center gap-x-2"
              onClick={() => setOpenDialog(true)}
            >
              <DeleteIcon fontSize="1rem" />
              Delete
            </MenuItem>
          )}
          <DeleteDialog
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            handleDelete={() => {
              setOpenDialog(false);
              Delete(params.row._id);
              handleClose();
            }}
          />
        </Menu>
      </>
    </>
  );
}
