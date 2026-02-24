"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

export default function SelectDropdown({
  triggerLabel,
  icon: Icon = ChevronDown,
  iconPosition = "right",
  iconClassName,
  sections = [],
  className,
  triggerVariant = "outline",
  asBadge = false,
  badgeVariant = "outlined-active",
  showSectionLabelSeparator = true,
  showSectionSeparator = true,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {asBadge ? (
          <div className={cn("inline-flex items-center gap-1.5", className)}>
            <Badge
              variant={badgeVariant}
              className="px-2 py-0.5 text-[12px] font-medium"
            >
              {triggerLabel}
            </Badge>

            <div className="flex items-center">
              <Icon className="w-4 h-4 text-primary shrink-0" />
            </div>
          </div>
        ) : (
          <Button
            variant={triggerVariant}
            className={cn(
              "flex h-9 w-full items-center rounded-[8px] gap-2 border border-slate-200 bg-white px-3 py-2 text-sm text-[#18181B]",
              "outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              iconPosition === "right" ? "justify-between" : "justify-start",
              className
            )}
          >
            {iconPosition === "left" && (
              <Icon className={cn("h-4 w-4 shrink-0 text-primary", iconClassName)} />
            )}

            <span className="truncate font-semibold">{triggerLabel}</span>

            {iconPosition === "right" && (
              <Icon className={cn("h-4 w-4 shrink-0 text-primary", iconClassName)} />
            )}
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-52 p-0 py-1 shadow-xl border-slate-200 rounded-[8px]">
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            {section.label && (
              <>
                <DropdownMenuLabel className="px-3 py-2 text-[13px] font-bold text-[#1e293b]">
                  {section.label}
                </DropdownMenuLabel>
                {showSectionLabelSeparator && <DropdownMenuSeparator className="bg-slate-200 m-0" />}
              </>
            )}

            {section.items.map((item, iIdx) => (
              <DropdownMenuItem
                key={iIdx}
                onSelect={(e) => section.type === "checkbox" && e.preventDefault()}
                onClick={() => item.onClick && item.onClick(item.value)}
                className="px-3 py-2 cursor-pointer flex items-center gap-2"
              >
                {section.type === "checkbox" ? (
                  <>
                    <label className="text-[14px] cursor-pointer flex-1">{item.label}</label>
                    <Checkbox
                      id={`${section.label}-${item.value}`}
                      checked={item.checked}
                    />
                  </>
                ) : (
                  <>
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span className="text-[14px]">{item.label}</span>
                  </>
                )}
              </DropdownMenuItem>
            ))}

            {showSectionSeparator && sIdx < sections.length - 1 && (
              <DropdownMenuSeparator className="bg-slate-200 m-0" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// "use client";

// import React, { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, Search } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Badge } from "../ui/badge";
// import { Checkbox } from "../ui/checkbox";

// export default function SelectDropdown({
//   triggerLabel,
//   icon: Icon = ChevronDown,
//   iconPosition = "right",
//   iconClassName,
//   sections = [],
//   className,
//   triggerVariant = "outline",
//   asBadge = false,
//   borderType = "solid",
//   badgeVariant = "outlined-active",
//   showSectionLabelSeparator = true,
//   showSectionSeparator = true,
//   showSearch = false,
//   showClear = false,
//   onClear,
// }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredSections = sections
//     .map((section) => ({
//       ...section,
//       items: section.items.filter((item) =>
//         item.label.toLowerCase().includes(searchTerm.toLowerCase()),
//       ),
//     }))
//     .filter((section) => section.items.length > 0);

//   const isStatusMode = badgeVariant.includes("outlined");

//   return (
//     <DropdownMenu onOpenChange={(open) => !open && setSearchTerm("")}>
//       <DropdownMenuTrigger asChild className="cursor-pointer">
//         {isStatusMode ? (
//           <div
//             className={cn(
//               "inline-flex items-center gap-1.5 focus:outline-none",
//               className,
//             )}
//           >
//             <Badge
//               variant={badgeVariant}
//               className="px-2 py-0.5 text-[12px] font-medium"
//             >
//               {triggerLabel}
//             </Badge>
//             <Icon
//               className={cn(
//                 "w-4 h-4 shrink-0 transition-colors",
//                 iconClassName,
//               )}
//             />
//           </div>
//         ) : (
//           <Button
//             variant={triggerVariant}
//             className={cn(
//               "flex h-9 w-full items-center rounded-[8px] gap-2 border px-3 py-2 text-sm focus:outline-none transition-all",

//               asBadge
//                 ? "bg-slate-100 text-black border-dashed border-slate-300 hover:bg-slate-200 shadow-sm" // Jika ada item terpilih
//                 : borderType === "dashed"
//                   ? "border-dashed border-slate-300 bg-white text-[#18181B]"
//                   : "border-solid border-slate-200 bg-white text-[#18181B]",

//               iconPosition === "right" ? "justify-between" : "justify-start",
//               className,
//             )}
//           >
//             {iconPosition === "left" && (
//               <Icon className={cn("h-4 w-4", iconClassName)} />
//             )}
//             <span className="truncate font-normal">{triggerLabel}</span>
//             {iconPosition === "right" && (
//               <Icon
//                 className={cn("h-4 w-4 shrink-0 text-primary", iconClassName)}
//               />
//             )}
//           </Button>
//         )}
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align="start"
//         className="w-52 p-0 shadow-xl border-slate-200 rounded-[8px] overflow-hidden"
//       >
//         {showSearch && (
//           <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 bg-white">
//             <Search className="w-4 h-4 text-slate-400 shrink-0" />
//             <input
//               className="text-[14px] outline-none w-full placeholder:text-slate-400 bg-transparent"
//               placeholder={triggerLabel}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onClick={(e) => e.stopPropagation()}
//             />
//           </div>
//         )}

//         <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
//           {filteredSections.map((section, sIdx) => (
//             <React.Fragment key={sIdx}>
//               {section.label && (
//                 <>
//                   <DropdownMenuLabel className="px-3 py-2 text-[13px] font-bold text-[#1e293b]">
//                     {section.label}
//                   </DropdownMenuLabel>
//                   {showSectionLabelSeparator && (
//                     <DropdownMenuSeparator className="bg-slate-200 m-0" />
//                   )}
//                 </>
//               )}

//               {section.items.map((item, iIdx) => (
//                 <DropdownMenuItem
//                   key={iIdx}
//                   onSelect={(e) =>
//                     section.type === "checkbox" && e.preventDefault()
//                   }
//                   onClick={() => item.onClick && item.onClick(item.value)}
//                   className="px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-slate-50 focus:bg-slate-50"
//                 >
//                   {section.type === "checkbox" ? (
//                     <>
//                       <Checkbox
//                         id={`${section.label}-${item.value}`}
//                         checked={item.checked}
//                         className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
//                       />
//                       <label className="text-[14px] cursor-pointer flex-1 text-slate-700">
//                         {item.label}
//                       </label>
//                     </>
//                   ) : (
//                     <>
//                       {item.icon && (
//                         <item.icon className="w-4 h-4 text-slate-500" />
//                       )}
//                       <span className="text-[14px] text-slate-700">
//                         {item.label}
//                       </span>
//                     </>
//                   )}
//                 </DropdownMenuItem>
//               ))}

//               {showSectionSeparator && sIdx < filteredSections.length - 1 && (
//                 <DropdownMenuSeparator className="bg-slate-200 m-0" />
//               )}
//             </React.Fragment>
//           ))}

//           {filteredSections.length === 0 && (
//             <div className="px-3 py-4 text-center text-xs text-slate-400">
//               Data tidak ditemukan
//             </div>
//           )}
//         </div>

//         {showClear && (
//           <div className="border-t border-slate-100">
//             <button
//               type="button"
//               onClick={() => {
//                 setSearchTerm("");
//                 onClear?.();
//               }}
//               className="w-full py-2.5 text-center text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
//             >
//               Clear filters
//             </button>
//           </div>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
