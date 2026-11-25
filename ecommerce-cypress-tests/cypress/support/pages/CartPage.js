class CartPage {
visit() { cy.visit("/cart.html", { failOnStatusCode: false }); return this; }  items() { return cy.get('[data-test="inventory-item"]'); }
  remove(slug) { cy.get(`[data-test="remove-${slug}"]`).click(); }
  checkout() { cy.get('[data-test="checkout"]').click(); }
  continueShopping() { cy.get('[data-test="continue-shopping"]').click(); }
}
export default new CartPage();
