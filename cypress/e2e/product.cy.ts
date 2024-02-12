describe("Product", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/products");
    cy.intercept("api/search-catalog-items*").as("getProducts");
    cy.wait("@getProducts");
  });

  it("add to cart", () => {
    cy.getByTest("product-card")
      .first()
      .as("first-product-card")
      .within((card) => {
        cy.getByTest("add-to-cart-btn").click().as("ATC-button");
        cy.get("@ATC-button").should("not.exist");

        cy.get("button").contains("+").click().as("plus-button");
        cy.wrap(card).should("contain.text", "2");
        cy.getByTest("vartiant-selector").as("dropdown").click();
      });

    cy.selectDropdown(1);

    cy.get("@first-product-card").within((card) => {
      cy.wrap(card).should("not.contain.text", "2");
      cy.getByTest("add-to-cart-btn").should("exist");
    });
  });
});
