import React from "react";
import BasicModal from "../modal/basicModal";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import dangerSign from "/public/dangerSign.png";

const EmergencyDialog = ({ modal, setModal, handleClose, handleConfirm }) => {
  return (
    <BasicModal
      name={"Emergency"}
      width={"md"}
      modal={modal}
      setModal={setModal}
    >
      <Stack direction={"column"} alignItems={"center"} rowGap={5} paddingY={5}>
        <Typography
          sx={{
            fontSize: "48px",
            lineHeight: "56px",
            textAlign: "center",
            fontWeight: "500",
            width: "60%",
          }}
        >
          Danger Alert activation confirmation
        </Typography>
        <div className="flex justify-center w-[100%]">
          <div className="relative w-[20%] h-auto aspect-square">
            <Image
              src={dangerSign}
              alt="danger sign"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "28px",
            textAlign: "center",
            width: "70%",
          }}
        >
          This mode will display an emergency message on the TV screens for all
          users. Please ensure that this situation genuinely requires an
          emergency alert.
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            textAlign: "center",
            width: "70%",
            fontWeight: "600",
          }}
        >
          Are you sure you want to proceed?
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          gap={10}
        >
          <Button
            fullWidth
            sx={{
              "&.MuiButton-root": {
                backgroundColor: "transparant",
                fontWeight: "600",
              },
              paddingY: "10px",
              border: "2px solid",
              borderColor: "#757575",
              color: "#757575",
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            sx={{
              "&.MuiButton-root": {
                backgroundColor: "#a7c404",
                fontWeight: "600",
              },
              paddingY: "10px",
              color: "#FFFFFF",
            }}
          >
            Yes, Activate Alert!
          </Button>
        </Stack>
      </Stack>
    </BasicModal>
  );
};

export default EmergencyDialog;
