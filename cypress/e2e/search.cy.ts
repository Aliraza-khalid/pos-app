describe("Products Search", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/products");
    cy.intercept("api/search-catalog-items*").as("getProducts");
    cy.wait("@getProducts");
  });

  it("search by title", () => {
    cy.getByTest("search-field").type("pizza{enter}");
    cy.getByTest("loading-container").should("exist");
    cy.getByTest("loading-container").should("not.exist");
    cy.getByTest("products-list")
      .children()
      .should((children) => {
        children.map((child) => expect(child).to.contain(/pizza/i));
      });
  });
});
