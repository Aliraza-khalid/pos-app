describe("Products Search", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/products");
    cy.intercept("api/search-catalog-items*").as("getProducts");
    cy.intercept("api/list-categories*").as("getCategories");
    cy.wait("@getProducts");
    cy.wait("@getCategories");
  });

  it("search by title and category", () => {
    cy.getByTest("search-field").type("pizza{enter}");
    cy.getByTest("products-loading").should("exist");
    cy.wait("@getProducts");
    cy.getByTest("products-loading").should("not.exist");

    cy.getByTest("products-page-0")
      .children()
      .should((children) => {
        children.map((child) => expect(child).to.contain(/pizza/i));
      });

    cy.getByTest("category-button-0").within((elm) => {
      cy.wrap(elm).getByTest("check-icon").should("not.exist");
      cy.wrap(elm).click();
      cy.wrap(elm).getByTest("check-icon").should("exist")
    });

    cy.getByTest("products-loading").should("exist");
    cy.wait("@getProducts");
    cy.getByTest("products-loading").should("not.exist");

    cy.getByTest("search-field").clear().type("{enter}");
    cy.getByTest("products-loading").should("exist");
    cy.wait("@getProducts");
    cy.getByTest("products-loading").should("not.exist");

    cy.getByTest("category-button-0").click();
    cy.getByTest("category-button-0")
      .children()
      .getByTest("check-icon")
      .should("not.exist");
    cy.getByTest("products-loading").should("not.exist");
  });
});
