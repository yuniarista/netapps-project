import { Controller } from "react-hook-form";
import { FormControl, FormHelperText, TextField } from "@mui/material";

export default function TextInput({
  name,
  type,
  rows,
  label,
  errors,
  control,
  disabled,
  autoFocus,
  endAdornment,
  defaultValue,
  placeholder,
  isHidden = false
}) {
  return (
    <FormControl fullWidth sx={{ display: isHidden ? "none" : "" }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ""}
        render={({ field: { value, onChange } }) => {
          const handleChange = (event) => {
            let inputValue = event.target.value;

            if (type === "number") {
              const numericValue = parseInt(inputValue);
              if (!isNaN(numericValue) && numericValue >= 0) {
                inputValue = numericValue;
              } else {
                inputValue = "";
              }
            }
            onChange(inputValue);
          };
          return (
            <>
              <TextField
                variant="outlined"
                type={type}
                size="small"
                fullWidth
                label={label}
                rows={rows || 1}
                autoComplete="off"
                value={value || ""}
                autoFocus={autoFocus}
                error={!!errors[name]}
                onChange={handleChange}
                placeholder={placeholder || `Input ${label}`}
                disabled={disabled ?? false}
                multiline={!!rows}
                InputProps={{
                  endAdornment: endAdornment,
                  sx: {
                    borderRadius: "8px",
                    backgroundColor: "#fff"
                  }
                }}
                InputLabelProps={{
                  shrink: false, // <- supaya label tidak "melayang" jika kosong
                  sx: {
                    display: "none" // <- sembunyikan label, karena pakai placeholder
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E5E5E5" // border light gray
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#C4C4C4"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6C3FF5" // purple when focused
                  }
                }}
              />

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
