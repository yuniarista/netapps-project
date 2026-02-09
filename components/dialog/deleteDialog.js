import React from "react";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
export default function DeleteDialog({ open, handleClose, handleDelete }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="p-6">
        <div className="font-bold text-2xl">Confirm Delete</div>
        <div className="font-light text-base">
          Are you sure you want to delete this data?
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            onClick={handleClose}
            variant="text"
            sx={{
              "&.MuiButton-root": {
                color: "#a7c404",
                fontWeight: "600",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              "&.MuiButton-root": {
                backgroundColor: "#a7c404",
                fontWeight: "600",
              },
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
