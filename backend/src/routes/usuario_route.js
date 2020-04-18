// routes.put("/usuarios/:id", usuario_controller.atualizar_usuario);
// routes.delete("/usuarios/:id", usuario_controller.deletar_usuario);

module.exports = (app) => {
  app
    .route("/usuarios")
    .get(app.controller.usuario_controler.listar_usuarios)
    .post(app.controller.usuario_controler.salvar_usuario);
};
