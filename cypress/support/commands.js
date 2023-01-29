// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Lion");
  cy.get("#lastName").type("Simon");
  cy.get("#email").type("lion123@gmail.com");
  cy.get("#open-text-area").type("Testando a aplicação.", { delay: 0 });
  cy.get('button[type="submit"]').should("be.visible").click();
  cy.get(".success > strong").should("be.visible");
});

Cypress.Commands.add("sendForm", () => {
  cy.contains(".button", "Enviar", { matchCase: true }).click();
});
