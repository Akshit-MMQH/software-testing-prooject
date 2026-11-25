/**
 * Log in once per user and cache the session (fast, isolated tests).
 * Usage: cy.loginAs("standard")
 */
Cypress.Commands.add("loginAs", (userKey = "standard") => {
  cy.fixture("users").then((users) => {
    const { username, password } = users[userKey];
    cy.session(
      userKey,
      () => {
        cy.visit("/");
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password, { log: false });
        cy.get('[data-test="login-button"]').click();
        cy.url().should("include", "/inventory.html");
      },
      {
        validate() {
          cy.getCookie("session-username").should("exist");
        },
      }
    );
  });
});

/** Add a product to the cart from the inventory page by its slug */
Cypress.Commands.add("addToCart", (slug) => {
  cy.get(`[data-test="add-to-cart-${slug}"]`).click();
});

/** Convert "$29.99" -> 29.99 */
Cypress.Commands.add("priceToNumber", { prevSubject: true }, (subject) => {
  return parseFloat(subject.text().replace(/[^0-9.]/g, ""));
});
