import LoginPage from "../../support/pages/LoginPage";
import InventoryPage from "../../support/pages/InventoryPage";

describe("Authentication", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
    LoginPage.visit();
  });

  it("TC-AUTH-01: logs in with valid credentials", function () {
    LoginPage.login(this.users.standard.username, this.users.standard.password);
    cy.url().should("include", "/inventory.html");
    InventoryPage.items().should("have.length.greaterThan", 0);
  });

  it("TC-AUTH-02: rejects a locked-out user", function () {
    LoginPage.login(this.users.locked.username, this.users.locked.password);
    LoginPage.error().should("contain", "locked out");
  });

  it("TC-AUTH-03: rejects an invalid password", function () {
    LoginPage.login(this.users.invalid.username, this.users.invalid.password);
    LoginPage.error().should("contain", "do not match");
  });

  it("TC-AUTH-04: requires a username", () => {
    LoginPage.login("", "secret_sauce");
    LoginPage.error().should("contain", "Username is required");
  });

  it("TC-AUTH-05: requires a password", () => {
    LoginPage.login("standard_user", "");
    LoginPage.error().should("contain", "Password is required");
  });

  it("TC-AUTH-06: logs out and returns to login page", function () {
    LoginPage.login(this.users.standard.username, this.users.standard.password);
    InventoryPage.logout();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get('[data-test="login-button"]').should("be.visible");
  });

  it("TC-AUTH-07: blocks protected pages when logged out", () => {
    cy.visit("/inventory.html", { failOnStatusCode: false });
    LoginPage.error().should("contain", "logged in");
  });
});
