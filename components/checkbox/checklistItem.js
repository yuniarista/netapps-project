import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ChecklistItem({ id, title, desc, checked, onToggle }) {
  return (
    <div className="relative flex items-start gap-4 p-2 bg-white border rounded-sm">
      <div className="flex items-center h-5 pt-1">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onToggle}
        />
      </div>
      <Label htmlFor={id} className="grid cursor-pointer select-none w-full">
        <span className="text-base text-foreground font-medium">{title}</span>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </Label>
    </div>
  );
}
