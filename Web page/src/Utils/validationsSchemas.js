import * as Yup from "yup";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;

const emailValidation = Yup.string()
  .trim()
  .lowercase()
  .email("Please enter a valid email address")
  .matches(EMAIL_REGEX, "Email format is invalid")
  .required("Email is required");

const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must not exceed 32 characters")
  .matches(
    PASSWORD_REGEX,
    "Must include uppercase, lowercase, number, and special character (@$!%*?&#)"
  )
  .required("Password is required");

const nameValidation = (fieldName) =>
  Yup.string()
    .trim()
    .min(2, `${fieldName} must be at least 2 characters`)
    .max(50, `${fieldName} must not exceed 50 characters`)
    .matches(NAME_REGEX, `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`)
    .test("no-consecutive-spaces", `${fieldName} cannot have consecutive spaces`, (value) =>
      value ? !/\s{2,}/.test(value) : true
    )
    .required(`${fieldName} is required`);

export const registerSchema = Yup.object({
  firstName: nameValidation("First name"),
  lastName: nameValidation("Last name"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["Super Admin", "Admin", "Customer"], "Invalid role selected")
    .required("Please select a role"),
  termsAccepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Required"),
});

export const loginSchema = Yup.object({
  email: emailValidation,
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});