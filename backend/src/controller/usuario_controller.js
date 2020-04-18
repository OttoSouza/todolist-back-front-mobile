const connection = require("../database/connection");
const bcrypt = require("bcryptjs");
module.exports = (app) => {
  const listar_usuarios = async (request, response) => {
    try {
      const usuarios = await app.connection("usuarios").select("*");

      usuarios.map((usuario) => {
        usuario.senha = undefined;
      });

      return response
        .status(200)
        .send({ usuarios, usuario: request.id_usuario });
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  };

  const salvar_usuario = async (request, response) => {
    try {
      const { nome, senha, email } = request.body;

      const hash = await bcrypt.hash(senha, 10);

      const usuario = await app
        .connection("usuarios")
        .insert({
          nome,
          senha: hash,
          email,
        })
        .returning("*");

      usuario.senha = undefined;

      return response.status(201).send({ usuario });
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  };
};

//async atualizar_usuario(request, response) {
//   try {
//     const { id } = request.params;

//     const usuario = await connection("usuarios")
//       .update({
//         ...request.body
//       })
//       .where("id", id)
//       .returning("*");

//     if (!usuario.id)
//       return response
//         .status(401)
//         .send({ err: messagesEx.erro_atualizar_usuario });

//     return response.status(200).send(usuario);
//   } catch (error) {
//       return response.status(400).send({err: error.message});
//   }
// },

// async deletar_usuario(request, response) {
//   try {
//     const { id } = request.params;

//     await connection("usuarios")
//       .select("id")
//       .where("id", id)
//       .delete();

//     return response.status(204).send("Usuario deletado");
//   } catch (error) {
//       return response.status(400).send({err: error.message});
//   }
// },

// async buscar_usuario(request, response) {
//   try {
//     const { nome } = request.body;

//     const usuario = await connection("usuarios")
//       .select("*")
//       .where({ nome: nome })
//       .returning("*");

//     return response.status(200).send(usuario);
//   } catch (error) {
//       return response.status(400).send({err: error.message});
//   }
// }
