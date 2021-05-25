const connection = require('../database/connection');

module.exports = {
  async pesquisar(request, response) {
    const users = await connection('users').select('*');

    return response.json(users);
  },

  async inserir(request, response) {
    try {
      const { nome, email, contato, senha } = request.body;

      const { id } = await connection('users').insert({
        nome,
        email,
        contato,
        senha
      })

      return response.json({ id, nome });

    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum problema no cadastro.' })
    }
  },

  async atualizar(request, response) {
    try {
      const { nome, email, contato, senha } = request.body;

      const { id } = await connection('users').insert({
        nome,
        email,
        contato,
        senha
      })

      return response.json({ id, nome });

    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum problema no cadastro.' })
    }
  }
}