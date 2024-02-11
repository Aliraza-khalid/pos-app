describe("Auth State", () => {
  it("Unauthenticatied", () => {
    localStorage.clear();
    cy.visit("/");
    cy.url().should("contain", `/login`);
  });

  it("Authenticatied", () => {
    cy.login();
    cy.visit("/");
    cy.url().should("contain", "/products");
  });
});
