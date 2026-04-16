import { ArrowRight, Bell } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { stepper_config } from "@/constants/data";
import { Button } from "../ui/button";

export function StepperAlert({ currentStep, dataCount, oldestWaiting, isLoading, onViewAll }) {
  const activeConfig = stepper_config[currentStep - 1];

  if (!activeConfig?.notif) return null;
  if (!isLoading && dataCount === 0) return null;

  const variant = activeConfig.notif.variant;

  const variantStyles = {
    muted: {
      bell: "text-foreground",
      waiting: "text-foreground",
      title: "text-foreground"
    },
    warning: {
      bell: "text-yellow-500",
      waiting: "text-yellow-500",
      title: "text-yellow-500"
    },
    success: {
      bell: "text-green-500",
      waiting: "text-green-600",
      title: "text-green-700"
    }
  };

  const styles = variantStyles[variant] || variantStyles.info;

  return (
    <Alert variant={variant} className="p-2 mb-4 transition-all duration-300 rounded-sm">
      <div className="flex flex-row justify-between items-center w-full gap-3">
        <div className="flex gap-3 items-start">
          <Bell className={cn(
            "w-4 h-4 shrink-0 mt-0.5",
            styles.bell,
            isLoading && "animate-pulse"
          )} />

          <div className="flex flex-col gap-0.5">
            <AlertTitle className={cn("font-semibold text-sm", styles.title)}>
              {isLoading ? (
                "Checking tasks..."
              ) : (
                `${dataCount} ${activeConfig.notif.title}`
              )}
            </AlertTitle>

            <AlertDescription className="text-sm">
              {activeConfig.notif.description}

              {/* {!isLoading && oldestWaiting && (
            <span className={cn(
              "block mt-1 text-xs font-medium", 
              styles.waiting
            )}>
              Oldest waiting: {oldestWaiting}
            </span>
          )} */}
            </AlertDescription>
          </div>
        </div>

        {!isLoading && onViewAll && (
          <Button
            size="xs"
            onClick={onViewAll}
            className={cn("h-8 px-2 text-xs shrink-0", styles.button)}
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  );
}