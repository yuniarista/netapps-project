import { FormControl, FormHelperText, TextField, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import { HexAlphaColorPicker } from "react-colorful";

export default function ColorInput({
  name,
  label,
  type,
  rows,
  errors,
  control,
  disabled,
  setValue,
  placeholder,
  endAdornment,
  defaultValue,
}) {
  const setSelectedColor = (e) => {
    setValue(name, e);
  };

  return (
    <FormControl fullWidth size="small">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ""}
        rules={{ required: `${label} is required` }}
        render={({ field: { value, onChange, onBlur } }) => {
          return (
            <>
              <Grid
                container
                spacing={2}
                justifyContent={"flex-start"}
                direction={"row"}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={6} md={4}>
                  <section className="small example">
                    <HexAlphaColorPicker
                      color={value}
                      onChange={setSelectedColor}
                    />
                  </section>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <TextField
                    fullWidth={true}
                    type={type}
                    format="hex"
                    label={label}
                    onBlur={onBlur}
                    onChange={onChange}
                    rows={rows || 1}
                    value={value}
                    error={!!errors[name]}
                    placeholder={placeholder}
                    disabled={disabled ? disabled : false}
                    multiline={rows ? true : false}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: endAdornment,
                    }}
                  />
                </Grid>
              </Grid>
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
