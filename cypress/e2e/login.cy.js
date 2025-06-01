describe('Login com fallback usando comando de cadastro', () => {
  it('Tenta logar e se falhar, cadastra e loga com novo admin', () => {
    cy.fixture('admin').then((admin) => {
      cy.visit('https://front.serverest.dev/login');

      cy.get('[data-testid="email"]').type(admin.email);
      cy.get('[data-testid="senha"]').type(admin.senha);
      cy.get('[data-testid="entrar"]').click();

      cy.wait(1000); // Espero o feedback 

      cy.get('body').then(($body) => {
        if ($body.text().includes('Email e/ou senha inválidos')) {
          cy.log('⚠️ Login fallo. voy para cadastro...');

          const novoEmail = `admin_${Date.now()}@mail.com`;
          const novaSenha = '123456';

          cy.get('[data-testid="cadastrar"]').click();
          cy.url().should('include', '/cadastrarusuarios');

          return cy.cadastrarAdmin(novoEmail, novaSenha).then((credenciais) => {
            cy.visit('https://front.serverest.dev/login');
            cy.get('[data-testid="email"]').type(credenciais.email);
            cy.get('[data-testid="senha"]').type(credenciais.senha);
            cy.get('[data-testid="entrar"]').click();

            cy.url().should('include', '/admin/home');
            cy.contains('Bem Vindo').should('be.visible');
          });

        } else {
          // Login deu bão , segue validação
          cy.url().should('include', '/admin/home');
          cy.contains('Bem Vindo').should('be.visible');
        }
      });
    });
  });
});
