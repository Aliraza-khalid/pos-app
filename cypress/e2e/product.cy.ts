describe("Product", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("api/search-catalog-items*").as("getProducts");
    cy.visit("/products");
    cy.wait("@getProducts");
  });

  it("add to cart and purchase", () => {
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

    cy.getByTest("cart-badge").should("contain.text", "2").click();
    cy.getByTest("cart-card").should("have.length", 1);
    
    cy.intercept("api/generate-order").as("generateOrder");
    cy.getByTest('checkout-button').click();
    cy.wait("@generateOrder");
    
    cy.getByTest("cart-card").should("have.length", 0);
    cy.getByTest('cart-drawer').should('not.be.visible');
    cy.contains('Success');
  });
});
