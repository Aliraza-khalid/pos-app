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

    cy.getByTest("products-list")
      .children()
      .should((children) => {
        children.map((child) => expect(child).to.contain(/pizza/i));
      });

    cy.getByTest("category-button-0").should("have.class", "ant-btn-text").click();
    cy.getByTest("category-button-0").should("have.class", "ant-btn-default");

    cy.getByTest("products-loading").should("exist");
    cy.wait("@getProducts");
    cy.getByTest("products-loading").should("not.exist");

    cy.getByTest("search-field").clear().type("{enter}");
    cy.getByTest("products-loading").should("exist");
    cy.wait("@getProducts");
    cy.getByTest("products-loading").should("not.exist");

    cy.getByTest("category-button-0").should("have.class", "ant-btn-default").click();
    cy.getByTest("category-button-0").should("have.class", "ant-btn-text");
    cy.getByTest("products-loading").should("not.exist");
  });
});
