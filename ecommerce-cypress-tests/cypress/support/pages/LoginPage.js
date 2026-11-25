class LoginPage {
  visit() { cy.visit("/"); return this; }
  username() { return cy.get('[data-test="username"]'); }
  password() { return cy.get('[data-test="password"]'); }
  submit() { cy.get('[data-test="login-button"]').click(); }
  error() { return cy.get('[data-test="error"]'); }

  login(user, pass) {
    if (user) this.username().type(user);
    if (pass) this.password().type(pass, { log: false });
    this.submit();
  }
}
export default new LoginPage();
