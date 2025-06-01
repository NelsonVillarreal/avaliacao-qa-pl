describe('API - Listagem de Produtos', () => {
  it('Deve retornar a lista de produtos disponíveis', () => {
    cy.request('https://serverest.dev/produtos').then((res) => {
      expect(res.status).to.eq(200); //verifica status 200
      expect(res.body.quantidade).to.be.greaterThan(0); //verifica se tem produtos
      expect(res.body.produtos).to.be.an('array'); //garante o campo produtos no cropo da resposta, o esperado de uma list
    });
  });
});
