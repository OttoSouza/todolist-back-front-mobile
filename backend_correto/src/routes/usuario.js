const express = require("express");
const route = express.Router();

const controller = require("../api/usuario_controller");
const autenticacao = require("../api/autenticacao.controller");

route.get("/", controller.listar);
route.post("/", controller.salvar);
route.post("/auth", autenticacao.autenticacao);

module.exports = (app) => {
  app.use("/usuarios", route);
};
