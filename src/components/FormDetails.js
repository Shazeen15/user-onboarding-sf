import React, { useState, useEffect } from "react";

function FormDetails(props) {
  const {
    formSubmit,
    errors,
    formState,
    inputChange,
    buttonIsDisabled,
  } = props;
  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formState.name}
        onChange={inputChange}
      />

      <label htmlFor="email">
        Email
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formState.email}
        onChange={inputChange}
      />

      <label htmlFor="password">
        Password
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formState.password}
        onChange={inputChange}
      />

      <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Cs
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label>
      <button type="submit" disabled={buttonIsDisabled}>
        Submit
      </button>
    </form>
  );
}

export default FormDetails;
