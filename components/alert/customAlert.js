// CustomAlert.tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, XCircle, CheckCircle2, TriangleAlert } from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { Button } from "../ui/button";
import IconifyIcon from "../icon";

const ICONS = {
  success: <CheckCircle2 color="#47D28A" />,
  error: <XCircle color="#DC2626" />,
  warning: <TriangleAlert color="#FFC021" />,
  info: <Info color="#2F86EB" />
};

const VARIANT_CLASSES = {
  success: "bg-white border-0 border-l-8 border-l-[#47D28A] shadow-md",
  error: "bg-white border-0 border-l-8 border-l-[#DC2626] shadow-md",
  warning: "bg-white border-0 border-l-8 border-l-[#FFC021] shadow-md",
  info: "bg-white border-0 border-l-8 border-l-[#2F86EB] shadow-md"
};

/**
 * Props:
 * - open: boolean (controlled)
 * - onClose: () => void
 * - autoClose: number | "unlimited" (seconds)
 * - variant: "success" | "error" | "warning" | "info"
 */
export default function CustomAlert({
  open = false,
  onClose,
  autoClose = 5,
  variant = "info",
  title,
  children,
  className,
  icon,
  ...props
}) {
  // optional auto close
  useEffect(() => {
    if (!open) return;
    if (autoClose === "unlimited") return;
    if (typeof autoClose === "number" && autoClose > 0) {
      const t = setTimeout(() => onClose?.(), autoClose * 1000);
      return () => clearTimeout(t);
    }
  }, [open, autoClose, onClose]);

  return (
    <Alert
      className={clsx(
        open ? "flex" : "hidden",
        "items-start justify-between space-x-4 p-3",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-4">
        {icon ?? ICONS[variant]}
        <div>
          {title && (
            <AlertTitle className="text-base font-bold capitalize">
              {title}
            </AlertTitle>
          )}
          <AlertDescription className="text-sm font-normal">
            {children}
          </AlertDescription>
        </div>
      </div>

      <Button type="button" variant="ghost" onClick={onClose}>
        <IconifyIcon icon="material-symbols:close-rounded" size="12" />
      </Button>
    </Alert>
  );
}
