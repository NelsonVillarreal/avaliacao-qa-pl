describe('API - Criação de Usuário', () => {
  it('Deve criar um novo usuário com sucesso', () => { //crio um usuario com dados unicos com Date.now para evitar dupicações
    const usuario = {
      nome: "Usuário API",
      email: `api_${Date.now()}@qa.com`,
      password: "teste123",
      administrador: "true"
    };

    cy.request('POST', 'https://serverest.dev/usuarios', usuario).then((res) => { // faço requisiçao post para a API com dados definidos
      expect(res.status).to.eq(201);
      expect(res.body.message).to.include('Cadastro realizado com sucesso');

      cy.writeFile('cypress/fixtures/api.json', { // Salvo s dados para o próximo test
        email: usuario.email,
        password: usuario.password
      });
    });
  });
});
