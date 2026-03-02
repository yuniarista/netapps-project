import { FileSymlink, PencilLine, Trash2 } from "lucide-react";

const invoiceActionConfig = (handleModalOpen, dashboardAccessPermissions) => {
  const actionList = [
    dashboardAccessPermissions.includes("detail") && {
      label: "Refund",
      icon: FileSymlink,
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

export default invoiceActionConfig;
