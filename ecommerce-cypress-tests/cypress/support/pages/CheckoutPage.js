class CheckoutPage {
  fillInfo({ firstName, lastName, postalCode }) {
    if (firstName) cy.get('[data-test="firstName"]').type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').type(lastName);
    if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode);
  }
  continue() { cy.get('[data-test="continue"]').click(); }
  cancel() { cy.get('[data-test="cancel"]').click(); }
  finish() { cy.get('[data-test="finish"]').click(); }
  error() { return cy.get('[data-test="error"]'); }
  subtotal() { return cy.get('[data-test="subtotal-label"]'); }
  tax() { return cy.get('[data-test="tax-label"]'); }
  total() { return cy.get('[data-test="total-label"]'); }
}
export default new CheckoutPage();
