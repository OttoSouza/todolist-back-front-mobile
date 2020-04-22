const connection = require("../config/connections");
const bycrypt = require("bcryptjs");
const gerarToken = require("../util/generateToken");
module.exports = {
  async salvar(request, response) {
    try {
      const { nome, senha, email } = request.body;

      const hash = await bycrypt.hash(senha, 10);

      if (!nome) return response.status(400).send({ err: "Nome em branco" });
      if (!senha) return response.status(400).send({ err: "Senha em branco" });
      if (!email) return response.status(400).send({ err: "Email em branco" });

      const usuario = await connection("usuarios")
        .insert({
          nome,
          senha: hash,
          email,
        })
        .returning("*");

      
      return response
        .status(201)
        .send({ usuario, token: gerarToken(usuario.id) });
    } catch (error) {
      return response.status(400).send({ err: "Email ja existe" });
    }
  },
  async atualizar(request, response) {
    try {
      const { nome, senha, email } = request.body;

      const hash = await bycrypt.hash(senha, 10);

      const usuario = await connection("usuarios")
        .update({
          nome,
          senha: hash,
          email,
        })
        .returning("*");

      return response.status(201).send({ usuario });
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  },

  async listar(request, response) {
    try {
      const usuarios = await connection("usuarios").select("*");

      usuarios.map((usuario) => {
        usuario.senha = undefined;
      });

      return response.status(200).send({ usuarios });
    } catch (error) {
      return response.status(200).send({ err: error.message });
    }
  },  

  async deletar(request, response) {},
};
