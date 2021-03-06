import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

import formSchema from "../validation/formSchema";

import FormDetails from "./FormDetails";

function Form(props) {
  //state for initial
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  // server error
  const [serverError, setServerError] = useState("");

  // control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  // managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  // temporary state used to display response from API. this is not a commonly used convention
  const [post, setPost] = useState([]);

  // inline validation, validating one key/value pair at a time
  const validateChange = (e) => {
    yup
      // get the rules out of schema with reach at key "e.target.name" --> "formSchema[e.target.name]"
      .reach(formSchema, e.target.name)
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
      .then((valid) => {
        // the input is passing!
        // the reset of that input's error
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        // the input is breaking form schema
        // if failing validation, set error message into error state (this is used in JSX to display error)

        console.log("err", err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  // onSubmit function
  const formSubmit = (e) => {
    e.preventDefault(); // <form> onSubmit has default behavior from HTML!

    // send out POST request with obj as second param, for us that is formState.
    axios
      .post("https://reqres.in/api/users", formState)
      .then((resp) => {
        // update temp state with value from API to display in <pre>
        setPost(resp.data);

        // if successful request, clear any server errors
        setServerError(null); // see step 7 in notion notes

        // clear state, could also use a predetermined initial state variable here
        setFormState({
          name: "",
          email: "",
          password: "",
          terms: false,
        });
      })
      .catch((err) => {
        // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
        // set serverError
        setServerError("oops! something happened!");
      });
  };

  // onChange function
  const inputChange = (e) => {
    // use persist with async code -> we pass the event into validateChange that has async promise logic with .validate

    e.persist(); // necessary because we're passing the event asyncronously and we need it to exist even after this function completes (which will complete before validateChange finishes)
    // e.target.name --> name of the input that fired the event
    // e.target.value --> current value of the input that fired the event
    // e.target.type --> type attribute of the input
    const newFormState = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    validateChange(e); // for each change in input, do inline validation
    setFormState(newFormState); // update state with new data
  };

  // whenever state updates, validate the entire form. if valid, then change button to be enabled.
  //isValid returns a promise
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("is my form valid?", valid);

      // valid is a boolean
      // !true === false
      // !false === true
      // if the form is valid, and we take the opposite --> we do not want disabled btn
      // if the form is invalid (false) and we take the opposite (!) --> we will disable the btn
      setButtonIsDisabled(!valid);
    });
  }, [formState]);

  console.log("formState", formState);
  return (
    <FormDetails
      formSubmit={formSubmit}
      errors={errors}
      formState={formState}
      inputChange={inputChange}
      buttonIsDisabled={buttonIsDisabled}
    />
  );
}

export default Form;
