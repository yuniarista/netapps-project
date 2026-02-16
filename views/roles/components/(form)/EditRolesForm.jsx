// "use client";

// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { DialogClose } from "@/components/ui/dialog";
// import TextInputForm from "@/components/input/textInputForm";
// import SelectInputForm from "@/components/input/selectInputForm";
// import AccordionInputForm from "@/components/input/accordionInputForm";
// //import BasicAlert from "@/components/alert/basicAlert";
// import Loading from "@/app/(protected)/loading";
// import { RolesEditSchema } from "@/views/roles/schemas/RolesSchema";
// import { X } from "lucide-react";
// import CustomAlert from "@/components/alert/customAlert";

// const defaultPermissions = ["read", "write", "update", "delete"];

// export default function EditRolesForm({
//   loading,
//   formData,
//   formOptions,
//   alertOpen,
//   setAlertOpen,
//   response,
//   setResponse,
//   handleUpdate
// }) {
//   const form = useForm({
//     resolver: yupResolver(RolesEditSchema),
//     mode: "all"
//   });

//   const {
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     trigger,
//     reset,
//     formState: { errors }
//   } = form;

//   const [selectedFeatureId, setSelectedFeatureId] = useState("");
//   const [isInitialized, setIsInitialized] = useState(false);
//   const addedFeatures = watch("features") || [];

//   useEffect(() => {
//     if (formData && !isInitialized) {
//       const mappedFeatures =
//         formData?.permission?.access?.map((item) => ({
//           featureId: item.feature.id,
//           access: item.name,
//           isDeleted: false
//         })) || [];

//       const matchedRedirectFeature = formOptions.featuresData.find(
//         (f) => f.url === formData?.redirectUrl
//       );

//       reset({
//         name: formData?.name || "",
//         redirectId: matchedRedirectFeature?.id || "",
//         isAdmin: formData?.isAdmin?.toString() || "false",
//         isUser: formData?.isUser?.toString() || "false",
//         features: mappedFeatures
//       });

//       setIsInitialized(true);
//     }
//   }, [formData, formOptions, reset, isInitialized]);

//   const handleAddFeature = () => {
//     if (!selectedFeatureId) return;

//     const existingFeature = addedFeatures.find(
//       (f) => f.featureId === selectedFeatureId
//     );

//     if (existingFeature) {
//       if (existingFeature.isDeleted) {
//         const updated = addedFeatures.map((f) =>
//           f.featureId === selectedFeatureId ? { ...f, isDeleted: false } : f
//         );
//         setValue("features", updated);
//       }
//       return;
//     }

//     const newFeature = {
//       featureId: selectedFeatureId,
//       access: [],
//       isDeleted: false
//     };

//     setValue("features", [...addedFeatures, newFeature]);
//     trigger("features");
//   };

//   const handleTogglePermission = (featureId, permission) => {
//     const updated = addedFeatures.map((f) => {
//       if (f.featureId === featureId && !f.isDeleted) {
//         const exists = f.access.includes(permission);
//         return {
//           ...f,
//           access: exists
//             ? f.access.filter((a) => a !== permission)
//             : [...f.access, permission]
//         };
//       }
//       return f;
//     });
//     setValue("features", updated);
//     trigger("features");
//   };

//   const availableFeatureOptions = formOptions.featuresData.map((f) => ({
//     value: f.id,
//     label: f.name
//   }));

//   const redirectOptions = (watch("features") || [])
//     .filter((f) => !f.isDeleted)
//     .map((f) => {
//       const feature = formOptions.featuresData.find(
//         (fd) => fd.id === f.featureId
//       );
//       return feature
//         ? {
//             value: feature.id,
//             label: feature.name
//           }
//         : null;
//     })
//     .filter(Boolean);

//   const handleRemoveFeature = (featureId) => {
//     const updatedFeatures = addedFeatures.map((f) =>
//       f.featureId === featureId ? { ...f, isDeleted: true } : f
//     );
//     if (watch("redirectId") === featureId) {
//       setValue("redirectId", "");
//     }
//     setValue("features", updatedFeatures);
//     trigger("features");
//   };

//   const onSubmit = (data) => {
//     const finalData = {
//       ...data,
//       features: addedFeatures
//     };
//     handleUpdate(finalData);
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="overflow-y-auto scroll-styled space-y-4 max-h-[calc(70dvh-2.25rem)] p-1 pr-2"
//       >
//         <CustomAlert
//           variant={response?.status ?? "info"}
//           title={response?.status}
//           open={response?.status === "error" && alertOpen}
//           onClose={() => setAlertOpen(false)}
//         >
//           {response?.message}
//         </CustomAlert>

//         <TextInputForm
//           name="name"
//           label="Role Name"
//           control={control}
//           placeholder="Enter role name"
//           errors={errors}
//           type="text"
//         />

//         <div className="space-y-2">
//           <div className="flex gap-2 items-end">
//             <SelectInputForm
//               name="feature"
//               label="List Feature"
//               control={{
//                 ...control,
//                 register: () => ({
//                   onChange: (e) => setSelectedFeatureId(e.target.value),
//                   value: selectedFeatureId
//                 })
//               }}
//               isMultiple
//               multipleData={addedFeatures
//                 ?.filter((f) => !f.isDeleted)
//                 .map((f) => f.featureId)}
//               options={availableFeatureOptions}
//               optionName={"label"}
//               placeholder="Select a feature"
//               errors={errors}
//             />
//             <Button type="button" onClick={handleAddFeature}>
//               + Add Feature
//             </Button>
//           </div>

//           {addedFeatures
//             .filter((feat) => !feat.isDeleted)
//             .map((feat, idx) => {
//               const featureData = formOptions.featuresData.find(
//                 (f) => f.id === feat.featureId
//               );
//               return (
//                 <div key={feat.featureId} className="flex flex-col">
//                   <div className="flex gap-3 space-y-0">
//                     <AccordionInputForm
//                       className="w-11/12"
//                       name={`permissions-${feat.featureId}`}
//                       label={featureData?.name || `Feature ${idx + 1}`}
//                       control={control}
//                       options={defaultPermissions.map((p) => p)}
//                       errors={errors}
//                       firstRenderOpen
//                       defaultValue={feat.access}
//                       onChange={(perm) =>
//                         handleTogglePermission(feat.featureId, perm)
//                       }
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveFeature(feat.featureId)}
//                       title="Remove feature"
//                     >
//                       <X className="h-5 w-5 text-gray-600 font-bold hover:text-red-500" />
//                     </button>
//                   </div>

//                   {errors.features?.[idx]?.access && (
//                     <p className="text-sm text-destructive">
//                       {errors.features[idx].access.message}
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           <FormField
//             control={control}
//             name="features"
//             render={() => (
//               <FormItem>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <SelectInputForm
//           name="redirectId"
//           label="Redirect Feature"
//           control={control}
//           placeholder="Redirect to..."
//           options={redirectOptions}
//           optionName={"label"}
//           defaultValue={formData?.redirectId}
//           errors={errors}
//         />
//         {/* 
//         <SelectInputForm
//           name="isAdmin"
//           label="Is Admin"
//           control={control}
//           placeholder="This role is admin?"
//           options={formOptions["activeData"]}
//           errors={errors}
//         />

//         <SelectInputForm
//           name="isUser"
//           label="Is User"
//           control={control}
//           placeholder="This role is user?"
//           options={formOptions["activeData"]}
//           errors={errors}
//         /> */}

//         <div className="w-full flex items-center justify-end space-x-4 pt-4">
//           <DialogClose disabled={loading}>
//             <Button type="reset" variant="secondary">
//               Cancel
//             </Button>
//           </DialogClose>
//           <Button type="submit" disabled={loading}>
//             {loading ? <Loading /> : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
