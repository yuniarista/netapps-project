import { BellPlus, Info, Newspaper, PencilLine, Trash2 } from "lucide-react";

const TicketingActionConfig = (handleModalOpen, dashboardAccessPermissions) => {
  const actionList = [
    dashboardAccessPermissions.includes("detail") && {
      label: "Detail",
      icon: Info,
      onClick: (item) => handleModalOpen("detail", item),
    },
    dashboardAccessPermissions.includes("delete") && {
      label: "Delete",
      icon: Trash2,
      className: "hover:text-red-700",
      onClick: (item) => handleModalOpen("delete", item),
    },
  ].filter(Boolean);
  return actionList;
};

export default TicketingActionConfig;
