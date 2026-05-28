// src/utils/validationSchemas.js
import * as Yup from "yup";

// Password strength regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/;

const emailValidation = Yup.string()
  .email("Please enter a valid email address")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email format is invalid"
  )
  .test('valid-domain', 'Please use a valid email domain', (value) => {
    if (!value) return false;
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'demo.com'];
    const domain = value.split('@')[1]?.toLowerCase();
    return commonDomains.some(d => domain?.includes(d)) || domain?.includes('.');
  })
  .required("Email is required");

// Password validation with strength requirements
const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must not exceed 32 characters")
  .matches(passwordRegex, "Password must contain uppercase, lowercase, number, and special character (@$!%*?&#)")
  .required("Password is required");


const nameValidation = (field) =>
  Yup.string()
    .trim()
    .min(2, `${field} must be at least 2 characters`)
    .max(50, `${field} must not exceed 50 characters`)
    .matches(/^[a-zA-Z\s'-]+$/, `${field} can only contain letters, spaces, hyphens, and apostrophes`)
    .test('no-multiple-spaces', `${field} cannot have consecutive spaces`, (value) => {
      return value ? !/\s{2,}/.test(value) : true;
    })
    .required(`${field} is required`);
//registeration
export const registerValidationSchema = Yup.object({
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
    .required("Terms acceptance is required"),
});

// Login 
export const loginValidationSchema = Yup.object({
  email: emailValidation,
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});








