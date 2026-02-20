import { BellPlus, Newspaper, PencilLine, Trash2 } from "lucide-react";

const customerActionConfig = (handleModalOpen, dashboardAccessPermissions) => {
  const actionList = [
    dashboardAccessPermissions.includes("detail") && {
      label: "View details",
      icon: Newspaper,
      onClick: (item) => handleModalOpen("detail", item)
    },
    dashboardAccessPermissions.includes("update") && {
      label: "Edit",
      icon: PencilLine,
      onClick: (item) => handleModalOpen("edit", item)
    },
    dashboardAccessPermissions.includes("notify") &&  {
      label: "Send notification",
      icon: BellPlus,
      onClick: (item) => handleModalOpen("notify", item)
    },
    dashboardAccessPermissions.includes("delete") && {
      label: "Delete",
      icon: Trash2,
      className: "hover:text-red-700",
      onClick: (item) => handleModalOpen("delete", item)
    }
  ].filter(Boolean);
  return actionList;
};

export default customerActionConfig;
