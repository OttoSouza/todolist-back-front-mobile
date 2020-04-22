const jwt = require("jsonwebtoken");
const secret_key = require("../config/key.json");
function generateToken(params = {}) {
  return jwt.sign(params, secret_key.secret, {
    expiresIn: "1d",
  });
}
module.exports = generateToken;