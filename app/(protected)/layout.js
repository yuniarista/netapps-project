import { SidebarNavigation } from "@/components/sidebarMenu";
import { SidebarProvider } from "@/components/ui/sidebar";

const dummyMenu = [
  {
    name: "Overview",
    url: "/dashboard",
    icon: "material-symbols:grid-view-outline",
  },

  {
    groupName: "Subscriptions",
    icon: "material-symbols:subscriptions-outline",
    features: [
      { name: "ISP", url: "/isp" },
      { name: "Subscription", url: "/subscriptions" },
      { name: "Subscription Transaction", url: "/transactions" },
    ],
  },

  {
    name: "Invoice Template",
    url: "/invoice-template",
    icon: "material-symbols:description-outline",
  },
  {
    name: "Payment Gateway",
    url: "/payment-gateway",
    icon: "material-symbols:payments-outline",
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
    icon: "material-symbols:api-outline",
  },

  {
    name: "Users",
    url: "/users",
    icon: "material-symbols:group-outline",
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
];

export default async function Layout({ children }) {
  const dummySession = { username: "Guest", email: "guest@mail.com" };
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarNavigation
          menu={dummyMenu} 
          session={dummySession}
        />
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}