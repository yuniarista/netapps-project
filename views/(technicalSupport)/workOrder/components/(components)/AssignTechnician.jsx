import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Loading from "@/app/(protected)/loading";
import SelectInputCustom from "@/components/input/selectInputCustom";
import DatePickerForm from "@/components/datePicker/datePickerForm";
import TextInputForm from "@/components/input/textInputForm";
import { cn } from "@/lib/utils";

export default function AssignTechnician({
    response,
    setResponse,
    userProfile,
    alertOpen,
    setAlertOpen,
    formOptions,
    handleCreate,
    loading,
}) {
    const orderDetail = {
        woNumber: "WO/2026/03/00192",
        service: "NetStream",
        customerName: "Denpasar Timur",
        address: "Jl. Teuku Umar No. 45, Denpasar",
        package: "Home 50 Mbps",
        homepass: "HP-DPS-00021"
    };
    const techniciansData = [
        {
            value: "tech-001",
            label: "Agus Wibowo",
            status: "Available",
            badgeColor: "success", // Hijau
            taskCount: 0,
        },
        {
            value: "tech-002",
            label: "Dani Setiawan",
            status: "Available",
            badgeColor: "success",
            taskCount: 0,
        },
        {
            value: "tech-003",
            label: "Rizal Hendra",
            status: "1 WO today",
            badgeColor: "blue", // Biru
            taskCount: 1,
        },
        {
            value: "tech-004",
            label: "Budi Santoso",
            status: "Available",
            badgeColor: "success",
            taskCount: 0,
        },
        {
            value: "tech-005",
            label: "Eko Prasetyo",
            status: "2 WO today",
            badgeColor: "blue",
            taskCount: 2,
        },
    ];

    const form = useForm({
        // resolver: yupResolver(CustomerAddSchema),
        mode: "all",
    });
    const { control, formState: { errors }, handleSubmit, setValue, watch } = form;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <div className="space-y-4 animate-in fade-in duration-300">

                    <div className="bg-muted/40 border rounded-lg overflow-hidden">
                        <div className="bg-primary p-3 text-center text-white">
                            <h3 className="text-lg uppercase font-medium">Installation Report</h3>
                            <p className="text-sm font-medium">
                                {orderDetail.woNumber} • {orderDetail.service}
                            </p>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-foreground">Customer Name</span>
                                <span className="text-sm text-muted-foreground">{orderDetail.customerName}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-foreground">Address</span>
                                <span className="text-sm text-muted-foreground text-right max-w-[250px]">
                                    {orderDetail.address}
                                </span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-foreground">Package</span>
                                <span className="text-sm text-muted-foreground">{orderDetail.package}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-foreground">Homepass</span>
                                <span className="text-sm text-muted-foreground">{orderDetail.homepass}</span>
                            </div>
                        </div>
                    </div>

                    <SelectInputCustom
                        name="technicianId"
                        label="Select Technician"
                        placeholder="Search Technician"
                        showSearch={true}
                        control={control}
                        errors={errors}
                        optionName="label"
                        options={techniciansData}
                        renderOption={(option) => (
                            <div className="flex items-center justify-between w-full gap-4">
                                <span className="font-medium">{option.label}</span>

                                {option.status && (
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full border ml-auto",
                                        option.badgeColor === "success"
                                        ? "bg-[#22C55E24]/10 text-[#16A34A] border-[#16A34A66]/40"
                                        : "bg-[#2563EB1A]/10 text-[#2563EB] border-[#2563EB]"
                                    )}>
                                        {option.status}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                    <DatePickerForm
                        name="schedule"
                        label="Installation Schedule"
                        placeholder="Pick a date"
                        control={control}
                        errors={errors}
                        showTime={true}
                    />
                    <TextInputForm
                        name="address"
                        label="Location Notes"
                        placeholder="Location info, access, etc."
                        rows={4}
                        control={control}
                        errors={errors}
                    />
                </div>

                <div className="w-full flex items-center justify-end space-x-4 pt-4">
                    <DialogClose asChild>
                        <Button type="reset" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading}>
                        {loading ? <Loading /> : "Assign & Notify Technician"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
}