" use client";

import InputFileForm from "@/components/input/inputFileForm";
import SelectInputForm from "@/components/inputcopy/selectInputForm";
import { Button } from "@/components/ui/button";
import {
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import AddAreaForm from "./AddAreaForm";

export default function AddWhatsAppForm({ handleModalClose, loading }) {
  const form = useForm({ mode: "all" });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log("Data Form:", data);

    if (handleCreate) {
      handleCreate(data);
    }
  };

  const statusValues = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  const isOptions = [
    { label: "NetApps", value: "netapps" },
    { label: "SAI", value: "sai" },
    { label: "BLiP", value: "blip" },
  ];

  const timezoneOptions = [
    { label: "GMT+7", value: "gmt+7" },
    { label: "GMT+8", value: "gmt+8" },
    { label: "GMT+9", value: "gmt+9" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <SelectInputForm
            name="ispName"
            label="ISP Name"
            placeholder="Choose registered ISP"
            errors={errors}
            control={control}
            optionName="label"
            options={isOptions}
          // renderModalContent={(closeModal) => (
          //   <AddAreaForm
          //     onCancel={closeModal}
          //     onSuccess={(data) => {
          //       console.log("Data area baru:", data);
          //       // Tambahkan logic API di sini jika perlu
          //       closeModal(); // Tutup modal setelah sukses
          //     }}
          //   />
          // )}
          />
          <TextInputForm
            name="whatsappNumber"
            label="WhatsApp Number"
            placeholder="+812 3456 7890"
            errors={errors}
            control={control}
          />
          <SelectInputForm
            name="timezone"
            label="Timezone"
            placeholder="Select preferredtimezone"
            errors={errors}
            control={control}
            optionName="label"
            options={timezoneOptions}
          />
          <SelectInputForm
            name="status"
            label="Status"
            placeholder="Status"
            errors={errors}
            control={control}
            optionName="label"
            options={statusValues}
          />
        </CardContent>

        <div className="w-full flex items-center justify-end space-x-4 p-4">
          <Button type="reset" variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form >
  );
}

