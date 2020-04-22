const connection = require("../config/connections");
const bcrypt = require("bcryptjs");
const generateToken = require("../util/generateToken");

module.exports = {
  async autenticacao(request, response) {
    const { email, senha } = request.body;
    try {
      const usuario = await connection("usuarios")
        .where("email", email)
        .first();

      if (!usuario)
        return response.status(400).send({ err: "Usúario não encontrado" });

      if (!(await bcrypt.compare(senha, usuario.senha)))
        return response.status(400).send({ err: "Senha Inválida" });

      return response.send({
        usuario,
        token: generateToken({ id: usuario.id }),
      });
    } catch (error) {
      return response.status(400).send({ err: error.message });
    }
  },
};
