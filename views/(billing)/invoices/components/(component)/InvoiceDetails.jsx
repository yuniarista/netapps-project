import IconifyIcon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PaymentStatus from "../(card)/PaymentStatus";

export default function InvoiceDetail({ data }) {
  if (!data) return null;
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
  // const subTotal = Number(data.total) || 0;
  // const taxRate = 11; 
  // const taxMultiplier = taxRate / 100;
  // const tax = subTotal * 0.11;
  // const grandTotal = (subTotal + tax);

  const items = data.invoiceItems || [];
  const totalDiscount = items.reduce((acc, item) => {
    return acc + (Number(item.price || 0) - Number(item.total || 0));
  }, 0);
  const subTotal = items.reduce((acc, item) => acc + Number(item.total || 0), 0);
  const taxRate = 11;
  const tax = subTotal * (taxRate / 100);
  const grandTotal = subTotal + tax;

  const InfoItem = ({ icon, label, children }) => (
    <div>
      <span className="font-semibold text-sm">{label}</span>
      <div className="flex items-center gap-2 py-1 text-xs">
        {icon && <IconifyIcon icon={icon} className="w-4 h-4 text-muted-foreground shrink-0" />}
        <span>{children}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <PaymentStatus type={data.type} date={data.date} />

      <section>
        <h3 className="font-semibold mb-2">Customer Information</h3>
        <InfoItem label="Customer Name" icon="lucide:user-round">{data.customerName}</InfoItem>
        <InfoItem label="Address" icon="lucide:map-pin">{data.address}</InfoItem>
        <div className="flex gap-6">
          <InfoItem label="Phone" icon="lucide:phone">{data.phone} <span className="text-xs border px-1.5 rounded-md bg-blue-100 text-primary">Sent</span></InfoItem>
          <InfoItem label="Email" icon="lucide:mail">{data.email}</InfoItem>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="font-semibold mb-2">Billing Information</h3>
        <div className="flex justify-between text-xs mb-3">
          {[{ l: "Invoice Date", v: data.invoice },
          { l: "Billing Type", v: data.billingType },
          { l: "Billing Period", v: data.period }].map((i, k) => (
            <div key={k}><span className="font-semibold">{i.l}</span><p>{i.v}</p></div>
          ))}
        </div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold">Package</span>
            <span>{data.package}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Sub Total</span>
            <span>Rp {subTotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Disc</span>
            <span>Rp {totalDiscount.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Tax ({taxRate}%)</span>
            <span>Rp {tax.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between border-t border-dashed pt-1 mt-1">
            <span className="font-semibold">Total</span>
            <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-4 mt-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="button" variant="primary">
          <IconifyIcon icon="lucide:pencil" className="w-4 h-4" />
          Edit Invoice
        </Button>
      </div>
    </div>
  );
}
