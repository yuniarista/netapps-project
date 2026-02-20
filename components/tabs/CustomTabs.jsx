"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function CustomTabs({ tabs = [] }) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={cn(
                "relative px-4 py-2 font-medium text-sm transition-all outline-none",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}

              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary z-10"
                />
              )}
            </Link>
          );
        })}
      </div>

      <Separator className="-mt-[2px] relative z-0" />
    </div>
  );
}
