describe('404 Page', () => {
  it('should be able to access home page', () => {
    cy.visit('/');
  });

  it('should be able to render title', () => {
    cy.visit('/not-found');

    cy.contains('404');
  });
});

export {};
