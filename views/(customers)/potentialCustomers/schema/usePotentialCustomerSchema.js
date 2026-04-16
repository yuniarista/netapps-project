import * as Yup from "yup";

export const PotentialCustomerAddSchema = Yup.object().shape({
    customerSegment: Yup.string().required("Customer segment is required"),
    companyName: Yup.string().when("customerSegment", {
        is: (val) => val !== "home",
        then: (schema) => schema.required("Company name is required for non-home segments"),
        otherwise: (schema) => schema.nullable(),
    }),
    product: Yup.string().required("Product is required"),
    area: Yup.string().required("Area is required"),
    homepassId: Yup.string().required("Homepass ID is required"),
    odpId: Yup.string().required("ODP ID is required"),
    npwpNumber: Yup.string().when("customerSegment", {
        is: (val) => val !== "home",
        then: (schema) => schema.required("NPWP number is required for non-home segments"),
        otherwise: (schema) => schema.nullable(),
    }),
    npwpPhoto: Yup.mixed().when("customerSegment", {
        is: (val) => val !== "home",
        then: (schema) => schema.required("NPWP photo is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    locationId: Yup.mixed().required("Location photo is required"),

    nationality: Yup.string().required("Nationality is required"),
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string().required("ID number is required"),
    photoId: Yup.mixed().required("Photo with ID is required"),
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    whatsappNumber: Yup.string().required("WhatsApp number is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    state: Yup.string().required("State is required"),
    province: Yup.string().required("Province is required"),
    city: Yup.string().required("City is required"),
    longitude: Yup.string().required("Longitude is required"),
    latitude: Yup.string().required("Latitude is required"),
    address: Yup.string().required("Address is required"),

    isActive: Yup.boolean(),
    salesName: Yup.string().when("isActive", {
        is: false,
        then: (schema) => schema.required("Sales name is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    referalCode: Yup.string().when("isActive", {
        is: true,
        then: (schema) => schema.required("Referral code is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    affiliateSalesName: Yup.string().when("isActive", {
        is: true,
        then: (schema) => schema.required("Affiliate name is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    mobileNumber: Yup.string().when("isActive", {
        is: true,
        then: (schema) => schema.required("Mobile number is required"),
        otherwise: (schema) => schema.nullable(),
    }),
});



export const PotentialCustomerEditSchema = Yup.object().shape({
    customerSegment: Yup.string().required("Customer segment is required"),
    companyName: Yup.string().when("customerSegment", {
        is: (val) => val !== "home",
        then: (schema) => schema.required("Company name is required"),
        otherwise: (schema) => schema.notRequired().nullable(),
    }),
    product: Yup.string().required("Product is required"),
    area: Yup.string().required("Area is required"),
    homepassId: Yup.string().required("Homepass ID is required"),
    odpId: Yup.string().required("ODP ID is required"),
    npwpNumber: Yup.string().when("customerSegment", {
        is: (val) => val !== "home",
        then: (schema) => schema.required("NPWP number is required"),
        otherwise: (schema) => schema.notRequired().nullable(),
    }),
    npwpPhoto: Yup.mixed().when("customerSegment", {
        is: (val) => val !== "home",
        then: (schema) => schema.test("is-valid", "NPWP photo is required", (value) => {
            return value instanceof File || typeof value === "string";
        }),
        otherwise: (schema) => schema.notRequired().nullable(),
    }),
    locationId: Yup.mixed().test("is-valid", "Location photo is required", (value) => {
        return value instanceof File || typeof value === "string";
    }),

    nationality: Yup.string().required("Nationality is required"),
    idType: Yup.string().required("ID type is required"),
    idNumber: Yup.string().required("ID number is required"),
    photoId: Yup.mixed().required("Photo with ID is required"),
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    whatsappNumber: Yup.string().required("WhatsApp number is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    state: Yup.string().required("State is required"),
    province: Yup.string().required("Province is required"),
    city: Yup.string().required("City is required"),
    longitude: Yup.string().required("Longitude is required"),
    latitude: Yup.string().required("Latitude is required"),
    address: Yup.string().required("Address is required"),

    isActive: Yup.boolean(),
    salesName: Yup.string().when("isActive", {
        is: false,
        then: (schema) => schema.required("Sales name is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    referalCode: Yup.string().when("isActive", {
        is: true,
        then: (schema) => schema.required("Referral code is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    affiliateSalesName: Yup.string().when("isActive", {
        is: true,
        then: (schema) => schema.required("Affiliate name is required"),
        otherwise: (schema) => schema.nullable(),
    }),
    mobileNumber: Yup.string().when("isActive", {
        is: true,
        then: (schema) => schema.required("Mobile number is required"),
        otherwise: (schema) => schema.nullable(),
    }),
});