describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1800, 1200);
  });

  it('main to 404 & signin', () => {
    cy.contains('[ntlstl.places]');
    cy.contains('mesto by ntlstl');
    cy.contains('Telegram');
    cy.contains('LinkedIn');
    cy.contains('Sign in');
    cy.wait(1000);

    cy.visit('/404');
    cy.contains('404');
    cy.contains('Page not found');
    cy.contains('Home');
    cy.wait(1000);

    cy.visit('/signin');
    cy.contains('Sign In');
  });
});
