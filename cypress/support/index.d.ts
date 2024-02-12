/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
    getByTest(selector: string): Chainable<JQuery<HTMLElement>>;
    selectDropdown(optionIndex: number): Chainable<JQuery<HTMLElement>>;
    // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
    // dismiss(
    //   subject: string,
    //   options?: Partial<TypeOptions>
    // ): Chainable<Element>;
    // visit(
    //   originalFn: CommandOriginalFn<any>,
    //   url: string,
    //   options: Partial<VisitOptions>
    // ): Chainable<Element>;
  }
}
