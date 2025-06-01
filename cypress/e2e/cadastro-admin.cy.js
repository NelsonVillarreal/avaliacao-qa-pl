describe('Cadastro - Serverest', () => {
  it('Deve realizar o cadastro de um novo usuário admin com sucesso', () => {
    cy.visit('https://front.serverest.dev/cadastrarusuarios');

    const nome = 'Criando o chefão do e-commerce';
    const email = `qa_${Date.now()}@mail.com`;
    const senha = '123456';

    cy.get('input[name="nome"]').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('[data-testid="checkbox"]').check(); //Define que o usuario e registrado como admin
    cy.get('button[type="submit"]').click();

    cy.contains('Cadastro realizado com sucesso').should('be.visible'); //Validar sucesso do cadsatro
    cy.url().should('include', '/home'); //verifica o redirecionamento

    cy.writeFile('cypress/fixtures/admin.json', { //to salvando os dados para aproveitar nos proximos testes
      email,
      senha
    });

  });
});
