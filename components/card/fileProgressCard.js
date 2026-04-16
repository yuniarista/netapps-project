import { FileText, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function FileProgressCard({ file, onRemove }) {
    return (
        <div className="p-3 bg-white border rounded-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-10 w-10 shrink-0 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button onClick={onRemove} type="button" className="text-red-500">
                    <X className="h-4 w-4" />
                </button>
            </div>
            <div className="flex items-center gap-3">
                <Progress value={file.progress} className="h-1 flex-1 bg-slate-100" />
                <span className="text-sm font-medium text-muted-foreground min-w-[30px] text-right">
                    {file.progress}%
                </span>
            </div>
        </div>
    );
}