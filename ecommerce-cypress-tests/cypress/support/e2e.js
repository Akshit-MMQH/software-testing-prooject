import "./commands";

// Ignore third-party/app errors that are not under test
Cypress.on("uncaught:exception", () => false);
