import * as Yup from "yup";

export const RolesAddSchema = Yup.object().shape({
  name: Yup.string().required("Role name is required"),
  redirectId: Yup.string().required("Redirect feature is required"),
  // isAdmin: Yup.boolean().required("Admin flag is required"),
  // isUser: Yup.boolean().required("User flag is required"),
  features: Yup.array()
    .transform((val) => (val ? val.filter((f) => !f?.isDeleted) : []))
    .of(
      Yup.object().shape({
        featureId: Yup.string().required("Feature ID is required"),
        access: Yup.array()
          .of(Yup.string())
          .min(1, "Select at least one access permission")
          .required("Access permissions are required")
      })
    )
    .test(
      "at-least-one-active-feature",
      "At least one feature must be added",
      (features) => (features || []).some((f) => !f.isDeleted)
    )
    .required("Features are required")
});

export const RolesEditSchema = Yup.object().shape({
  name: Yup.string().required("Role name is required"),
  redirectId: Yup.string().required("Redirect feature is required"),
  // isAdmin: Yup.boolean().required("Admin flag is required"),
  // isUser: Yup.boolean().required("User flag is required"),
  features: Yup.array()
    .transform((val) => (val ? val.filter((f) => !f?.isDeleted) : []))
    .of(
      Yup.object().shape({
        featureId: Yup.string().required("Feature ID is required"),
        access: Yup.array()
          .of(Yup.string())
          .min(1, "Select at least one access permission")
          .required("Access permissions are required")
      })
    )
    .test(
      "at-least-one-active-feature",
      "At least one feature must be added",
      (features) => (features || []).some((f) => !f.isDeleted)
    )
    .required("Features are required")
});
