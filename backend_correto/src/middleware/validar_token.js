const jwt = require("jsonwebtoken");

const key = require("../config/key.json");

module.exports = (request, response, next) => {

  const authHeader = request.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return response.status(401).send({err: 'Token invalido'});

  jwt.verify(token, key.secret, (err, decoded) => {
    if (err) return response.status(401).send({err: 'Token não confere'});
    request.usuario_id_jwt = decoded.id;
    next();
  });
};

