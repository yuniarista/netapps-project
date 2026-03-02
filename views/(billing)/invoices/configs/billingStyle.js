import { Check, CircleX, Clock8, icons, Mail, TriangleAlert } from "lucide-react";

export const getBillingStyle = (type) => {
  switch (type) {
    case "paid":
      return { color:"text-[#16A34A]", bg: "bg-[#16A34A14]", border: "border-[#16A34A]", bgP: "bg-[#22C55E24]" };
    case "unpaid":
      return { color:"text-[#FACC15]", bg: "bg-[#FACC1514]", border: "border-[#FACC15]", bgP: "bg-[#FACC151A]" };
    case "overdue":
      return { color:"text-[#EA580C]", bg: "bg-[#EA580C14]", border: "border-[#EA580C]", bgP: "bg-[#EA580C1A]" };
    case "upcoming-due":
      return { color:"text-[#2563EB]", bg: "bg-[#2563EB14]", border: "border-[#2563EB]", bgP: "bg-[#2563EB1A]" };
  }
};

export const getPaymentStatus = (type) => {
  switch (type) {
    case "paid":
      return { color:"text-green-500", bg: "bg-[#22C55E1A]", icons: "lucide:circle-check", border: "border-green-500"};
    case "unpaid":
      return { color:"text-blue-500", bg: "bg-[#3B82F61A]", icons: "lucide:clock-8"};
    case "warning":
      return { color:"text-red-500", bg: "bg-[#EF44441A]", icons: "lucide:triangle-alert"};
    case "canceled":
      return { color:"text-gray-500", bg: "bg-[#6B72801A]", icons: "lucide:circle-x"};
    case "refund":
      return { color:"text-purple-500", bg: "bg-[#A855F71A]", icons: "lucide:circle-x"};
  }
}