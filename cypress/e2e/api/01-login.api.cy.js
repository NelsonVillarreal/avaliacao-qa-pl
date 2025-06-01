describe('API - Login de Usuário', () => {
  it('Deve fazer login com sucesso com os dados do usuário criado anteriormente', () => {
    cy.fixture('api').then((usuario) => { // uso os dados que salvei no cria-usuarui-api
      cy.request({ // faço requisiçao post com os dados do usuario
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: usuario,
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('authorization');
      });
    });
  });
});
