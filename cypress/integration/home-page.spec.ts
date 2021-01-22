describe('Home Page', () => {
  it('should be able to access home page', () => {
    cy.visit('/');
  });

  it('should be able to render title', () => {
    cy.visit('/');

    cy.contains('Explore o universo');
  });

  it('should be able to render list with 20 items', () => {
    cy.visit('/');

    cy.get('ul').find('li').should('have.length', 20);
  });

  it('should be able to add item on favorites', () => {
    cy.visit('/');

    cy.get('ul>li').eq(0).find('button').click();
    cy.get('button').eq(0).click();
    cy.get('ul').find('li').should('have.length', 1);
  });

  it('should be able to search character iron man and access details', () => {
    cy.visit('/');

    cy.get('[name=search]').type('iron man');
    cy.wait(2000);
    cy.get('ul>li').eq(0).find('a').click();
    cy.contains('Iron Man');
  });
});

export {};
