import { SidebarNavigation } from "@/components/sidebarMenu";
import { SidebarProvider } from "@/components/ui/sidebar";

const dummyMenu = [
  {
    name: "Overview",
    url: "/dashboard",
    icon: "lucide:layout-dashboard",
  },

  {
    groupName: "Subscriptions",
    icon: "lucide:crown",
    features: [
      { name: "ISP", url: "/isp" },
      { name: "Subscription", url: "/subscriptions" },
      { name: "Subscription Transaction", url: "/transactions" },
    ],
  },

  {
    name: "Document Template",
    url: "/documentTemplate",
    icon: "lucide:scroll-text",
  },
  {
    name: "Payment Gateway",
    url: "/payment-gateway",
    icon: "lucide:credit-card",
  },
  {
    name: "WhatsApp Gateway",
    url: "/whatsapp-gateway",
    icon: "ic:baseline-whatsapp",
  },
  {
    name: "Telegram Gateway",
    url: "/telegram-gateway",
    icon: "ic:baseline-telegram",
  },
  {
    name: "Google API",
    url: "/google-api",
    icon: "mdi:google",
  },

  {
    name: "Users",
    url: "/users",
    icon: "lucide:user-round-cog",
  },
  {
    name: "Roles",
    url: "/roles",
    icon: "material-symbols:admin-panel-settings-outline",
  },
  {
    name: "App Setting",
    url: "/app",
    icon: "material-symbols:settings-outline",
  },
  //   {
  //   name: "Dashboard",
  //   url: "/dashboard",
  //   icon: "lucide:layout-dashboard",
  // },
  {
    groupName: "Catalog",
    icon: "lucide:package",
    features: [
      { name: "Product", url: "/products" },
      { name: "Area", url: "/area" },
      { name: "Product Category", url: "/product-categories" },
    ],
  },
  {
    groupName: "Customers",
    icon: "lucide:users",
    features: [
      { name: "Customer", url: "/customers" },
      { name: "Requested Customer", url: "/requested-customers" },
      { name: "Potential Customer", url: "/potential-customers" },
    ],
  },
  {
    groupName: "Network",
    icon: "lucide:network",
    features: [
      { name: "POP", url: "/pop" },
      { name: "BSC", url: "/bsc" },
      { name: "ODC", url: "/odc" },
      { name: "Homepass ID", url: "/homepass-id" },
      { name: "Check Coverage", url: "/check-coverage" },
    ],
  },
  {
    groupName: "Billing",
    icon: "lucide:wallet",
    features: [
      { name: "Invoices", url: "/invoices" },
      { name: "Payments", url: "/payments" },
      { name: "Refund List", url: "/refund-list" },
      { name: "Billing Setting", url: "/billing-settings" },
    ],
  },
  {
    groupName: "Sales",
    icon: "lucide:chart-no-axes-combined",
    features: [
      { name: "In-House Sales", url: "/in-house-sales" },
      { name: "Affiliate Sales", url: "/affiliate-sales" },
    ],
  },
  {
    name: "Technical Support",
    url: "/technical-support",
    icon: "lucide:headset",
  },
  {
    name: "Report",
    url: "/reports",
    icon: "lucide:layers",
  },
  {
    name: "Employee",
    url: "/employee",
    icon: "lucide:briefcase-business",
  },
  {
    name: "Ticketing",
    url: "/ticketing",
    icon: "lucide:ticket",
  },
  {
    name: "Help Center",
    url: "/help-center",
    icon: "lucide:help-circle",
  },
];

export default async function Layout({ children }) {
  const dummySession = { username: "Guest", email: "guest@mail.com" };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarNavigation menu={dummyMenu} session={dummySession} />
        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </SidebarProvider>
  );
}
