import CustomButton from "@/components/button/customButton";
import APICredential from "./APICredential";
import GoogleAPIInfo from "./GoogleAPIInfo";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function GoogleApi({handleModalOpen}) {
  const apiKeyData = {
    apiKey: "dddddddddsienfeinfeinf",
    api: "Geocoding",
    integrationName: "Production",
    created: "superadmin@isp.com",
    dateAdded: "March 10, 2025",
    serverKey: "123456789",
    clientKey: "987654321",
    fee: "2000"
  };

  const hasData = apiKeyData && Object.keys(apiKeyData).length > 0;
  return (
    <div className="flex flex-1 flex-col">
      {hasData ? (
        <div className="grid grid-cols-2 gap-4">
          <GoogleAPIInfo data={apiKeyData} onEdit={() => handleModalOpen("update")}/>
          <APICredential data={apiKeyData} onEdit={() => handleModalOpen("edit")}/>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
          <div className="space-y-4 max-w-xs">
            <Label className="text-xl font-bold">No Catalog Product</Label>
            <p className="text-sm text-muted-foreground">
              You haven’t created any product yet.
              <br /> Go a head and create your first one.
            </p>
            <CustomButton
              variant="primary"
              size="lg"
              onClick={() => handleModalOpen("add")}
              className="mt-4"
            >
              <Plus className="w-4 h-4" />
              Create Product
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
