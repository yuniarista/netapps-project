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
      item.features?.some((f) => pathname.startsWith(f.url)),
    );

    if (foundGroup?.groupName) {
      setOpenGroups([foundGroup.groupName]);
    }
  }, [pathname, menu]);

  return (
    <Sidebar className="border-r bg-[#F9F9F9] z-30">
      <SidebarHeader className="px-2">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded border border-primary bg-primary/10 flex items-center justify-center">
            {session?.media ? (
              <img src={session.media} className="w-full h-full object-cover" />
            ) : (
              <IconifyIcon icon="mdi:account" className="text-primary" />
            )}
          </div>

          <div
            className={cn(
              "flex flex-1 items-center justify-between min-w-0 transition-all duration-300",
              "group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:invisible group-data-[state=collapsed]:w-0",
            )}
          >
            <div className="flex flex-col min-w-0 flex-1 truncate">
              <span className="text-sm font-semibold truncate leading-none">
                {session?.username || "Guest"}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {session?.email || "guest@mail.com"}
              </span>
            </div>

            <div className="flex gap-2 shrink-0 ml-2">
              <Settings className="size-4 cursor-pointer hover:text-primary transition-colors" />
              <div className="relative size-4 cursor-pointer hover:text-primary transition-colors">
                <BellDot className="size-full" />
                {/* <span className="absolute -top-0.5 -right-0.5 size-2 bg-red-500 rounded-full border border-white" /> */}
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="my-2">
        <SidebarMenu>
          {menu.map((item) => {
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
                        : [...prev, item.groupName],
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
                          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
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
                                  : "hover:bg-muted",
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

            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  className={cn(
                    "flex items-center gap-2 rounded-md",
                    pathname === item.url
                      ? "hover:bg-primary hover:text-white"
                      : "hover:bg-muted",
                  )}
                >
                  <Link href={item.url}>
                    <IconifyIcon icon={item.icon} />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

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
