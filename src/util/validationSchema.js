import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "please insert at least 2 characters!")
    .max(50, "please insert maximum 50 characters!")
    .required("Title is required"),
  description: yup.string().required("Required"),
});
export const schema = yup.object().shape({
  username: yup
    .string()
    .required("⚠️ First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must not exceed 20 characters"),
  email: yup
    .string()
    .email("⚠️ Invalid email address")
    .required("⚠️ Email is required"),
  password1: yup
    .string()
    .required("⚠️ Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  password2: yup
    .string()
    .oneOf([yup.ref("password1"), null], "⚠️ Passwords do not match")
    .required("⚠️ Confirm password is required"),
});
export const schemalogin = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup.string().required("Password is required"),
});
