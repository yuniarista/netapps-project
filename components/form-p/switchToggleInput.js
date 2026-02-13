import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

export const SwitchToggleInput = ({
  control,
  name,
  label,
  defaultValue,
  disabled,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue ?? false}
      render={({ field }) => (
        <FormItem className="w-full flex flex-row rounded-lg shadow-none space-y-0 gap-2">
          {/* {label && <FormLabel>{label}</FormLabel>} */}
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          {label && (
            <FormLabel className="font-normal text-base ">{label}</FormLabel>
          )}
        </FormItem>
      )}
    />
  );
};
