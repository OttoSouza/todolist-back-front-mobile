exports.up = function (knex) {
  return knex.schema.createTable("tarefas", (table) => {
    table.increments("id");
    table.string("nome").notNullable();
    table.string("descricao").notNullable();
    table.timestamp("data_criacao", { precision: 6 }).defaultTo(knex.fn.now(6));

    table.integer("id_usuario").notNullable();

    table.foreign("id_usuario").references("id").inTable("usuarios");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("tarefas");
};
