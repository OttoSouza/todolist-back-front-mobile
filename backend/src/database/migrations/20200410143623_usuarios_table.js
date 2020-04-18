exports.up = function (knex) {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.string("senha").notNullable();
    table.string("email").notNullable().index().unique();
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("usuarios");
};
