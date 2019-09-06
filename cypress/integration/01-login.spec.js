/// <reference types="Cypress" />

context('Login', () => {
  it('should login', () => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('[data-testid="login-username"]').type('username')
    cy.get('[data-testid="login-password"]').type('password')
    cy.get('[data-testid="login-btn"]').click();
    cy.wait(2000);
    cy.url().should('include', '/todo-list');
  });
});
