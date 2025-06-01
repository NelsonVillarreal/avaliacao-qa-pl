describe('API - Listagem de Produtos', () => {
  it('Deve retornar a lista de produtos disponíveis', () => {
    cy.request('https://serverest.dev/produtos').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.quantidade).to.be.greaterThan(0);
      expect(res.body.produtos).to.be.an('array');
    });
  });
});
