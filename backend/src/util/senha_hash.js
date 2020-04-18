const bcrypt = require('bcryptjs');

function comparePass(request_senha, db_senha) {
  return bcrypt.compareSync(request_senha, db_senha);
}
module.exports = {
  comparePass
};