class InventoryPage {
visit() { cy.visit("/inventory.html", { failOnStatusCode: false }); return this; }  items() { return cy.get('[data-test="inventory-item"]'); }
  names() { return cy.get('[data-test="inventory-item-name"]'); }
  prices() { return cy.get('[data-test="inventory-item-price"]'); }
  sortBy(value) { cy.get('[data-test="product-sort-container"]').select(value); }
  cartBadge() { return cy.get('[data-test="shopping-cart-badge"]'); }
  openCart() { cy.get('[data-test="shopping-cart-link"]').click(); }
  openMenu() { cy.get("#react-burger-menu-btn").click(); }
  logout() { this.openMenu(); cy.get("#logout_sidebar_link").click(); }
}
export default new InventoryPage();
