import React from "react";

const InfoRow = ({ label, value }) => (
  <p><strong>{label}:</strong> {value || "-"}</p>
);

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

export default function InvoicePreview({ data }) {
  const ispNames = {
    netapps: "NetApps",
    sai: "PT Solusi Akses Indo",
    blip: "BLiP Digital Communication",
  };
  const selectedISP = ispNames[data?.ispName] || DUMMY_DATA.ispInfo.name;

  return (
    <div className="border border-zinc-200 rounded-xs p-8 bg-white shadow-sm max-w-[600px] mx-auto my-4 text-[12px] leading-relaxed text-zinc-800 font-sans">
      
      <div className="flex justify-between mb-8">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold text-black">INVOICE</h1>
          <InfoRow label="Invoice No" value={data?.invoiceNo || DUMMY_DATA.invoiceNo} />
          <InfoRow label="Issue Date" value={DUMMY_DATA.issueDate} />
          <InfoRow label="Due Date" value={DUMMY_DATA.dueDate} />
        </div>
        <div className="text-right">
          <h2 className="font-bold text-lg text-black">{selectedISP}</h2>
          <p className="max-w-[200px] ml-auto">{DUMMY_DATA.ispInfo.address}</p>
          <p>{DUMMY_DATA.ispInfo.email}</p>
          <p>{DUMMY_DATA.ispInfo.phone}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="font-bold text-sm">Bill To:</p>
        <p>Customer Name: {DUMMY_DATA.customer.name}</p>
        <p>Customer ID: {DUMMY_DATA.customer.id}</p>
        <p>Address: {DUMMY_DATA.customer.address}</p>
        <p>Service ID: {DUMMY_DATA.customer.serviceId}</p>
      </div>

      <table className="w-full border border-zinc-200 mb-6">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200 text-left">
            <th className="p-2 border-r border-zinc-200">Description</th>
            <th className="p-2 border-r border-zinc-200 text-center">Billing Period</th>
            <th className="p-2 border-r border-zinc-200 text-center">Quantity</th>
            <th className="p-2 border-r border-zinc-200 text-right">Unit Price (IDR)</th>
            <th className="p-2 text-right">Total (IDR)</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_DATA.items.map((item, index) => (
            <tr key={index} className="border-b border-zinc-100 last:border-0">
              <td className="p-2 border-r border-zinc-200">{item.description}</td>
              <td className="p-2 border-r border-zinc-200 text-center">{item.period}</td>
              <td className="p-2 border-r border-zinc-200 text-center">{item.qty}</td>
              <td className="p-2 border-r border-zinc-200 text-right">{item.price}</td>
              <td className="p-2 text-right">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

<table className="w-full border border-zinc-200 mb-6">
  <tbody>
    <tr className="border-b border-zinc-200 text-right">
      <th className="p-2 border-r border-zinc-200 text-right w-3/1 text-zinc-600 font-semibold">
        Subtotal
      </th>
      <td className="p-2 text-right font-medium">
        {DUMMY_DATA.summary.subtotal}
      </td>
    </tr>

    <tr className="border-b border-zinc-200 text-right">
      <th className="p-2 border-r border-zinc-200 text-right w-3/1 text-zinc-600 font-semibold">
        Tax (PPN 11%)
      </th>
      <td className="p-2 text-right font-medium">
        {DUMMY_DATA.summary.tax}
      </td>
    </tr>

    <tr>
      <th className="p-2 border-r border-zinc-200 text-right w-/1 text-zinc-600 font-semibold">
        Grand Total
      </th>
      <td className="p-2 text-right font-medium">
        {DUMMY_DATA.summary.grandTotal}
      </td>
    </tr>
  </tbody>
</table>

      <div className="mb-8">
        <p className="font-bold text-black">Payment Information</p>
        <div className="grid grid-cols-[110px_1fr] gap-x-1">
          <p className="font-semibold">Bank</p><p>: {DUMMY_DATA.bank.name}</p>
          <p className="font-semibold">Account Name</p><p>: {selectedISP}</p>
          <p className="font-semibold">Account No</p><p>: {DUMMY_DATA.bank.accountNo}</p>
        </div>
        <p>
        Please include your invoice number when making payment
        </p>
      </div>

      <footer className="text-center text-[10px] space-y-1">
        <p>This is a system-generated invoice and does not require a signature.</p>
        <p>Thank you for choosing {selectedISP}</p>
      </footer>
    </div>
  );
}