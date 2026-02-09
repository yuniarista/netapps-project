"use client";
import { Dialog, DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import IconifyIcon from "../icon";

export default function BasicModal({
  name,
  modal,
  width = "md",
  padding,
  setForm,
  loading,
  setModal,
  children,
  resetForm,
  setResponse
}) {
  const handleClose = (event, reason) => {
    if (!loading) {
      resetForm && resetForm();
      setForm && setForm(null);
      setModal && setModal(null);
      setResponse && setResponse(null);
    }
    if (reason && reason === "backdropClick") {
      setModal(name);
    }
  };

  return (
    <>
      <Dialog
        open={modal === name}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={width}
        fullWidth={true}
      >
        <DialogContent
          dividers={true}
          sx={{
            paddingTop: name === "select-icon-modal" ? "0px !important" : "16px"
          }}
        >
          <Box
            position={"absolute"}
            top={10}
            right={34}
            bgcolor={"white"}
            zIndex={100}
            height={32}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"right"}
          >
            <Box onClick={() => handleClose()} sx={{ cursor: "pointer" }}>
              <IconifyIcon icon={"mdi:close"} fontSize={24} color={"#333333"} />
            </Box>
          </Box>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
