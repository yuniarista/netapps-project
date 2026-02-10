"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import IconifyIcon from "@/components/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BellDot, Settings } from "lucide-react";

export function SidebarNavigation({ menu = [], session }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState([]);

  // auto open group berdasarkan route aktif
  useEffect(() => {
    const foundGroup = menu.find((item) =>
      item.features?.some((f) => pathname.startsWith(f.url))
    );

    if (foundGroup?.groupName) {
      setOpenGroups([foundGroup.groupName]);
    }
  }, [pathname, menu]);

  return (
    <Sidebar className="border-r bg-[#F9F9F9]">
      {/* ===== HEADER ===== */}
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2 my-2">
          <div className="size-8 rounded border border-primary bg-primary/10 flex items-center justify-center">
            {session?.media ? (
              <img src={session.media} className="w-full h-full object-cover" />
            ) : (
              <IconifyIcon icon="mdi:account" className="text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">
              {session?.username || "Guest"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {session?.email || "guest@mail.com"}
            </div>
          </div>

          <div className="flex gap-2 px-2">
            <Settings className="size-4 cursor-pointer" />
            <div className="relative size-4 cursor-pointer">
              <BellDot className="size-full" />
              <span className="absolute -top-0.5 -right-0.5 size-2 bg-red-500 rounded-full border" />
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ===== MENU ===== */}
      <SidebarContent className="my-2">
        <SidebarMenu>
          {menu.map((item) => {
            // ===== GROUP =====
            if (item.features?.length) {
              const isOpen = openGroups.includes(item.groupName);

              return (
                <Collapsible
                  key={item.groupName}
                  open={isOpen}
                  onOpenChange={() =>
                    setOpenGroups((prev) =>
                      isOpen
                        ? prev.filter((g) => g !== item.groupName)
                        : [...prev, item.groupName]
                    )
                  }
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <IconifyIcon icon={item.icon} className="w-4 h-4" />
                          {item.groupName}
                        </div>
                        <IconifyIcon
                          icon={
                            isOpen
                              ? "mdi:chevron-up"
                              : "mdi:chevron-down"
                          }
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.features.map((f) => (
                          <SidebarMenuSubItem key={f.url}>
                            <Link
                              href={f.url}
                              className={cn(
                                "block px-2 py-1.5 rounded-md text-sm",
                                pathname === f.url
                                  ? "bg-primary text-white"
                                  : "hover:bg-muted"
                              )}
                            >
                              {f.name}
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            // ===== SINGLE =====
            return (
              <SidebarMenuItem key={item.url}>
                <Link href={item.url} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-2",
                      pathname === item.url
                        ? "bg-primary text-white"
                        : "hover:bg-muted"
                    )}
                  >
                    <button>
                      <IconifyIcon icon={item.icon} className="w-4 h-4" />
                      {item.name}
                    </button>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      {/* ===== FOOTER ===== */}
      <SidebarFooter>
        <SidebarMenuButton className="flex items-center gap-2">
          <IconifyIcon icon="material-symbols:dark-mode-outline" />
          Dark Theme
        </SidebarMenuButton>

        <SidebarMenuButton
          className="flex items-center gap-2 text-red-500"
          onClick={() => console.log("logout")}
        >
          <IconifyIcon icon="majesticons:door-exit-line" />
          Logout
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarNavigation;
