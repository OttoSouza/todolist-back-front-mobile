const connection = require("../config/connections");
module.exports = {
  async salvar(request, response) {
    const { nome, descricao } = request.body;

    const id_usuario = request.usuario_id_jwt;

    if (!nome) return response.status(400).send({ err: "Nome em branco" });
    if (!descricao)
      return response.status(400).send({ err: "Descricao em branco" });

    try {
      const tarefa = await connection("tarefas")
        .insert({
          nome,
          descricao,
          id_usuario,
        })
        .returning("*");

      return response.status(201).send(tarefa);
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  },
  async tarefa_usuario(request, response) {
    const id_usuario = request.usuario_id_jwt;
    try {
      const tarefa = await connection("tarefas")
        .where("id_usuario", id_usuario)
        .select("*");

      return response.status(201).send(tarefa);
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  },
  async deletar(request, response) {
    const { id } = request.params;
    const id_usuario = request.usuario_id_jwt;
    try {
      await connection("tarefas").delete().where({
        id: id,
        id_usuario: id_usuario,
      });
      return response.status(204).send();
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  },
  async atualizar(request, response) {
    const { nome, descricao } = request.body;
    const { id } = request.params;
    const id_usuario = request.usuario_id_jwt;
    if (!nome) return response.status(400).send({ err: "Nome em branco" });
    if (!descricao)
      return response.status(400).send({ err: "Descricao em branco" });
    try {
      const tarefa = await connection("tarefas")
        .update({
          nome,
          descricao,
        })
        .where({
          id: id,
          id_usuario: id_usuario,
        })
        .returning("*");
      return response.status(201).send(tarefa);
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  },
};
