import 'cypress-file-upload';

Cypress.Commands.add('cadastrarAdmin', (email, senha) => {
  cy.visit('https://front.serverest.dev/cadastrarusuarios');
  cy.get('input[name="nome"]').type('Admin Cypress');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(senha);
  cy.get('[data-testid="checkbox"]').check();
  cy.get('button[type="submit"]').click();

  cy.contains('Cadastro realizado com sucesso').should('be.visible');
  cy.url().should('include', '/admin/home');

  return cy.writeFile('cypress/fixtures/admin.json', { email, senha }).then(() => {
    return { email, senha };
  });
});

Cypress.Commands.add('loginComoAdmin', () => {
  cy.fixture('admin').then((admin) => {
    cy.visit('https://front.serverest.dev/login');
    cy.get('[data-testid="email"]').type(admin.email);
    cy.get('[data-testid="senha"]').type(admin.senha);
    cy.get('[data-testid="entrar"]').click();

    // Valida login bem-sucedido
    cy.url().should('include', '/admin/home');
    cy.contains('Bem Vindo').should('be.visible');
  });
});
