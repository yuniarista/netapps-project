"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator
} from "@/components/ui/sidebar";
import IconifyIcon from "./icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "./ui/collapsible";
import Link from "next/link";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { GlobalContext } from "@/context/globalContext";
import { io } from "socket.io-client";
import { Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomButton from "./button/customButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { getDashboardAccess } from "@/utils/getDashboardAccess";
import { getStorage } from "@/utils/getStorage";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "./ui/spinner";
import CustomDialog from "./dialog/basicDialog";
import { getModalConfig } from "@/utils/getModalConfig";
import { FilterData, UpdateData } from "@/libs/function";
import UserProfileForm from "@/views/users/components/(form)/UserProfileForm";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NotificationFetcher from "@/utils/notificationFetcher";
import useInfiniteScroll from "@/hooks/use-infinity-scroll";

export function SidebarNavigation({ menu, storageUsage, session }) {
  const [openGroups, setOpenGroups] = useState([]);
  const [notifData, setNotifData] = useState({});
  const [allNotifData, setAllNotifData] = useState({});
  const [badgeNotif, setBadgeNotif] = useState(false);
  const [isFetchingNotif, setIsFetchingNotif] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [form, setForm] = useState(null);
  const [response, setResponse] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageIndex: 1,
    pageLimit: 10
  });
  const [userProfile, setUserProfile] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [alertOpen, setAlertOpen] = useState(!!response?.status);
  const handleModalOpen = useCallback((type, item = null) => {
    setModalType(type);
    setForm(item);
    setOpenModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setOpenModal(false);
    setForm(null);
    setModalType(null);
  }, []);
  const router = usePathname();
  const splittedRouter = "/" + router?.split("/")[1];
  const { globalAct } = useContext(GlobalContext);
  const reRouter = useRouter();
  const { data, update } = useSession();
  const socketRef = useRef(null);
  dayjs.extend(relativeTime);

  // --- infinite scroll ---
  const fetchNotification = NotificationFetcher({
    paginationModel,
    setData: setNotifData,
    setHasMore,
    setLoading
  });
  useEffect(() => {
    if (paginationModel.pageIndex > 1) {
      fetchNotification({
        pageIndex: paginationModel.pageIndex,
        pageLimit: paginationModel.pageLimit,
        isLoadMore: true
      });
    }
  }, [paginationModel.pageIndex]);
  const lastElementRef = useInfiniteScroll(
    () => {
      setPaginationModel((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    },
    hasMore,
    loading
  );

  // --- socket ---
  useEffect(() => {
    if (!session?.accessToken) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      extraHeaders: { Authorization: `Bearer ${session?.accessToken}` },
      autoConnect: true
    });

    socketRef.current = socket;

    // optional: debug log
    // @ts-ignore
    const handleConnect = () => {
      globalAct.setSocket(socket);
      socket.emit("connectedNotification");
    };

    const handleNotification = (response) => {
      setIsFetchingNotif(true);
      setBadgeNotif(true);
      if (socket.connected) {
        socket.emit("ackNotification", {
          notificationIds: [response.id]
        });
      }
    };

    socket.on("connect", handleConnect);

    socket.on("customerNotification", handleNotification);

    socket.on("disconnect", (reason) => {
      // console.log({ status: "disconnected", reason });
    });

    socket.on("connect_error", (err) => {
      // console.error("connect_error:", err?.message, err);
    });

    return () => {
      socket.off("connect");
      socket.off("customerNotification");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [session?.accessToken]);
  const handleMarkAsRead = useCallback((notificationId) => {
    const socket = socketRef.current;

    if (!socket) {
      console.error("Socket not initialized");
      return;
    }

    if (!socket.connected) {
      console.error("Socket not connected, waiting...");

      // Wait for connection then emit
      socket.once("connect", () => {
        socket.emit("markAsRead", { notificationId });
        setIsFetchingNotif(true); // Refresh notifications
      });

      return;
    }

    // Socket is connected, emit immediately
    socket.emit("markAsRead", { notificationId });
    setIsFetchingNotif(true); // Refresh notifications
  }, []);

  // --- fetch data ---
  useEffect(() => {
    const loadProfile = async () => {
      const result = await FilterData({
        uri: "users/profile",
        filterParams: [],
        paginationModel,
        setLoading
      });

      setUserProfile(result);
    };
    loadProfile();
  }, [data]);
  useEffect(() => {
    const loadNotif = async () => {
      const result = await FilterData({
        uri: "notification-recipients/user",
        filterParams: [],
        paginationModel: { pageIndex: 1, pageLimit: 10 },
        setLoading
      });

      setNotifData(result);
    };

    const loadAllNotif = async () => {
      const result = await FilterData({
        uri: "notification-recipients/user",
        filterParams: [],
        paginationModel: { pageIndex: 1, pageLimit: 0 },
        setLoading
      });

      setAllNotifData(result);
    };

    if (isFetchingNotif === true) {
      loadNotif();
      loadAllNotif();
      setIsFetchingNotif(false);
    }
  }, [isFetchingNotif]);

  useEffect(() => {
    if (!allNotifData?.data) return;
    const hasUnread = allNotifData?.data?.some(
      (notif) => notif.isRead === false
    );
    setBadgeNotif(hasUnread);
  }, [allNotifData]);

  useEffect(() => {
    const groupNameFound = menu.find((data) =>
      data.features.find((item) => item.url === splittedRouter)
    );
    setOpenGroups([groupNameFound?.groupName]);
  }, []);

  const freeSpaces = Math.round(
    storageUsage?.totalStorageMB - storageUsage?.storageUsageMB
  );

  let usedSpaces;
  if (storageUsage?.storageUsageMB >= 1000) {
    if ((storageUsage?.storageUsageMB / 1000).toFixed(1) % 1 === 0) {
      usedSpaces = Math.round(storageUsage?.storageUsageMB / 1000);
    } else {
      usedSpaces = (storageUsage?.storageUsageMB / 1000).toFixed(1);
    }
  } else {
    usedSpaces = Math.round(storageUsage?.storageUsageMB);
  }

  let totalSpaces;
  if (storageUsage?.totalStorageMB >= 1000) {
    if ((storageUsage?.totalStorageMB / 1000).toFixed(1) % 1 === 0) {
      totalSpaces = Math.round(storageUsage?.totalStorageMB / 1000);
    } else {
      totalSpaces = (storageUsage?.totalStorageMB / 1000).toFixed(1);
    }
  } else {
    totalSpaces = storageUsage?.totalStorageMB;
  }

  const handleUpdate = async (DataForm) => {
    DataForm.id = userProfile?.id;
    DataForm.role = userProfile?.role?.id;
    DataForm.resetPassword = undefined;
    DataForm.confirmPassword = undefined;

    const result = await UpdateData({
      uri: "users",
      setData: setForm,
      setLoading,
      setResponse,
      DataForm,
      paginationModel,
      setPaginationModel,
      setModal: setOpenModal,
      filterParams: []
    });

    await update({ username: DataForm.username });

    return result;
  };

  const modalConfig = getModalConfig(modalType, {
    edit: {
      title: "Edit Profile",
      content: (
        <UserProfileForm
          formData={userProfile}
          loading={loading}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          response={response}
          handleUpdate={handleUpdate}
        />
      )
    }
  });

  const handlePost = async () => {
    const body = {
      uri: "auth/change-account",
      method: "POST"
    };
    try {
      setLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_NEXT_API + "authApi", {
        method: "POST",
        body: JSON.stringify(body)
      });
      const response = await res.json();
      const userProfileRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}users/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.accessToken}`
          }
        }
      );
      const userProfile = await userProfileRes.json();
      if (res.ok && response.accessToken) {
        const dashboardAccess = await getDashboardAccess(response.accessToken);
        const storageCapacity = await getStorage(response.accessToken);
        const userData = jwtDecode(response.accessToken);

        await update({
          id: userData.id,
          email: userData.email,
          username: userData.username,
          accessToken: response.accessToken,
          redirectUrl: !!userProfile?.role?.redirectUrl,
          role: !!userProfile?.customer
            ? "user"
            : !!userProfile?.organization
            ? "organization"
            : "admin",
          dashboardAccess: dashboardAccess,
          storageUsage: storageCapacity,
          tempCustomer: null
        });
      }
      setLoading(false);
      reRouter.push(userProfile.role.redirectUrl);
      reRouter.refresh();
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  const accountSetting = [
    {
      icon: "mdi:person",
      label: "Profile",
      className: "",
      onClick: () => handleModalOpen("edit", {})
    },
    session.role === "organization" && session.tempCustomer
      ? {
          icon: "carbon:enterprise",
          label: "Main Account",
          className: "",
          onClick: handlePost
        }
      : null
  ].filter(Boolean);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center justify-start gap-x-2 my-2 group-data-[collapsible=icon]:justify-center">
            {/* User Avatar - Always visible */}
            <div className="w-8 h-8 bg-black/10 border border-black text-black rounded-sm flex items-center justify-center flex-shrink-0">
              <IconifyIcon icon={"oui:user"} />
            </div>

            {/* User Info - Hidden when collapsed */}
            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
              <div className="text-sm font-semibold capitalize">
                {data.user.username}
              </div>
              <div className="text-xs font-normal truncate">
                {session.email}
              </div>
            </div>

            {/* Actions - Hidden when collapsed */}
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "cursor-pointer",
                    session?.role === "admin" && "hidden"
                  )}
                >
                  <Settings size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {accountSetting?.map((action, index) => {
                    const isMainAccount = action.label === "Main Account";
                    return (
                      <DropdownMenuItem
                        key={index}
                        disabled={loading && isMainAccount}
                        onClick={() => action?.onClick()}
                        className={action?.className}
                      >
                        {loading && isMainAccount ? (
                          <Spinner />
                        ) : (
                          <Icon icon={action?.icon} className="mr-2" />
                        )}

                        {isMainAccount && loading
                          ? "Switching..."
                          : action?.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Popover
                open={openPopover}
                onOpenChange={(open) => {
                  setOpenPopover(open);
                }}
              >
                <PopoverTrigger>
                  <div
                    className={cn(
                      "cursor-pointer relative",
                      session?.role === "admin" && "hidden"
                    )}
                  >
                    <Bell size={15} />
                    <div
                      className={cn(
                        "absolute -top-1 -right-1 bg-red-600 rounded-full h-2 w-2 border border-white",
                        badgeNotif ? "" : "hidden"
                      )}
                    ></div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  className="w-80 p-4 border-gray-300 max-h-[33rem] overflow-auto space-y-4"
                >
                  <Label className="text-base font-semibold">
                    Notifications
                  </Label>
                  <div className="flex flex-col space-y-2">
                    {notifData?.data?.length > 0 ? (
                      notifData?.data?.map((notif, key) => {
                        const isLast = key === notifData?.data?.length - 1;
                        const item = notif.notification;
                        const iconVariant = {
                          info: "lucide:wrench",
                          warning: "lucide:triangle-alert",
                          error: "lucide:download-cloud",
                          system: "lucide:hard-drive",
                          subscription: "lucide:bell-ring",
                          offer: "lucide:badge-percent"
                        };
                        const iconColor = {
                          info: "text-primary/80",
                          warning: "text-yellow-500",
                          error: "text-red-500",
                          system: "text-yellow-500",
                          subscription: "text-yellow-500",
                          offer: "text-blue-500"
                        };
                        const iconBg = {
                          info: "bg-primary/10",
                          warning: "bg-yellow-200",
                          error: "bg-red-200",
                          system: "bg-yellow-200",
                          subscription: "bg-yellow-200",
                          offer: "bg-blue-200"
                        };
                        return (
                          <div
                            ref={isLast ? lastElementRef : null}
                            key={notif.id}
                            className="relative flex flex-row items-center gap-x-4 w-full hover:bg-gray-100 rounded-lg p-4 cursor-pointer"
                            onClick={() => {
                              if (!notif.isRead) {
                                handleMarkAsRead(notif.notificationId);
                              }
                            }}
                          >
                            {!notif.isRead && (
                              <div className="absolute top-2 right-2 bg-red-600 rounded-full h-2 w-2 border border-white"></div>
                            )}
                            <div
                              className={cn(
                                "flex w-8 h-full aspect-square rounded-full items-center justify-center",
                                iconBg[item.type]
                              )}
                            >
                              <IconifyIcon
                                icon={iconVariant[item.type]}
                                className={cn("size-5", iconColor[item.type])}
                              />
                            </div>
                            <div className="flex flex-col flex-1 space-y-0">
                              <Label className="text-base w-fit text-start">
                                {item.title}
                              </Label>
                              <Label className="text-xs w-fit text-start">
                                {item.message}
                              </Label>
                              <Label className="text-[10px] w-full text-end text-gray-400">
                                {dayjs(item.createdAt).fromNow()}
                              </Label>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Belum ada notifikasi baru.
                      </p>
                    )}
                    {loading && (
                      <div className="flex w-full justify-center">
                        <Spinner className={"text-primary size-5"} />
                      </div>
                    )}
                    {!hasMore && (
                      <div className="text-center">
                        <span>
                          You&apos;ve reached the end. No more items to load.
                        </span>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent
        className={`my-2 ${
          session.role === "organization" && loading
            ? "justify-center items-center"
            : ""
        }`}
      >
        {session.role === "organization" && loading ? (
          <Spinner className={"text-primary size-6"} />
        ) : (
          <SidebarMenu>
            {menu?.map((group) => {
              const isOpenGroup = openGroups.includes(group.groupName);
              const isActiveRoute = group?.features?.some(
                (data) => data.url === splittedRouter
              );

              return group?.features?.length > 1 ? (
                <Collapsible
                  key={group.groupName}
                  className="group/collapsible"
                  open={isOpenGroup}
                  onOpenChange={() => {
                    if (isOpenGroup) {
                      setOpenGroups((prev) =>
                        prev.filter((g) => g !== group.groupName)
                      );
                    } else {
                      setOpenGroups((prev) => [...prev, group.groupName]);
                    }
                  }}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={group.groupName}
                        className={`flex items-center justify-between gap-2 ${
                          isActiveRoute &&
                          !isOpenGroup &&
                          "bg-primary text-white hover:bg-primary/80 hover:text-white transition-all duration-300"
                        }`}
                      >
                        <IconifyIcon icon={group.icon} />
                        <span className="flex-1">{group.groupName}</span>
                        <IconifyIcon
                          icon={
                            isOpenGroup
                              ? "majesticons:chevron-up"
                              : "majesticons:chevron-down"
                          }
                          className="group-data-[collapsible=icon]:hidden"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                      <SidebarMenuSub>
                        {group.features.map((feature) => (
                          <SidebarMenuSubItem
                            className="w-full"
                            key={feature.name}
                            asChild
                          >
                            <Link
                              className={`block capitalize w-full text-sm py-1 px-2 rounded-md font-medium transition-colors duration-200 ${
                                feature.url === splittedRouter
                                  ? "bg-primary text-white hover:bg-primary/90"
                                  : "bg-transparent hover:bg-gray-100"
                              }`}
                              href={feature.url}
                            >
                              {feature.name}
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={group.groupName}>
                  <Link href={group.features[0].url}>
                    <SidebarMenuButton
                      tooltip={group.features[0].name}
                      className={`w-full capitalize flex items-center gap-2 text-sm py-1 px-2 rounded-md font-medium transition-colors duration-200 ${
                        group.features[0].url === splittedRouter
                          ? "bg-primary text-white hover:bg-primary/90 hover:text-white active:bg-primary/90 active:text-white"
                          : "bg-transparent hover:bg-gray-100"
                      }`}
                    >
                      <IconifyIcon icon={group.icon} />
                      <span>{group.features[0].name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div
          className={cn(
            "flex flex-col gap-y-2 bg-yellow-100 p-3 font-sans min-h-fit w-full rounded-sm group-data-[collapsible=icon]:hidden",
            freeSpaces <= storageUsage?.totalStorageMB * 0.1 &&
              session?.role !== "admin"
              ? ""
              : "hidden"
          )}
        >
          <div className="flex w-full items-center gap-x-2">
            <IconifyIcon
              icon={"famicons:warning-outline"}
              className="h-full text-[#FFC107]"
            />
            <span className="text-sm">Your storage is almost full!</span>
          </div>
          <span className="text-xs text-gray-500">
            You&apos;ve used{" "}
            {storageUsage?.storageUsageMB >= 1000
              ? `${usedSpaces} GB`
              : `${usedSpaces} MB`}{" "}
            of{" "}
            {storageUsage?.totalStorageMB >= 1000
              ? `${totalSpaces} GB`
              : `${totalSpaces} MB`}{" "}
            {`(${Math.round(storageUsage?.usagePercentage)}%)`}. Upgrade now to
            keep uploading content without interruptions.
          </span>
          <div className="flex justify-between w-full">
            <CustomButton
              variant="ghost"
              className={"text-xs text-gray-500 py-2 px-1 hover:text-black"}
              size="sm"
              onClick={() => reRouter.push("/images")}
            >
              Manage Storage
            </CustomButton>
            <CustomButton
              variant="primary"
              className={"text-xs py-2"}
              size="sm"
              onClick={() => reRouter.push("https://signplus.id")}
            >
              Upgrade Now
            </CustomButton>
          </div>
        </div>
        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
        <SidebarMenuButton
          tooltip="Logout"
          className="flex items-center gap-2"
          onClick={() => signOut()}
        >
          <IconifyIcon
            icon={"majesticons:door-exit-line"}
            className="text-base"
          />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
      <CustomDialog
        open={openModal}
        onOpenChange={handleModalClose}
        title={modalConfig.title}
        className={["delete"].includes(modalType) && "max-w-sm gap-0"}
      >
        {modalConfig.content}
      </CustomDialog>
    </Sidebar>
  );
}
