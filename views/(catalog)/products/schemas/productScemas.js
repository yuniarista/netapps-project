import * as Yup from "yup";

export const ProductAddSchema = Yup.object().shape({
  addOns: Yup.array().of(
    Yup.object().shape({
      addOnName: Yup.string().required("Add-on Name wajib diisi"),
      categoryProduct: Yup.string().required("Kategori wajib diisi"),
      quantity: Yup.number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value,
        )
        .typeError("Harus berupa angka")
        .min(1, "Minimal 1 unit")
        .required("Qty wajib diisi"),
    })
  )
});
