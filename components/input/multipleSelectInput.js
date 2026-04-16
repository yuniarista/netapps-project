import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Chip,
  FormHelperText,
  MenuItem,
  TextField
} from "@mui/material";

export default function MultipleSelectInput({
  name,
  label,
  errors,
  options,
  control,
  defaultValue,
  disabledItem = [],
  isDisabled,
  isHidden,
  withUrl = false
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? defaultValue : null}
      render={({ field }) => (
        <Autocomplete
          multiple
          disabled={isDisabled}
          hidden={isHidden}
          fullWidth
          options={options || []}
          value={field?.value ?? []}
          getOptionLabel={(option) =>
            withUrl
              ? `${option?.name} - ${option?.url}`
              : option?.name || option?.propertyName || option.roomNumber
          }
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          disableCloseOnSelect
          renderOption={(props, option) => (
            <MenuItem
              {...props}
              key={option._id}
              disabled={disabledItem.includes(option._id)}
            >
              {withUrl
                ? `${option?.name} - ${option?.url}`
                : option?.name || option?.propertyName || option?.roomNumber}
            </MenuItem>
          )}
          renderTags={(tagValue) => (
            <Box
              sx={{
                maxHeight: 100, // Set your preferred max-height here
                overflow: "auto",
                display: "flex",
                flexWrap: "wrap",
                "&::-webkit-scrollbar": {
                  display: "none"
                },
                msOverflowStyle: "none" /* IE and Edge */,
                "scrollbar-width": "none" /* Firefox */,
                gap: 1
              }}
            >
              {tagValue.map((option, index) => (
                <Chip
                  key={index}
                  label={
                    option?.name || option?.propertyName || option?.roomNumber
                  }
                  disabled={isDisabled}
                  onDelete={() => {
                    const newValue = [...field.value];
                    newValue.splice(index, 1);
                    field.onChange(newValue);
                  }}
                />
              ))}
            </Box>
          )}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label={label}
                placeholder={`Select ${label}`}
                variant="outlined"
                error={!!errors[name]}
                // InputProps={{
                //   ...params.InputProps,
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <IconifyIcon icon={icon} />
                //     </InputAdornment>
                //   ),
                // }}
              />
              {errors[name] && (
                <FormHelperText sx={{ marginX: 1 }} error>
                  {errors[name].message}
                </FormHelperText>
              )}
            </>
          )}
        />
      )}
    />
  );
}
