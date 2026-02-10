import { ChevronLeft, PanelLeft, PanelRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSidebar } from "../components/ui/sidebar";

export default function PageHeader({
    icon,
    title,
    showBackButton = false,
    backAction = null,
    search = null,          // = { placeholder, value, onChange }
    rightSection = null,    // JSX bebas
}) {
    // const { toggleSidebar, open } = useSidebar();

    return (
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button
                    //   onClick={toggleSidebar} 
                    className="p-1 hover:bg-gray-100 text-muted-foreground rounded-md transition-colors"
                // title="Toggle Sidebar"
                >
                    <PanelRight className="w-4 h-4" />
                    {/* <PanelLeft className="w-5 h-5" /> */}
                </button>
                <div className="h-5 w-px bg-gray-300" />

                {showBackButton && (
                    <button
                        onClick={backAction}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}

                <Label className="font-medium text-sm text-muted-foreground **whitespace-nowrap**">
                    {title}
                </Label>

                {search && (
                    <div className="relative w-full max-w-xs ml-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder={search.placeholder}
                            value={search.value}
                            onChange={(e) => search.onChange(e.target.value)}
                            className="pl-9 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-primary/40"
                        />
                    </div>
                )}
            </div>

            {rightSection && (
                <div className="flex items-center gap-3">
                    {rightSection}
                </div>
            )}

        </div>
    );
}
