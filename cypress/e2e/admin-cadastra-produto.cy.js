describe('Cadastro de produto via painel admin', () => {
  it('Deve cadastrar um novo produto com imagem e validar na lista', () => {
    cy.loginComoAdmin(); // Reaproveita login com fallback

    // Ir para a tela de cadastro de produtos
    cy.get('[data-testid="cadastrarProdutos"]').click();
    cy.url().should('include', '/admin/cadastrarprodutos');

    // Gera nome dinâmico
    const timestamp = Date.now();
    const nome = `Robo Aspirador Sidi ${timestamp}`;
    const preco = '800.00';
    const descricao = 'Robô inteligente que aspira, limpa e brilha sua casa. Desenvolvido por SIDI.';
    const quantidade = '50';

    cy.get('[data-testid="nome"]').type(nome);
    cy.get('[data-testid="preco"]').type(preco);
    cy.get('[data-testid="descricao"]').type(descricao);
    cy.get('[data-testid="quantity"]').type(quantidade);

    // Upload da imagem salva em fixtures
    cy.get('[data-testid="imagem"]').attachFile('Sidi-Aspirador.png');

    // Submete o formulário
    cy.get('[data-testid="cadastarProdutos"]').click();

    // Valida redirecionamento para a lista
    cy.location('pathname', { timeout: 10000 }).should('include', '/admin/listarprodutos');

    // Faz scroll e valida que produto foi cadastrado
    cy.scrollTo('bottom');
    cy.contains('td', nome, { timeout: 10000 }).should('be.visible');
  });
});
