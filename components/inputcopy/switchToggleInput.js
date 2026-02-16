import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

export const SwitchToggleInput = ({
  control,
  name,
  label,
  description, 
  defaultValue,
  disabled
}) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue ?? false}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg">
          <div className="space-y-0.5">
            {label && <FormLabel className="text-sm">{label}</FormLabel>}
            {description && (
              <p className="text-[12px] text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};