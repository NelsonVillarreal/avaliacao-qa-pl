describe('Cadastro de usuário comum via painel admin', () => {
  it('Deve cadastrar um usuário e validar na lista', () => {
    cy.loginComoAdmin(); // login reaproveitado

    // Cadastrar Usuario Comun
    cy.get('[data-testid="cadastrarUsuarios"]').click();
    cy.url().should('include', '/admin/cadastrarusuarios');

    // Gera dados únicos
    const nome = 'Usuário Teste Cypress';
    const email = `usuario_teste_${Date.now()}@mail.com`;
    const senha = 'teste123';

    // Preenche e envia o formulário
    cy.get('[data-testid="nome"]').type(nome);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(senha);
    cy.get('[data-testid="cadastrarUsuario"]').click();

    // Valida redirecionamento para a lista
    cy.url().should('include', '/admin/listarusuarios');

    // procura o novo usuário
    cy.scrollTo('bottom');
    cy.contains('td', email, { timeout: 10000 }).should('be.visible');
    cy.contains('td', nome).should('be.visible');
  });
});
