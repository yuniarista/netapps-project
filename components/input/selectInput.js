import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function SelectInput({
  name,
  label,
  errors,
  option,
  control,
  setProvince,
  setWifiType,
  defaultValue,
  children,
  renderValue = false,
  isHidden = false,
  handleCustomChange,
  disabledItem = [],
  isDisabled = false
}) {
  return (
    <FormControl fullWidth sx={{ display: isHidden ? "none" : "" }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? null}
        render={({ field }) => {
          const handleChange = (event) => {
            if (setProvince) {
              const filterProvince = option?.filter(
                (province) => province.name === event.target.value
              );
              setProvince(filterProvince[0].id);
            }
            if (setWifiType) {
              setWifiType(event.target.value);
            }

            field.onChange(event.target.value);
          };
          return (
            <>
              <Select
                disabled={isDisabled}
                fullWidth
                size="medium"
                label={label}
                error={!!errors[name]}
                onChange={(e) => {
                  handleChange(e);
                  if (handleCustomChange) {
                    handleCustomChange(e);
                  }
                }}
                placeholder={`Input ${label}`}
                value={field.value ?? ""}
                {...(renderValue
                  ? {
                      renderValue: (selected) => selected
                    }
                  : {})}
              >
                {children ??
                  option?.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item?._id ?? item?.value ?? item?.name}
                        disabled={disabledItem.includes(item._id)}
                      >
                        {item?.name ||
                          item?.propertyName ||
                          item?.roomNumber ||
                          item?.versionName}
                      </MenuItem>
                    );
                  })}
              </Select>
              {errors[name] && (
                <FormHelperText sx={{ marginX: 1 }} error>
                  {errors[name].message}
                </FormHelperText>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
}
