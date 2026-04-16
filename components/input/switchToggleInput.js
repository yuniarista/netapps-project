import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

export const SwitchToggleInput = ({
  control,
  name,
  label,
  description,
  defaultValue,
  disabled,
  helpertext,
  onCheckedChange,
  labelPosition = "right",
}) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue ?? false}
      render={({ field, fieldState: { error } }) => {
        const isLabelLeft = labelPosition === "left";

        return (
          <FormItem
            className={cn(
              "flex gap-4 space-y-0 rounded-lg",
              isLabelLeft ? "flex-row-reverse items-center justify-between" : "flex-col items-start"
            )}
          >
            {!isLabelLeft && (
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (onCheckedChange) onCheckedChange(checked);
                      }}
                      disabled={disabled}
                    />
                  </FormControl>
                  {label && <FormLabel className="text-sm font-medium leading-none">{label}</FormLabel>}
                </div>
                {description && (
                  <p className="pl-[44px] text-xs text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            )}

            {isLabelLeft && (
              <>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (onCheckedChange) onCheckedChange(checked);
                    }}
                    disabled={disabled}
                  />
                </FormControl>
                <div className="flex flex-col space-y-0.5">
                  {label && <FormLabel className="text-sm font-medium">{label}</FormLabel>}
                  {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                  )}
                </div>
              </>
            )}

            {helpertext && !error && (
              <p className="text-xs text-slate-500 mt-1">{helpertext}</p>
            )}
          </FormItem>
        );
      }}
    />
  );
};