import cypress from "cypress";

describe('Login al sistema', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('Debería permitir login con credenciales correctas', () => {
    cy.get('#username').type('UsuarioDePrueba123');
    cy.get('#password').type('UsuarioDePrueba123');

    cy.intercept('POST', '**').as('postRequest');

    cy.get('.btn.btn-primary').click();

    cy.wait('@postRequest').then(({ request, response }) => {
      cy.log('URL de la petición:', request.url);
      cy.log('Estado:', response?.statusCode);
      // console.log('Respuesta:', response?.body);
      // cy.log('Respuesta:', response);
      expect(response?.statusCode).to.eq(200);
    });

    cy.url({ timeout: 10000 }).should('include', '/novedades');
  });
});
