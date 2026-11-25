import InventoryPage from "../../support/pages/InventoryPage";
import CartPage from "../../support/pages/CartPage";

describe("Shopping cart", () => {
  const backpack = "sauce-labs-backpack";
  const bikeLight = "sauce-labs-bike-light";

  beforeEach(() => {
    cy.loginAs("standard");
    InventoryPage.visit();
  });

  it("TC-CART-01: cart is empty on a fresh session", () => {
    InventoryPage.cartBadge().should("not.exist");
    InventoryPage.openCart();
    CartPage.items().should("have.length", 0);
  });

  it("TC-CART-02: adds a single item and updates the badge", () => {
    cy.addToCart(backpack);
    InventoryPage.cartBadge().should("have.text", "1");
    cy.get(`[data-test="remove-${backpack}"]`).should("be.visible");
  });

  it("TC-CART-03: adds multiple items", () => {
    cy.addToCart(backpack);
    cy.addToCart(bikeLight);
    InventoryPage.cartBadge().should("have.text", "2");
    InventoryPage.openCart();
    CartPage.items().should("have.length", 2);
  });

  it("TC-CART-04: removes an item from the catalog page", () => {
    cy.addToCart(backpack);
    cy.get(`[data-test="remove-${backpack}"]`).click();
    InventoryPage.cartBadge().should("not.exist");
  });

  it("TC-CART-05: removes an item from the cart page", () => {
    cy.addToCart(backpack);
    cy.addToCart(bikeLight);
    InventoryPage.openCart();
    CartPage.remove(backpack);
    CartPage.items().should("have.length", 1);
    InventoryPage.cartBadge().should("have.text", "1");
  });

  it("TC-CART-06: cart contents persist across page navigation", () => {
    cy.addToCart(backpack);
    InventoryPage.names().first().click();
    cy.get('[data-test="back-to-products"]').click();
    InventoryPage.cartBadge().should("have.text", "1");
  });

  it("TC-CART-07: continue shopping returns to the catalog", () => {
    InventoryPage.openCart();
    CartPage.continueShopping();
    cy.url().should("include", "/inventory.html");
  });

  it("TC-CART-08: cart shows correct name and price for item added", () => {
    cy.addToCart(backpack);
    InventoryPage.openCart();
    cy.get('[data-test="inventory-item-name"]').should("have.text", "Sauce Labs Backpack");
    cy.get('[data-test="inventory-item-price"]').should("have.text", "$29.99");
  });
});
