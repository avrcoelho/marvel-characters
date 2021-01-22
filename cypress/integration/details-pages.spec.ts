describe('Home Page', () => {
  it('should be able access page details and load character details', () => {
    cy.visit('/character/1009368');

    cy.contains('Iron Man');
  });
});

export {};
