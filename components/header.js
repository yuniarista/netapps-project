"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "/public/nonton.png";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import BasicModal from "./modal/basicModal";
import { Button, Menu, MenuItem } from "@mui/material";
import ProfileForm from "./profile/profileForm";
// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";
import EmergencyDialog from "@/layout/components/dialog/emergencyDialog";
import { io } from "socket.io-client";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";
import IconifyIcon from "./icon";
import ChangeAccountDialog from "@/layout/components/dialog/changeAccountDialog";
import { Apartment, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Header({ name, isNewFeature, featGlobal }) {
  const { globalAct } = useContext(GlobalContext);
  const { data: updatedSession, update } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [socketIo, setSocketIo] = useState(undefined);
  const [isEmergency, setIsEmergency] = useState(false);
  const [isEmergencyClick, setIsEmergencyClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const propertyId = updatedSession?.user?.propertyId;
  const isNotManager = updatedSession.user.role !== "Manager";
  const isPropertyGroup = updatedSession.user.isPropertyGroup;
  const isAdmin = updatedSession.user.isAdmin;
  const isProperty = !!updatedSession.user?.propertyId;
  const isIncludeDangerFeature = updatedSession?.user?.configuration
    ?.isNewSubscriptionEnabled
    ? featGlobal?.includes("danger")
    : isNewFeature;
  const open = Boolean(anchorEl);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      extraHeaders: {
        token: updatedSession.user.accessToken
      }
    });

    globalAct.setSocket(socket);

    setSocketIo(socket);

    // Listen for the 'connect' event
    socket.on("connected", () => {});

    if (!isProperty) {
      socket.disconnect();
    }

    socket.on("receiveIsEmergency", (data) => {
      setIsEmergency(data.isEmergency);

      if (data?.isConnected) {
        return;
      }
      if (data.isEmergency) {
        setModal("EmergencySuccess");
      } else {
        setModal("EmergencySuccessOff");
      }
    });

    socket.on("error", (err) => {
      console.log({ err });
    });
    return () => {
      socket.disconnect();
    };
  }, [isEmergencyClick]);

  const { reset } = useForm();

  const router = useRouter();

  function handleClose() {
    setAnchorEl(null);
  }

  const handleEmergencyModal = () => {
    setIsEmergencyClick(true);
    if (isEmergency) {
      // Listen for the 'connect' event
      setModal("EmergencyConfirmOff");
      // socketIo.emit("isEmergency", false);
      return;
    }
    setModal("EmergencyConfirm");
  };

  const handleEmergencyConfirm = () => {
    // Listen for the 'connect' event
    if (isEmergency) {
      socketIo.emit("isEmergency", false);
      return;
    }
    socketIo.emit("isEmergency", true);
  };

  const handleEmergencyClose = () => {
    setModal(null);
  };

  function daysLeftUntil(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diffMs = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0); // Reset time to midnight
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24)); // Convert to days
  }

  const subscriptionTimeLeft = daysLeftUntil(
    updatedSession?.user?.subscriptionEnded
  );

  const handlePost = async () => {
    const body = {
      uri: "user/change-account",
      method: "POST"
    };
    try {
      setLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
        method: "POST",
        body: JSON.stringify(body)
      });

      const response = await res.json();
      if (res.ok) {
        const getSubscriptionFeature = async (accessToken) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}subscription-access/dash`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );
            const response = await res.json();
            return response?.data;
          } catch (error) {
            console.log("err", error.message);
          }
        };
        const subscriptionFeature = await getSubscriptionFeature(
          response.data.accessToken
        );

        const userData = JSON.parse(
          Buffer.from(
            response.data.accessToken.split(".")[1],
            "base64"
          ).toString()
        );
        const user = userData;

        await update({
          user: {
            ...updatedSession?.user,
            accessToken: response.data.accessToken,
            redirectUrl: response.data.redirectUrl,
            subscriptionFeature: {
              featDashboard: await subscriptionFeature?.featDashboard?.map(
                (data) => ({
                  name: data.name,
                  url: data.url
                })
              ),
              featGlobal: await subscriptionFeature?.featGlobal
            },
            configuration: user.configuration,
            propertyId: response.data.propertyId || ""
          }
        });
        setModal(null);
        setLoading(false);
        setSuccessMessage(response?.message);
        handleClose();
        if (typeof window !== "undefined" && response?.data?.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        } else {
          console.error("Redirect URL is undefined:", response);
        }
        return;
      }
      setLoading(false);
      setErrorMessage(response?.message);
    } catch (err) {
      setLoading(false);
      console.log({ err });
      setErrorMessage(response?.message);
    }
  };

  return (
    <div className="h-[4.375rem] bg-[#fafafa] w-full flex justify-between items-center px-6 text-white">
      <Link href={updatedSession.user.redirectUrl} className="h-full pl-4">
        <div className="relative h-full aspect-video">
          <Image
            src={logo}
            sizes="100vh"
            alt=""
            fill
            priority
            className="h-full w-auto p-3 object-contain"
          />
        </div>
      </Link>
      <div className="flex items-center justify-end gap-5 min-w-[20%]">
        {subscriptionTimeLeft <= 30 && !isNotManager && (
          <div className="px-3 py-2 rounded-lg bg-[#FFC10033] border border-1 border-[#FFC100CC] flex flex-row items-center gap-x-2">
            <IconifyIcon icon="typcn:warning" fontSize={24} color="#FFC100" />
            <span className="font-medium text-[#EEEEEE]">
              Your Subscription will end in {subscriptionTimeLeft} days
            </span>
          </div>
        )}
        <Button
          hidden={!isIncludeDangerFeature && isNotManager}
          onClick={handleEmergencyModal}
          sx={{
            "&.MuiButton-root": {
              backgroundColor: isEmergency ? "#039BE5" : "red",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.25)" // Adding box shadow
            },
            "&:hover": {
              "&.MuiButton-root": {
                backgroundColor: "grey"
              }
            },
            color: "white",
            textTransform: "none",
            display: isIncludeDangerFeature && !isNotManager ? "" : "none",
            fontWeight: "600"
          }}
        >
          {isEmergency ? "Turn Off Alert" : "Activate Alert Danger!"}
        </Button>
        <div
          className="cursor-pointer select-none capitalize flex flex-row items-center justify-start gap-x-2"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <span>Hello, {name}</span>{" "}
        </div>
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
          <div className="space-y-2">
            <MenuItem
              className="w-full gap-x-2"
              onClick={() => {
                setModal("Profile"), handleClose();
              }}
            >
              {/* <PersonIcon /> */}
              Profile
            </MenuItem>
            {(isPropertyGroup || isAdmin) && (
              <MenuItem
                className="w-full gap-x-2"
                onClick={() => {
                  handlePost();
                }}
              >
                {/* <Apartment /> */}
                Main Account
              </MenuItem>
            )}
            {(isPropertyGroup || isAdmin) && (
              <MenuItem
                className="w-full gap-x-2"
                onClick={() => {
                  setModal("Change Account"), handleClose();
                }}
              >
                <Settings />
                Change Account
              </MenuItem>
            )}
            <MenuItem
              className="w-full gap-x-2"
              onClick={() => {
                signOut();
              }}
            >
              {/* <LogoutIcon /> */}
              Logout
            </MenuItem>
          </div>
        </Menu>
      </div>
      <BasicModal
        name={"Profile"}
        modal={modal}
        resetForm={reset}
        setModal={setModal}
      >
        <ProfileForm
          session={updatedSession}
          setModal={setModal}
          loading={loading}
          setLoading={setLoading}
        />
      </BasicModal>
      <BasicModal
        name={"Change Account"}
        modal={modal}
        resetForm={reset}
        setModal={setModal}
      >
        <ChangeAccountDialog
          uri={"user/change-account"}
          isAdmin={isAdmin}
          isPropertyGroup={isPropertyGroup}
          setModal={setModal}
          loading={loading}
          currentPropertyId={propertyId}
          setLoading={setLoading}
        />
      </BasicModal>
      {isIncludeDangerFeature && !isNotManager && (
        <EmergencyDialog
          handleClose={handleEmergencyClose}
          handleConfirm={handleEmergencyConfirm}
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
}
