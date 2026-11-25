import LoginPage from "../../support/pages/LoginPage";
import InventoryPage from "../../support/pages/InventoryPage";
import CartPage from "../../support/pages/CartPage";
import CheckoutPage from "../../support/pages/CheckoutPage";

describe("End-to-end purchase journey", () => {
  it("TC-E2E-01: shopper logs in, sorts, buys two items and logs out", () => {
    cy.fixture("users").then(({ standard }) => {
      LoginPage.visit().login(standard.username, standard.password);
    });

    InventoryPage.sortBy("lohi");
    InventoryPage.items().first().find("button").click();
    InventoryPage.items().eq(1).find("button").click();
    InventoryPage.cartBadge().should("have.text", "2");

    InventoryPage.openCart();
    CartPage.items().should("have.length", 2);
    CartPage.checkout();

    cy.fixture("checkout").then(({ valid }) => CheckoutPage.fillInfo(valid));
    CheckoutPage.continue();
    CheckoutPage.finish();
    cy.get('[data-test="complete-header"]').should("contain", "Thank you");

    InventoryPage.visit().logout();
    cy.get('[data-test="login-button"]').should("be.visible");
  });
});
