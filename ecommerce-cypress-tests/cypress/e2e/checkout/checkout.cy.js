import InventoryPage from "../../support/pages/InventoryPage";
import CartPage from "../../support/pages/CartPage";
import CheckoutPage from "../../support/pages/CheckoutPage";

const toNum = (t) => parseFloat(t.replace(/[^0-9.]/g, ""));

describe("Checkout", () => {
  beforeEach(() => {
    cy.loginAs("standard");
    InventoryPage.visit();
    cy.addToCart("sauce-labs-backpack");
    cy.addToCart("sauce-labs-bike-light");
    InventoryPage.openCart();
    CartPage.checkout();
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("TC-CHK-01: requires first name", () => {
    CheckoutPage.fillInfo({ lastName: "Sharma", postalCode: "147001" });
    CheckoutPage.continue();
    CheckoutPage.error().should("contain", "First Name is required");
  });

  it("TC-CHK-02: requires last name", () => {
    CheckoutPage.fillInfo({ firstName: "Priya", postalCode: "147001" });
    CheckoutPage.continue();
    CheckoutPage.error().should("contain", "Last Name is required");
  });

  it("TC-CHK-03: requires postal code", () => {
    CheckoutPage.fillInfo({ firstName: "Priya", lastName: "Sharma" });
    CheckoutPage.continue();
    CheckoutPage.error().should("contain", "Postal Code is required");
  });

  it("TC-CHK-04: cancel returns to the cart with items intact", () => {
    CheckoutPage.cancel();
    cy.url().should("include", "/cart.html");
    CartPage.items().should("have.length", 2);
  });

  it("TC-CHK-05: order summary totals are calculated correctly", () => {
    cy.fixture("checkout").then(({ valid }) => CheckoutPage.fillInfo(valid));
    CheckoutPage.continue();
    cy.url().should("include", "/checkout-step-two.html");

    CheckoutPage.subtotal().invoke("text").then((s) => {
      const subtotal = toNum(s);
      expect(subtotal).to.be.closeTo(29.99 + 9.99, 0.001);
      CheckoutPage.tax().invoke("text").then((t) => {
        const tax = toNum(t);
        CheckoutPage.total().invoke("text").then((tot) => {
          expect(toNum(tot)).to.be.closeTo(subtotal + tax, 0.011);
        });
      });
    });
  });

  it("TC-CHK-06: completes an order successfully", () => {
    cy.fixture("checkout").then(({ valid }) => CheckoutPage.fillInfo(valid));
    CheckoutPage.continue();
    CheckoutPage.finish();
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="complete-header"]').should("have.text", "Thank you for your order!");
  });

  it("TC-CHK-07: cart is emptied after a completed order", () => {
    cy.fixture("checkout").then(({ valid }) => CheckoutPage.fillInfo(valid));
    CheckoutPage.continue();
    CheckoutPage.finish();
    cy.get('[data-test="back-to-products"]').click();
    InventoryPage.cartBadge().should("not.exist");
  });
});
