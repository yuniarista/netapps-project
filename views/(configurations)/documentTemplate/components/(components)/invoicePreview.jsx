import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

// Data Dummy / Fallback
const DUMMY_DATA = {
  invoiceNo: "INV-2026-00123",
  issueDate: "01 February 2026",
  dueDate: "10 February 2026",
  ispInfo: {
    name: "NETAPPS",
    address: "Jl. Example Street No. 123, Jakarta, Indonesia",
    email: "support@netapps.com",
    phone: "+62 812-3456-7890",
  },
  customer: {
    name: "John Doe",
    id: "9999",
    address: "Jl. Customer Street No. 45, Jakarta",
    serviceId: "SRV.777",
  },
  items: [
    {
      description: "Fiber Internet - 50 Mbps",
      period: "Feb 2026",
      qty: 1,
      price: "350,000",
      total: "350,000",
    },
  ],
  summary: {
    subtotal: "350,000",
    tax: "38,500",
    grandTotal: "388,500",
  },
  bank: {
    name: "BCA",
    accountNo: "123-456-7890",
  },
};

const ispNames = {
  netapps: "NetApps",
  sai: "PT Solusi Akses Indo",
  blip: "BLiP Digital Communication",
};

export default function InvoicePreview({ data }) {
  const InfoRow = ({ label, value }) => (
    <p><strong>{label}:</strong> {value || "-"}</p>
  );
  const selectedISP = ispNames[data?.ispName] || DUMMY_DATA.ispInfo.name;

  return (
    <Card className="border border-zinc-200 p-4 rounded-xs bg-white shadow-sm max-w-[600px] mx-auto my-4 text-[12px] leading-relaxed text-zinc-800 font-sans">

      <CardHeader className="pb-2 px-1">b
        <div className="flex justify-between mb-2">
          <div className="space-y-0.5">
            <h1 className="text-xl font-bold text-black">INVOICE</h1>
            <InfoRow label="Invoice No" value={data?.invoiceNo || DUMMY_DATA.invoiceNo} />
            <InfoRow label="Issue Date" value={DUMMY_DATA.issueDate} />
            <InfoRow label="Due Date" value={DUMMY_DATA.dueDate} />
          </div>
          <div className="text-right">
            <h2 className="font-bold text-lg text-black">{selectedISP}</h2>
            <p className="max-w-[200px] ml-auto">{DUMMY_DATA.ispInfo.address}</p>
            <p>Email: {DUMMY_DATA.ispInfo.email}</p>
            <p>Phone: {DUMMY_DATA.ispInfo.phone}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <section className="mb-4 p-1">
          <h1 className="font-bold text-sm">Bill To:</h1>
          <InfoRow label="Customer Name" value={DUMMY_DATA.customer.name} />
          <InfoRow label="Customer ID" value={DUMMY_DATA.customer.id} />
          <InfoRow label="Address" value={DUMMY_DATA.customer.address} />
          <InfoRow label="Service ID" value={DUMMY_DATA.customer.serviceId} />
        </section>

        <div>
          <h1 className="font-bold text-sm pb-2 px-1"> Service Details </h1>
          <div className="rounded-xs border border-zinc-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="border-r border-zinc-200">Description</TableHead>
                  <TableHead className="text-center border-r border-zinc-200">Billing Period</TableHead>
                  <TableHead className="text-center border-r border-zinc-200">Quantity</TableHead>
                  <TableHead className="text-right border-r border-zinc-200">Unit Price (IDR)</TableHead>
                  <TableHead className="text-right">Total (IDR)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DUMMY_DATA.items.map((item, index) => (
                  <TableRow key={index} className="last:border-b-0 hover:bg-transparent">
                    <TableCell className="border-r border-zinc-200">{item.description}</TableCell>
                    <TableCell className="text-center border-r border-zinc-200">{item.period}</TableCell>
                    <TableCell className="text-center border-r border-zinc-200">{item.qty}</TableCell>
                    <TableCell className="text-right border-r border-zinc-200">{item.price}</TableCell>
                    <TableCell className="text-right">{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-full max-w-full">
            <div className="border border-zinc-200 rounded-xs overflow-hidden">
              <Table>
                <TableBody>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-semibold text-zinc-600 border-r border-zinc-200 text-right">Subtotal</TableCell>
                    <TableCell className="text-left">IDR{DUMMY_DATA.summary.subtotal}</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="font-semibold text-zinc-600 border-r border-zinc-200 text-right">Tax (PPN 11%)</TableCell>
                    <TableCell className="text-left">IDR {DUMMY_DATA.summary.tax}</TableCell>
                  </TableRow>
                  <TableRow className="">
                    <TableCell className="font-bold text-zinc-600 border-r border-zinc-200 text-right">Grand Total</TableCell>
                    <TableCell className="text-right font-medium">IDR {DUMMY_DATA.summary.grandTotal}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-sm font-bold">Payment Information</h1>
          <div className="text-sm space-y-1 pt-2">
            <InfoRow label="Bank" value={DUMMY_DATA.bank.name} />
            <InfoRow label="Account Name" value={selectedISP} />
            <InfoRow label="Account Number" value={DUMMY_DATA.bank.accountNo} />
            <p> Please include your invoice number when making payment.</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col text-center text-[11px] pt-4 gap-1 pb-2">
        <p>This is a system-generated invoice and does not require a signature.</p>
        <p>Thank you for choosing {selectedISP}!</p>
      </CardFooter>
    </Card>
  );
}