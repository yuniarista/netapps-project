import CustomButton from "@/components/button/customButton";
import IconifyIcon from "@/components/icon";
import SettingCard from "../(card)/settingCard";
import CustomTabs from "@/components/tabs/CustomTabs";

export default function SettingBillingPage() {
  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col space-y-1">
            <h1 className="">Billing Overview</h1>
            <p className="text-xs text-muted-foreground">
              Configure billing rules, payment methods, schedules and notification preferences.
            </p>
          </div>
          <div className="">
            <CustomButton
            variant="primary"
            size="md"
            // onClick={() => handleModalOpen("add")}
          >
            <IconifyIcon icon="lucide:check" />
            Save Changes
          </CustomButton>
          </div>
        </div>
        <SettingCard />
  
      </div>
      
    </>
  );
}
