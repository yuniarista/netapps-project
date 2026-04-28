" use client";
import InputFileForm from "@/components/inputcopy/inputFileForm";
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
import SelectInputCustom from "@/components/inputcopy/selectInputCustom";
import DatePickerForm from "@/components/datePicker/datePickerForm";

export default function EditInHouseForm({ handleModalClose, loading }) {

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

  const levelOptions = [
    { label: "Staff", value: "staff" },
    { label: "Director", value: "director" },
    { label: "Manager", value: "manager" },
  ];
  const divisionOptions = [
    { label: "Developer", value: "developer" },
    { label: "Sales", value: "sales" },
    { label: "Marketing", value: "marketing" },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <TextInputForm
              name="name"
              label="Name"
              placeholder="Enter affiliate name here"
              errors={errors}
              control={control}
              required
            />
            <TextInputForm
              name="email"
              label="Email"
              placeholder="yourname@gmail.com"
              errors={errors}
              control={control}
              required
            />
            <TextInputForm
              name="phone"
              label="Phone"
              placeholder="0812345678"
              errors={errors}
              control={control}
              type="number"
              required
            />
            <div className="flex gap-4 justify-between items-center">
              <TextInputForm
                name="position"
                label="Position"
                placeholder="Enter position here"
                errors={errors}
                control={control}
                required
              />
              <SelectInputCustom
                name="division"
                label="Division"
                placeholder="division here"
                errors={errors}
                control={control}
                options={divisionOptions}
                optionName={"label"}
                required
              />
            </div>

            <SelectInputCustom
              name="level"
              label="Level"
              placeholder="Select division here"
              errors={errors}
              control={control}
              optionName={"label"}
              options={levelOptions}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <DatePickerForm
                name={"joinDate"}
                control={control}
                label={"Join date"}
                errors={errors}
                required
              />
              <DatePickerForm
                name={"resignDate"}
                control={control}
                label={"Resign date"}
                errors={errors}
              />
            </div>

            <SelectInputCustom
              name="status"
              label="Status"
              errors={errors}
              control={control}
              optionName="label"
              options={statusValues}
              required
            />
          </CardContent>

          <CardFooter className="w-full flex items-center justify-end space-x-4 p-4">
            <Button type="reset" variant="outline" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
