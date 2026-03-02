import { BellPlus, Newspaper, PencilLine, Trash2 } from "lucide-react";

const odpActionConfig = (handleModalOpen, dashboardAccessPermissions) => {
  const actionList = [
    dashboardAccessPermissions.includes("update") && {
      label: "Edit",
      icon: PencilLine,
      onClick: (item) => handleModalOpen("edit", item),
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

export default odpActionConfig;
