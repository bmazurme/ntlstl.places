describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1800, 1200);
  });

  it('main to feed', () => {
    cy.contains('[ntlstl.places]');
    cy.contains('mesto by ntlstl');
    cy.contains('Telegram');
    cy.contains('LinkedIn');
    cy.contains('Sign in');
    cy.wait(1000);
  });
});
