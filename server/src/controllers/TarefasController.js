const connection = require('../database/connection');

module.exports = {
  async pesquisar(request, response) {
    const { page = 1} = request.query;

    const tarefas = await connection('tarefas')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    return response.json(tarefas);
  },

  async pesquisarUnico(request, response) {
    const user_id = request.headers.authorization;

    const tarefa = await connection('tarefas')
      .where('user_id', user_id)
      .select('*');

    return response.json(tarefa);
  },

  async inserir(request, response) {
    try {
      const { title, description, } = request.body;

      const user_id = request.headers.authorization;

      const [id] = await connection('tarefas').insert({
        title,
        description,
        user_id
      })

      return response.json('Inserido com sucesso!');
    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum problema ao inserir a tarefa.' })
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const tarefa = await connection('tarefas')
      .where('id', id)
      .select('user_id')
      .first();

    if (tarefa.user_id !== user_id) {
      return response.status(401).json({ error: 'Operação não autorizada.'})
    }

    await connection('tarefas').where('id', id).delete();

    return response.status(204).send()
  }
}