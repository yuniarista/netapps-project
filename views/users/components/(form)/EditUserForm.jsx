" use client";
import InputFileForm from "@/components/inputcopy/inputFileForm";;
import LoadingCircle from "@/components/loadingCircle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import TextInputForm from "@/components/inputcopy/textInputForm";
import SelectInput from "@/components/inputcopy/selectInputCustom";
import SelectInputForm from "@/components/inputcopy/selectInputForm";


export default function EditUsersForm({ handleModalClose, loading }) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <TextInputForm
            name="email"
            label="Email"
            placeholder="yourname@mail.com"
            errors={errors}
            control={control}
          />
          <TextInputForm
            name="password"
            label="Password"
            placeholder="Enter password here"
            errors={errors}
            control={control}
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectInputForm
            name="role"
            label="Role"
            placeholder="Select role"
            errors={errors}
            control={control}
          />
            <SelectInputForm
            name="ISP"
            label="ISP"
            placeholder="Select ISP"
            errors={errors}
            control={control}
          />
          </div>
        </CardContent>

        <div className="w-full flex items-center justify-end space-x-4 p-4">
          <Button type="reset" variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Created..." : "Create"}
          </Button>
        </div>
      </form>
    </Form >
  );
}

