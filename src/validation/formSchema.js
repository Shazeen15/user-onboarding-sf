import * as yup from "yup";

// Add a schema, used for all validation to determine whether the input is valid or not
export default yup.object().shape({
  name: yup.string().required("Name is required."), // must be a string or else error
  email: yup.string().email("email is reqired"), // must have string present, must be of the shape of an email
  password: yup.string().required("password is reqired"),
  terms: yup.boolean().oneOf([true], "terms is reqired"),
});
