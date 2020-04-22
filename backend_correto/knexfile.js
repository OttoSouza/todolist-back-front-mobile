module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:1701445@localhost:5432/todo_list",
    migrations: {
      directory: "./src/config/database/migrations",
    },
    useNullAsDefault: true,
  },
};
