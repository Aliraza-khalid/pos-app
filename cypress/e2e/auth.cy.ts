describe("Auth State", () => {
  it("Unauthenticatied", () => {
    localStorage.clear();
    cy.visit("/");
    cy.url().should("contain", `/login`, { timeout: 5000 });
  });

  it("Authenticatied", () => {
    cy.login();
    cy.visit("/");
    cy.url().should("contain", "/products", { timeout: 5000 });
  });
});
