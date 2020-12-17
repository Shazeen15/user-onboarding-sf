/* eslint-disable no-undef */
/// <reference types="Cypress" />
describe("sign up form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  const nameInput = () => cy.get("#name");
  const emailInput = () => cy.get("#email");
  const passwordInput = () => cy.get("#password");
  const termsInput = () => cy.get("#terms");
  const button = () => cy.get("button");

  it("testing", () => {
    expect(1 + 2).to.equal(3);
  });
  it("submits the form", () => {
    nameInput().type("Shazeen").should("have.value", "Shazeen");
    emailInput()
      .type("email@email.com")
      .should("have.value", "email@email.com");
    passwordInput().type("password").should("have.value", "password");
    termsInput().check();
    button().click();
  });
});
