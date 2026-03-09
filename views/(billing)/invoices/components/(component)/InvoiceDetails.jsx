import IconifyIcon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PaymentStatus from "../(card)/PaymentStatus";
import { Watch } from "react-hook-form";

export default function InvoiceDetail({data}) {
  if(!data) return null;
  
  // const PaymentDetails = {
  //   id: "1",
  //   name: "Ni Putu Angelina Giovany",
  //   address: "Jl. Imam Bonjol No.350, Pemecutan Klod, Kec. Denpasar Bar., Kota Denpasar, Bali 90119",
  //   phone: "+123456789098",
  //   email: "angelina@gmail.com",
  //   invoice: "01/02/2026",
  //   billingType: "Prorate-12 days",
  //   period: "February 2026",
  //   price: 20000,
  //   disc: 10, 
  //   total: 100000,
  //   noInvoice: "INV/2026/02/001",
  // };


  // const items = Watch("PaymentDetails") || [];
  // const subTotal = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
  const subTotal = Number(data.total) || 0;
  const tax = subTotal * 0.11;
  const grandTotal = (subTotal + tax);

  return (
    <>
      <div className="items-start">
        <PaymentStatus type={data.type} date={data.date} />
        <div className="py-2">
          <h3 className="font-semibold">Customer Information</h3>
        </div>
        <div>
          <span className="font-semibold text-sm">Customer Name</span>
          <div className="flex flex-row text-xs py-1 gap-2">
            <IconifyIcon
              icon="lucide:user-round"
              className="w-4 h-4 text-muted-foreground"
            />
            <span>{data.customerName}</span>
          </div>
        </div>
        <div className="py-2">
          <span className="font-semibold text-sm">Address</span>
          <div className="flex flex-row text-xs py-1 gap-2 items-center">
            <IconifyIcon
              icon="lucide:map-pin"
              className="w-4 h-4 items-center shrink-0 text-muted-foreground"
            />
            <span>{data.address}</span>
          </div>
        </div>
        <div className="flex flex-row space-x-6">
          <div>
            <div className="space-x-1">
              <span className="font-semibold text-sm">Phone</span>
              <span className="text-xs border border-primary px-2 rounded-md bg-blue-100 text-primary">
                Sent
              </span>
            </div>

            <div className="flex flex-row text-xs py-1 gap-2">
              <IconifyIcon
                icon="lucide:phone"
                className="w-4 h-4 items-center text-muted-foreground"
              />
              <span>{data.phone}</span>
            </div>
          </div>
          <div>
            <span className="font-semibold text-sm">Email</span>
            <div className="flex flex-row text-xs py-1 gap-2">
              <IconifyIcon
                icon="lucide:mail"
                className="w-4 h-4 items-center text-muted-foreground"
              />
              <span>{data.email}</span>
            </div>
          </div>
        </div>
        <Separator className="mt-6" />
        <div className="py-2 mt-4">
          <h3 className="font-semibold">Billing Information</h3>
        </div>
        <div className="flex flex-row justify-between text-xs">
          <div>
            <span className="font-semibold">Invoice Date</span>
            <p>{data.invoice}</p>
          </div>
          <div>
            <span className="font-semibold">Billing Type</span>
            <p>{data.billingType}</p>
          </div>
          <div>
            <span className="font-semibold">Billing Period</span>
            <p>{data.period}</p>
          </div>
        </div>
        <div className="flex flex-col text-xs py-2">
          <div>
            <div className=" flex py-1 justify-between">
              <span className="font-semibold">Package</span>
              <span>{data.package}</span>
            </div>
            <div className="flex py-1 justify-between gap-6 space-x-10">
              <span className="font-semibold">Sub Total</span>
              <span>Rp {subTotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex py-1 justify-between">
              <span className="font-semibold">Disc</span>
              <span>-</span>
            </div>
            <div className="flex py-1 justify-between">
              <span className="font-semibold">Tax 11%</span>
              <span>Rp {tax.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex py-1 justify-between border-t border-dashed">
              <span className="font-semibold">Total</span>
              <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="button" variant="primary">
            <IconifyIcon icon="lucide:pencil" className="w-4 h-4"/>
            Edit Invoice
          </Button>
        </div>
      </div>
    </>
  );
}
