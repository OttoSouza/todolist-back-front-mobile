const express = require("express");
const route = express.Router();
const tarefas_controller = require("../api/tarefas_controller");
const verificar_token = require("../middleware/validar_token");

route.use(verificar_token);

route.get("/", tarefas_controller.tarefa_usuario);
route.post("/", tarefas_controller.salvar);
route.put("/:id", tarefas_controller.atualizar);
route.delete("/:id", tarefas_controller.deletar);


module.exports = (app) => {
  app.use("/tarefas", route);
};
