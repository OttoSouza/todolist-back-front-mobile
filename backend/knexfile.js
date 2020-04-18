// Update with your config settings.

module.exports = {
  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: './dev.sqlite3'
    // },
    client: "pg",
    connection: "postgres://postgres:1701445@localhost:5432/todo_list",
    migrations: {
      directory: "./src/database/migrations"},
    useNullAsDefault: true
  },

};
