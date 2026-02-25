export const getBillingStyle = (type) => {
  switch (type) {
    case "unpaid":
      return { color:"text-[#FACC15]", bg: "bg-[#FACC1514]", border: "border-[#FACC15]", bgP: "bg-[#FACC151A]" };
    case "paid":
      return { color:"text-[#16A34A]", bg: "bg-[#16A34A14]", border: "border-[#16A34A]", bgP: "bg-[#22C55E24]" };
    case "overdue":
      return { color:"text-[#EA580C]", bg: "bg-[#EA580C14]", border: "border-[#EA580C]", bgP: "bg-[#EA580C1A]" };
    case "upcoming-due":
      return { color:"text-[#2563EB]", bg: "bg-[#2563EB14]", border: "border-[#2563EB]", bgP: "bg-[#2563EB1A]" };
  }
};